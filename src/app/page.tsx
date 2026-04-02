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
import { Loader2, Zap } from "lucide-react";

/**
 * NyayDrishtiDashboard - The primary operational command center.
 * Handles authentication status, guest access, and orchestrates the dashboard components.
 */
export default function NyayDrishtiDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check for guest mode persistence
    const guestStatus = localStorage.getItem("nyay-guest-mode") === "true";
    setIsGuest(guestStatus);

    // Redirect to login if not authenticated and not in guest mode
    if (!isUserLoading && !user && !guestStatus) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
        </div>
      </div>
    );
  }

  // Prevent flicker if redirect is pending
  if (!user && !isGuest) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-12 max-w-7xl relative z-10">
        {/* Statistics Hero Section */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-primary/20 p-2 rounded-xl border border-primary/30">
              <Zap className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <h2 className="text-sm font-black uppercase tracking-[0.5em] text-primary/60">Live Judicial Telemetry Active</h2>
          </div>
          <StatsOverview />
        </section>

        {/* Central Intelligence Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10 animate-in fade-in slide-in-from-left-4 duration-1000">
            <DashboardCharts />
            <CourtDetailsTable />
          </div>
          
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-1000">
            <AlertsAndNotifications />
            <JudgeAnalysisPanel />
            <AIBottleneckAnalysisTrigger />
          </div>
        </section>

        {/* Actionable Toolkit */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <QuickActions />
        </section>
      </main>

      {/* Cybernetic Footer */}
      <footer className="py-12 border-t border-white/5 bg-secondary/30 backdrop-blur-xl mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(7,241,214,1)]" />
              <p className="text-[10px] font-black uppercase tracking-[0.8em] text-primary/60">
                NyayDrishti Neural Framework v4.5.0
              </p>
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(7,241,214,1)]" />
            </div>
            <div className="text-sm text-muted-foreground font-medium opacity-80">
              © {new Date().getFullYear()} न्यायदृष्टि डैशबोर्ड - न्यायिक सुगमता और डेटा पारदर्शिता का सर्वोच्च केंद्र।
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}