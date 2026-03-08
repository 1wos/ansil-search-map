import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function AISearchSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { t } = useLanguage();

  const exampleQuestions = [t("ai.chip1"), t("ai.chip2"), t("ai.chip3"), t("ai.chip4")];

  const go = (text: string) => navigate(`/chat?q=${encodeURIComponent(text)}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) go(query.trim());
  };

  return (
    <section className="bg-gradient-ai py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <MessageCircle className="mx-auto mb-4 h-8 w-8 text-white" />
        <h2 className="mb-2 text-xl font-bold text-white md:text-3xl">
          {t("ai.title")}
        </h2>
        <p className="mb-6 text-sm text-white/70 md:mb-8">
          {t("ai.subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="mb-6 flex items-center gap-2 rounded-xl bg-card p-2 shadow-card-hover">
          <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("ai.placeholder")}
            className="border-0 bg-transparent text-base shadow-none focus-visible:ring-0 min-h-[44px]"
          />
          <Button type="submit" className="shrink-0 rounded-xl bg-gradient-cta text-white hover:opacity-90 min-h-[44px]">
            {t("ai.search")}
          </Button>
        </form>

        <div className="flex flex-wrap justify-center gap-2">
          {exampleQuestions.map((q) => (
            <button
              key={q}
              onClick={() => go(q)}
              className="rounded-full border border-white/30 bg-white/15 px-4 py-2.5 text-sm text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/25 hover:shadow-md active:scale-95 min-h-[44px]"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
