"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, FileText, Scale, CheckCircle, Clock } from "lucide-react";

export function StatsOverview() {
  const stats = [
    {
      title: "कुल लंबित मामले",
      value: "4.5 Cr",
      change: "+5% पिछले वर्ष से",
      trend: "up",
      icon: FileText,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "इस वर्ष नए मामले",
      value: "68,342",
      change: "-2% पिछले वर्ष से",
      trend: "down",
      icon: Scale,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      title: "इस वर्ष निस्तारित",
      value: "42,891",
      change: "+8% पिछले वर्ष से",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "औसत प्रतीक्षा अवधि",
      value: "3.2 वर्ष",
      change: "सिस्टम दक्षता सूचकांक",
      trend: "neutral",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
            <div className="flex items-center mt-2">
              {stat.trend === "up" ? (
                <ArrowUpRight className="h-3 w-3 text-destructive mr-1" />
              ) : stat.trend === "down" ? (
                <ArrowDownRight className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <Clock className="h-3 w-3 text-muted-foreground mr-1" />
              )}
              <p className={`text-xs font-semibold ${
                stat.trend === "up" ? "text-destructive" : stat.trend === "down" ? "text-green-600" : "text-muted-foreground"
              }`}>
                {stat.change}
              </p>
            </div>
          </CardContent>
          <div className={`h-1 w-full ${stat.trend === "up" ? 'bg-destructive/20' : stat.trend === 'down' ? 'bg-green-600/20' : 'bg-muted'}`} />
        </Card>
      ))}
    </div>
  );
}
