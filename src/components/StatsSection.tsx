import { FileText, MapPin, Tag, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

const stats: { icon: React.ElementType; value: string; labelKey: TranslationKey; color: string }[] = [
  { icon: FileText, value: "1,247", labelKey: "stats.programs", color: "text-rose-deep" },
  { icon: MapPin, value: "17", labelKey: "stats.regions", color: "text-sky-deep" },
  { icon: Tag, value: "8", labelKey: "stats.categories", color: "text-lav-deep" },
  { icon: Users, value: "390만+", labelKey: "stats.households", color: "text-peach-deep" },
];

export function StatsSection() {
  const { t } = useLanguage();
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.labelKey}
              className="group rounded-2xl border bg-card p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover animate-count-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <stat.icon className={`mx-auto mb-3 h-8 w-8 ${stat.color} transition-transform group-hover:scale-110`} />
              <p className="text-2xl font-bold text-card-foreground md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
