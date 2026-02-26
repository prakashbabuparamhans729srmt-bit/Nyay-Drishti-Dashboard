"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, Info, Bell, CheckCircle2 } from "lucide-react";

export function AlertsAndNotifications() {
  const alerts = [
    {
      type: "critical",
      message: "इलाहाबाद उच्च न्यायालय में 8.9 लाख मामले लंबित, 40 पद रिक्त",
      icon: AlertCircle,
      color: "text-destructive bg-destructive/5 border-destructive/20",
    },
    {
      type: "warning",
      message: "5 उच्च न्यायालयों में निस्तारण दर 80% से कम दर्ज",
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-400/5 border-amber-400/20",
    },
    {
      type: "success",
      message: "सुप्रीम कोर्ट ने 95% निस्तारण दर से नया रिकॉर्ड बनाया",
      icon: CheckCircle2,
      color: "text-primary bg-primary/5 border-primary/20",
    },
    {
      type: "info",
      message: "15 नए न्यायाधीशों की नियुक्ति को मंजूरी, अगले सप्ताह शपथ",
      icon: Info,
      color: "text-blue-400 bg-blue-400/5 border-blue-400/20",
    },
  ];

  return (
    <Card className="border-muted shadow-2xl overflow-hidden bg-card group">
      <CardHeader className="bg-secondary/50 border-b border-muted">
        <CardTitle className="text-lg flex items-center gap-2 text-primary">
          <Bell className="h-5 w-5 animate-bounce group-hover:scale-110 transition-transform" />
          लाइव अलर्ट एवं सूचनाएं
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {alerts.map((alert, idx) => (
          <div 
            key={idx} 
            className={`flex items-start gap-4 p-4 rounded-xl border ${alert.color} transition-all duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer group/alert`}
          >
            <div className="p-2 rounded-full bg-background/50 border border-current/10">
               <alert.icon className={`h-5 w-5 shrink-0 transition-transform duration-500 group-hover/alert:rotate-12`} />
            </div>
            <p className="text-sm font-bold leading-tight pt-1">{alert.message}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
