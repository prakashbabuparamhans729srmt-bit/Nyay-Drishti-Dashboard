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
import { Loader2, Zap, BrainCircuit, ShieldCheck, Activity } from "lucide-react";

/**
 * NyayDrishtiDashboard - The primary operational command center.
 * Handles authentication status, guest access, and orchestrates the dashboard components.
 */
export default function NyayDrishtiDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for guest mode persistence
    const guestStatus = localStorage.getItem("nyay-guest-mode") === "true";
    setIsGuest(guestStatus);

    // Redirect to login if not authenticated and not in guest mode
    if (!isUserLoading && !user && !guestStatus) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden">
        <div className="neural-wire" />
        <div className="relative flex flex-col items-center gap-8">
          <div className="relative h-32 w-32">
            <Loader2 className="h-32 w-32 text-primary animate-spin opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BrainCircuit className="h-14 w-14 text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-glow-pule" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-primary font-black uppercase tracking-[1em] animate-pulse text-neon">NyayDrishti</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.5em] font-bold">A to Z Neural System Booting...</p>
          </div>
        </div>
      </div>
    );
  }

  // Prevent flicker if redirect is pending
  if (!user && !isGuest) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="neural-wire" />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-12 max-w-7xl relative z-10">
        <div className="scan-line opacity-5" />
        
        {/* Statistics Hero Section */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-2xl border border-primary/30 shadow-[0_0_15px_rgba(7,241,214,0.2)]">
                <Activity className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm font-black uppercase tracking-[0.5em] text-primary/80">Live Judicial Telemetry</h2>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Real-time Data Stream: Active</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 bg-secondary/30 px-6 py-2.5 rounded-2xl border border-white/5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">A to Z Secured Portal</span>
            </div>
          </div>
          <StatsOverview />
        </section>

        {/* Central Intelligence Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
            <DashboardCharts />
            <CourtDetailsTable />
          </div>
          
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
            <AlertsAndNotifications />
            <JudgeAnalysisPanel />
            <AIBottleneckAnalysisTrigger />
          </div>
        </section>

        {/* Actionable Toolkit */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <QuickActions />
        </section>
      </main>

      {/* Cybernetic Footer */}
      <footer className="py-12 border-t border-white/5 bg-secondary/30 backdrop-blur-xl mt-auto relative overflow-hidden">
        <div className="scan-line opacity-10 top-auto bottom-0" />
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-primary/30" />
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(7,241,214,1)]" />
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-primary/60">
                  NyayDrishti Neural Framework v4.5.0
                </p>
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(7,241,214,1)]" />
              </div>
              <div className="h-[1px] w-12 bg-primary/30" />
            </div>
            <div className="text-sm text-muted-foreground font-medium opacity-80 max-w-2xl mx-auto leading-relaxed italic">
              © {new Date().getFullYear()} न्यायदृष्टि डैशबोर्ड - भारत के हर नागरिक के लिए सुलभ, पारदर्शी और त्वरित न्याय का डिजिटल द्वार।
            </div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-primary/40">
              <span>Security Protocols: Active</span>
              <span>•</span>
              <span>A to Z Integration: Enabled</span>
              <span>•</span>
              <span>Live Node: New Delhi Central</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}