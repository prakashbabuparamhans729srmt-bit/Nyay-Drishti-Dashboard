"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, FileText, Scale, CheckCircle, Clock } from "lucide-react";

export function StatsOverview() {
  const stats = [
    {
      title: "कुल लंबित मामले",
      value: "4.5 Cr",
      change: "+5% वार्षिक",
      trend: "up",
      icon: FileText,
      color: "text-primary",
      bg: "bg-primary/10",
      glow: "shadow-[0_0_20px_rgba(7,241,214,0.15)]",
    },
    {
      title: "इस वर्ष नए मामले",
      value: "68,342",
      change: "-2% गिरावट",
      trend: "down",
      icon: Scale,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      glow: "shadow-[0_0_20px_rgba(96,165,250,0.15)]",
    },
    {
      title: "इस वर्ष निस्तारित",
      value: "42,891",
      change: "+8% सुधार",
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      glow: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
    },
    {
      title: "औसत प्रतीक्षा अवधि",
      value: "3.2 वर्ष",
      change: "दक्षता सूचकांक",
      trend: "neutral",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      glow: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className={`overflow-hidden border-white/5 bg-card group hover:border-primary/50 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 ${stat.glow}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.title}</CardTitle>
            <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 border border-current/10`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tighter text-white group-hover:text-primary transition-colors duration-500">{stat.value}</div>
            <div className="flex items-center mt-3 bg-white/5 w-fit px-2 py-1 rounded-full border border-white/5">
              {stat.trend === "up" ? (
                <ArrowUpRight className="h-3 w-3 text-destructive mr-1 animate-pulse" />
              ) : stat.trend === "down" ? (
                <ArrowDownRight className="h-3 w-3 text-emerald-400 mr-1 animate-pulse" />
              ) : (
                <Clock className="h-3 w-3 text-muted-foreground mr-1" />
              )}
              <p className={`text-[10px] font-black uppercase ${
                stat.trend === "up" ? "text-destructive" : stat.trend === "down" ? "text-emerald-400" : "text-muted-foreground"
              }`}>
                {stat.change}
              </p>
            </div>
          </CardContent>
          <div className="h-1.5 w-full bg-white/5 relative">
             <div 
               className={`h-full absolute left-0 top-0 transition-all duration-1000 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(current)] ${
                 stat.trend === 'up' ? 'bg-destructive w-1/2' : 
                 stat.trend === 'down' ? 'bg-emerald-400 w-2/3' : 'bg-primary w-1/3'
               }`}
             />
          </div>
        </Card>
      ))}
    </div>
  );
}