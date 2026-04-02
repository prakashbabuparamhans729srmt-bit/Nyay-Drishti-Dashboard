"use client";

import { Scale, Home, LayoutGrid, Users, FileText, Settings, Search, Bell, User, Languages, Mic, MicOff, Sun, Moon, Laptop, Loader2, Info, ArrowRight, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { languages, LanguageCode } from "@/lib/translations";
import { useState, useEffect, useRef } from "react";
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

    setTimeout(() => {
      setSearchResults({
        courts: [{ name: "Allahabad High Court", status: "Active" }],
        judges: [{ name: "Justice S.K. Sharma", court: "Supreme Court" }],
        cases: [{ id: "SC-2024-442", title: "Ram vs State of UP" }]
      });
      setIsSearching(false);
    }, 1500);
  };

  const navItems = [
    { label: t('home'), icon: Home, path: '/' },
    { label: t('courts'), icon: LayoutGrid, path: '/courts' },
    { label: t('judges'), icon: Users, path: '/judges' },
    { label: t('cases'), icon: FileText, path: '/cases' },
    { label: t('reports'), icon: LayoutGrid, path: '/reports' },
    { label: t('settings'), icon: Settings, path: '/settings' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-2xl text-foreground shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between gap-6">
          <div className="flex items-center gap-5 group cursor-pointer" onClick={() => router.push('/')}>
            <div className="bg-primary/20 p-4 rounded-2xl transition-all duration-1000 group-hover:bg-primary group-hover:rotate-[360deg] group-hover:shadow-[0_0_40px_rgba(7,241,214,0.6)] border border-primary/30">
              <Scale className="h-8 w-8 text-primary group-hover:text-black transition-colors" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-black tracking-tighter hidden lg:block text-primary drop-shadow-[0_0_15px_rgba(7,241,214,0.4)]">
                {t('dashboardTitle')}
              </h1>
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-muted-foreground hidden lg:block opacity-50">Advanced Unit</span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-3 h-24 rounded-none px-6 font-black transition-all duration-500 hover:bg-white/[0.03] group relative overflow-hidden ${
                  pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-white"
                }`}
              >
                <item.icon className={`h-5 w-5 transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 ${pathname === item.path ? 'animate-pulse' : ''}`} />
                <span className="uppercase tracking-widest text-xs">{item.label}</span>
                {pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-1.5 bg-primary shadow-[0_0_30px_rgba(7,241,214,1)]" />
                )}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            ))}
          </nav>

          <div className="flex-1 max-w-md mx-4 hidden lg:block">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 blur-xl group-focus-within:bg-primary/20 transition-all rounded-full" />
              <Search className="absolute left-5 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary group-focus-within:scale-125 transition-all" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGlobalSearch(searchQuery)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-secondary/40 border-white/5 text-white placeholder:text-muted-foreground focus-visible:ring-primary/40 pl-14 pr-14 rounded-2xl transition-all focus:bg-background/80 h-14 hover:border-primary/50 shadow-inner text-lg font-medium"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={startVoiceSearch}
                className={`absolute right-2 top-2 h-10 w-10 rounded-xl transition-all ${isListening ? 'bg-destructive/20 text-destructive animate-pulse' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`}
              >
                {isListening ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary/40 p-1.5 rounded-2xl border border-white/5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-primary/20 rounded-xl transition-all group border border-transparent hover:border-primary/20">
                    {theme === 'light' ? <Sun className="h-6 w-6 text-amber-400 group-hover:rotate-45 transition-transform" /> : theme === 'dark' ? <Moon className="h-6 w-6 text-primary group-hover:-rotate-12 transition-transform" /> : <Laptop className="h-6 w-6 text-muted-foreground" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card/95 border-primary/30 rounded-[2rem] p-3 shadow-3xl backdrop-blur-2xl">
                  <DropdownMenuLabel className="text-primary font-black px-4 py-4 text-xs uppercase tracking-widest flex items-center gap-3">
                    <Sparkles className="h-4 w-4" /> {t('themeMode')}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem onClick={() => handleThemeChange('light')} className="rounded-2xl px-5 py-4 cursor-pointer focus:bg-primary/10 flex gap-4 items-center font-black uppercase text-[10px] tracking-[0.2em]">
                    <Sun className="h-4 w-4 text-amber-400" /> {t('light')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="rounded-2xl px-5 py-4 cursor-pointer focus:bg-primary/10 flex gap-4 items-center font-black uppercase text-[10px] tracking-[0.2em]">
                    <Moon className="h-4 w-4 text-primary" /> {t('dark')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeChange('system')} className="rounded-2xl px-5 py-4 cursor-pointer focus:bg-primary/10 flex gap-4 items-center font-black uppercase text-[10px] tracking-[0.2em]">
                    <Laptop className="h-4 w-4" /> {t('system')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-primary/20 rounded-xl group border border-transparent hover:border-primary/20">
                    <Languages className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all group-hover:scale-110" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-card/95 border-primary/30 shadow-3xl rounded-[2.5rem] p-3 backdrop-blur-3xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                  <DropdownMenuLabel className="text-primary font-black px-6 py-6 flex flex-col gap-1">
                    <span className="text-sm uppercase tracking-[0.3em]">Language selection</span>
                    <span className="text-[10px] opacity-60 font-medium">भाषा चुनें / Select Language</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <ScrollArea className="h-[450px]">
                    <div className="grid grid-cols-1 gap-1 px-1">
                      {languages.map((lang) => (
                        <DropdownMenuItem
                          key={lang.code}
                          onClick={() => setLanguage(lang.code)}
                          className={`rounded-[1.2rem] px-5 py-4 cursor-pointer group flex justify-between items-center transition-all ${
                            language === lang.code 
                              ? "bg-primary text-black font-black" 
                              : "hover:bg-primary/10 focus:bg-primary/10 focus:text-primary"
                          }`}
                        >
                          <span className="font-bold text-lg">{lang.native}</span>
                          <span className={`text-[9px] uppercase tracking-widest font-black ${language === lang.code ? 'text-black/60' : 'opacity-40'}`}>
                            {lang.label}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button variant="ghost" size="icon" className="h-14 w-14 relative hover:bg-primary/20 rounded-2xl group border border-white/5 transition-all shadow-xl">
              <Bell className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
              <span className="absolute top-4 right-4 flex h-3 w-3 rounded-full bg-destructive animate-ping" />
              <span className="absolute top-4 right-4 flex h-3 w-3 rounded-full bg-destructive shadow-[0_0_15px_rgba(247,31,38,1)] border-2 border-background" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-14 px-4 flex items-center gap-3 hover:bg-primary/20 rounded-2xl group border border-white/5 transition-all shadow-xl bg-secondary/30">
                  <div className="h-9 w-9 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 group-hover:bg-primary group-hover:rotate-[360deg] transition-all duration-700">
                    <User className="h-5 w-5 text-primary group-hover:text-black" />
                  </div>
                  <span className="text-sm font-black text-white hidden sm:block uppercase tracking-widest">{t('adminAccount')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card/95 border-primary/30 shadow-3xl rounded-[2.5rem] p-3 backdrop-blur-3xl overflow-hidden">
                <DropdownMenuLabel className="text-primary font-black px-6 py-6 text-xs uppercase tracking-[0.4em]">User Unit</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-[1.5rem] px-6 py-4 focus:bg-primary/10 focus:text-primary cursor-pointer group mb-2 flex items-center gap-4 transition-all">
                  <div className="p-2 bg-secondary rounded-xl group-hover:bg-primary/20"><User className="h-5 w-5" /></div>
                  <div className="flex flex-col">
                    <span className="font-black text-xs uppercase tracking-widest">{t('profile')}</span>
                    <span className="text-[9px] opacity-40 uppercase">Account detail control</span>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-[1.5rem] px-6 py-4 focus:bg-primary/10 focus:text-primary cursor-pointer group mb-2 flex items-center gap-4 transition-all">
                  <div className="p-2 bg-secondary rounded-xl group-hover:bg-primary/20"><Settings className="h-5 w-5" /></div>
                  <div className="flex flex-col">
                    <span className="font-black text-xs uppercase tracking-widest">{t('systemSettings')}</span>
                    <span className="text-[9px] opacity-40 uppercase">Global system logic</span>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem className="text-destructive font-black rounded-[1.5rem] px-6 py-5 focus:bg-destructive/10 cursor-pointer mt-2 text-center flex justify-center uppercase tracking-[0.3em] text-xs" onClick={() => {
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
        <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-3xl border-primary/30 text-white rounded-[4rem] shadow-[0_0_200px_rgba(7,241,214,0.2)] p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[120px] rounded-full -mr-32 -mt-32" />
          <DialogHeader>
            <DialogTitle className="flex items-center gap-6 text-4xl font-black text-primary tracking-tighter">
              <div className="p-4 bg-primary/20 rounded-[2rem] border border-primary/30 animate-pulse">
                <Search className="h-10 w-10 text-primary" />
              </div>
              <div>
                <span className="block">सर्च क्रॉलिंग यूनिट</span>
                <span className="text-xs uppercase tracking-[0.5em] text-muted-foreground font-black opacity-60">Deep Scanning Results</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="py-10">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-10">
                <div className="relative">
                  <Loader2 className="h-24 w-24 text-primary animate-spin" />
                  <div className="absolute inset-0 h-24 w-24 bg-primary/20 blur-3xl animate-pulse" />
                </div>
                <div className="text-center space-y-3">
                  <p className="font-black animate-pulse text-primary tracking-[0.5em] uppercase text-2xl">Scanning Systems...</p>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-[0.3em]">Accessing judicial nodes</p>
                </div>
              </div>
            ) : searchResults ? (
              <ScrollArea className="h-[550px] pr-8">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-[0.5em] flex items-center gap-4 opacity-50">
                      <LayoutGrid className="h-6 w-6 text-primary" /> न्यायालय ({searchResults.courts.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.courts.map((c: any, i: number) => (
                        <div key={i} className="bg-secondary/40 p-8 rounded-[2.5rem] border border-white/5 hover:border-primary/50 cursor-pointer transition-all flex justify-between items-center group shadow-2xl overflow-hidden relative" onClick={() => {setSearchOpen(false); router.push('/courts')}}>
                           <div className="relative z-10 flex flex-col gap-1">
                             <span className="font-black text-xl group-hover:text-primary transition-all uppercase tracking-tight">{c.name}</span>
                             <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Regional Judicial Unit</span>
                           </div>
                           <Badge className="bg-primary/20 text-primary border-primary/40 px-5 py-2 font-black uppercase tracking-[0.2em] text-[10px] relative z-10">{c.status}</Badge>
                           <div className="scan-line opacity-0 group-hover:opacity-10" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-[0.5em] flex items-center gap-4 opacity-50">
                      <Users className="h-6 w-6 text-blue-400" /> न्यायाधीश ({searchResults.judges.length})
                    </h4>
                    {searchResults.judges.map((j: any, i: number) => (
                      <div key={i} className="bg-secondary/40 p-8 rounded-[2.5rem] border border-white/5 hover:border-primary/50 cursor-pointer transition-all flex justify-between items-center group shadow-2xl relative overflow-hidden" onClick={() => {setSearchOpen(false); router.push('/judges')}}>
                         <div className="flex flex-col gap-1 relative z-10">
                           <span className="font-black text-xl group-hover:text-primary transition-all">{j.name}</span>
                           <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Assigned to: {j.court}</span>
                         </div>
                         <div className="bg-blue-400/20 p-4 rounded-2xl group-hover:bg-primary group-hover:rotate-[360deg] transition-all duration-1000 relative z-10">
                            <ArrowRight className="h-6 w-6 group-hover:text-black transition-colors" />
                         </div>
                         <div className="scan-line opacity-0 group-hover:opacity-10" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-[0.5em] flex items-center gap-4 opacity-50">
                      <FileText className="h-6 w-6 text-emerald-400" /> मामले ({searchResults.cases.length})
                    </h4>
                    {searchResults.cases.map((c: any, i: number) => (
                      <div key={i} className="bg-secondary/40 p-8 rounded-[2.5rem] border border-white/5 hover:border-primary/50 cursor-pointer transition-all flex justify-between items-center group shadow-2xl relative overflow-hidden" onClick={() => {setSearchOpen(false); router.push('/cases')}}>
                         <div className="flex flex-col gap-2 relative z-10">
                           <span className="font-black text-2xl group-hover:text-primary transition-all tracking-tighter">{c.id}</span>
                           <span className="text-sm text-muted-foreground font-bold uppercase tracking-widest">{c.title}</span>
                         </div>
                         <Badge className="bg-emerald-400/20 text-emerald-400 border-emerald-400/40 px-6 py-2.5 font-black uppercase tracking-widest text-[10px] relative z-10">Live Track</Badge>
                         <div className="scan-line opacity-0 group-hover:opacity-10" />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-24 text-muted-foreground font-black uppercase tracking-[0.5em] text-xl opacity-30">कोई परिणाम नहीं मिला।</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
