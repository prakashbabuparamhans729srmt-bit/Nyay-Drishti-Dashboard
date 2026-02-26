"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Users, Search, Download, LayoutDashboard, FilePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function QuickActions() {
  const { toast } = useToast();

  const actions = [
    { label: "नया मामला दर्ज करें", icon: FilePlus, primary: true },
    { label: "न्यायाधीश नियुक्ति", icon: Users },
    { label: "केस स्टेटस जांचें", icon: Search },
    { label: "रिपोर्ट डाउनलोड", icon: Download },
    { label: "ई-कोर्ट डैशबोर्ड", icon: LayoutDashboard },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xl font-black flex items-center gap-3 text-white">
          <PlusCircle className="h-6 w-6 text-primary animate-pulse" />
          त्वरित डिजिटल कार्रवाई
        </h3>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-secondary px-3 py-1 rounded-full">
          सक्रिय सेवाएँ
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.primary ? "default" : "outline"}
            className={`h-auto py-8 flex flex-col gap-4 rounded-2xl shadow-lg transition-all duration-300 group relative overflow-hidden border-muted ${
              action.primary 
                ? "bg-primary text-background hover:bg-primary/90 hover:scale-105 shadow-[0_0_20px_rgba(7,241,214,0.2)]" 
                : "bg-card hover:border-primary hover:text-primary hover:bg-primary/5"
            }`}
            onClick={() => toast({ 
              title: action.label, 
              description: "यह डिजिटल सेवा प्रक्रियाधीन है।",
              className: "bg-card border-primary text-white"
            })}
          >
            {action.primary && (
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
            <action.icon className={`h-10 w-10 transition-all duration-500 ${
              action.primary 
                ? 'text-background group-hover:rotate-6' 
                : 'text-primary group-hover:scale-125 group-hover:rotate-12'
            }`} />
            <span className="text-[11px] font-black uppercase tracking-tighter text-center px-2">
              {action.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
