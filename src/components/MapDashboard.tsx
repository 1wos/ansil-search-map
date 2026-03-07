import { useState } from "react";
import { LeafletMap } from "@/components/LeafletMap";
import { MapSidePanel } from "@/components/MapSidePanel";
import { useRegionStats } from "@/hooks/usePrograms";

export function MapDashboard() {
  const [selectedRegionName, setSelectedRegionName] = useState<string | null>(null);
  const { data, isLoading } = useRegionStats();

  // Build program counts keyed by city name (for LeafletMap)
  const programCounts: Record<string, number> = {};
  if (data?.stats) {
    for (const [city, stat] of Object.entries(data.stats)) {
      programCounts[city] = stat.total;
    }
  }

  const selectedStats = selectedRegionName && data?.stats?.[selectedRegionName]
    ? { name: selectedRegionName, total: data.stats[selectedRegionName].total, categories: data.stats[selectedRegionName].categories }
    : null;

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="mb-2 text-center text-2xl font-bold text-foreground md:text-3xl">
          전국 지도로 한눈에
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          관심 지역을 클릭하면 해당 지역의 지원제도를 확인할 수 있어요
        </p>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-[60%]">
            <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
              {isLoading ? (
                <div className="flex h-64 items-center justify-center text-muted-foreground">데이터를 불러오는 중...</div>
              ) : (
                <LeafletMap
                  selectedRegion={selectedRegionName}
                  onRegionClick={setSelectedRegionName}
                  programCounts={programCounts}
                />
              )}
            </div>
          </div>
          <div className="w-full lg:w-[40%]">
            <MapSidePanel selectedRegion={selectedStats} regionId={selectedRegionName} />
          </div>
        </div>
      </div>
    </section>
  );
}
