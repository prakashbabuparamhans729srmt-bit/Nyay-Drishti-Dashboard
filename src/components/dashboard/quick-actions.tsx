"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Users, Search, Download, LayoutDashboard, FilePlus, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function QuickActions() {
  const { toast } = useToast();

  const actions = [
    { label: "नया मामला दर्ज करें", icon: FilePlus, primary: true, desc: "ई-फाइलिंग पोर्टल" },
    { label: "न्यायाधीश नियुक्ति", icon: Users, desc: "वेतन एवं सेवा रिकॉर्ड" },
    { label: "केस स्टेटस जांचें", icon: Search, desc: "लाइव ट्रैकिंग सिस्टम" },
    { label: "रिपोर्ट डाउनलोड", icon: Download, desc: "सांख्यिकीय पीडीएफ" },
    { label: "ई-कोर्ट डैशबोर्ड", icon: LayoutDashboard, desc: "एक्सटर्नल लिंक" },
  ];

  return (
    <div className="space-y-8 py-4">
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
           <h3 className="text-2xl font-black flex items-center gap-3 text-white tracking-tighter">
            <PlusCircle className="h-7 w-7 text-primary animate-pulse" />
            त्वरित डिजिटल कार्रवाई
          </h3>
          <p className="text-xs text-muted-foreground font-medium pl-10 uppercase tracking-widest">न्यायिक सुगमता के लिए डिजिटल उपकरण</p>
        </div>
        <Badge variant="outline" className="text-[10px] font-black text-primary border-primary/30 bg-primary/5 px-4 py-1.5 rounded-full animate-bounce">
          सिस्टम एक्टिव
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.primary ? "default" : "outline"}
            className={`h-auto py-10 flex flex-col gap-6 rounded-[2rem] shadow-2xl transition-all duration-500 group relative overflow-hidden border-white/5 ${
              action.primary 
                ? "bg-primary text-black hover:bg-primary/90 hover:scale-[1.05] hover:-translate-y-2 shadow-[0_20px_40px_rgba(7,241,214,0.3)]" 
                : "bg-card hover:border-primary/50 hover:text-primary hover:bg-white/[0.03] hover:-translate-y-2 shadow-xl"
            }`}
            onClick={() => toast({ 
              title: action.label, 
              description: `प्रणाली वर्तमान में "${action.label}" सेवा को प्रोसेस कर रही है।`,
              className: "bg-card border-primary text-white font-bold rounded-2xl"
            })}
          >
            {/* Holographic effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className={`p-5 rounded-[1.5rem] transition-all duration-700 ${
              action.primary ? 'bg-black/10' : 'bg-primary/5 border border-primary/10 group-hover:bg-primary group-hover:text-black'
            }`}>
              <action.icon className={`h-10 w-10 transition-all duration-700 ${
                action.primary 
                  ? 'text-black group-hover:rotate-[360deg] group-hover:scale-110' 
                  : 'text-primary group-hover:rotate-[360deg] group-hover:scale-110 group-hover:text-black'
              }`} />
            </div>

            <div className="space-y-2 text-center relative z-10">
              <span className="text-xs font-black uppercase tracking-tighter px-2 block group-hover:scale-110 transition-transform">
                {action.label}
              </span>
              <span className={`text-[9px] uppercase font-black tracking-[0.2em] opacity-50 block ${action.primary ? 'text-black' : 'text-muted-foreground group-hover:text-primary'}`}>
                {action.desc}
              </span>
            </div>

            <ArrowRight className={`absolute bottom-6 right-6 h-4 w-4 transition-all duration-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ${action.primary ? 'text-black' : 'text-primary'}`} />
          </Button>
        ))}
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";