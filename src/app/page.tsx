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
import { Loader2, Zap, BrainCircuit, ShieldCheck, Activity, Cpu, Sparkles, Network, Terminal, ShieldAlert } from "lucide-react";

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
          <div className="relative h-64 w-64">
            <Loader2 className="h-64 w-64 text-primary animate-spin opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BrainCircuit className="h-32 w-32 text-primary animate-pulse shadow-[0_0_50px_rgba(7,241,214,0.8)]" />
            </div>
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-glow-pule" />
            <div className="scan-line" />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
               <Cpu className="h-8 w-8 text-primary animate-bounce shadow-[0_0_20px_rgba(7,241,214,0.9)]" />
               <h1 className="text-primary font-black uppercase tracking-[1.2em] animate-pulse text-neon text-4xl">NyayDrishti</h1>
            </div>
            <div className="space-y-6 text-center">
              <div className="flex items-center gap-3 justify-center">
                <Terminal className="h-4 w-4 text-primary" />
                <p className="text-[12px] text-white/80 uppercase tracking-[0.6em] font-black italic">{t('systemBooting')}</p>
              </div>
              <div className="w-96 h-2 bg-secondary/50 rounded-full overflow-hidden border border-primary/20 p-0.5">
                <div className="h-full bg-primary animate-[shimmer_2s_infinite] neural-shimmer rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[9px] text-primary/60 uppercase tracking-widest font-black">Neural Core: Initializing... Node 01-A (A to Z Link Active)</p>
                <p className="text-[8px] text-primary/30 uppercase tracking-[0.4em] font-bold">Secure Gateway Handshake: SUCCESS</p>
              </div>
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
          <div className="flex items-center justify-between mb-10 px-6 py-4 bg-secondary/20 rounded-[2rem] border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-6">
              <div className="bg-primary/20 p-5 rounded-3xl border-2 border-primary/40 shadow-[0_0_30px_rgba(7,241,214,0.4)] group hover:scale-110 transition-transform cursor-pointer overflow-hidden relative">
                <Activity className="h-7 w-7 text-primary animate-pulse" />
                <div className="scan-line opacity-30" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-black uppercase tracking-[0.8em] text-primary text-neon italic">Live Telemetry (A-Z)</h2>
                <div className="flex items-center gap-4 mt-1">
                   <span className="text-[11px] text-muted-foreground font-black uppercase tracking-[0.4em] opacity-80">{t('flowActive')}</span>
                   <div className="flex items-center gap-2">
                     <span className="h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
                     <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(7,241,214,1)]" />
                   </div>
                   <Badge variant="outline" className="border-primary/40 text-[9px] font-black uppercase text-primary px-3 bg-primary/5">NODE: NEW DELHI</Badge>
                </div>
              </div>
            </div>
            <div className="hidden xl:flex items-center gap-10">
              <div className="flex items-center gap-4 bg-black/40 px-10 py-4 rounded-[1.5rem] border border-primary/20 shadow-2xl group hover:border-primary/60 transition-all cursor-default relative overflow-hidden">
                <Network className="h-5 w-5 text-primary animate-pulse" />
                <span className="text-[11px] font-black text-primary/80 uppercase tracking-[0.4em]">Global A-Z Sync</span>
                <div className="absolute inset-0 bg-primary/5 neural-shimmer opacity-0 group-hover:opacity-100" />
              </div>
              <div className="flex items-center gap-4 bg-black/40 px-10 py-4 rounded-[1.5rem] border border-primary/20 shadow-2xl group hover:border-primary/60 transition-all cursor-default relative overflow-hidden">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-[11px] font-black text-primary/80 uppercase tracking-[0.4em]">{t('neuralIntegration')}</span>
                <div className="absolute inset-0 bg-primary/5 neural-shimmer opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          </div>
          <StatsOverview />
        </section>

        {/* Central Intelligence Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
            <DashboardCharts />
            <div className="p-1 bg-gradient-to-br from-primary/30 via-transparent to-primary/10 rounded-[3rem]">
              <CourtDetailsTable />
            </div>
          </div>
          
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
            <div className="relative">
              <AlertsAndNotifications />
              <div className="absolute -top-4 -right-4 bg-destructive p-2 rounded-2xl shadow-[0_0_20px_rgba(247,31,38,0.5)] border-2 border-black animate-bounce">
                <ShieldAlert className="h-5 w-5 text-white" />
              </div>
            </div>
            <JudgeAnalysisPanel />
            <div className="p-0.5 bg-gradient-to-t from-primary/20 to-transparent rounded-[3rem]">
              <AIBottleneckAnalysisTrigger />
            </div>
          </div>
        </section>

        {/* Actionable Toolkit */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 bg-secondary/10 rounded-[4rem] p-12 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 holographic-bg opacity-30" />
          <QuickActions />
        </section>
      </main>

      {/* Cybernetic Footer */}
      <footer className="py-20 border-t border-white/5 bg-secondary/60 backdrop-blur-3xl mt-auto relative overflow-hidden">
        <div className="scan-line opacity-10 top-auto bottom-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex flex-col items-center gap-10">
            <div className="flex items-center gap-10">
              <div className="h-[2px] w-32 bg-gradient-to-l from-primary/40 to-transparent" />
              <div className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse shadow-[0_0_15px_rgba(7,241,214,1)]" />
                <p className="text-[11px] font-black uppercase tracking-[1.2em] text-primary text-neon">
                  NyayDrishti Neural Framework v4.5.0 - A to Z Active
                </p>
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse shadow-[0_0_15px_rgba(7,241,214,1)]" />
              </div>
              <div className="h-[2px] w-32 bg-gradient-to-r from-primary/40 to-transparent" />
            </div>
            <div className="text-base text-muted-foreground font-bold opacity-80 max-w-4xl mx-auto leading-relaxed italic tracking-wide">
              © {new Date().getFullYear()} न्यायदृष्टि डैशबोर्ड - भारत के हर नागरिक के लिए सुलभ, पारदर्शी और त्वरित न्याय का डिजिटल द्वार। 
              <br />
              <span className="text-[10px] uppercase not-italic opacity-40 mt-4 block tracking-[0.5em]">Advancing Digital Judiciary via Neural Flow</span>
            </div>
            <div className="flex flex-wrap justify-center gap-12 text-[11px] font-black uppercase tracking-[0.4em] text-primary/50">
              <span className="flex items-center gap-4 hover:text-primary transition-colors cursor-default group"><Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" /> Security: Active</span>
              <span className="opacity-20">•</span>
              <span className="flex items-center gap-4 hover:text-primary transition-colors cursor-default group"><Cpu className="h-4 w-4 group-hover:animate-spin-slow" /> A to Z Integration: Enabled</span>
              <span className="opacity-20">•</span>
              <span className="flex items-center gap-4 hover:text-primary transition-colors cursor-default group"><Zap className="h-4 w-4 group-hover:scale-125 transition-transform" /> Live Node: Central Gateway</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}