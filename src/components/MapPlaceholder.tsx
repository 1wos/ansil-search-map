import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function MapPlaceholder() {
  const { t } = useLanguage();
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="mb-2 text-center text-2xl font-bold text-secondary md:text-3xl">
          {t("map.title")}
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          {t("map.subtitle")}
        </p>

        <div className="mx-auto flex max-w-3xl items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 p-16 md:p-24">
          <div className="text-center">
            <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-lg font-medium text-muted-foreground">
              {t("map.placeholder_text")}
            </p>
            <p className="mt-1 text-sm text-muted-foreground/70">
              {t("map.placeholder_phase")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
