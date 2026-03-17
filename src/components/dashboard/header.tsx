"use client";

import { Scale, Home, LayoutGrid, Users, FileText, Settings, Search, Bell, User, Languages, Mic, MicOff, Sun, Moon, Laptop } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { languages, LanguageCode } from "@/lib/translations";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
      toast({ title: t('micActive'), description: transcript });
    };
    recognition.start();
  };

  const navItems = [
    { label: t('home'), icon: Home, active: true },
    { label: t('courts'), icon: LayoutGrid },
    { label: t('judges'), icon: Users },
    { label: t('cases'), icon: FileText },
    { label: t('reports'), icon: LayoutGrid },
    { label: t('settings'), icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl text-foreground shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3 group cursor-pointer">
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
                className={`flex items-center gap-2 h-16 rounded-none px-6 font-bold transition-all duration-300 hover:bg-white/5 group relative ${
                  item.active ? "text-primary" : "text-muted-foreground hover:text-white"
                }`}
              >
                <item.icon className={`h-4 w-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${item.active ? 'animate-pulse' : ''}`} />
                <span>{item.label}</span>
                {item.active && (
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
                placeholder={t('searchPlaceholder')}
                className="w-full bg-secondary border-muted/30 text-white placeholder:text-muted-foreground focus-visible:ring-primary pl-11 pr-11 rounded-full transition-all focus:bg-background h-10 hover:border-primary/50"
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
            {/* Theme Switcher */}
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

            {/* Language Switcher */}
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
                <DropdownMenuItem className="rounded-xl px-4 py-2 focus:bg-primary/10 focus:text-primary cursor-pointer group">
                  {t('profile')} <User className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl px-4 py-2 focus:bg-primary/10 focus:text-primary cursor-pointer group">
                  {t('systemSettings')} <Settings className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem className="text-destructive font-bold rounded-xl px-4 py-2 focus:bg-destructive/10 cursor-pointer">
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
