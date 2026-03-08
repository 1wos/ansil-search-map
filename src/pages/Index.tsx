import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MapDashboard } from "@/components/MapDashboard";
import { DashboardCharts } from "@/components/DashboardCharts";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MapDashboard />
        <DashboardCharts />
      </main>
      <Footer />

      {/* Floating AI chat button */}
      <button
        onClick={() => navigate("/chat")}
        className="fixed bottom-20 right-4 z-50 flex items-center gap-2 rounded-full bg-gradient-cta px-5 py-3 text-sm font-medium text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95 md:bottom-6 md:right-6"
      >
        <MessageCircle className="h-5 w-5" />
        {t("fab.help")}
      </button>
    </div>
  );
};

export default Index;
