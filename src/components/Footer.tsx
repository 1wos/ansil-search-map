import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-rose-light/30 py-8">
      <div className="container space-y-2 text-center">
        <p className="text-xs text-muted-foreground">{t("footer.source")}</p>
        <p className="text-xs text-muted-foreground">{t("footer.disclaimer")}</p>
        <p className="pt-2 text-xs text-muted-foreground/60">{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
