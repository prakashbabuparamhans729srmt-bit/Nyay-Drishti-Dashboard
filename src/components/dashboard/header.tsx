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
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md text-foreground shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary/20 p-2 rounded-lg transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(7,241,214,0.5)]">
              <Scale className="h-6 w-6 text-primary group-hover:text-background" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight hidden md:block text-primary">न्यायदृष्टि</h1>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={`flex items-center gap-2 h-16 rounded-none px-4 font-medium transition-all duration-300 hover:bg-white/5 group ${
                  item.active ? "border-b-4 border-primary text-primary bg-primary/5" : "text-muted-foreground"
                }`}
              >
                <item.icon className={`h-4 w-4 transition-transform duration-300 group-hover:scale-125 ${item.active ? 'animate-pulse' : ''}`} />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative group">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="केस नंबर/न्यायालय/न्यायाधीश खोजें..."
                className="w-full bg-secondary border-muted text-white placeholder:text-muted-foreground focus-visible:ring-primary pl-10 rounded-full transition-all focus:bg-background"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                {new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">एडमिनिस्ट्रेटर</span>
            </div>
            
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 rounded-full group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive animate-ping" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-full group">
                  <User className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-muted shadow-2xl">
                <DropdownMenuLabel className="text-primary">मेरा खाता</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-muted" />
                <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary cursor-pointer">प्रोफ़ाइल</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary cursor-pointer">सेटिंग्स</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-muted" />
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 cursor-pointer font-bold">लॉग आउट</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
