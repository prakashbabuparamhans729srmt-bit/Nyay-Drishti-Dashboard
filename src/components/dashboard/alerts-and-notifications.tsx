
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, Info, Bell, CheckCircle2, Loader2 } from "lucide-react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";

export function AlertsAndNotifications() {
  const db = useFirestore();

  const alertsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "alerts"), orderBy("generatedDate", "desc"), limit(4));
  }, [db]);

  const { data: alertsData, isLoading } = useCollection(alertsQuery);

  const getAlertStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'critical': return { icon: AlertCircle, color: "text-destructive bg-destructive/5 border-destructive/20" };
      case 'warning': return { icon: AlertTriangle, color: "text-amber-400 bg-amber-400/5 border-amber-400/20" };
      case 'success': return { icon: CheckCircle2, color: "text-primary bg-primary/5 border-primary/20" };
      default: return { icon: Info, color: "text-blue-400 bg-blue-400/5 border-blue-400/20" };
    }
  };

  return (
    <Card className="border-muted shadow-2xl overflow-hidden bg-card group">
      <CardHeader className="bg-secondary/50 border-b border-muted">
        <CardTitle className="text-lg flex items-center gap-2 text-primary">
          <Bell className="h-5 w-5 animate-bounce group-hover:scale-110 transition-transform" />
          लाइव अलर्ट एवं सूचनाएं
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {isLoading ? (
          <div className="p-10 flex flex-col items-center justify-center space-y-2">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="text-[9px] font-black uppercase tracking-widest text-primary/40">Monitoring Uplink...</span>
          </div>
        ) : (
          alertsData?.map((alert) => {
            const style = getAlertStyle(alert.type);
            const Icon = style.icon;
            return (
              <div 
                key={alert.id} 
                className={`flex items-start gap-4 p-4 rounded-xl border ${style.color} transition-all duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer group/alert`}
              >
                <div className="p-2 rounded-full bg-background/50 border border-current/10">
                   <Icon className={`h-5 w-5 shrink-0 transition-transform duration-500 group-hover/alert:rotate-12`} />
                </div>
                <p className="text-sm font-bold leading-tight pt-1">{alert.message}</p>
              </div>
            );
          })
        )}
        {(!alertsData || alertsData.length === 0) && !isLoading && (
          <div className="text-center py-8 text-muted-foreground font-black uppercase tracking-widest opacity-50 text-[10px]">
            Signal Clear: No Active Alerts
          </div>
        )}
      </CardContent>
    </Card>
  );
}
