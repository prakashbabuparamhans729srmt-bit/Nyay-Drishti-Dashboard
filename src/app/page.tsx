
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
import { Loader2, Zap, BrainCircuit, ShieldCheck, Activity, Cpu, Sparkles, Network, Terminal, ShieldAlert, Globe, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const [bootProgress, setBootProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    const guestStatus = localStorage.getItem("nyay-guest-mode") === "true";
    setIsGuest(guestStatus);

    if (!isUserLoading && !user && !guestStatus) {
      router.push("/login");
    }

    // Simulation of A to Z Neural Booting
    if (isUserLoading || !user) {
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !mounted || (bootProgress < 100 && !user && !isGuest)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden relative">
        <div className="neural-wire" />
        <div className="neural-background-mesh" />
        <div className="relative flex flex-col items-center gap-8 z-10">
          <div className="relative h-72 w-72">
            <Loader2 className="h-72 w-72 text-primary animate-spin opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BrainCircuit className="h-40 w-40 text-primary animate-pulse shadow-[0_0_70px_rgba(7,241,214,0.9)]" />
            </div>
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-glow-pule" />
            <div className="scan-line h-1" />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
               <Cpu className="h-10 w-10 text-primary animate-bounce shadow-[0_0_30px_rgba(7,241,214,1)]" />
               <h1 className="text-primary font-black uppercase tracking-[1.5em] animate-pulse text-neon text-5xl">NyayDrishti</h1>
            </div>
            <div className="space-y-6 text-center">
              <div className="flex items-center gap-3 justify-center">
                <Terminal className="h-5 w-5 text-primary" />
                <p className="text-[14px] text-white/90 uppercase tracking-[0.8em] font-black italic">{t('systemBooting')}</p>
              </div>
              <div className="w-[500px] h-3 bg-secondary/50 rounded-full overflow-hidden border-2 border-primary/30 p-1 shadow-[0_0_20px_rgba(7,241,214,0.2)]">
                <div 
                  className="h-full bg-primary animate-[shimmer_2s_infinite] neural-shimmer rounded-full transition-all duration-300" 
                  style={{ width: `${bootProgress}%` }} 
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.6em]">Neural Core: {bootProgress}% Initialized... Node 01-A (A to Z Link Active)</p>
                <div className="flex justify-center gap-4 opacity-40">
                   <span className="text-[8px] uppercase font-bold tracking-widest">Protocol: SECURE</span>
                   <span className="text-[8px] uppercase font-bold tracking-widest">Link: STABLE</span>
                   <span className="text-[8px] uppercase font-bold tracking-widest">Sync: ACTIVE</span>
                </div>
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
          <div className="flex items-center justify-between mb-10 px-8 py-6 bg-secondary/30 rounded-[3rem] border-2 border-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="flex items-center gap-8">
              <div className="bg-primary/20 p-6 rounded-[2rem] border-2 border-primary/50 shadow-[0_0_40px_rgba(7,241,214,0.5)] group hover:scale-110 transition-all cursor-pointer overflow-hidden relative">
                <Activity className="h-8 w-8 text-primary animate-pulse" />
                <div className="scan-line opacity-40" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black uppercase tracking-[0.8em] text-primary text-neon italic">Live Telemetry (A-Z)</h2>
                  <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-primary/30">
                    <Radio className="h-3 w-3 text-primary animate-ping" />
                    <span className="text-[8px] font-black text-primary uppercase tracking-widest">Broadcasting</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-2">
                   <span className="text-[12px] text-muted-foreground font-black uppercase tracking-[0.4em] opacity-90">{t('flowActive')}</span>
                   <div className="flex items-center gap-2">
                     <span className="h-3 w-3 rounded-full bg-primary animate-ping" />
                     <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_15px_rgba(7,241,214,1)]" />
                   </div>
                   <Badge variant="outline" className="border-primary/40 text-[10px] font-black uppercase text-primary px-4 bg-primary/10 shadow-lg">NODE: CENTRAL GATEWAY</Badge>
                   <div className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Global Sync Status: 100%</span>
                   </div>
                </div>
              </div>
            </div>
            <div className="hidden xl:flex items-center gap-12">
              <div className="flex items-center gap-5 bg-black/60 px-12 py-5 rounded-[2rem] border-2 border-primary/20 shadow-3xl group hover:border-primary/80 transition-all cursor-default relative overflow-hidden">
                <Network className="h-6 w-6 text-primary animate-pulse" />
                <span className="text-[12px] font-black text-primary/90 uppercase tracking-[0.5em]">Global A-Z Sync</span>
                <div className="absolute inset-0 bg-primary/5 neural-shimmer opacity-0 group-hover:opacity-100" />
              </div>
              <div className="flex items-center gap-5 bg-black/60 px-12 py-5 rounded-[2rem] border-2 border-primary/20 shadow-3xl group hover:border-primary/80 transition-all cursor-default relative overflow-hidden">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="text-[12px] font-black text-primary/90 uppercase tracking-[0.5em]">{t('neuralIntegration')}</span>
                <div className="absolute inset-0 bg-primary/5 neural-shimmer opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          </div>
          <StatsOverview />
        </section>

        {/* Central Intelligence Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
            <DashboardCharts />
            <div className="p-1.5 bg-gradient-to-br from-primary/40 via-transparent to-primary/20 rounded-[4rem] shadow-[0_0_60px_rgba(7,241,214,0.1)]">
              <CourtDetailsTable />
            </div>
          </div>
          
          <div className="space-y-16 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
            <div className="relative group">
              <AlertsAndNotifications />
              <div className="absolute -top-6 -right-6 bg-destructive p-3 rounded-[1.5rem] shadow-[0_0_30px_rgba(247,31,38,0.7)] border-4 border-black animate-bounce group-hover:scale-110 transition-transform">
                <ShieldAlert className="h-7 w-7 text-white" />
              </div>
              <div className="scan-line opacity-10 group-hover:opacity-30" />
            </div>
            <JudgeAnalysisPanel />
            <div className="p-1 bg-gradient-to-t from-primary/30 to-transparent rounded-[4rem] shadow-2xl">
              <AIBottleneckAnalysisTrigger />
            </div>
          </div>
        </section>

        {/* Actionable Toolkit */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 bg-secondary/20 rounded-[5rem] p-16 border-2 border-white/5 relative overflow-hidden shadow-[inset_0_2px_40px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 holographic-bg opacity-40" />
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
          <QuickActions />
        </section>
      </main>

      {/* Cybernetic Footer */}
      <footer className="py-24 border-t border-white/10 bg-secondary/80 backdrop-blur-[50px] mt-auto relative overflow-hidden">
        <div className="scan-line opacity-20 top-auto bottom-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex flex-col items-center gap-12">
            <div className="flex items-center gap-12">
              <div className="h-[3px] w-48 bg-gradient-to-l from-primary/60 to-transparent rounded-full" />
              <div className="flex items-center gap-6">
                <div className="h-4 w-4 rounded-full bg-primary animate-pulse shadow-[0_0_20px_rgba(7,241,214,1)]" />
                <p className="text-[14px] font-black uppercase tracking-[1.5em] text-primary text-neon">
                  NyayDrishti Neural Framework v4.5.0 - A to Z Active
                </p>
                <div className="h-4 w-4 rounded-full bg-primary animate-pulse shadow-[0_0_20px_rgba(7,241,214,1)]" />
              </div>
              <div className="h-[3px] w-48 bg-gradient-to-r from-primary/60 to-transparent rounded-full" />
            </div>
            <div className="text-xl text-muted-foreground font-black opacity-90 max-w-5xl mx-auto leading-relaxed italic tracking-wide">
              © {new Date().getFullYear()} न्यायदृष्टि डैशबोर्ड - भारत के हर नागरिक के लिए सुलभ, पारदर्शी और त्वरित न्याय का डिजिटल द्वार। 
              <br />
              <span className="text-[12px] uppercase not-italic opacity-50 mt-6 block tracking-[0.8em] font-black">Advancing Digital Judiciary via Neural Flow Integration</span>
            </div>
            <div className="flex flex-wrap justify-center gap-16 text-[13px] font-black uppercase tracking-[0.5em] text-primary/60">
              <span className="flex items-center gap-5 hover:text-primary transition-all cursor-default group hover:scale-110"><Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" /> Security: Active</span>
              <span className="opacity-30 text-2xl">•</span>
              <span className="flex items-center gap-5 hover:text-primary transition-all cursor-default group hover:scale-110"><Cpu className="h-5 w-5 group-hover:animate-spin-slow" /> A to Z Integration: Enabled</span>
              <span className="opacity-30 text-2xl">•</span>
              <span className="flex items-center gap-5 hover:text-primary transition-all cursor-default group hover:scale-110"><Zap className="h-5 w-5 group-hover:scale-125 transition-transform" /> Live Node: Central Gateway</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
