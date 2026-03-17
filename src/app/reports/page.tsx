
"use client";

import { Header } from "@/components/dashboard/header";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { LayoutGrid, Download, FileText, ArrowLeft, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ReportsPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-primary/10">
              <ArrowLeft className="h-6 w-6 text-primary" />
            </Button>
            <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              {t('reports')} और विश्लेषण
            </h1>
          </div>
          <div className="flex gap-3">
            <Button className="bg-primary text-black font-black rounded-full gap-2">
              <Download className="h-4 w-4" /> PDF एक्सपोर्ट
            </Button>
            <Button variant="outline" className="border-primary/20 text-primary font-black rounded-full gap-2">
              <FileText className="h-4 w-4" /> एक्सेल डाउनलोड
            </Button>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "कुल रिपोर्ट", value: "254", icon: FileText, color: "text-blue-400" },
            { label: "सक्रिय ट्रेंड्स", value: "12", icon: TrendingUp, color: "text-primary" },
            { label: "निस्तारण दर", value: "88%", icon: BarChart3, color: "text-emerald-400" },
            { label: "सिस्टम हेल्थ", value: "उत्कृष्ट", icon: LayoutGrid, color: "text-amber-400" },
          ].map((item, i) => (
            <Card key={i} className="bg-card border-white/5 hover:border-primary/30 transition-all p-6 shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</span>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <p className="text-3xl font-black">{item.value}</p>
            </Card>
          ))}
        </section>

        <section>
          <DashboardCharts />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="bg-card border-white/5 p-8 rounded-[2rem] shadow-2xl">
             <h3 className="text-xl font-black mb-6 text-primary flex items-center gap-2">
               <TrendingUp className="h-6 w-6" /> लंबित मामलों की आयु रिपोर्ट
             </h3>
             <div className="space-y-6">
                {[
                  { range: "0-1 वर्ष", val: 25, color: "bg-primary" },
                  { range: "1-3 वर्ष", val: 35, color: "bg-blue-400" },
                  { range: "3-5 वर्ष", val: 20, color: "bg-emerald-400" },
                  { range: "5-10 वर्ष", val: 12, color: "bg-amber-400" },
                  { range: "10+ वर्ष", val: 8, color: "bg-destructive" },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>{item.range}</span>
                      <span>{item.val}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
             </div>
           </Card>

           <Card className="bg-card border-white/5 p-8 rounded-[2rem] shadow-2xl flex flex-col justify-center items-center text-center">
             <div className="bg-primary/10 p-6 rounded-full mb-6">
               <Sparkles className="h-12 w-12 text-primary animate-pulse" />
             </div>
             <h3 className="text-2xl font-black mb-4">AI विश्लेषण तैयार है</h3>
             <p className="text-muted-foreground mb-8">आपका एआई असिस्टेंट इस महीने की डेटा रिपोर्ट का विश्लेषण कर चुका है।</p>
             <Button className="bg-primary text-black font-black h-14 px-10 rounded-2xl shadow-xl hover:scale-105 transition-all">
                एआई रिपोर्ट देखें
             </Button>
           </Card>
        </section>
      </main>
    </div>
  );
}
