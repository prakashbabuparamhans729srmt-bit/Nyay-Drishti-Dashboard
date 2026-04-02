"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Users, Search, Download, LayoutDashboard, FilePlus, ArrowRight, Database, ShieldCheck, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";
import { useRouter } from "next/navigation";
import { useUser } from "@/firebase";

export function QuickActions() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const router = useRouter();
  const { user } = useUser();

  const actions = [
    { label: t('cases'), icon: FilePlus, primary: true, desc: "E-Filing Portal", path: "/cases", color: "bg-primary" },
    { label: t('judges'), icon: Users, desc: "Service Records", path: "/judges", color: "bg-blue-400" },
    { label: t('reports'), icon: Download, desc: "Digital Archive", path: "/reports", color: "bg-emerald-400" },
    { label: t('courts'), icon: LayoutDashboard, desc: "Regional Nodes", path: "/courts", color: "bg-amber-400" },
    { label: t('settings'), icon: ShieldCheck, desc: "System Access", path: "/settings", color: "bg-purple-400" },
  ];

  const handleAction = (action: any) => {
    if (!user) {
      const isGuest = localStorage.getItem("nyay-guest-mode") === "true";
      if (isGuest) {
        toast({ 
          title: "लॉगिन आवश्यक (Login Required)", 
          description: "पूर्ण सुलभता के लिए कृपया अपना खाता लॉगिन करें।",
          variant: "destructive",
          className: "bg-destructive border-none text-white font-black rounded-3xl shadow-[0_0_30px_rgba(247,31,38,0.3)]"
        });
        setTimeout(() => router.push('/login'), 2000);
        return;
      }
    }
    router.push(action.path);
  };

  return (
    <div className="space-y-10 py-6">
      <div className="flex items-center justify-between px-4">
        <div className="space-y-2">
           <h3 className="text-4xl font-black flex items-center gap-4 text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            <PlusCircle className="h-10 w-10 text-primary animate-glow-pule" />
            {t('quickActionsTitle')}
          </h3>
          <p className="text-sm text-muted-foreground font-black pl-14 uppercase tracking-[0.4em] opacity-60">
            {t('digitalTools')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-xs font-black text-primary border-primary/40 bg-primary/5 px-6 py-2.5 rounded-full animate-pulse shadow-[0_0_20px_rgba(7,241,214,0.1)]">
            <Database className="h-4 w-4 mr-2" /> {t('activeSystem')}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {actions.map((action, idx) => (
          <Button
            key={action.label}
            variant="ghost"
            className={`group relative h-auto py-12 flex flex-col gap-8 rounded-[3rem] border-2 transition-all duration-700 overflow-hidden ${
              action.primary 
                ? "bg-primary border-primary hover:bg-primary/90 hover:scale-[1.08] hover:-translate-y-4 shadow-[0_30px_60px_rgba(7,241,214,0.4)]" 
                : "bg-card/40 border-white/5 hover:border-primary/60 hover:bg-primary/5 hover:-translate-y-4 shadow-2xl"
            }`}
            onClick={() => handleAction(action)}
          >
            {/* Holographic background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className={`relative p-6 rounded-[2rem] transition-all duration-1000 shadow-xl ${
              action.primary ? 'bg-black/20' : 'bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:scale-110'
            }`}>
              <action.icon className={`h-12 w-12 transition-all duration-1000 ${
                action.primary 
                  ? 'text-black group-hover:rotate-[360deg]' 
                  : 'text-primary group-hover:text-black group-hover:rotate-[360deg]'
              }`} />
              <div className="absolute -top-1 -right-1">
                <Sparkles className={`h-4 w-4 animate-pulse ${action.primary ? 'text-white' : 'text-primary'}`} />
              </div>
            </div>

            <div className="space-y-3 text-center relative z-10">
              <span className={`text-xl font-black uppercase tracking-tighter block group-hover:scale-110 transition-transform ${
                action.primary ? 'text-black' : 'text-white group-hover:text-primary'
              }`}>
                {action.label}
              </span>
              <span className={`text-[10px] uppercase font-black tracking-[0.3em] opacity-40 block ${
                action.primary ? 'text-black/70' : 'text-muted-foreground group-hover:text-primary/70'
              }`}>
                {action.desc}
              </span>
            </div>

            <div className={`absolute bottom-8 right-8 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-700 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 ${
              action.primary ? 'bg-black/20 text-black' : 'bg-primary/20 text-primary'
            }`}>
              <ArrowRight className="h-5 w-5" />
            </div>
            
            {/* Digital scan line effect */}
            <div className="scan-line opacity-0 group-hover:opacity-10" />
          </Button>
        ))}
      </div>
    </div>
  );
}
