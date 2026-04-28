
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, FileText, Scale, CheckCircle, Clock, Zap, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { useMemo } from "react";

export function StatsOverview() {
  const { t } = useLanguage();
  const db = useFirestore();

  const courtsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return collection(db, "courts");
  }, [db]);

  const { data: courtData, isLoading } = useCollection(courtsQuery);

  // Aggregating live data from Firestore
  const statsSummary = useMemo(() => {
    if (!courtData) return { pending: "4.5 Cr", new: "68,342", disposed: "42,891", wait: "3.2 वर्ष" };
    
    const totalPending = courtData.reduce((acc, curr) => acc + (curr.totalPendingCases || 0), 0);
    const totalNew = courtData.reduce((acc, curr) => acc + (curr.newCasesThisYear || 0), 0);
    const totalDisposed = courtData.reduce((acc, curr) => acc + (curr.disposedCasesThisYear || 0), 0);
    const avgWait = courtData.length > 0 
      ? (courtData.reduce((acc, curr) => acc + (curr.averageWaitingTimeYears || 0), 0) / courtData.length).toFixed(1)
      : "0.0";

    return {
      pending: totalPending > 1000000 ? `${(totalPending / 10000000).toFixed(2)} Cr` : totalPending.toLocaleString(),
      new: totalNew.toLocaleString(),
      disposed: totalDisposed.toLocaleString(),
      wait: `${avgWait} वर्ष`
    };
  }, [courtData]);

  const stats = [
    {
      title: t('totalPending'),
      value: statsSummary.pending,
      change: "+5% वार्षिक",
      trend: "up",
      icon: FileText,
      color: "text-primary",
      bg: "bg-primary/10",
      glow: "shadow-[0_0_30px_rgba(7,241,214,0.2)]",
    },
    {
      title: t('newCases'),
      value: statsSummary.new,
      change: "-2% गिरावट",
      trend: "down",
      icon: Scale,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      glow: "shadow-[0_0_30px_rgba(96,165,250,0.2)]",
    },
    {
      title: t('disposedCases'),
      value: statsSummary.disposed,
      change: "+8% सुधार",
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      glow: "shadow-[0_0_30px_rgba(52,211,153,0.2)]",
    },
    {
      title: t('waitingPeriod'),
      value: statsSummary.wait,
      change: "दक्षता सूचकांक",
      trend: "neutral",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      glow: "shadow-[0_0_30px_rgba(251,191,36,0.2)]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <Card 
          key={stat.title} 
          className={`relative overflow-hidden border-white/5 bg-card/60 backdrop-blur-xl group hover:border-primary/50 transition-all duration-700 hover:scale-[1.05] hover:-translate-y-2 ${stat.glow} rounded-[2.5rem]`}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6">
            <CardTitle className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors duration-500">
              {stat.title}
            </CardTitle>
            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl group-hover:rotate-[360deg] group-hover:scale-125 transition-all duration-1000 border border-current/20 shadow-lg`}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <stat.icon className="h-5 w-5" />}
            </div>
          </CardHeader>
          <CardContent className="pb-8">
            <div className="text-5xl font-black tracking-tighter text-white group-hover:text-primary transition-all duration-700 group-hover:drop-shadow-[0_0_15px_rgba(7,241,214,0.5)]">
              {isLoading ? "---" : stat.value}
            </div>
            <div className="flex items-center mt-4 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md group-hover:bg-primary/10 transition-all">
              {stat.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-destructive mr-2 animate-bounce" />
              ) : stat.trend === "down" ? (
                <ArrowDownRight className="h-4 w-4 text-emerald-400 mr-2 animate-bounce" />
              ) : (
                <Zap className="h-4 w-4 text-primary mr-2 animate-pulse" />
              )}
              <p className={`text-xs font-black uppercase tracking-wider ${
                stat.trend === "up" ? "text-destructive" : stat.trend === "down" ? "text-emerald-400" : "text-primary"
              }`}>
                {stat.change}
              </p>
            </div>
          </CardContent>
          <div className="h-2 w-full bg-white/5 relative mt-auto overflow-hidden">
             <div 
               className={`h-full absolute left-0 top-0 transition-all duration-[2000ms] group-hover:w-full group-hover:brightness-150 ${
                 stat.trend === 'up' ? 'bg-destructive w-1/2' : 
                 stat.trend === 'down' ? 'bg-emerald-400 w-2/3' : 'bg-primary w-1/3'
               }`}
             />
             <div className="scan-line" />
          </div>
        </Card>
      ))}
    </div>
  );
}
