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
import { useLanguage } from "@/lib/language-context";
import { Loader2, Zap, BrainCircuit, ShieldCheck, Activity, Cpu, Sparkles, Network, Terminal } from "lucide-react";

/**
 * NyayDrishtiDashboard - The primary operational command center.
 * Fully Activated for A to Z System Flow.
 */
export default function NyayDrishtiDashboard() {
  const { user, isUserLoading } = useUser();
  const { t } = useLanguage();
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const guestStatus = localStorage.getItem("nyay-guest-mode") === "true";
    setIsGuest(guestStatus);

    if (!isUserLoading && !user && !guestStatus) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden relative">
        <div className="neural-wire" />
        <div className="neural-background-mesh" />
        <div className="relative flex flex-col items-center gap-8 z-10">
          <div className="relative h-48 w-48">
            <Loader2 className="h-48 w-48 text-primary animate-spin opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BrainCircuit className="h-24 w-24 text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-glow-pule" />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
               <Cpu className="h-6 w-6 text-primary animate-bounce shadow-[0_0_15px_rgba(7,241,214,0.8)]" />
               <h1 className="text-primary font-black uppercase tracking-[1em] animate-pulse text-neon text-3xl">NyayDrishti</h1>
            </div>
            <div className="space-y-4 text-center">
              <div className="flex items-center gap-2 justify-center">
                <Terminal className="h-3 w-3 text-primary/60" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.5em] font-black">{t('systemBooting')}</p>
              </div>
              <div className="w-80 h-1.5 bg-secondary rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-primary animate-[shimmer_2s_infinite] neural-shimmer" style={{ width: '100%' }} />
              </div>
              <p className="text-[8px] text-primary/40 uppercase tracking-widest font-black">Secure Kernel Initializing... Node 01-A (A to Z Link Active)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user && !isGuest) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden atoz-active-flow data-stream-animation">
      <div className="neural-wire" />
      <div className="neural-background-mesh" />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-16 max-w-7xl relative z-10">
        <div className="scan-line opacity-5" />
        
        {/* Statistics Hero Section */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex items-center justify-between mb-10 px-4">
            <div className="flex items-center gap-5">
              <div className="bg-primary/20 p-4 rounded-2xl border border-primary/30 shadow-[0_0_20px_rgba(7,241,214,0.3)] group hover:scale-110 transition-transform cursor-pointer">
                <Activity className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm font-black uppercase tracking-[0.6em] text-primary/90 text-neon">Live Judicial Telemetry (A-Z)</h2>
                <div className="flex items-center gap-3">
                   <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">{t('flowActive')}</span>
                   <div className="flex items-center gap-1.5">
                     <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                     <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(7,241,214,1)]" />
                   </div>
                </div>
              </div>
            </div>
            <div className="hidden xl:flex items-center gap-8">
              <div className="flex items-center gap-3 bg-secondary/40 px-8 py-3 rounded-2xl border border-white/5 shadow-inner group hover:border-primary/40 transition-all cursor-default">
                <Network className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-[10px] font-black text-primary/70 uppercase tracking-widest">Global A-Z Node Sync</span>
              </div>
              <div className="flex items-center gap-3 bg-secondary/40 px-8 py-3 rounded-2xl border border-white/5 shadow-inner group hover:border-primary/40 transition-all cursor-default">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-black text-primary/70 uppercase tracking-widest">{t('neuralIntegration')}</span>
              </div>
            </div>
          </div>
          <StatsOverview />
        </section>

        {/* Central Intelligence Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
            <DashboardCharts />
            <CourtDetailsTable />
          </div>
          
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
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
      <footer className="py-16 border-t border-white/5 bg-secondary/40 backdrop-blur-2xl mt-auto relative overflow-hidden">
        <div className="scan-line opacity-10 top-auto bottom-0" />
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="h-[1px] w-20 bg-primary/20" />
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(7,241,214,1)]" />
                <p className="text-[10px] font-black uppercase tracking-[1em] text-primary/60 text-neon">
                  NyayDrishti Neural Framework v4.5.0 - A to Z Active
                </p>
                <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(7,241,214,1)]" />
              </div>
              <div className="h-[1px] w-20 bg-primary/20" />
            </div>
            <div className="text-sm text-muted-foreground font-bold opacity-70 max-w-3xl mx-auto leading-relaxed italic tracking-wide">
              © {new Date().getFullYear()} न्यायदृष्टि डैशबोर्ड - भारत के हर नागरिक के लिए सुलभ, पारदर्शी और त्वरित न्याय का डिजिटल द्वार।
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">
              <span className="flex items-center gap-3 hover:text-primary transition-colors cursor-default"><Sparkles className="h-3.5 w-3.5" /> Security Protocols: Active</span>
              <span className="opacity-20">•</span>
              <span className="flex items-center gap-3 hover:text-primary transition-colors cursor-default"><Cpu className="h-3.5 w-3.5" /> A to Z Integration: Enabled</span>
              <span className="opacity-20">•</span>
              <span className="flex items-center gap-3 hover:text-primary transition-colors cursor-default"><Zap className="h-3.5 w-3.5" /> Live Node: New Delhi Central</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
