"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, ChevronRight, AlertCircle, TrendingUp, CheckCircle2 } from "lucide-react";
import { judicialBottleneckAnalysis, JudicialBottleneckAnalysisOutput } from "@/ai/flows/judicial-bottleneck-analysis";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export function AIBottleneckAnalysisTrigger() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JudicialBottleneckAnalysisOutput | null>(null);
  const [open, setOpen] = useState(false);

  const handleAnalysis = async () => {
    setLoading(true);
    try {
      const input = {
        courtData: [
          { courtName: "Supreme Court", pendingCases: 78342, newCasesThisYear: 8234, disposedCasesThisYear: 7891, totalSanctionedJudgePosts: 34, vacantJudgePosts: 0, disposalRate: 95 },
          { courtName: "Allahabad High Court", pendingCases: 892345, newCasesThisYear: 123456, disposedCasesThisYear: 98234, totalSanctionedJudgePosts: 160, vacantJudgePosts: 40, disposalRate: 79 },
          { courtName: "Madras High Court", pendingCases: 456789, newCasesThisYear: 67890, disposedCasesThisYear: 56789, totalSanctionedJudgePosts: 100, vacantJudgePosts: 15, disposalRate: 83 },
        ],
        overallPendingCaseTrend: [
          { year: 2024, pendingCasesCount: 43000000 },
          { year: 2025, pendingCasesCount: 44000000 },
          { year: 2026, pendingCasesCount: 45000000 },
        ],
        pendingCasesAgeDistribution: {
          '0-1_year': 25,
          '1-3_years': 35,
          '3-5_years': 20,
          '5-10_years': 12,
          '10+_years': 8,
        },
        topPerformingJudges: [
          { judgeName: "Justice A.K. Sikri", court: "Delhi High Court", casesDisposed: 2345 },
          { judgeName: "Justice S. Ravindra Bhat", court: "Supreme Court", casesDisposed: 2189 },
        ]
      };
      
      const analysis = await judicialBottleneckAnalysis(input);
      setResult(analysis);
      setOpen(true);
    } catch (error) {
      console.error("AI Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="border-primary/20 shadow-2xl bg-gradient-to-br from-card via-card to-primary/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5 animate-pulse text-primary" />
            AI बाधा विश्लेषण टूल
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            न्यायिक आंकड़ों का गहरा विश्लेषण करें और प्रणालीगत बाधाओं की पहचान कर सुधार के लिए सक्रिय AI सिफारिशें प्राप्त करें।
          </p>
          <Button 
            onClick={handleAnalysis} 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-background font-black shadow-[0_0_20px_rgba(7,241,214,0.3)] transition-all duration-300 hover:scale-[1.02]"
          >
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> विश्लेषण जारी है...</>
            ) : (
              <>विश्लेषण शुरू करें <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-primary/30 text-foreground shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black flex items-center gap-3 text-primary">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              न्यायिक विश्लेषण रिपोर्ट
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg">
              एआई-संचालित अंतर्दृष्टि और सुधार के लिए लक्षित कार्य योजना।
            </DialogDescription>
          </DialogHeader>

          {result && (
            <div className="space-y-8 mt-6">
              <section className="bg-card p-6 rounded-2xl border border-primary/20 relative overflow-hidden shadow-inner">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <h3 className="font-black text-xl flex items-center gap-2 mb-3 text-primary">
                  <TrendingUp className="h-6 w-6" /> कार्यकारी सारांश
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground italic">"{result.summary}"</p>
              </section>

              <section>
                <h3 className="font-black text-xl flex items-center gap-2 mb-6">
                  <AlertCircle className="h-6 w-6 text-destructive" /> चिह्नित मुख्य अवरोध
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.identifiedBottlenecks.map((b, i) => (
                    <div key={i} className="border border-muted p-5 rounded-2xl bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300 group shadow-lg">
                      <Badge variant="outline" className="text-destructive border-destructive/50 bg-destructive/5 mb-3">{b.category}</Badge>
                      <h4 className="font-black text-lg text-white group-hover:text-primary transition-colors">{b.description}</h4>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">प्रभाव: {b.impact}</p>
                      {b.relevantCourts && (
                        <div className="pt-4 mt-4 border-t border-muted">
                           <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">प्रभावित क्षेत्र:</span>
                           <div className="flex flex-wrap gap-1.5 mt-2">
                             {b.relevantCourts.map(c => <Badge key={c} variant="secondary" className="text-[10px] bg-secondary hover:bg-primary hover:text-background transition-colors cursor-default">{c}</Badge>)}
                           </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="pb-8">
                <h3 className="font-black text-xl flex items-center gap-2 mb-6">
                  <CheckCircle2 className="h-6 w-6 text-primary" /> अनुशंसित रणनीतिक कार्रवाई
                </h3>
                <div className="space-y-4">
                  {result.actionableRecommendations.map((r, i) => (
                    <div key={i} className="group flex gap-5 p-6 border border-muted rounded-3xl bg-card hover:border-primary/50 transition-all duration-300 shadow-xl">
                      <div className={`shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transition-transform group-hover:scale-110 ${
                        r.priority === 'High' ? 'bg-destructive/10 text-destructive border border-destructive/20' : 
                        r.priority === 'Medium' ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' : 'bg-primary/10 text-primary border border-primary/20'
                      }`}>
                        {r.priority[0]}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-black text-lg text-white group-hover:text-primary transition-colors">{r.recommendation}</h4>
                          <Badge className={
                            r.priority === 'High' ? 'bg-destructive text-white' : 
                            r.priority === 'Medium' ? 'bg-amber-400 text-black' : 'bg-primary text-background'
                          }>
                            {r.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{r.justification}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
