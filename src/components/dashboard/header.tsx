
"use client";

import { Scale, Home, LayoutGrid, Users, FileText, Settings, Search, Bell, User, Languages, Mic, MicOff, Sun, Moon, Laptop, ArrowRight, Sparkles, Command, Cpu, Zap, Activity, Network, Radio, Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { languages } from "@/lib/translations";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('nyay-theme') as 'light' | 'dark' | 'system';
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const applyTheme = (mode: 'light' | 'dark' | 'system') => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(mode);
    }
  };

  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    setTheme(mode);
    localStorage.setItem('nyay-theme', mode);
    applyTheme(mode);
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({ title: t('micError'), variant: "destructive" });
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      handleGlobalSearch(transcript);
    };
    recognition.start();
  };

  const handleGlobalSearch = (query: string) => {
    if (!query.trim()) return;
    setSearchOpen(true);
    setIsSearching(true);
    setSearchResults(null);

    setTimeout(() => {
      setSearchResults({
        courts: [
          { name: "इलाहाबाद उच्च न्यायालय", status: "सक्रिय (Active)", path: "/courts" },
          { name: "सुप्रीम कोर्ट", status: "लाइव (Live)", path: "/courts" }
        ],
        judges: [
          { name: "न्यायमूर्ति एस.के. शर्मा", court: "सुप्रीम कोर्ट", path: "/judges" },
          { name: "न्यायमूर्ति डी.वाई. चंद्रचूड़", court: "मुख्य न्यायाधीश", path: "/judges" }
        ],
        cases: [
          { id: "SC-2024-442", title: "राम बनाम उत्तर प्रदेश राज्य", path: "/cases" },
          { id: "HC-2024-101", title: "जनहित याचिका - डिजिटल शिक्षा", path: "/cases" }
        ]
      });
      setIsSearching(false);
    }, 1500);
  };

  const navItems = [
    { label: t('home'), icon: Home, path: '/' },
    { label: t('courts'), icon: LayoutGrid, path: '/courts' },
    { label: t('judges'), icon: Users, path: '/judges' },
    { label: t('cases'), icon: FileText, path: '/cases' },
    { label: t('reports'), icon: Zap, path: '/reports' },
    { label: t('settings'), icon: Settings, path: '/settings' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/90 backdrop-blur-3xl text-foreground shadow-[0_15px_60px_rgba(0,0,0,0.95)]">
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between gap-8">
          <div className="flex items-center gap-8 group cursor-pointer" onClick={() => router.push('/')}>
            <div className="bg-primary/20 p-5 rounded-[2rem] transition-all duration-1000 group-hover:bg-primary group-hover:rotate-[360deg] group-hover:shadow-[0_0_60px_rgba(7,241,214,0.9)] border-2 border-primary/30 relative overflow-hidden">
              <Scale className="h-10 w-10 text-primary group-hover:text-black transition-colors relative z-10" />
              <div className="absolute inset-0 bg-primary/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <div className="scan-line opacity-0 group-hover:opacity-60" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <h1 className="text-4xl font-black tracking-tighter hidden lg:block text-primary text-neon uppercase italic">
                  {t('dashboardTitle')}
                </h1>
                <Badge variant="outline" className="hidden lg:flex border-primary/60 text-[10px] font-black text-primary px-4 py-1.5 bg-primary/10 h-fit animate-pulse shadow-[0_0_15px_rgba(7,241,214,0.4)] uppercase tracking-[0.2em]">A TO Z ACTIVE</Badge>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                 <span className="text-[11px] uppercase font-black tracking-[0.6em] text-muted-foreground hidden lg:block opacity-70">Neural Command Center (Node: 01)</span>
                 <div className="flex items-center gap-2">
                   <Radio className="h-3 w-3 text-primary animate-ping" />
                   <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(7,241,214,1)]" />
                 </div>
              </div>
            </div>
          </div>

          <nav className="hidden xl:flex items-center h-full">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-4 h-24 rounded-none px-10 font-black transition-all duration-700 hover:bg-white/[0.08] group relative overflow-hidden ${
                  pathname === item.path ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-white"
                }`}
              >
                <item.icon className={`h-7 w-7 transition-all duration-700 group-hover:scale-150 group-hover:rotate-12 ${pathname === item.path ? 'animate-pulse scale-125 text-primary' : ''}`} />
                <span className="uppercase tracking-[0.3em] text-[12px] font-black">{item.label}</span>
                {pathname === item.path && (
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-primary shadow-[0_0_50px_rgba(7,241,214,1)] nav-active-bar" />
                )}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="scan-line opacity-0 group-hover:opacity-30" />
              </Button>
            ))}
          </nav>

          <div className="flex-1 max-w-xl mx-8 hidden lg:block">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-3xl group-focus-within:bg-primary/40 transition-all rounded-full" />
              <Search className="absolute left-8 top-5 h-8 w-8 text-muted-foreground group-focus-within:text-primary group-focus-within:scale-125 transition-all mt-0.5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGlobalSearch(searchQuery)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-secondary/60 border-white/10 text-white placeholder:text-muted-foreground/50 focus-visible:ring-primary/60 pl-20 pr-20 rounded-[2rem] transition-all focus:bg-background h-20 hover:border-primary/50 shadow-inner text-2xl font-medium"
              />
              <div className="absolute right-6 top-5 flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={startVoiceSearch}
                  className={`h-10 w-10 rounded-2xl transition-all ${isListening ? 'bg-destructive/40 text-destructive animate-pulse shadow-[0_0_20px_rgba(247,31,38,0.6)]' : 'text-muted-foreground hover:text-primary bg-white/5 hover:bg-white/10'}`}
                >
                  {isListening ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                </Button>
                <div className="hidden sm:flex items-center gap-3 text-[12px] font-black text-muted-foreground/80 border-2 border-white/10 px-4 rounded-[1.2rem] bg-secondary/90 shadow-xl">
                  <Command className="h-4 w-4" /> K
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-secondary/50 px-5 py-2.5 rounded-2xl border border-white/5 hidden sm:flex">
               <div className="flex flex-col items-end">
                 <span className="text-[9px] font-black uppercase text-primary tracking-widest">Neural Peak</span>
                 <span className="text-[8px] font-bold text-white/40">Firebase Synced</span>
               </div>
               <Activity className="h-5 w-5 text-primary animate-pulse" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-14 w-14 hover:bg-primary/20 rounded-2xl transition-all group border border-transparent hover:border-primary/40 relative z-10">
                  {theme === 'light' ? <Sun className="h-7 w-7 text-amber-400" /> : theme === 'dark' ? <Moon className="h-7 w-7 text-primary" /> : <Laptop className="h-7 w-7 text-muted-foreground" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card/95 border-primary/50 rounded-[2rem] p-4 shadow-2xl backdrop-blur-3xl border-2">
                <DropdownMenuLabel className="text-primary font-black uppercase text-[10px] tracking-widest px-4 py-3">{t('themeMode')}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={() => handleThemeChange('light')} className="rounded-xl px-4 py-3 cursor-pointer hover:bg-primary/20">{t('light')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="rounded-xl px-4 py-3 cursor-pointer hover:bg-primary/20">{t('dark')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('system')} className="rounded-xl px-4 py-3 cursor-pointer hover:bg-primary/20">{t('system')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-14 w-14 hover:bg-primary/20 rounded-2xl group border border-transparent hover:border-primary/40 relative z-10">
                  <Languages className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-all" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[350px] bg-card/95 border-primary/50 shadow-2xl rounded-[3rem] p-4 backdrop-blur-3xl border-2">
                <DropdownMenuLabel className="text-primary font-black px-6 py-6 flex flex-col gap-2">
                  <span className="text-lg uppercase tracking-widest italic">Neural Dictionary (A-Z)</span>
                  <span className="text-[10px] opacity-60">Language Selection Unit</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <ScrollArea className="h-[400px]">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`rounded-[1.5rem] px-6 py-4 cursor-pointer mb-2 flex justify-between items-center transition-all ${
                        language === lang.code ? "bg-primary text-black font-black" : "hover:bg-primary/10"
                      }`}
                    >
                      <span className="font-bold text-lg">{lang.native}</span>
                      <span className="text-[10px] opacity-50">{lang.label}</span>
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="h-16 w-16 relative hover:bg-primary/20 rounded-[1.8rem] group border-2 border-white/10 transition-all shadow-3xl bg-secondary/60 backdrop-blur-3xl">
              <Bell className="h-8 w-8 text-muted-foreground group-hover:text-primary group-hover:rotate-[20deg] transition-all" />
              <span className="absolute top-5 right-5 flex h-4 w-4 rounded-full bg-destructive animate-ping" />
              <span className="absolute top-5 right-5 flex h-4 w-4 rounded-full bg-destructive shadow-[0_0_20px_rgba(247,31,38,1)] border-2 border-black" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-16 px-6 flex items-center gap-5 hover:bg-primary/25 rounded-[1.8rem] group border-2 border-white/10 transition-all shadow-3xl bg-secondary/60 backdrop-blur-3xl relative overflow-hidden">
                  <div className="h-11 w-11 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/40 group-hover:bg-primary transition-all relative overflow-hidden shadow-inner">
                    <User className="h-7 w-7 text-primary group-hover:text-black relative z-10" />
                  </div>
                  <span className="text-sm font-black text-white hidden sm:block uppercase tracking-[0.4em]">{t('adminAccount')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[350px] bg-card/95 border-primary/50 shadow-2xl rounded-[3rem] p-6 backdrop-blur-3xl border-2">
                <DropdownMenuLabel className="text-primary font-black px-6 py-6 text-[12px] uppercase tracking-widest italic">User Controller</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-[2rem] px-6 py-6 focus:bg-primary/15 cursor-pointer flex items-center gap-5">
                  <User className="h-6 w-6" /> {t('profile')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-[2rem] px-6 py-6 focus:bg-primary/15 cursor-pointer flex items-center gap-5">
                  <Settings className="h-6 w-6" /> {t('systemSettings')}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-destructive font-black rounded-[2rem] px-6 py-6 focus:bg-destructive/15 cursor-pointer mt-4 text-center justify-center uppercase tracking-widest" onClick={() => {
                  localStorage.removeItem("nyay-guest-mode");
                  router.push('/login');
                }}>
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-3xl border-primary/50 text-white rounded-[4rem] shadow-2xl p-12 overflow-hidden border-2">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-6 text-4xl font-black text-primary tracking-tighter italic">
              <Search className="h-10 w-10 text-primary" />
              ग्लोबल सर्च क्रॉलिंग यूनिट (A-Z)
            </DialogTitle>
          </DialogHeader>
          <div className="py-10">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-10">
                <Loader2 className="h-24 w-24 text-primary animate-spin opacity-40" />
                <p className="font-black animate-pulse text-primary tracking-[0.5em] uppercase">Neural Nodes Scanning...</p>
              </div>
            ) : searchResults ? (
              <ScrollArea className="h-[500px] pr-6">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-3">
                      <LayoutGrid className="h-5 w-5 text-primary" /> न्यायालय यूनिट
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.courts.map((c: any, i: number) => (
                        <div key={i} className="bg-secondary/40 p-6 rounded-[2rem] border-2 border-white/5 hover:border-primary/60 cursor-pointer transition-all flex justify-between items-center group" onClick={() => {setSearchOpen(false); router.push(c.path)}}>
                           <span className="font-bold text-xl group-hover:text-primary transition-colors">{c.name}</span>
                           <Badge variant="outline" className="border-primary/40 text-primary">{c.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-400" /> न्यायाधीश रिकॉर्ड्स
                    </h4>
                    {searchResults.judges.map((j: any, i: number) => (
                      <div key={i} className="bg-secondary/40 p-6 rounded-[2rem] border-2 border-white/5 hover:border-primary/80 cursor-pointer transition-all flex justify-between items-center group" onClick={() => {setSearchOpen(false); router.push(j.path)}}>
                         <div className="flex flex-col">
                           <span className="font-bold text-xl group-hover:text-primary transition-colors">{j.name}</span>
                           <span className="text-[10px] uppercase opacity-50">{j.court}</span>
                         </div>
                         <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-24 text-muted-foreground font-black uppercase tracking-widest opacity-50">A to Z Sync: Searching...</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
