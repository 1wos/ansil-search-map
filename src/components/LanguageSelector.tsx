import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { languageLabels, Language } from "@/i18n/translations";

const languages: Language[] = ["ko", "en", "vi", "zh"];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary min-h-[44px]"
        aria-label="Language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{languageLabels[language]}</span>
      </button>
      <div className="invisible absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-xl border bg-card p-1 shadow-card-hover opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors min-h-[40px] ${
              language === lang
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {languageLabels[lang]}
          </button>
        ))}
      </div>
    </div>
  );
}
