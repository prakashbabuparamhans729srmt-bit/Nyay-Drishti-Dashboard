
"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Users, Download, LayoutDashboard, FilePlus, ArrowRight, Database, ShieldCheck, Sparkles } from "lucide-react";
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
    { label: t('cases'), icon: FilePlus, primary: true, desc: "A to Z Case Portal", path: "/cases", color: "bg-primary" },
    { label: t('judges'), icon: Users, desc: "Neural Profile Archive", path: "/judges", color: "bg-blue-400" },
    { label: t('reports'), icon: Download, desc: "Analytical Core Scan", path: "/reports", color: "bg-emerald-400" },
    { label: t('courts'), icon: LayoutDashboard, desc: "Regional Node Live", path: "/courts", color: "bg-amber-400" },
    { label: t('settings'), icon: ShieldCheck, desc: "Mainframe Logic Unit", path: "/settings", color: "bg-purple-400" },
  ];

  const handleAction = (action: any) => {
    const isGuest = localStorage.getItem("nyay-guest-mode") === "true";
    if (!user && isGuest && (action.path === "/settings" || action.path === "/cases")) {
      toast({ 
        title: "प्रमाणीकरण आवश्यक (Auth Required)", 
        description: "इस सुरक्षित नोड तक पहुँचने के लिए कृपया लॉगिन करें।",
        variant: "destructive",
        className: "bg-destructive border-none text-white font-black rounded-[2.5rem] shadow-[0_0_50px_rgba(247,31,38,0.5)] p-8"
      });
      return;
    }
    router.push(action.path);
  };

  return (
    <div className="space-y-12 py-10">
      <div className="flex items-center justify-between px-6">
        <div className="space-y-3">
           <h3 className="text-5xl font-black flex items-center gap-6 text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <PlusCircle className="h-12 w-12 text-primary animate-glow-pule" />
            {t('quickActionsTitle')} (A-Z)
          </h3>
          <p className="text-sm text-muted-foreground font-black pl-16 uppercase tracking-[0.5em] opacity-60">
            {t('digitalTools')} - A to Z Active System Flow
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Badge variant="outline" className="text-sm font-black text-primary border-primary/40 bg-primary/10 px-8 py-3.5 rounded-full animate-pulse shadow-[0_0_30px_rgba(7,241,214,0.2)] border-2">
            <Database className="h-5 w-5 mr-3" /> A to Z SYSTEM - ACTIVE
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 px-2">
        {actions.map((action, idx) => (
          <Button
            key={action.label}
            variant="ghost"
            className={`group relative h-auto py-14 flex flex-col gap-10 rounded-[4rem] border-2 transition-all duration-700 overflow-hidden shadow-2xl ${
              action.primary 
                ? "bg-primary border-primary hover:bg-primary/90 hover:scale-[1.1] hover:-translate-y-6 shadow-[0_40px_80px_rgba(7,241,214,0.5)]" 
                : "bg-card/40 border-white/5 hover:border-primary/60 hover:bg-primary/10 hover:-translate-y-6"
            }`}
            onClick={() => handleAction(action)}
          >
            {/* Holographic background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className={`relative p-8 rounded-[2.5rem] transition-all duration-1000 shadow-2xl ${
              action.primary ? 'bg-black/30' : 'bg-primary/10 border border-primary/30 group-hover:bg-primary group-hover:scale-125'
            }`}>
              <action.icon className={`h-16 w-16 transition-all duration-1000 ${
                action.primary 
                  ? 'text-black group-hover:rotate-[360deg] group-hover:scale-110' 
                  : 'text-primary group-hover:text-black group-hover:rotate-[360deg]'
              }`} />
              <div className="absolute -top-2 -right-2">
                <Sparkles className={`h-6 w-6 animate-pulse ${action.primary ? 'text-white' : 'text-primary'}`} />
              </div>
            </div>

            <div className="space-y-4 text-center relative z-10">
              <span className={`text-2xl font-black uppercase tracking-tighter block group-hover:scale-110 transition-transform ${
                action.primary ? 'text-black' : 'text-white group-hover:text-primary'
              }`}>
                {action.label}
              </span>
              <span className={`text-[10px] uppercase font-black tracking-[0.4em] opacity-50 block ${
                action.primary ? 'text-black/80' : 'text-muted-foreground group-hover:text-primary/80'
              }`}>
                {action.desc}
              </span>
            </div>

            <div className={`absolute bottom-10 right-10 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-700 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 ${
              action.primary ? 'bg-black/20 text-black border border-black/20' : 'bg-primary/30 text-primary border border-primary/40'
            }`}>
              <ArrowRight className="h-6 w-6" />
            </div>
            
            {/* Digital scan line effect */}
            <div className="scan-line opacity-0 group-hover:opacity-20" />
          </Button>
        ))}
      </div>
    </div>
  );
}
