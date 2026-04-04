
"use client";

import { Scale, Home, LayoutGrid, Users, FileText, Settings, Search, Bell, User, Languages, Mic, MicOff, Sun, Moon, Laptop, ArrowRight, Sparkles, Command, Cpu, Zap, Activity, Network } from "lucide-react";
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
    
    // Global Keyboard Shortcut for A to Z Search (Cmd+K)
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

    // Advanced Global Crawling Unit - A to Z Neural Search simulated
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
                <Badge variant="outline" className="hidden lg:flex border-primary/60 text-[10px] font-black text-primary px-4 py-1.5 bg-primary/10 h-fit animate-pulse shadow-[0_0_15px_rgba(7,241,214,0.4)] uppercase tracking-[0.2em]">A to Z ACTIVE</Badge>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                 <span className="text-[11px] uppercase font-black tracking-[0.6em] text-muted-foreground hidden lg:block opacity-70">Neural Command Center (Node: 01)</span>
                 <div className="flex items-center gap-2">
                   <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                   <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(7,241,214,1)]" />
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
            <div className="flex items-center gap-4 bg-secondary/60 p-3 rounded-[1.8rem] border-2 border-white/10 shadow-inner backdrop-blur-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 neural-shimmer" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-14 w-14 hover:bg-primary/20 rounded-2xl transition-all group border border-transparent hover:border-primary/40 relative z-10">
                    {theme === 'light' ? <Sun className="h-7 w-7 text-amber-400 group-hover:rotate-90 transition-transform" /> : theme === 'dark' ? <Moon className="h-7 w-7 text-primary group-hover:-rotate-45 transition-transform" /> : <Laptop className="h-7 w-7 text-muted-foreground" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card/95 border-primary/50 rounded-[3rem] p-6 shadow-[0_0_80px_rgba(0,0,0,0.9)] backdrop-blur-3xl overflow-hidden border-2">
                   <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
                  <DropdownMenuLabel className="text-primary font-black px-6 py-5 text-[11px] uppercase tracking-[0.5em] flex items-center gap-4">
                    <Sparkles className="h-5 w-5" /> {t('themeMode')} (A-Z Sync)
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={() => handleThemeChange('light')} className="rounded-2xl px-8 py-5 cursor-pointer focus:bg-primary/30 flex gap-6 items-center font-black uppercase text-[12px] tracking-[0.3em] group">
                    <Sun className="h-6 w-6 text-amber-400 group-hover:rotate-90 transition-transform" /> {t('light')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="rounded-2xl px-8 py-5 cursor-pointer focus:bg-primary/30 flex gap-6 items-center font-black uppercase text-[12px] tracking-[0.3em] group">
                    <Moon className="h-6 w-6 text-primary group-hover:-rotate-12 transition-transform" /> {t('dark')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeChange('system')} className="rounded-2xl px-8 py-5 cursor-pointer focus:bg-primary/30 flex gap-6 items-center font-black uppercase text-[12px] tracking-[0.3em] group">
                    <Laptop className="h-6 w-6 text-muted-foreground group-hover:scale-110 transition-transform" /> {t('system')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-14 w-14 hover:bg-primary/20 rounded-2xl group border border-transparent hover:border-primary/40 transition-all relative z-10">
                    <Languages className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-all group-hover:scale-125" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[450px] bg-card/95 border-primary/50 shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-[4rem] p-6 backdrop-blur-[50px] overflow-hidden border-2">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
                  <DropdownMenuLabel className="text-primary font-black px-8 py-10 flex flex-col gap-3">
                    <span className="text-xl uppercase tracking-[0.6em] italic text-neon">Neural Dictionary (A-Z)</span>
                    <span className="text-[12px] opacity-80 font-bold uppercase tracking-widest">भाषा चयन / Language Selection Unit</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <ScrollArea className="h-[600px] px-3 py-4">
                    <div className="grid grid-cols-1 gap-3">
                      {languages.map((lang) => (
                        <DropdownMenuItem
                          key={lang.code}
                          onClick={() => setLanguage(lang.code)}
                          className={`rounded-[2.5rem] px-8 py-6 cursor-pointer group flex justify-between items-center transition-all ${
                            language === lang.code 
                              ? "bg-primary text-black font-black shadow-[0_0_30px_rgba(7,241,214,0.6)] scale-[1.03] border-2 border-black/10" 
                              : "hover:bg-primary/15 focus:bg-primary/25 focus:text-primary border border-transparent hover:border-white/10"
                          }`}
                        >
                          <span className="font-black text-2xl tracking-tight">{lang.native}</span>
                          <span className={`text-[11px] uppercase tracking-[0.4em] font-black ${language === lang.code ? 'text-black/70' : 'opacity-50 group-hover:opacity-100'}`}>
                            {lang.label}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button variant="ghost" size="icon" className="h-16 w-16 relative hover:bg-primary/20 rounded-[1.8rem] group border-2 border-white/10 transition-all shadow-3xl bg-secondary/60 backdrop-blur-3xl">
              <Bell className="h-8 w-8 text-muted-foreground group-hover:text-primary group-hover:rotate-[20deg] transition-all" />
              <span className="absolute top-5 right-5 flex h-4 w-4 rounded-full bg-destructive animate-ping" />
              <span className="absolute top-5 right-5 flex h-4 w-4 rounded-full bg-destructive shadow-[0_0_20px_rgba(247,31,38,1)] border-2 border-black" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-16 px-6 flex items-center gap-5 hover:bg-primary/25 rounded-[1.8rem] group border-2 border-white/10 transition-all shadow-3xl bg-secondary/60 backdrop-blur-3xl relative overflow-hidden">
                  <div className="h-11 w-11 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/40 group-hover:bg-primary group-hover:rotate-[360deg] transition-all duration-1000 relative overflow-hidden shadow-inner">
                    <User className="h-7 w-7 text-primary group-hover:text-black relative z-10" />
                    <div className="scan-line opacity-0 group-hover:opacity-60" />
                  </div>
                  <span className="text-sm font-black text-white hidden sm:block uppercase tracking-[0.4em]">{t('adminAccount')}</span>
                  <div className="absolute inset-0 bg-primary/5 neural-shimmer opacity-0 group-hover:opacity-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[380px] bg-card/95 border-primary/50 shadow-[0_0_120px_rgba(0,0,0,0.95)] rounded-[4rem] p-6 backdrop-blur-[60px] overflow-hidden border-2">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
                <DropdownMenuLabel className="text-primary font-black px-10 py-10 text-[12px] uppercase tracking-[0.6em] italic">A to Z User Controller</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-[3rem] px-10 py-7 focus:bg-primary/15 focus:text-primary cursor-pointer group mb-4 flex items-center gap-7 transition-all border border-transparent hover:border-white/10 shadow-lg">
                  <div className="p-4 bg-secondary/80 rounded-[2rem] group-hover:bg-primary/30 transition-colors border-2 border-white/5 shadow-inner"><User className="h-7 w-7" /></div>
                  <div className="flex flex-col gap-1">
                    <span className="font-black text-[15px] uppercase tracking-[0.2em]">{t('profile')}</span>
                    <span className="text-[10px] opacity-60 uppercase tracking-widest">Access Service Records</span>
                  </div>
                  <ArrowRight className="ml-auto h-6 w-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-[3rem] px-10 py-7 focus:bg-primary/15 focus:text-primary cursor-pointer group mb-4 flex items-center gap-7 transition-all border border-transparent hover:border-white/10 shadow-lg">
                  <div className="p-4 bg-secondary/80 rounded-[2rem] group-hover:bg-primary/30 transition-colors border-2 border-white/5 shadow-inner"><Settings className="h-7 w-7" /></div>
                  <div className="flex flex-col gap-1">
                    <span className="font-black text-[15px] uppercase tracking-[0.2em]">{t('systemSettings')}</span>
                    <span className="text-[10px] opacity-60 uppercase tracking-widest">A to Z Mainframe Logic</span>
                  </div>
                  <ArrowRight className="ml-auto h-6 w-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-destructive font-black rounded-[3rem] px-10 py-8 focus:bg-destructive/25 cursor-pointer mt-6 text-center flex justify-center uppercase tracking-[0.6em] text-[12px] border-2 border-transparent hover:border-destructive/40 shadow-2xl" onClick={() => {
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
        <DialogContent className="max-w-5xl bg-card/95 backdrop-blur-[100px] border-primary/50 text-white rounded-[6rem] shadow-[0_0_300px_rgba(7,241,214,0.4)] p-20 overflow-hidden border-2">
          <div className="scan-line" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 blur-[200px] rounded-full -mr-48 -mt-48 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 blur-[200px] rounded-full -ml-48 -mb-48" />
          <DialogHeader>
            <DialogTitle className="flex items-center gap-10 text-6xl font-black text-primary tracking-tighter">
              <div className="p-8 bg-primary/20 rounded-[3.5rem] border-4 border-primary/50 animate-glow-pule shadow-[0_0_50px_rgba(7,241,214,0.5)]">
                <Search className="h-16 w-16 text-primary" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="block text-neon uppercase tracking-tight italic">ग्लोबल सर्च क्रॉलिंग यूनिट (A-Z)</span>
                <span className="text-[13px] uppercase tracking-[0.8em] text-muted-foreground font-black opacity-80">Deep Scanning Neural Results Active (Node Sync: 100%)</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="py-16">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-48 space-y-16">
                <div className="relative">
                  <Loader2 className="h-48 w-48 text-primary animate-spin opacity-40" />
                  <div className="absolute inset-0 h-48 w-48 bg-primary/30 blur-[80px] animate-pulse rounded-full" />
                  <Cpu className="absolute inset-0 m-auto h-20 w-20 text-primary animate-bounce shadow-[0_0_30px_rgba(7,241,214,1)]" />
                </div>
                <div className="text-center space-y-6">
                  <p className="font-black animate-pulse text-primary tracking-[1em] uppercase text-4xl text-neon">Scanning All Neural Nodes...</p>
                  <p className="text-[13px] uppercase font-bold text-muted-foreground tracking-[0.6em] opacity-80">Accessing A to Z API Gateway Hub</p>
                </div>
              </div>
            ) : searchResults ? (
              <ScrollArea className="h-[700px] pr-12">
                <div className="space-y-20">
                  <div className="space-y-10">
                    <h4 className="text-[13px] font-black text-muted-foreground uppercase tracking-[0.8em] flex items-center gap-8 opacity-70">
                      <LayoutGrid className="h-9 w-9 text-primary animate-pulse" /> न्यायालय यूनिट ({searchResults.courts.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {searchResults.courts.map((c: any, i: number) => (
                        <div key={i} className="bg-secondary/40 p-12 rounded-[4.5rem] border-2 border-white/10 hover:border-primary/80 cursor-pointer transition-all flex justify-between items-center group shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden relative" onClick={() => {setSearchOpen(false); router.push(c.path)}}>
                           <div className="relative z-10 flex flex-col gap-3">
                             <span className="font-black text-3xl group-hover:text-primary transition-all uppercase tracking-tight text-neon">{c.name}</span>
                             <span className="text-[13px] uppercase tracking-[0.4em] text-muted-foreground font-black opacity-60">Verified Regional Node Unit: Node-01 (A-Z)</span>
                           </div>
                           <Badge className="bg-primary/25 text-primary border-2 border-primary/60 px-8 py-3.5 font-black uppercase tracking-[0.4em] text-[12px] relative z-10 shadow-[0_0_20px_rgba(7,241,214,0.4)]">{c.status}</Badge>
                           <div className="scan-line opacity-0 group-hover:opacity-40" />
                           <div className="absolute inset-0 bg-primary/5 neural-shimmer opacity-0 group-hover:opacity-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-10">
                    <h4 className="text-[13px] font-black text-muted-foreground uppercase tracking-[0.8em] flex items-center gap-8 opacity-70">
                      <Users className="h-9 w-9 text-blue-400 animate-pulse" /> न्यायाधीश रिकॉर्ड्स ({searchResults.judges.length})
                    </h4>
                    {searchResults.judges.map((j: any, i: number) => (
                      <div key={i} className="bg-secondary/40 p-12 rounded-[4.5rem] border-2 border-white/10 hover:border-primary/80 cursor-pointer transition-all flex justify-between items-center group shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden" onClick={() => {setSearchOpen(false); router.push(j.path)}}>
                         <div className="flex flex-col gap-3 relative z-10">
                           <span className="font-black text-3xl group-hover:text-primary transition-all uppercase tracking-tight text-neon">{j.name}</span>
                           <span className="text-[13px] uppercase tracking-[0.4em] text-muted-foreground font-black opacity-60">Assigned Judicial Node: {j.court}</span>
                         </div>
                         <div className="bg-blue-400/25 p-7 rounded-[2.5rem] group-hover:bg-primary group-hover:rotate-[360deg] transition-all duration-1000 relative z-10 border-2 border-blue-400/40 shadow-xl">
                            <ArrowRight className="h-10 w-10 group-hover:text-black transition-colors" />
                         </div>
                         <div className="scan-line opacity-0 group-hover:opacity-40" />
                         <div className="absolute inset-0 bg-primary/5 neural-shimmer opacity-0 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-10">
                    <h4 className="text-[13px] font-black text-muted-foreground uppercase tracking-[0.8em] flex items-center gap-8 opacity-70">
                      <FileText className="h-9 w-9 text-emerald-400 animate-pulse" /> मामला फाइल यूनिट ({searchResults.cases.length})
                    </h4>
                    {searchResults.cases.map((c: any, i: number) => (
                      <div key={i} className="bg-secondary/40 p-12 rounded-[4.5rem] border-2 border-white/10 hover:border-primary/80 cursor-pointer transition-all flex justify-between items-center group shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden" onClick={() => {setSearchOpen(false); router.push(c.path)}}>
                         <div className="flex flex-col gap-4 relative z-10">
                           <span className="font-black text-4xl group-hover:text-primary transition-all tracking-tighter text-neon italic">{c.id}</span>
                           <span className="text-xl text-white font-black uppercase tracking-[0.3em]">{c.title}</span>
                         </div>
                         <Badge className="bg-emerald-400/25 text-emerald-400 border-2 border-emerald-400/60 px-10 py-5 font-black uppercase tracking-[0.5em] text-[13px] relative z-10 shadow-[0_0_20px_rgba(52,211,153,0.4)]">A to Z Scan: Complete</Badge>
                         <div className="scan-line opacity-0 group-hover:opacity-40" />
                         <div className="absolute inset-0 bg-primary/5 neural-shimmer opacity-0 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-48 text-muted-foreground font-black uppercase tracking-[1em] text-3xl opacity-50 animate-pulse italic">A to Z SYNC: Scanning Nodes...</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
