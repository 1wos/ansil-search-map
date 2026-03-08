import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell, PieChart, Pie } from "recharts";
import { FileText, MapPin, Gift, CheckCircle } from "lucide-react";

const CAT_COLORS: Record<string, string> = {
  주거안전: "#E8917F", 귀가안전: "#4A7EC2", 생활지원: "#F5A86E", 건강: "#4CAF82", 커뮤니티: "#C48DB0",
};
const CAT_KEYS = ["주거안전", "귀가안전", "생활지원", "건강", "커뮤니티"];
const STAT_MAP: Record<string, string> = {
  주거안전: "safety_count", 귀가안전: "commute_count", 생활지원: "living_count", 건강: "health_count", 커뮤니티: "community_count",
};

function shorten(name: string) {
  return name.replace(/특별시|광역시|특별자치시|특별자치도/g, "").replace(/도$/, "");
}

function useAllPrograms() {
  return useQuery({
    queryKey: ["allProgramsAnalytics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("programs").select("region_city, category, cost, status");
      if (error) throw error;
      return data;
    },
  });
}

function useRegionStatsRPC() {
  return useQuery({
    queryKey: ["regionStatsRPC"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_region_stats");
      if (error) throw error;
      return data;
    },
  });
}

const AnalyticsPage = () => {
  const { t } = useLanguage();
  const { data: programs = [] } = useAllPrograms();
  const { data: stats = [], isLoading } = useRegionStatsRPC();

  const totalPrograms = programs.length;
  const totalRegions = new Set(programs.map(p => p.region_city)).size;
  const freeCount = programs.filter(p => p.cost === "무료").length;
  const freePct = totalPrograms ? Math.round((freeCount / totalPrograms) * 100) : 0;
  const openCount = programs.filter(p => p.status === "신청가능").length;
  const openPct = totalPrograms ? Math.round((openCount / totalPrograms) * 100) : 0;

  // Lollipop data
  const lollipopData = useMemo(() =>
    [...stats].sort((a, b) => Number(b.total_count) - Number(a.total_count))
      .map(s => ({ name: shorten(s.region_city), count: Number(s.total_count) })),
    [stats]);
  const avg = useMemo(() => {
    if (!stats.length) return 0;
    return Math.round(stats.reduce((s, r) => s + Number(r.total_count), 0) / stats.length);
  }, [stats]);

  const topRegion = lollipopData[0];
  const bottomRegion = lollipopData[lollipopData.length - 1];

  // Heatmap data
  const heatmapRegions = useMemo(() =>
    [...stats].sort((a, b) => Number(b.total_count) - Number(a.total_count)),
    [stats]);
  const maxCatCount = useMemo(() => {
    let max = 1;
    stats.forEach(s => CAT_KEYS.forEach(cat => {
      const v = Number(s[STAT_MAP[cat] as keyof typeof s]);
      if (v > max) max = v;
    }));
    return max;
  }, [stats]);

  // Donut data
  const donutData = useMemo(() => {
    const free = programs.filter(p => p.cost === "무료").length;
    const paid = programs.filter(p => p.cost !== "무료" && p.cost !== "미확인").length;
    const unknown = programs.length - free - paid;
    return [
      { name: "무료", value: free, color: "#4CAF82" },
      { name: "유료", value: paid, color: "#E8917F" },
      { name: "기타", value: unknown, color: "#CBD5E1" },
    ].filter(d => d.value > 0);
  }, [programs]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">{t("map.loading")}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-6 md:py-12">
          <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">{t("analytics.page_title")}</h1>
          <p className="mb-8 text-muted-foreground">{t("analytics.page_subtitle")}</p>

          {/* Section 1: Key Stats */}
          <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              { icon: FileText, label: t("analytics.stat_total"), value: totalPrograms, suffix: "건", color: "text-coral-mid" },
              { icon: MapPin, label: t("analytics.stat_regions"), value: totalRegions, suffix: "개 지역", color: "text-sky-deep" },
              { icon: Gift, label: t("analytics.stat_free"), value: freePct, suffix: "%", color: "text-green-600" },
              { icon: CheckCircle, label: t("analytics.stat_open"), value: openPct, suffix: "%", color: "text-lav-deep" },
            ].map((item, i) => (
              <Card key={i} className="rounded-2xl shadow-card">
                <CardContent className="p-4 md:p-6 text-center">
                  <item.icon className={`mx-auto mb-2 h-6 w-6 ${item.color}`} />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.color} md:text-3xl`}>
                    {item.value}<span className="text-sm font-normal text-muted-foreground">{item.suffix}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Section 2: Lollipop */}
          <Card className="mb-10 rounded-2xl shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">{t("analytics.lollipop_title")}</CardTitle>
              <CardDescription>{t("analytics.lollipop_desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-2 md:mx-0">
                <div style={{ minWidth: 500, height: Math.max(400, lollipopData.length * 36 + 60) }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={lollipopData} layout="vertical" margin={{ left: 10, right: 50, top: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis dataKey="name" type="category" width={60} tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v: number) => [`${v}건`, "제도 수"]} />
                      <ReferenceLine x={avg} stroke="#CBD5E1" strokeDasharray="5 5"
                        label={{ value: `평균 ${avg}`, position: "insideTopRight", fontSize: 10, fill: "#94A3B8" }} />
                      <Bar dataKey="count" barSize={10} radius={[0, 6, 6, 0]} label={{ position: "right", fontSize: 11 }}>
                        {lollipopData.map((d, i) => (
                          <Cell key={i} fill={d.count >= avg ? "#4CAF82" : "#E8917F"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {topRegion && bottomRegion && (
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  {topRegion.name}({topRegion.count}건)과 {bottomRegion.name}({bottomRegion.count}건)의 격차: <span className="font-bold text-coral-deep">{topRegion.count > 0 && bottomRegion.count > 0 ? Math.round(topRegion.count / bottomRegion.count) : "∞"}배</span>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Section 3: Heatmap */}
          <Card className="mb-10 rounded-2xl shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">{t("analytics.heatmap_title")}</CardTitle>
              <CardDescription>{t("analytics.heatmap_desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-2 md:mx-0">
                <table className="w-full min-w-[500px] border-collapse text-xs md:text-sm">
                  <thead>
                    <tr>
                      <th className="p-2 text-left font-medium text-muted-foreground">지역</th>
                      {CAT_KEYS.map(cat => (
                        <th key={cat} className="p-2 text-center font-medium text-muted-foreground">{cat}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {heatmapRegions.map(region => (
                      <tr key={region.region_city} className="border-t border-border/50">
                        <td className="p-2 font-medium">{shorten(region.region_city)}</td>
                        {CAT_KEYS.map(cat => {
                          const val = Number(region[STAT_MAP[cat] as keyof typeof region]);
                          const intensity = maxCatCount > 0 ? val / maxCatCount : 0;
                          return (
                            <td key={cat} className="p-1.5 text-center">
                              <div
                                className={`mx-auto flex h-9 w-12 items-center justify-center rounded-md text-xs font-medium md:h-10 md:w-16 ${val === 0 ? "border-2 border-dashed border-coral-mid/40 text-coral-mid" : ""}`}
                                style={val > 0 ? {
                                  backgroundColor: `rgba(232, 145, 127, ${0.15 + intensity * 0.7})`,
                                  color: intensity > 0.5 ? "#fff" : "#2D2D2D",
                                } : undefined}
                                title={`${shorten(region.region_city)} × ${cat} = ${val}건`}
                              >
                                {val === 0 ? "✕" : val}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Donut */}
          <Card className="mb-10 rounded-2xl shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">{t("analytics.donut_title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div style={{ width: 280, height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={donutData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                        innerRadius={70} outerRadius={110} paddingAngle={3} strokeWidth={0}>
                        {donutData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number, name: string) => [`${v}건`, name]} />
                      <text x="50%" y="48%" textAnchor="middle" dominantBaseline="central"
                        className="fill-foreground text-2xl font-bold">{freePct}%</text>
                      <text x="50%" y="58%" textAnchor="middle" dominantBaseline="central"
                        className="fill-muted-foreground text-xs">무료 비율</text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-3 flex justify-center gap-6">
                {donutData.map(d => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
                    {d.name} ({d.value}건)
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Source */}
          <div className="rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
            <p>{t("analytics.source")}</p>
            <p className="mt-1">{t("analytics.updated")}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalyticsPage;
