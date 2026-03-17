
"use client";

import { Scale, Home, LayoutGrid, Users, FileText, Settings, Search, Bell, User, Languages, Mic, MicOff, Sun, Moon, Laptop, Loader2, Info, ArrowRight, X } from "lucide-react";
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

    // Simulate "Deep Crawling Search Unit"
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
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl text-foreground shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
            <div className="bg-primary/20 p-2.5 rounded-xl transition-all duration-500 group-hover:bg-primary group-hover:rotate-[360deg] group-hover:shadow-[0_0_20px_rgba(7,241,214,0.6)]">
              <Scale className="h-6 w-6 text-primary group-hover:text-black" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter hidden md:block text-primary">
              {t('dashboardTitle')}
            </h1>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-2 h-16 rounded-none px-6 font-bold transition-all duration-300 hover:bg-white/5 group relative ${
                  pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-white"
                }`}
              >
                <item.icon className={`h-4 w-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${pathname === item.path ? 'animate-pulse' : ''}`} />
                <span>{item.label}</span>
                {pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-primary shadow-[0_0_15px_rgba(7,241,214,0.8)]" />
                )}
              </Button>
            ))}
          </nav>

          <div className="flex-1 max-w-sm mx-4 hidden sm:block">
            <div className="relative group">
              <Search className="absolute left-4 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary group-focus-within:scale-110 transition-all" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGlobalSearch(searchQuery)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-secondary border-muted/30 text-white placeholder:text-muted-foreground focus-visible:ring-primary pl-11 pr-11 rounded-full transition-all focus:bg-background h-10 hover:border-primary/50 shadow-inner"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={startVoiceSearch}
                className={`absolute right-1 top-1 h-8 w-8 rounded-full transition-all ${isListening ? 'text-destructive animate-pulse' : 'text-muted-foreground hover:text-primary'}`}
              >
                {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-full group">
                  {theme === 'light' ? <Sun className="h-5 w-5 text-amber-400" /> : theme === 'dark' ? <Moon className="h-5 w-5 text-primary" /> : <Laptop className="h-5 w-5 text-muted-foreground" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-primary/20 rounded-2xl p-1">
                <DropdownMenuLabel className="text-primary font-black px-3 py-2">{t('themeMode')}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem onClick={() => handleThemeChange('light')} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-primary/10 flex gap-2 items-center font-bold">
                  <Sun className="h-4 w-4" /> {t('light')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-primary/10 flex gap-2 items-center font-bold">
                  <Moon className="h-4 w-4" /> {t('dark')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('system')} className="rounded-xl px-3 py-2 cursor-pointer focus:bg-primary/10 flex gap-2 items-center font-bold">
                  <Laptop className="h-4 w-4" /> {t('system')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-full group">
                  <Languages className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-primary/20 shadow-2xl rounded-2xl p-1">
                <DropdownMenuLabel className="text-primary font-black px-3 py-2">भाषा चुनें / Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <ScrollArea className="h-[300px]">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`rounded-xl px-3 py-2 cursor-pointer group flex justify-between items-center ${
                        language === lang.code ? "bg-primary/10 text-primary" : "focus:bg-primary/10 focus:text-primary"
                      }`}
                    >
                      <span className="font-bold">{lang.native}</span>
                      <span className="text-[10px] uppercase opacity-50 tracking-widest">{lang.label}</span>
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 rounded-full group transition-all duration-300">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive animate-ping" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive shadow-[0_0_8px_rgba(247,31,38,0.8)]" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-full group overflow-hidden border border-white/5">
                  <User className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-card border-primary/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-2xl p-2">
                <DropdownMenuLabel className="text-primary font-black px-4 py-3">{t('adminAccount')}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-xl px-4 py-2 focus:bg-primary/10 focus:text-primary cursor-pointer group">
                  {t('profile')} <User className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-xl px-4 py-2 focus:bg-primary/10 focus:text-primary cursor-pointer group">
                  {t('systemSettings')} <Settings className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem className="text-destructive font-bold rounded-xl px-4 py-2 focus:bg-destructive/10 cursor-pointer" onClick={() => {
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
        <DialogContent className="max-w-2xl bg-card border-primary/30 text-white rounded-[2rem] shadow-[0_0_100px_rgba(7,241,214,0.1)]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-black text-primary">
              <Search className="h-6 w-6" />
              सर्च क्रॉलिंग यूनिट - परिणाम
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-6">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="font-black animate-pulse text-primary tracking-widest uppercase">कोने-कोने की खोज जारी है...</p>
              </div>
            ) : searchResults ? (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4 text-primary" /> न्यायालय ({searchResults.courts.length})
                    </h4>
                    {searchResults.courts.map((c: any, i: number) => (
                      <div key={i} className="bg-secondary/50 p-4 rounded-2xl border border-white/5 hover:border-primary/30 cursor-pointer transition-all flex justify-between items-center group" onClick={() => {setSearchOpen(false); router.push('/courts')}}>
                         <span className="font-bold group-hover:text-primary">{c.name}</span>
                         <Badge className="bg-primary/20 text-primary border-primary/30">{c.status}</Badge>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-400" /> न्यायाधीश ({searchResults.judges.length})
                    </h4>
                    {searchResults.judges.map((j: any, i: number) => (
                      <div key={i} className="bg-secondary/50 p-4 rounded-2xl border border-white/5 hover:border-primary/30 cursor-pointer transition-all flex justify-between items-center group" onClick={() => {setSearchOpen(false); router.push('/judges')}}>
                         <span className="font-bold group-hover:text-primary">{j.name}</span>
                         <span className="text-xs text-muted-foreground">{j.court}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-400" /> मामले ({searchResults.cases.length})
                    </h4>
                    {searchResults.cases.map((c: any, i: number) => (
                      <div key={i} className="bg-secondary/50 p-4 rounded-2xl border border-white/5 hover:border-primary/30 cursor-pointer transition-all flex justify-between items-center group" onClick={() => {setSearchOpen(false); router.push('/cases')}}>
                         <div className="flex flex-col">
                           <span className="font-bold group-hover:text-primary">{c.id}</span>
                           <span className="text-xs text-muted-foreground">{c.title}</span>
                         </div>
                         <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <p className="text-center text-muted-foreground">कोई परिणाम नहीं मिला।</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
