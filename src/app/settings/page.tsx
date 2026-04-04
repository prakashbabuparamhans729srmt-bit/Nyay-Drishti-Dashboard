
"use client";

import { Header } from "@/components/dashboard/header";
import { Settings, User, Languages, Sun, Moon, Laptop, Shield, Bell, ArrowLeft, Check, Cpu, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { languages } from "@/lib/translations";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('nyay-theme') as 'light' | 'dark' | 'system';
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    setTheme(mode);
    localStorage.setItem('nyay-theme', mode);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(mode);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden atoz-active-flow data-stream-animation">
      <div className="neural-wire" />
      <div className="neural-background-mesh" />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8 max-w-6xl relative z-10">
        <div className="scan-line opacity-5" />
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-primary/10">
            <ArrowLeft className="h-6 w-6 text-primary" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary animate-spin-slow" />
              {t('settings')}
            </h1>
            <span className="text-[10px] text-primary/60 font-black uppercase tracking-[0.5em] ml-11">A to Z Node: System Mainframe Controller</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
            <Card className="bg-card/40 backdrop-blur-xl border-primary/20 p-10 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <div className="w-32 h-32 bg-primary/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 border-2 border-primary/50 group-hover:rotate-[360deg] transition-all duration-1000 shadow-[0_0_30px_rgba(7,241,214,0.3)]">
                <User className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-1">प्रशासक यूजर</h3>
              <p className="text-sm text-muted-foreground mb-8 font-bold">admin@nyaydrishti.gov.in</p>
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full rounded-2xl border-primary/30 text-primary h-12 font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-black">प्रोफ़ाइल संपादित करें</Button>
                <Badge variant="outline" className="mx-auto border-primary/40 text-primary uppercase text-[8px] font-black px-4 py-1.5 bg-primary/10">SECURE NODE: ACTIVE</Badge>
              </div>
            </Card>
            
            <nav className="space-y-3">
               {[
                 { label: "खाता प्रबन्धन", icon: User, color: "text-primary" },
                 { label: "सुरक्षा प्रोटोकॉल", icon: Shield, color: "text-blue-400" },
                 { label: "सिस्टम सूचनाएं", icon: Bell, color: "text-amber-400" },
                 { label: "सुलभता (AI Sync)", icon: Languages, color: "text-emerald-400" },
               ].map((item, i) => (
                 <Button key={i} variant="ghost" className="w-full justify-start gap-5 rounded-[1.5rem] h-16 font-black uppercase text-[11px] tracking-widest hover:bg-primary/10 hover:text-primary border border-transparent hover:border-white/5 transition-all group">
                    <div className={`p-3 rounded-xl bg-secondary group-hover:bg-primary/20 transition-colors ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    {item.label}
                 </Button>
               ))}
            </nav>

            <Card className="bg-secondary/40 p-6 rounded-3xl border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                 <ShieldCheck className="h-5 w-5 text-primary" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Neural Protection v4.0</h4>
              </div>
              <div className="space-y-2">
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-primary w-full animate-glow-pule" />
                 </div>
                 <p className="text-[8px] text-muted-foreground uppercase tracking-widest font-black">All connections encrypted via NyayDrishti A-Z Gateway</p>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-12 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
             <Card className="bg-card/40 backdrop-blur-xl border-white/5 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
               <div className="scan-line opacity-10" />
               <h3 className="text-3xl font-black mb-10 flex items-center gap-4 text-primary italic uppercase tracking-tighter">
                 <Sun className="h-8 w-8 animate-pulse" /> {t('themeMode')} (SYSTEM SKIN)
               </h3>
               <div className="grid grid-cols-3 gap-6">
                 {[
                   { mode: 'light', label: t('light'), icon: Sun, color: 'text-amber-400' },
                   { mode: 'dark', label: t('dark'), icon: Moon, color: 'text-primary' },
                   { mode: 'system', label: t('system'), icon: Laptop, color: 'text-muted-foreground' },
                 ].map((item: any) => (
                   <button 
                     key={item.mode}
                     onClick={() => handleThemeChange(item.mode)}
                     className={`flex flex-col items-center gap-5 p-10 rounded-[2.5rem] border-2 transition-all relative overflow-hidden group/btn ${
                       theme === item.mode ? 'border-primary bg-primary/10 shadow-[0_0_40px_rgba(7,241,214,0.3)]' : 'border-white/5 bg-secondary/30 hover:border-white/20'
                     }`}
                   >
                     <div className="absolute top-0 left-0 w-full h-1 bg-primary opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                     <item.icon className={`h-14 w-14 ${item.color} group-hover/btn:scale-125 transition-transform duration-500`} />
                     <span className="font-black text-xs uppercase tracking-[0.3em]">{item.label}</span>
                     {theme === item.mode && (
                       <div className="mt-2 p-1.5 bg-primary rounded-full">
                         <Check className="h-4 w-4 text-black" />
                       </div>
                     )}
                   </button>
                 ))}
               </div>
             </Card>

             <Card className="bg-card/40 backdrop-blur-xl border-white/5 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden">
               <h3 className="text-3xl font-black mb-10 flex items-center gap-4 text-primary italic uppercase tracking-tighter">
                 <Languages className="h-8 w-8" /> भाषा चयन (20 भारतीय भाषाएँ)
               </h3>
               <ScrollArea className="h-[450px] pr-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all group ${
                          language === lang.code ? 'border-primary bg-primary/15 text-primary shadow-[0_10px_30px_rgba(7,241,214,0.2)]' : 'border-white/5 bg-secondary/20 hover:border-white/20 hover:bg-secondary/40'
                        }`}
                      >
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-black text-2xl tracking-tighter group-hover:translate-x-1 transition-transform">{lang.native}</span>
                          <span className="text-[10px] uppercase opacity-50 font-black tracking-widest">{lang.label}</span>
                        </div>
                        {language === lang.code && (
                           <div className="bg-primary p-2 rounded-full shadow-lg border-2 border-black/10">
                             <Check className="h-5 w-5 text-black" />
                           </div>
                        )}
                      </button>
                    ))}
                  </div>
               </ScrollArea>
               <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-primary/40" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Neural Dictionary v4.5 Active</span>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30 uppercase text-[9px] font-black px-4 py-1.5">A to Z Sync: Enabled</Badge>
               </div>
             </Card>

             <Card className="bg-card/40 backdrop-blur-xl border-white/5 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
               <div className="flex items-center justify-between">
                 <div className="space-y-2">
                   <h3 className="text-2xl font-black flex items-center gap-3">
                     <Bell className="h-6 w-6 text-primary group-hover:animate-bounce" /> पुश सूचनाएं (LIVE)
                   </h3>
                   <p className="text-sm text-muted-foreground leading-relaxed max-w-md">महत्वपूर्ण अदालती अलर्ट और रीयल-टाइम डेटा सिंक के लिए डेस्कटॉप नोटिफिकेशन चालू करें।</p>
                 </div>
                 <div className="flex flex-col items-center gap-4">
                   <Switch className="data-[state=checked]:bg-primary scale-150" defaultChecked />
                   <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">Flow: Activated</span>
                 </div>
               </div>
             </Card>
          </div>
        </div>

        <footer className="pt-12 text-center opacity-20">
           <div className="flex items-center justify-center gap-6">
             <div className="h-px w-20 bg-primary/20" />
             <Sparkles className="h-4 w-4 text-primary" />
             <span className="text-[10px] font-black uppercase tracking-[1em]">A to Z Neural Framework Control</span>
             <Sparkles className="h-4 w-4 text-primary" />
             <div className="h-px w-20 bg-primary/20" />
           </div>
        </footer>
      </main>
    </div>
  );
}
