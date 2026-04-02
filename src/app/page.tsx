"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/header";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { CourtDetailsTable } from "@/components/dashboard/court-details-table";
import { JudgeAnalysisPanel } from "@/components/dashboard/judge-analysis-panel";
import { AlertsAndNotifications } from "@/components/dashboard/alerts-and-notifications";
import { AIBottleneckAnalysisTrigger } from "@/components/dashboard/ai-bottleneck-analysis-trigger";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { useUser } from "@/firebase";
import { Loader2 } from "lucide-react";

export default function NyayDrishtiDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const guestStatus = localStorage.getItem("nyay-guest-mode") === "true";
    setIsGuest(guestStatus);

    if (!isUserLoading && !user && !guestStatus) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user && !isGuest) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background scan effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-line opacity-5" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(7,241,214,0.05)_0%,transparent_70%)]" />
      </div>

      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8 max-w-7xl relative z-10">
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <StatsOverview />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000">
            <DashboardCharts />
            <CourtDetailsTable />
          </div>
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-1000">
            <AlertsAndNotifications />
            <JudgeAnalysisPanel />
            <AIBottleneckAnalysisTrigger />
          </div>
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <QuickActions />
        </section>
      </main>

      <footer className="py-8 border-t border-white/5 bg-secondary/20 backdrop-blur-md mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.5em] text-muted-foreground opacity-50 mb-2">
            NyayDrishti Neural Framework v4.0
          </p>
          <div className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} न्यायदृष्टि डैशबोर्ड - न्यायिक प्रणाली की पारदर्शिता और दक्षता के लिए।
          </div>
        </div>
      </footer>
    </div>
  );
}