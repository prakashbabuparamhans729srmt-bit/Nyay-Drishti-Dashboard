
"use client";

import { Header } from "@/components/dashboard/header";
import { Settings, User, Languages, Sun, Moon, Laptop, Shield, Bell, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { languages } from "@/lib/translations";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8 max-w-5xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-primary/10">
            <ArrowLeft className="h-6 w-6 text-primary" />
          </Button>
          <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            {t('settings')}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Card className="bg-card/50 border-primary/20 p-6 rounded-[2rem] text-center">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/50">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-black">प्रशासक यूजर</h3>
              <p className="text-sm text-muted-foreground mb-4">admin@nyaydrishti.gov.in</p>
              <Button variant="outline" className="w-full rounded-full border-primary/20 text-primary">प्रोफ़ाइल संपादित करें</Button>
            </Card>
            
            <nav className="space-y-2">
               {[
                 { label: "खाता", icon: User },
                 { label: "सुरक्षा", icon: Shield },
                 { label: "सूचनाएं", icon: Bell },
                 { label: "सुलभता", icon: Languages },
               ].map((item, i) => (
                 <Button key={i} variant="ghost" className="w-full justify-start gap-3 rounded-2xl h-14 font-bold hover:bg-primary/10 hover:text-primary">
                    <item.icon className="h-5 w-5" /> {item.label}
                 </Button>
               ))}
            </nav>
          </div>

          <div className="md:col-span-2 space-y-8">
             <Card className="bg-card border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
               <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-primary">
                 <Sun className="h-6 w-6" /> {t('themeMode')}
               </h3>
               <div className="grid grid-cols-3 gap-4">
                 {[
                   { mode: 'light', label: t('light'), icon: Sun, color: 'text-amber-400' },
                   { mode: 'dark', label: t('dark'), icon: Moon, color: 'text-primary' },
                   { mode: 'system', label: t('system'), icon: Laptop, color: 'text-muted-foreground' },
                 ].map((item: any) => (
                   <button 
                     key={item.mode}
                     onClick={() => handleThemeChange(item.mode)}
                     className={`flex flex-col items-center gap-4 p-6 rounded-3xl border-2 transition-all ${
                       theme === item.mode ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(7,241,214,0.2)]' : 'border-white/5 bg-secondary/30 hover:border-white/20'
                     }`}
                   >
                     <item.icon className={`h-10 w-10 ${item.color}`} />
                     <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
                     {theme === item.mode && <Check className="h-4 w-4 text-primary" />}
                   </button>
                 ))}
               </div>
             </Card>

             <Card className="bg-card border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
               <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-primary">
                 <Languages className="h-6 w-6" /> भाषा चयन (20 भारतीय भाषाएँ)
               </h3>
               <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-2 gap-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          language === lang.code ? 'border-primary bg-primary/10 text-primary' : 'border-white/5 bg-secondary/20 hover:border-white/20'
                        }`}
                      >
                        <span className="font-bold">{lang.native}</span>
                        <span className="text-[10px] uppercase opacity-50 font-black">{lang.label}</span>
                      </button>
                    ))}
                  </div>
               </ScrollArea>
             </Card>

             <Card className="bg-card border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
               <div className="flex items-center justify-between">
                 <div className="space-y-1">
                   <h3 className="text-xl font-black">पुश सूचनाएं</h3>
                   <p className="text-sm text-muted-foreground">महत्वपूर्ण अदालती अलर्ट के लिए डेस्कटॉप नोटिफिकेशन चालू करें।</p>
                 </div>
                 <Switch className="data-[state=checked]:bg-primary" defaultChecked />
               </div>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
