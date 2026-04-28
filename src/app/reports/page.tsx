
"use client";

import { useMemo } from "react";
import { Header } from "@/components/dashboard/header";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { LayoutGrid, Download, FileText, ArrowLeft, BarChart3, TrendingUp, Sparkles, Cpu, Zap, Activity, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFirestore, useMemoFirebase, useCollection } from "@/firebase";
import { collection } from "firebase/firestore";

export default function ReportsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const db = useFirestore();

  const courtsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return collection(db, "courts");
  }, [db]);

  const { data: courtData, isLoading } = useCollection(courtsQuery);

  const reportStats = useMemo(() => {
    if (!courtData) return { totalReports: 0, disposal: "0%" };
    const total = courtData.length;
    const avgDisposal = total > 0 
      ? (courtData.reduce((acc, curr) => acc + (curr.disposalRatePercentage || 0), 0) / total).toFixed(0)
      : 0;
    return { totalReports: 250 + total, disposal: `${avgDisposal}%` };
  }, [courtData]);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden atoz-active-flow data-stream-animation">
      <div className="neural-wire" />
      <div className="neural-background-mesh" />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-12 max-w-7xl relative z-10">
        <div className="scan-line opacity-5" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-primary/10">
              <ArrowLeft className="h-6 w-6 text-primary" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-primary animate-pulse" />
                {t('reports')} और विश्लेषण
              </h1>
              <span className="text-[10px] text-primary/60 font-black uppercase tracking-[0.5em] ml-11">A to Z Node: Analytical Core Unit</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="bg-primary text-black font-black rounded-full h-12 px-8 gap-3 shadow-[0_10px_20px_rgba(7,241,214,0.3)] hover:scale-105 transition-all">
              <Download className="h-5 w-5" /> PDF एक्सपोर्ट
            </Button>
            <Button variant="outline" className="border-primary/30 text-primary font-black rounded-full h-12 px-8 gap-3 hover:bg-primary/10">
              <FileText className="h-5 w-5" /> एक्सेल डाउनलोड
            </Button>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
          {[
            { label: "कुल रिपोर्ट", value: reportStats.totalReports.toString(), icon: FileText, color: "text-blue-400", bg: "bg-blue-400/10" },
            { label: "सक्रिय ट्रेंड्स", value: "12", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
            { label: "निस्तारण दर", value: reportStats.disposal, icon: BarChart3, color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { label: "सिस्टम हेल्थ", value: "उत्कृष्ट", icon: LayoutGrid, color: "text-amber-400", bg: "bg-amber-400/10" },
          ].map((item, i) => (
            <Card key={i} className="bg-card border-white/5 hover:border-primary/40 transition-all p-8 shadow-2xl rounded-[2.5rem] relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">{item.label}</span>
                <div className={`${item.bg} p-3 rounded-2xl border border-white/5 group-hover:rotate-12 transition-all`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
              </div>
              <p className="text-4xl font-black tracking-tighter group-hover:text-primary transition-colors">
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : item.value}
              </p>
              <div className="scan-line opacity-0 group-hover:opacity-10" />
            </Card>
          ))}
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <DashboardCharts />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
           <Card className="bg-card/40 backdrop-blur-xl border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
             <h3 className="text-2xl font-black mb-10 text-primary flex items-center gap-3 italic uppercase tracking-tighter">
               <TrendingUp className="h-7 w-7 animate-pulse" />
               लंबित मामलों की आयु रिपोर्ट (A-Z)
             </h3>
             <div className="space-y-8">
                {[
                  { range: "0-1 वर्ष", val: 25, color: "bg-primary" },
                  { range: "1-3 वर्ष", val: 35, color: "bg-blue-400" },
                  { range: "3-5 वर्ष", val: 20, color: "bg-emerald-400" },
                  { range: "5-10 वर्ष", val: 12, color: "bg-amber-400" },
                  { range: "10+ वर्ष", val: 8, color: "bg-destructive" },
                ].map((item, i) => (
                  <div key={i} className="space-y-3 group/bar">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                      <span className="text-muted-foreground group-hover/bar:text-white transition-colors">{item.range}</span>
                      <span className="text-primary">{item.val}%</span>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(0,0,0,0.5)]`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
             </div>
             <div className="scan-line opacity-0 group-hover:opacity-10" />
           </Card>

           <Card className="bg-card border-primary/20 p-12 rounded-[3rem] shadow-[0_0_80px_rgba(7,241,214,0.1)] flex flex-col justify-center items-center text-center relative overflow-hidden neon-glow group">
             <div className="absolute inset-0 bg-primary/5 opacity-50" />
             <div className="bg-primary/20 p-8 rounded-[2.5rem] mb-8 border-2 border-primary/40 group-hover:rotate-[360deg] transition-all duration-1000 animate-glow-pule">
               <Sparkles className="h-14 w-14 text-primary animate-pulse" />
             </div>
             <h3 className="text-4xl font-black mb-6 italic uppercase tracking-tighter">AI विश्लेषण रिपोर्ट तैयार है</h3>
             <p className="text-muted-foreground mb-10 text-lg max-w-sm leading-relaxed">आपका न्युरल एआई असिस्टेंट इस महीने की डेटा रिपोर्ट का गहन विश्लेषण पूर्ण कर चुका है।</p>
             <Button className="bg-primary text-black font-black h-16 px-12 rounded-3xl shadow-[0_20px_40px_rgba(7,241,214,0.4)] hover:scale-110 active:scale-90 transition-all text-xl uppercase tracking-widest">
                एआई रिपोर्ट देखें (A-Z)
             </Button>
             <div className="mt-8 flex items-center gap-3 text-primary/40">
               <Cpu className="h-4 w-4" />
               <span className="text-[9px] font-black uppercase tracking-[0.5em]">Neural Sync Node 01-Active</span>
             </div>
             <div className="scan-line opacity-10" />
           </Card>
        </section>

        <div className="flex items-center justify-center gap-12 py-12 opacity-30">
           <div className="flex items-center gap-3">
             <Activity className="h-4 w-4" />
             <span className="text-[10px] font-black uppercase tracking-widest">Global Telemetry Link</span>
           </div>
           <div className="h-1 w-20 bg-primary/20 rounded-full" />
           <div className="flex items-center gap-3">
             <Zap className="h-4 w-4" />
             <span className="text-[10px] font-black uppercase tracking-widest">High Speed Sync Active</span>
           </div>
        </div>
      </main>
    </div>
  );
}
