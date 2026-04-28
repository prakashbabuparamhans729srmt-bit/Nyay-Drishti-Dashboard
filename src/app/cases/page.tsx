
"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/dashboard/header";
import { FileText, Search, ArrowLeft, Database, Loader2, Info, CheckCircle, AlertCircle, Sparkles, Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFirestore, useMemoFirebase, useCollection } from "@/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

export default function CasesPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const db = useFirestore();
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<null | any>(null);
  const [caseNo, setCaseNo] = useState("");

  const handleDeepSearch = async () => {
    if (!caseNo.trim() || !db) return;
    setSearching(true);
    setResult(null);
    
    try {
      // Searching the actual Firestore 'cases' collection
      const casesRef = collection(db, "cases");
      const q = query(casesRef, where("caseNumber", "==", caseNo.trim()), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const caseData = querySnapshot.docs[0].data();
        setResult({
          caseId: caseData.caseNumber,
          title: caseData.title,
          status: caseData.status,
          court: "Processing Node...", // In a real app, you'd fetch court name by courtId
          judge: "Assigned Unit", // In a real app, fetch judge name by judgeId
          lastHearing: caseData.lastHearingDate ? new Date(caseData.lastHearingDate).toLocaleDateString() : "N/A",
          nextHearing: caseData.nextHearingDate ? new Date(caseData.nextHearingDate).toLocaleDateString() : "Scheduled",
          description: caseData.description || "न्यायदृष्टि क्रॉल इंजन द्वारा प्राप्त डेटा।",
        });
      } else {
        // Fallback or No Result
        setResult({
          caseId: caseNo,
          title: "रिकॉर्ड नहीं मिला (Not Found)",
          status: "अज्ञात (Unknown)",
          court: "---",
          judge: "---",
          lastHearing: "---",
          nextHearing: "---",
          description: "इस केस नंबर के लिए कोई डेटा प्राप्त नहीं हुआ। कृपया सही केस आईडी दर्ज करें।",
        });
      }
    } catch (error) {
      console.error("Crawl error:", error);
    } finally {
      setSearching(false);
    }
  };

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
                <FileText className="h-8 w-8 text-primary animate-pulse" />
                {t('cases')} ट्रैकिंग यूनिट
              </h1>
              <span className="text-[10px] text-primary/60 font-black uppercase tracking-[0.5em] ml-11">A to Z Node: Case Registry Crawl</span>
            </div>
          </div>
        </div>

        <section className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Card className="bg-card border-primary/30 shadow-[0_0_50px_rgba(7,241,214,0.15)] rounded-[3rem] p-12 text-center relative overflow-hidden neon-glow group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-primary/20 transition-all duration-500" />
            <div className="scan-line opacity-10 group-hover:opacity-30" />
            
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="bg-primary/20 p-5 rounded-3xl border border-primary/40 shadow-xl group-hover:rotate-[360deg] transition-all duration-1000">
                <Sparkles className="h-10 w-10 text-primary animate-pulse" />
              </div>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter text-neon">
                एडवांस सर्च क्रॉलिंग इंजन (A-Z)
              </h2>
              <p className="text-sm text-muted-foreground/60 font-bold uppercase tracking-widest">Accessing Central Judicial Database Nodes...</p>
            </div>

            <div className="flex gap-4 relative z-10">
              <div className="relative flex-1 group/input">
                <Database className="absolute left-5 top-5 h-6 w-6 text-muted-foreground group-focus-within/input:text-primary group-focus-within/input:scale-110 transition-all mt-0.5" />
                <Input 
                  value={caseNo}
                  onChange={(e) => setCaseNo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleDeepSearch()}
                  placeholder="केस नंबर दर्ज करें (उदा. SC-2024-442)" 
                  className="h-20 bg-secondary/70 border-white/10 pl-16 rounded-[2rem] focus:border-primary/50 text-2xl font-medium shadow-inner placeholder:text-muted-foreground/30"
                />
              </div>
              <Button 
                onClick={handleDeepSearch}
                disabled={searching}
                className="h-20 px-12 bg-primary text-black font-black text-xl rounded-[2rem] shadow-[0_15px_30px_rgba(7,241,214,0.4)] hover:scale-105 active:scale-95 transition-all border-2 border-black/10"
              >
                {searching ? <Loader2 className="animate-spin h-8 w-8" /> : "खोजें (CRAWL)"}
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-10">
               <div className="flex items-center gap-2 opacity-40">
                 <Cpu className="h-4 w-4 text-primary" />
                 <span className="text-[9px] uppercase font-black tracking-widest">Neural Link Active</span>
               </div>
               <div className="flex items-center gap-2 opacity-40">
                 <Zap className="h-4 w-4 text-primary" />
                 <span className="text-[9px] uppercase font-black tracking-widest">Peak Performance</span>
               </div>
            </div>
          </Card>

          {searching && (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative h-24 w-24">
                <Loader2 className="h-24 w-24 text-primary animate-spin opacity-30" />
                <Database className="absolute inset-0 m-auto h-10 w-10 text-primary animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-primary font-black uppercase tracking-[0.5em] animate-pulse text-xl text-neon">डेटाबेस को स्कैन किया जा रहा है...</p>
                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest opacity-60 italic">Crawl Node 01-A-Z actively fetching data from high-security judicial nodes.</p>
              </div>
            </div>
          )}

          {result && (
            <Card className="bg-card border-white/5 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-10 duration-1000 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
              <CardHeader className="bg-secondary/40 border-b border-white/10 flex flex-row items-center justify-between p-10">
                <CardTitle className="text-3xl font-black flex items-center gap-4 text-primary tracking-tighter">
                  <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30">
                    <Info className="h-8 w-8 text-primary" />
                  </div>
                  केस विवरण: {result.caseId}
                </CardTitle>
                <Badge className="bg-amber-400 text-black font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-full shadow-lg border-2 border-amber-500/50">{result.status}</Badge>
              </CardHeader>
              <CardContent className="p-12 space-y-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-2 group/field">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1 group-hover/field:text-primary transition-colors">शीर्षक / TITLE</label>
                      <p className="text-2xl font-bold bg-secondary/30 p-4 rounded-2xl border border-white/5 group-hover/field:border-primary/20 transition-all">{result.title}</p>
                    </div>
                    <div className="space-y-2 group/field">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1 group-hover/field:text-primary transition-colors">न्यायालय / COURT</label>
                      <p className="text-2xl font-bold bg-secondary/30 p-4 rounded-2xl border border-white/5 group-hover/field:border-primary/20 transition-all">{result.court}</p>
                    </div>
                    <div className="space-y-2 group/field">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1 group-hover/field:text-primary transition-colors">न्यायाधीश / ASSIGNED JUDGE</label>
                      <p className="text-2xl font-bold bg-secondary/30 p-4 rounded-2xl border border-white/5 group-hover/field:border-primary/20 transition-all">{result.judge}</p>
                    </div>
                  </div>
                  <div className="space-y-8 bg-secondary/30 p-10 rounded-[2.5rem] border border-white/5 shadow-inner relative overflow-hidden group/hearing">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
                    <div className="space-y-6">
                      <div className="flex items-center gap-5 text-emerald-400 group/item">
                        <div className="p-4 bg-emerald-400/10 rounded-2xl border border-emerald-400/20 group-hover/item:scale-110 transition-transform">
                          <CheckCircle className="h-8 w-8" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase opacity-60 tracking-widest">पिछली सुनवाई / LAST HEARING</label>
                          <p className="text-2xl font-black">{result.lastHearing}</p>
                        </div>
                      </div>
                      <div className="h-px w-full bg-white/5" />
                      <div className="flex items-center gap-5 text-primary group/item">
                        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 group-hover/item:scale-110 transition-transform">
                          <AlertCircle className="h-8 w-8" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase opacity-60 tracking-widest">अगली सुनवाई / NEXT HEARING</label>
                          <p className="text-2xl font-black">{result.nextHearing}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-10 border-t border-white/10 group/desc">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-4 block group-hover/desc:text-primary transition-colors">मामले का विवरण / CASE DESCRIPTION</label>
                  <p className="text-muted-foreground italic leading-relaxed text-lg bg-secondary/20 p-8 rounded-3xl border border-white/5">"{result.description}"</p>
                </div>
              </CardContent>
              <div className="scan-line opacity-5" />
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}
