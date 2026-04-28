
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
import { Loader2, Zap, BrainCircuit, ShieldCheck, Activity, Cpu, Terminal, ShieldAlert, Globe, Radio, Network, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NyayDrishtiDashboard() {
  const { user, isUserLoading } = useUser();
  const { t } = useLanguage();
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState("Initializing A to Z Core...");

  useEffect(() => {
    setMounted(true);
    const guestStatus = localStorage.getItem("nyay-guest-mode") === "true";
    setIsGuest(guestStatus);

    if (!isUserLoading && !user && !guestStatus) {
      router.push("/login");
    }

    const interval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSystemStatus("A to Z Node: FULLY ACTIVE");
          return 100;
        }
        if (prev < 15) setSystemStatus("Neural Core Loading...");
        else if (prev < 30) setSystemStatus("Firebase Link Establishing...");
        else if (prev < 45) setSystemStatus("Synchronizing Judicial Nodes...");
        else if (prev < 60) setSystemStatus("Decrypting Judicial Gateway...");
        else if (prev < 75) setSystemStatus("Scanning Regional Mainframes...");
        else if (prev < 90) setSystemStatus("Flow Calibration: 100% Complete");
        else if (prev < 100) setSystemStatus("System Online. Welcome to NyayDrishti.");
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [user, isUserLoading, router]);

  if (isUserLoading || !mounted || (bootProgress < 100 && !user && !isGuest)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden relative">
        <div className="neural-wire" />
        <div className="neural-background-mesh" />
        <div className="relative flex flex-col items-center gap-10 z-10">
          <div className="relative h-80 w-80">
            <Loader2 className="h-80 w-80 text-primary animate-spin opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BrainCircuit className="h-44 w-44 text-primary animate-pulse shadow-[0_0_100px_rgba(7,241,214,0.9)]" />
            </div>
            <div className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full animate-glow-pule" />
            <div className="scan-line h-1" />
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-5">
               <Cpu className="h-12 w-12 text-primary animate-bounce shadow-[0_0_40px_rgba(7,241,214,1)]" />
               <h1 className="text-primary font-black uppercase tracking-[1.5em] animate-pulse text-neon text-6xl">NyayDrishti</h1>
            </div>
            <div className="space-y-8 text-center">
              <div className="flex items-center gap-4 justify-center">
                <Terminal className="h-6 w-6 text-primary" />
                <p className="text-[16px] text-white/90 uppercase tracking-[0.8em] font-black italic">{systemStatus}</p>
              </div>
              <div className="w-[600px] h-4 bg-secondary/50 rounded-full overflow-hidden border-2 border-primary/30 p-1 shadow-[0_0_30px_rgba(7,241,214,0.3)]">
                <div 
                  className="h-full bg-primary animate-[shimmer_2s_infinite] neural-shimmer rounded-full transition-all duration-300" 
                  style={{ width: `${bootProgress}%` }} 
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[12px] text-primary font-black uppercase tracking-[0.6em]">A to Z System Flow: {bootProgress}% Initialized</p>
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
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-20 max-w-7xl relative z-10">
        <div className="scan-line opacity-5" />
        
        <section className="animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex items-center justify-between mb-12 px-10 py-8 bg-secondary/40 rounded-[4rem] border-2 border-white/5 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 pointer-events-none" />
            <div className="flex items-center gap-10">
              <div className="bg-primary/20 p-8 rounded-[2.5rem] border-2 border-primary/50 shadow-[0_0_50px_rgba(7,241,214,0.6)] group hover:scale-110 transition-all cursor-pointer overflow-hidden relative">
                <Activity className="h-10 w-10 text-primary animate-pulse" />
                <div className="scan-line opacity-40" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-black uppercase tracking-[0.8em] text-primary text-neon italic">Live Telemetry (A-Z)</h2>
                  <div className="flex items-center gap-3 bg-black/50 px-4 py-1.5 rounded-full border border-primary/40 shadow-inner">
                    <Radio className="h-4 w-4 text-primary animate-ping" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Broadcasting Node 01</span>
                  </div>
                </div>
                <div className="flex items-center gap-8 mt-3">
                   <span className="text-[14px] text-muted-foreground font-black uppercase tracking-[0.4em] opacity-90">{t('flowActive')}</span>
                   <Badge variant="outline" className="border-primary/50 text-[11px] font-black uppercase text-primary px-5 py-1 bg-primary/15 shadow-xl">NODE: CENTRAL GATEWAY</Badge>
                   <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-help">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Global Sync Status: 100% Calibrated</span>
                   </div>
                </div>
              </div>
            </div>
            <div className="hidden xl:flex items-center gap-16">
              <div className="flex items-center gap-6 bg-black/70 px-14 py-6 rounded-[2.5rem] border-2 border-primary/30 shadow-4xl group hover:border-primary/90 transition-all cursor-default relative overflow-hidden">
                <Network className="h-7 w-7 text-primary animate-pulse" />
                <span className="text-[14px] font-black text-primary/90 uppercase tracking-[0.5em]">Neural Sync</span>
                <div className="absolute inset-0 bg-primary/5 neural-shimmer opacity-0 group-hover:opacity-100" />
              </div>
              <div className="flex items-center gap-6 bg-black/70 px-14 py-6 rounded-[2.5rem] border-2 border-primary/30 shadow-4xl group hover:border-primary/90 transition-all cursor-default relative overflow-hidden">
                <ShieldCheck className="h-7 w-7 text-primary" />
                <span className="text-[14px] font-black text-primary/90 uppercase tracking-[0.5em]">{t('neuralIntegration')}</span>
                <div className="absolute inset-0 bg-primary/5 neural-shimmer opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          </div>
          <StatsOverview />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-20 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
            <DashboardCharts />
            <div className="p-2 bg-gradient-to-br from-primary/50 via-transparent to-primary/20 rounded-[4.5rem] shadow-[0_0_100px_rgba(7,241,214,0.15)] overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              <CourtDetailsTable />
              <div className="scan-line opacity-10 group-hover:opacity-30" />
            </div>
          </div>
          
          <div className="space-y-20 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
            <div className="relative group">
              <AlertsAndNotifications />
              <div className="absolute -top-8 -right-8 bg-destructive p-4 rounded-[1.8rem] shadow-[0_0_50px_rgba(247,31,38,0.8)] border-4 border-black animate-bounce group-hover:scale-110 transition-transform">
                <ShieldAlert className="h-8 w-8 text-white" />
              </div>
              <div className="scan-line opacity-10 group-hover:opacity-30" />
            </div>
            <JudgeAnalysisPanel />
            <div className="p-1.5 bg-gradient-to-t from-primary/40 to-transparent rounded-[4.5rem] shadow-3xl relative group overflow-hidden">
              <AIBottleneckAnalysisTrigger />
              <div className="scan-line opacity-0 group-hover:opacity-20" />
            </div>
          </div>
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 bg-secondary/30 rounded-[6rem] p-20 border-2 border-white/5 relative overflow-hidden shadow-[inset_0_2px_60px_rgba(0,0,0,0.95)]">
          <div className="absolute inset-0 holographic-bg opacity-50" />
          <div className="absolute top-0 left-0 w-full h-2 bg-primary/25" />
          <div className="relative z-10">
            <QuickActions />
          </div>
          <div className="scan-line opacity-5" />
        </section>
      </main>

      <footer className="py-28 border-t border-white/10 bg-secondary/90 backdrop-blur-[60px] mt-auto relative overflow-hidden">
        <div className="scan-line opacity-30 top-auto bottom-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex flex-col items-center gap-16">
            <div className="flex items-center gap-16">
              <div className="h-[4px] w-64 bg-gradient-to-l from-primary/80 to-transparent rounded-full" />
              <div className="flex items-center gap-8">
                <div className="h-5 w-5 rounded-full bg-primary animate-pulse shadow-[0_0_30px_rgba(7,241,214,1)]" />
                <p className="text-[16px] font-black uppercase tracking-[1.5em] text-primary text-neon">
                  NyayDrishti Neural Framework v4.5.0 - A to Z Active Flow
                </p>
                <div className="h-5 w-5 rounded-full bg-primary animate-pulse shadow-[0_0_30px_rgba(7,241,214,1)]" />
              </div>
              <div className="h-[4px] w-64 bg-gradient-to-r from-primary/80 to-transparent rounded-full" />
            </div>
            <div className="text-2xl text-muted-foreground font-black opacity-90 max-w-6xl mx-auto leading-relaxed italic tracking-wide">
              © {new Date().getFullYear()} न्यायदृष्टि डैशबोर्ड - भारत के हर नागरिक के लिए सुलभ, पारदर्शी और त्वरित न्याय का डिजिटल द्वार। 
            </div>
            <div className="flex items-center gap-6 opacity-40">
               <div className="flex items-center gap-2">
                 <Database className="h-4 w-4 text-primary" />
                 <span className="text-[10px] uppercase font-black tracking-widest">Mainframe Stable</span>
               </div>
               <div className="h-1 w-12 bg-white/10 rounded-full" />
               <div className="flex items-center gap-2">
                 <Radio className="h-4 w-4 text-primary" />
                 <span className="text-[10px] uppercase font-black tracking-widest">Uplink Active</span>
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
