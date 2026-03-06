"use client";

import { Scale, Home, LayoutGrid, Users, FileText, Settings, Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const navItems = [
    { label: "होम", icon: Home, active: true },
    { label: "न्यायालय", icon: LayoutGrid },
    { label: "न्यायाधीश", icon: Users },
    { label: "मामले", icon: FileText },
    { label: "रिपोर्ट", icon: LayoutGrid },
    { label: "सेटिंग", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl text-foreground shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-primary/20 p-2.5 rounded-xl transition-all duration-500 group-hover:bg-primary group-hover:rotate-[360deg] group-hover:shadow-[0_0_20px_rgba(7,241,214,0.6)]">
              <Scale className="h-6 w-6 text-primary group-hover:text-black" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter hidden md:block text-primary">न्यायदृष्टि</h1>
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

          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative group">
              <Search className="absolute left-4 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary group-focus-within:scale-110 transition-all" />
              <Input
                placeholder="खोजें (केस/न्यायालय)..."
                className="w-full bg-secondary border-muted/30 text-white placeholder:text-muted-foreground focus-visible:ring-primary pl-11 rounded-full transition-all focus:bg-background h-10 hover:border-primary/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
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
                <DropdownMenuLabel className="text-primary font-black px-4 py-3">प्रशासक खाता</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem className="rounded-xl px-4 py-2 focus:bg-primary/10 focus:text-primary cursor-pointer group">
                  प्रोफ़ाइल डैशबोर्ड <User className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl px-4 py-2 focus:bg-primary/10 focus:text-primary cursor-pointer group">
                  सिस्टम सेटिंग्स <Settings className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem className="text-destructive font-bold rounded-xl px-4 py-2 focus:bg-destructive/10 cursor-pointer">
                  लॉग आउट
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}