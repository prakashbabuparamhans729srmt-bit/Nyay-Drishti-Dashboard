"use client";

import { Scale, Home, LayoutGrid, Users, FileText, Settings, Search, Bell, User, Languages, Mic, MicOff, Sun, Moon, Laptop, Loader2, Info, ArrowRight, X, Sparkles, Database, Command, Cpu, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { languages, LanguageCode } from "@/lib/translations";
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

    // Advanced Global Crawling Unit - Simulated Live Response
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
    }, 2000);
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
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/90 backdrop-blur-3xl text-foreground shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between gap-8">
          <div className="flex items-center gap-6 group cursor-pointer" onClick={() => router.push('/')}>
            <div className="bg-primary/20 p-4 rounded-2xl transition-all duration-1000 group-hover:bg-primary group-hover:rotate-[360deg] group-hover:shadow-[0_0_50px_rgba(7,241,214,0.8)] border border-primary/30 relative overflow-hidden">
              <Scale className="h-9 w-9 text-primary group-hover:text-black transition-colors relative z-10" />
              <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <div className="scan-line opacity-0 group-hover:opacity-60" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black tracking-tighter hidden lg:block text-primary text-neon uppercase">
                  {t('dashboardTitle')}
                </h1>
                <Badge variant="outline" className="hidden lg:flex border-primary/40 text-[9px] font-black text-primary px-3 py-1 bg-primary/10 h-fit animate-pulse shadow-[0_0_10px_rgba(7,241,214,0.3)] uppercase">A-Z LINK</Badge>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] uppercase font-black tracking-[0.5em] text-muted-foreground hidden lg:block opacity-60">Neural Command Center</span>
                 <div className="flex items-center gap-1">
                   <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                   <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(7,241,214,1)]" />
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
                className={`flex items-center gap-3 h-24 rounded-none px-8 font-black transition-all duration-500 hover:bg-white/[0.05] group relative overflow-hidden ${
                  pathname === item.path ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-white"
                }`}
              >
                <item.icon className={`h-6 w-6 transition-all duration-700 group-hover:scale-150 group-hover:rotate-12 ${pathname === item.path ? 'animate-pulse scale-125 text-primary' : ''}`} />
                <span className="uppercase tracking-[0.2em] text-[11px] font-black">{item.label}</span>
                {pathname === item.path && (
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-primary shadow-[0_0_40px_rgba(7,241,214,1)] nav-active-bar" />
                )}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="scan-line opacity-0 group-hover:opacity-20" />
              </Button>
            ))}
          </nav>

          <div className="flex-1 max-w-lg mx-6 hidden lg:block">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-2xl group-focus-within:bg-primary/30 transition-all rounded-full" />
              <Search className="absolute left-6 top-4.5 h-6 w-6 text-muted-foreground group-focus-within:text-primary group-focus-within:scale-125 transition-all mt-0.5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGlobalSearch(searchQuery)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-secondary/50 border-white/5 text-white placeholder:text-muted-foreground/50 focus-visible:ring-primary/50 pl-16 pr-16 rounded-[1.5rem] transition-all focus:bg-background h-16 hover:border-primary/40 shadow-inner text-xl font-medium"
              />
              <div className="absolute right-5 top-4 flex gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={startVoiceSearch}
                  className={`h-8 w-8 rounded-xl transition-all ${isListening ? 'bg-destructive/30 text-destructive animate-pulse shadow-[0_0_15px_rgba(247,31,38,0.5)]' : 'text-muted-foreground hover:text-primary bg-white/5 hover:bg-white/10'}`}
                >
                  {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-black text-muted-foreground/60 border border-white/10 px-3 rounded-xl bg-secondary/80">
                  <Command className="h-3.5 w-3.5" /> K
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 bg-secondary/50 p-2 rounded-2xl border border-white/10 shadow-inner backdrop-blur-xl">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-primary/20 rounded-xl transition-all group border border-transparent hover:border-primary/30">
                    {theme === 'light' ? <Sun className="h-6 w-6 text-amber-400 group-hover:rotate-90 transition-transform" /> : theme === 'dark' ? <Moon className="h-6 w-6 text-primary group-hover:-rotate-45 transition-transform" /> : <Laptop className="h-6 w-6 text-muted-foreground" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card/95 border-primary/40 rounded-[2.5rem] p-4 shadow-3xl backdrop-blur-3xl overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                  <DropdownMenuLabel className="text-primary font-black px-4 py-4 text-[10px] uppercase tracking-[0.4em] flex items-center gap-3">
                    <Sparkles className="h-4 w-4" /> {t('themeMode')}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={() => handleThemeChange('light')} className="rounded-2xl px-6 py-4 cursor-pointer focus:bg-primary/20 flex gap-5 items-center font-black uppercase text-[11px] tracking-[0.2em] group">
                    <Sun className="h-5 w-5 text-amber-400 group-hover:rotate-90 transition-transform" /> {t('light')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="rounded-2xl px-6 py-4 cursor-pointer focus:bg-primary/20 flex gap-5 items-center font-black uppercase text-[11px] tracking-[0.2em] group">
                    <Moon className="h-5 w-5 text-primary group-hover:-rotate-12 transition-transform" /> {t('dark')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeChange('system')} className="rounded-2xl px-6 py-4 cursor-pointer focus:bg-primary/20 flex gap-5 items-center font-black uppercase text-[11px] tracking-[0.2em] group">
                    <Laptop className="h-5 w-5 text-muted-foreground group-hover:scale-110 transition-transform" /> {t('system')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-primary/20 rounded-xl group border border-transparent hover:border-primary/30 transition-all">
                    <Languages className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all group-hover:scale-125" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-card/95 border-primary/40 shadow-3xl rounded-[3rem] p-4 backdrop-blur-3xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                  <DropdownMenuLabel className="text-primary font-black px-6 py-8 flex flex-col gap-2">
                    <span className="text-sm uppercase tracking-[0.4em]">Neural Dictionary</span>
                    <span className="text-[10px] opacity-70 font-bold">भाषा चुनें / Select Language</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <ScrollArea className="h-[480px] px-2">
                    <div className="grid grid-cols-1 gap-2">
                      {languages.map((lang) => (
                        <DropdownMenuItem
                          key={lang.code}
                          onClick={() => setLanguage(lang.code)}
                          className={`rounded-[1.5rem] px-6 py-5 cursor-pointer group flex justify-between items-center transition-all ${
                            language === lang.code 
                              ? "bg-primary text-black font-black shadow-[0_0_20px_rgba(7,241,214,0.5)] scale-[1.02]" 
                              : "hover:bg-primary/10 focus:bg-primary/20 focus:text-primary"
                          }`}
                        >
                          <span className="font-black text-xl">{lang.native}</span>
                          <span className={`text-[10px] uppercase tracking-[0.2em] font-black ${language === lang.code ? 'text-black/60' : 'opacity-40 group-hover:opacity-100'}`}>
                            {lang.label}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button variant="ghost" size="icon" className="h-14 w-14 relative hover:bg-primary/20 rounded-2xl group border border-white/10 transition-all shadow-2xl bg-secondary/50 backdrop-blur-xl">
              <Bell className="h-7 w-7 text-muted-foreground group-hover:text-primary group-hover:rotate-[15deg] transition-all" />
              <span className="absolute top-4 right-4 flex h-3.5 w-3.5 rounded-full bg-destructive animate-ping" />
              <span className="absolute top-4 right-4 flex h-3.5 w-3.5 rounded-full bg-destructive shadow-[0_0_15px_rgba(247,31,38,1)] border-2 border-background" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-14 px-5 flex items-center gap-4 hover:bg-primary/20 rounded-2xl group border border-white/10 transition-all shadow-2xl bg-secondary/50 backdrop-blur-xl">
                  <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/40 group-hover:bg-primary group-hover:rotate-[360deg] transition-all duration-1000 relative overflow-hidden shadow-inner">
                    <User className="h-6 w-6 text-primary group-hover:text-black relative z-10" />
                    <div className="scan-line opacity-0 group-hover:opacity-60" />
                  </div>
                  <span className="text-xs font-black text-white hidden sm:block uppercase tracking-[0.3em]">{t('adminAccount')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card/95 border-primary/40 shadow-3xl rounded-[3rem] p-4 backdrop-blur-3xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <DropdownMenuLabel className="text-primary font-black px-8 py-8 text-[11px] uppercase tracking-[0.5em]">User Node Controller</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-[2rem] px-8 py-5 focus:bg-primary/10 focus:text-primary cursor-pointer group mb-3 flex items-center gap-5 transition-all">
                  <div className="p-3 bg-secondary rounded-2xl group-hover:bg-primary/30 transition-colors border border-white/5 shadow-inner"><User className="h-6 w-6" /></div>
                  <div className="flex flex-col">
                    <span className="font-black text-[13px] uppercase tracking-widest">{t('profile')}</span>
                    <span className="text-[9px] opacity-50 uppercase tracking-tight">Access Service Records</span>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-[2rem] px-8 py-5 focus:bg-primary/10 focus:text-primary cursor-pointer group mb-3 flex items-center gap-5 transition-all">
                  <div className="p-3 bg-secondary rounded-2xl group-hover:bg-primary/30 transition-colors border border-white/5 shadow-inner"><Settings className="h-6 w-6" /></div>
                  <div className="flex flex-col">
                    <span className="font-black text-[13px] uppercase tracking-widest">{t('systemSettings')}</span>
                    <span className="text-[9px] opacity-50 uppercase tracking-tight">Mainframe Controller</span>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-destructive font-black rounded-[2rem] px-8 py-6 focus:bg-destructive/20 cursor-pointer mt-4 text-center flex justify-center uppercase tracking-[0.4em] text-[11px] border border-transparent hover:border-destructive/30" onClick={() => {
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
        <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-3xl border-primary/40 text-white rounded-[5rem] shadow-[0_0_250px_rgba(7,241,214,0.3)] p-16 overflow-hidden border-2">
          <div className="scan-line" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[150px] rounded-full -mr-40 -mt-40 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 blur-[150px] rounded-full -ml-40 -mb-40" />
          <DialogHeader>
            <DialogTitle className="flex items-center gap-8 text-5xl font-black text-primary tracking-tighter">
              <div className="p-5 bg-primary/20 rounded-[2.5rem] border-2 border-primary/40 animate-glow-pule shadow-[0_0_30px_rgba(7,241,214,0.4)]">
                <Search className="h-12 w-12 text-primary" />
              </div>
              <div>
                <span className="block text-neon uppercase tracking-tight">ग्लोबल सर्च क्रॉलिंग यूनिट</span>
                <span className="text-[11px] uppercase tracking-[0.6em] text-muted-foreground font-black opacity-70">Deep Scanning Neural Results Active</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="py-12">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-12">
                <div className="relative">
                  <Loader2 className="h-32 w-32 text-primary animate-spin" />
                  <div className="absolute inset-0 h-32 w-32 bg-primary/30 blur-[60px] animate-pulse" />
                  <Cpu className="absolute inset-0 m-auto h-12 w-12 text-primary animate-bounce" />
                </div>
                <div className="text-center space-y-4">
                  <p className="font-black animate-pulse text-primary tracking-[0.6em] uppercase text-3xl text-neon">Scanning All Judicial Nodes...</p>
                  <p className="text-[11px] uppercase font-bold text-muted-foreground tracking-[0.4em] opacity-60">Accessing Court / Judge / Case A to Z API Gateway</p>
                </div>
              </div>
            ) : searchResults ? (
              <ScrollArea className="h-[600px] pr-10">
                <div className="space-y-16">
                  <div className="space-y-8">
                    <h4 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.6em] flex items-center gap-5 opacity-60">
                      <LayoutGrid className="h-7 w-7 text-primary" /> न्यायालय ({searchResults.courts.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {searchResults.courts.map((c: any, i: number) => (
                        <div key={i} className="bg-secondary/40 p-10 rounded-[3.5rem] border border-white/10 hover:border-primary/60 cursor-pointer transition-all flex justify-between items-center group shadow-2xl overflow-hidden relative" onClick={() => {setSearchOpen(false); router.push(c.path)}}>
                           <div className="relative z-10 flex flex-col gap-2">
                             <span className="font-black text-2xl group-hover:text-primary transition-all uppercase tracking-tight">{c.name}</span>
                             <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-black opacity-50">Verified Regional Node Unit</span>
                           </div>
                           <Badge className="bg-primary/20 text-primary border-primary/50 px-6 py-2.5 font-black uppercase tracking-[0.3em] text-[11px] relative z-10 shadow-lg">{c.status}</Badge>
                           <div className="scan-line opacity-0 group-hover:opacity-30" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <h4 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.6em] flex items-center gap-5 opacity-60">
                      <Users className="h-7 w-7 text-blue-400" /> न्यायाधीश ({searchResults.judges.length})
                    </h4>
                    {searchResults.judges.map((j: any, i: number) => (
                      <div key={i} className="bg-secondary/40 p-10 rounded-[3.5rem] border border-white/10 hover:border-primary/60 cursor-pointer transition-all flex justify-between items-center group shadow-2xl relative overflow-hidden" onClick={() => {setSearchOpen(false); router.push(j.path)}}>
                         <div className="flex flex-col gap-2 relative z-10">
                           <span className="font-black text-2xl group-hover:text-primary transition-all uppercase tracking-tight">{j.name}</span>
                           <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-black opacity-50">Assigned Judicial Node: {j.court}</span>
                         </div>
                         <div className="bg-blue-400/20 p-5 rounded-[2rem] group-hover:bg-primary group-hover:rotate-[360deg] transition-all duration-1000 relative z-10 border border-blue-400/30">
                            <ArrowRight className="h-7 w-7 group-hover:text-black transition-colors" />
                         </div>
                         <div className="scan-line opacity-0 group-hover:opacity-30" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-8">
                    <h4 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.6em] flex items-center gap-5 opacity-60">
                      <FileText className="h-7 w-7 text-emerald-400" /> मामले ({searchResults.cases.length})
                    </h4>
                    {searchResults.cases.map((c: any, i: number) => (
                      <div key={i} className="bg-secondary/40 p-10 rounded-[3.5rem] border border-white/10 hover:border-primary/60 cursor-pointer transition-all flex justify-between items-center group shadow-2xl relative overflow-hidden" onClick={() => {setSearchOpen(false); router.push(c.path)}}>
                         <div className="flex flex-col gap-3 relative z-10">
                           <span className="font-black text-3xl group-hover:text-primary transition-all tracking-tighter text-neon">{c.id}</span>
                           <span className="text-base text-muted-foreground font-black uppercase tracking-[0.2em]">{c.title}</span>
                         </div>
                         <Badge className="bg-emerald-400/20 text-emerald-400 border-emerald-400/50 px-8 py-3.5 font-black uppercase tracking-[0.4em] text-[11px] relative z-10 shadow-lg">Deep Neural Scan Active</Badge>
                         <div className="scan-line opacity-0 group-hover:opacity-30" />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-32 text-muted-foreground font-black uppercase tracking-[0.8em] text-2xl opacity-40 animate-pulse">प्रतीक्षा करें... डेटा खोजा जा रहा है।</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}