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
      glow: "shadow-[0_0_15px_rgba(7,241,214,0.2)]",
    },
    {
      title: "इस वर्ष नए मामले",
      value: "68,342",
      change: "-2% गिरावट",
      trend: "down",
      icon: Scale,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      glow: "shadow-[0_0_15px_rgba(96,165,250,0.2)]",
    },
    {
      title: "इस वर्ष निस्तारित",
      value: "42,891",
      change: "+8% सुधार",
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      glow: "shadow-[0_0_15px_rgba(52,211,153,0.2)]",
    },
    {
      title: "औसत प्रतीक्षा अवधि",
      value: "3.2 वर्ष",
      change: "दक्षता सूचकांक",
      trend: "neutral",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      glow: "shadow-[0_0_15px_rgba(251,191,36,0.2)]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className={`overflow-hidden border-muted bg-card group hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] ${stat.glow}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.title}</CardTitle>
            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter text-white">{stat.value}</div>
            <div className="flex items-center mt-2">
              {stat.trend === "up" ? (
                <ArrowUpRight className="h-3 w-3 text-destructive mr-1 animate-bounce" />
              ) : stat.trend === "down" ? (
                <ArrowDownRight className="h-3 w-3 text-emerald-400 mr-1 animate-bounce" />
              ) : (
                <Clock className="h-3 w-3 text-muted-foreground mr-1" />
              )}
              <p className={`text-xs font-bold ${
                stat.trend === "up" ? "text-destructive" : stat.trend === "down" ? "text-emerald-400" : "text-muted-foreground"
              }`}>
                {stat.change}
              </p>
            </div>
          </CardContent>
          <div className={`h-1.5 w-full bg-muted overflow-hidden`}>
             <div 
               className={`h-full transition-all duration-1000 group-hover:w-full ${
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
