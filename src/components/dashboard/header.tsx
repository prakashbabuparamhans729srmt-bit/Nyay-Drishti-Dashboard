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
import { Badge } from "@/components/ui/badge";

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
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-accent p-2 rounded-lg transition-transform group-hover:scale-110">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight hidden md:block">न्यायदृष्टि</h1>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={`flex items-center gap-2 h-16 rounded-none px-4 font-medium transition-colors hover:bg-white/10 ${
                  item.active ? "border-b-4 border-accent bg-white/5" : ""
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-primary-foreground/60 group-focus-within:text-accent" />
              <Input
                placeholder="केस नंबर/न्यायालय/न्यायाधीश खोजें..."
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-accent pl-9 rounded-full transition-all focus:bg-white/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs text-primary-foreground/70">{new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="text-xs font-bold text-accent uppercase tracking-wider">एडमिन</span>
            </div>
            
            <Button variant="ghost" size="icon" className="relative hover:bg-white/10 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>मेरा खाता</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>प्रोफ़ाइल</DropdownMenuItem>
                <DropdownMenuItem>सेटिंग्स</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">लॉग आउट</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
