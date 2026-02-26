"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, Info, Bell, CheckCircle2 } from "lucide-react";

export function AlertsAndNotifications() {
  const alerts = [
    {
      type: "critical",
      message: "इलाहाबाद उच्च न्यायालय में 8.9 लाख मामले लंबित, 40 पद रिक्त",
      icon: AlertCircle,
      color: "text-destructive bg-destructive/10 border-destructive/20",
    },
    {
      type: "warning",
      message: "5 उच्च न्यायालयों में निस्तारण दर 80% से कम",
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      type: "success",
      message: "सुप्रीम कोर्ट ने 95% निस्तारण दर से नया रिकॉर्ड बनाया",
      icon: CheckCircle2,
      color: "text-green-600 bg-green-50 border-green-200",
    },
    {
      type: "info",
      message: "15 नए न्यायाधीशों की नियुक्ति को मंजूरी, अगले सप्ताह शपथ",
      icon: Info,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
  ];

  return (
    <Card className="border-none shadow-md overflow-hidden bg-white">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          अलर्ट एवं सूचनाएं
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {alerts.map((alert, idx) => (
          <div 
            key={idx} 
            className={`flex items-start gap-3 p-3 rounded-lg border ${alert.color} transition-transform hover:scale-[1.02] cursor-default`}
          >
            <alert.icon className="h-5 w-5 mt-0.5 shrink-0" />
            <p className="text-sm font-medium leading-tight">{alert.message}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
