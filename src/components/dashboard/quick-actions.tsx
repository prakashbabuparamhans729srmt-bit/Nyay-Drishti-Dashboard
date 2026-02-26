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
    <div className="space-y-4">
      <h3 className="text-lg font-bold flex items-center gap-2 px-1">
        <PlusCircle className="h-5 w-5 text-accent" />
        त्वरित कार्रवाई
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.primary ? "default" : "outline"}
            className={`h-auto py-6 flex flex-col gap-3 rounded-xl shadow-sm hover:shadow-md transition-all group ${
              action.primary ? "bg-primary text-primary-foreground" : "hover:border-accent hover:text-accent"
            }`}
            onClick={() => toast({ title: action.label, description: "यह सुविधा जल्द ही उपलब्ध होगी।" })}
          >
            <action.icon className={`h-8 w-8 transition-transform group-hover:scale-110 ${action.primary ? 'text-accent' : 'text-primary group-hover:text-accent'}`} />
            <span className="text-xs font-bold uppercase tracking-tight text-center px-1">
              {action.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
