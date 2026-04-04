
"use client";

import { Header } from "@/components/dashboard/header";
import { CourtDetailsTable } from "@/components/dashboard/court-details-table";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { Search, Filter, Database, ArrowLeft, Cpu, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

export default function CourtsPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden atoz-active-flow data-stream-animation">
      <div className="neural-wire" />
      <div className="neural-background-mesh" />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8 max-w-7xl relative z-10">
        <div className="scan-line opacity-5" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-primary/10">
              <ArrowLeft className="h-6 w-6 text-primary" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3">
                <Database className="h-8 w-8 text-primary animate-pulse" />
                {t('courts')} {t('reports')}
              </h1>
              <span className="text-[10px] text-primary/60 font-black uppercase tracking-[0.5em] ml-11">A to Z Node: Regional Unit</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64 group">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-all" />
              <Input placeholder={t('searchPlaceholder')} className="pl-10 rounded-full bg-secondary/50 border-white/10 focus:border-primary/50" />
            </div>
            <Button variant="outline" className="rounded-full gap-2 border-primary/20 hover:border-primary/50 text-primary">
              <Filter className="h-4 w-4" /> {t('settings')}
            </Button>
          </div>
        </div>

        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
           <div className="flex items-center gap-2 mb-4 px-4">
             <Activity className="h-4 w-4 text-primary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">न्यायालय प्रदर्शन लाइव फीड (A-Z)</span>
           </div>
           <StatsOverview />
        </section>

        <section className="bg-card/30 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl relative overflow-hidden group">
           <div className="scan-line opacity-0 group-hover:opacity-10" />
           <CourtDetailsTable />
        </section>

        <div className="flex justify-center pt-8">
          <div className="flex items-center gap-3 bg-secondary/40 px-6 py-3 rounded-2xl border border-white/5">
            <Cpu className="h-4 w-4 text-primary animate-spin-slow" />
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Neural Sync Status: Fully Calibrated</span>
          </div>
        </div>
      </main>
    </div>
  );
}
