
"use client";

import { Header } from "@/components/dashboard/header";
import { JudgeAnalysisPanel } from "@/components/dashboard/judge-analysis-panel";
import { Users, Award, Search, ArrowLeft, Trophy, Sparkles, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function JudgesPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden atoz-active-flow data-stream-animation">
      <div className="neural-wire" />
      <div className="neural-background-mesh" />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8 max-w-7xl relative z-10">
        <div className="scan-line opacity-5" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-primary/10">
              <ArrowLeft className="h-6 w-6 text-primary" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3">
                <Users className="h-8 w-8 text-primary animate-pulse" />
                {t('judges')} {t('profile')}
              </h1>
              <span className="text-[10px] text-primary/60 font-black uppercase tracking-[0.5em] ml-11">A to Z Node: Judicial Service Unit</span>
            </div>
          </div>
          <div className="relative w-80 group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-all" />
            <Input placeholder={t('searchPlaceholder')} className="pl-10 rounded-full bg-secondary/50 border-white/10 focus:border-primary/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
            <Card className="bg-card border-primary/20 shadow-2xl rounded-[3rem] neon-glow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-primary text-2xl font-black uppercase italic tracking-tighter">
                  <Trophy className="h-7 w-7 animate-bounce" />
                  न्यायाधीश प्रदर्शन विश्लेषण
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 p-10">
                <p className="text-muted-foreground italic leading-relaxed text-lg border-l-4 border-primary/30 pl-6">यहाँ देश भर के शीर्ष प्रदर्शन करने वाले न्यायाधीशों की विस्तृत सूची और उनके द्वारा निस्तारित मामलों का विश्लेषण है।</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2.5rem] bg-secondary/40 border border-white/5 hover:border-primary/30 transition-all shadow-inner group/stat">
                    <h3 className="text-primary/70 font-black mb-2 uppercase tracking-widest text-xs">कुल सक्रिय न्यायाधीश</h3>
                    <p className="text-5xl font-black group-hover:text-primary transition-colors">1,079</p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-full animate-glow-pule" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-secondary/40 border border-white/5 hover:border-primary/30 transition-all shadow-inner group/stat">
                    <h3 className="text-primary/70 font-black mb-2 uppercase tracking-widest text-xs">औसत निस्तारण दर</h3>
                    <p className="text-5xl font-black group-hover:text-primary transition-colors">88.5%</p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[88.5%] animate-glow-pule" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-card/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-10 hover:border-primary/50 transition-all group overflow-hidden relative">
                  <div className="scan-line opacity-0 group-hover:opacity-10" />
                  <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 border border-primary/20">
                    <Award className="h-10 w-10 text-primary group-hover:rotate-12 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">उत्कृष्टता पुरस्कार 2024</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">उच्चतम निस्तारण दर के लिए मान्यता प्राप्त न्यायाधीशों का पूर्ण विवरण और डिजिटल सम्मान सूची।</p>
                </Card>
                <Card className="bg-card/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-10 hover:border-blue-400/50 transition-all group overflow-hidden relative">
                  <div className="scan-line opacity-0 group-hover:opacity-10" />
                  <div className="bg-blue-400/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 border border-blue-400/20">
                    <Users className="h-10 w-10 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">कार्यभार प्रबंधन</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">मामलों के वितरण और जजों के कार्यभार की रीयल-टाइम निगरानी रिपोर्ट।</p>
                </Card>
            </div>
          </div>
          <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <div className="flex items-center gap-2 mb-4 px-2">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">Neural Ranking Logic (A-Z)</span>
            </div>
            <JudgeAnalysisPanel />
            <div className="mt-8 p-6 bg-secondary/30 rounded-3xl border border-white/5 flex items-center gap-4">
               <Cpu className="h-8 w-8 text-primary/40" />
               <p className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.3em] leading-relaxed">A to Z Neural Integration Active. Every node is synchronized with the Central Judicial Gateway.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
