
"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { FileText, Search, ArrowLeft, Database, Loader2, Info, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CasesPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<null | any>(null);
  const [caseNo, setCaseNo] = useState("");

  const handleDeepSearch = () => {
    if (!caseNo.trim()) return;
    setSearching(true);
    setResult(null);
    
    // Simulate Advanced Crawling logic
    setTimeout(() => {
      setResult({
        caseId: caseNo,
        title: "राम बनाम उत्तर प्रदेश राज्य",
        status: "पेन्डिंग (Pending)",
        court: "इलाहाबाद उच्च न्यायालय",
        judge: "न्यायमूर्ति एस. के. शर्मा",
        lastHearing: "15 मार्च 2024",
        nextHearing: "22 अप्रैल 2024",
        description: "संपत्ति विवाद से संबंधित संवैधानिक याचिका।",
      });
      setSearching(false);
    }, 2000);
  };

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
              <FileText className="h-8 w-8 text-primary" />
              {t('cases')} ट्रैकिंग यूनिट
            </h1>
          </div>
        </div>

        <section className="max-w-3xl mx-auto space-y-6">
          <Card className="bg-card border-primary/30 shadow-[0_0_50px_rgba(7,241,214,0.1)] rounded-[2.5rem] p-8 text-center relative overflow-hidden neon-glow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <h2 className="text-2xl font-black text-white mb-6 flex items-center justify-center gap-3">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              एडवांस सर्च क्रॉलिंग इंजन
            </h2>
            <div className="flex gap-4">
              <div className="relative flex-1 group">
                <Database className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  value={caseNo}
                  onChange={(e) => setCaseNo(e.target.value)}
                  placeholder="केस नंबर दर्ज करें (उदा. SC-2024-442)" 
                  className="h-14 bg-secondary/50 border-muted/30 pl-12 rounded-2xl focus:border-primary/50 text-lg"
                />
              </div>
              <Button 
                onClick={handleDeepSearch}
                disabled={searching}
                className="h-14 px-8 bg-primary text-black font-black text-lg rounded-2xl shadow-xl hover:scale-105 transition-all"
              >
                {searching ? <Loader2 className="animate-spin" /> : "खोजें"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4 italic uppercase tracking-widest">न्यायदृष्टि एआई द्वारा संचालित - देश के हर कोने की खोज</p>
          </Card>

          {searching && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="text-primary font-black animate-pulse">डेटाबेस को स्कैन किया जा रहा है...</p>
            </div>
          )}

          {result && (
            <Card className="bg-card border-white/5 rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-5">
              <CardHeader className="bg-secondary/30 border-b border-white/5 flex flex-row items-center justify-between p-6">
                <CardTitle className="text-xl font-black flex items-center gap-3 text-primary">
                  <Info className="h-6 w-6" /> केस विवरण: {result.caseId}
                </CardTitle>
                <Badge className="bg-amber-400 text-black font-black uppercase tracking-wider">{result.status}</Badge>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">शीर्षक</label>
                      <p className="text-xl font-bold">{result.title}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">न्यायालय</label>
                      <p className="text-xl font-bold">{result.court}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">असाइन न्यायाधीश</label>
                      <p className="text-xl font-bold">{result.judge}</p>
                    </div>
                  </div>
                  <div className="space-y-4 bg-secondary/20 p-6 rounded-3xl border border-white/5">
                    <div className="flex items-center gap-3 text-emerald-400">
                      <CheckCircle className="h-5 w-5" />
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase opacity-60">पिछली सुनवाई</label>
                        <p className="font-bold">{result.lastHearing}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-primary">
                      <AlertCircle className="h-5 w-5" />
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase opacity-60">अगली सुनवाई</label>
                        <p className="font-bold">{result.nextHearing}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 block">विवरण</label>
                  <p className="text-muted-foreground italic leading-relaxed">{result.description}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}
