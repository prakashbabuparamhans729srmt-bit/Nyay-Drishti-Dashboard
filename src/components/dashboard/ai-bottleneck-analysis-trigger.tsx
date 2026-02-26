"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, ChevronRight, AlertCircle, TrendingUp } from "lucide-react";
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
      // Mocking input based on dashboard visible data
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
      <Card className="border-none shadow-lg bg-gradient-to-br from-primary to-blue-900 text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            AI बाधा विश्लेषण टूल
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-primary-foreground/80">
            न्यायिक आंकड़ों का विश्लेषण करें और प्रणालीगत बाधाओं की पहचान कर सुधार के लिए सक्रिय सिफारिशें प्राप्त करें।
          </p>
          <Button 
            onClick={handleAnalysis} 
            disabled={loading}
            className="w-full bg-accent hover:bg-accent/90 text-primary font-bold shadow-xl transition-all"
          >
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> विश्लेषण जारी है...</>
            ) : (
              <>विश्लेषण शुरू करें <ChevronRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              एआई-संचालित न्यायिक विश्लेषण रिपोर्ट
            </DialogTitle>
            <DialogDescription>
              न्यायिक दक्षता बढ़ाने के लिए लक्षित सिफारिशें और प्रणालीगत अंतर्दृष्टि।
            </DialogDescription>
          </DialogHeader>

          {result && (
            <div className="space-y-8 mt-4">
              <section className="bg-muted/30 p-4 rounded-xl border border-primary/10">
                <h3 className="font-bold flex items-center gap-2 mb-2 text-primary">
                  <TrendingUp className="h-5 w-5" /> सारांश
                </h3>
                <p className="text-sm leading-relaxed">{result.summary}</p>
              </section>

              <section>
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-destructive" /> पहचाने गए मुख्य अवरोध
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.identifiedBottlenecks.map((b, i) => (
                    <div key={i} className="border p-4 rounded-lg bg-white shadow-sm space-y-2">
                      <Badge variant="outline" className="text-destructive border-destructive">{b.category}</Badge>
                      <h4 className="font-bold text-sm">{b.description}</h4>
                      <p className="text-xs text-muted-foreground italic">प्रभाव: {b.impact}</p>
                      {b.relevantCourts && (
                        <div className="pt-2">
                           <span className="text-[10px] uppercase font-bold text-muted-foreground">प्रभावित न्यायालय:</span>
                           <div className="flex flex-wrap gap-1 mt-1">
                             {b.relevantCourts.map(c => <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>)}
                           </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-green-600" /> कार्यात्मक सिफारिशें
                </h3>
                <div className="space-y-4">
                  {result.actionableRecommendations.map((r, i) => (
                    <div key={i} className="flex gap-4 p-4 border rounded-xl bg-green-50/30 border-green-100">
                      <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold shadow-sm ${
                        r.priority === 'High' ? 'bg-red-100 text-red-600' : 
                        r.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {r.priority[0]}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{r.recommendation}</h4>
                          <Badge variant={r.priority === 'High' ? 'destructive' : r.priority === 'Medium' ? 'default' : 'secondary'}>
                            {r.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{r.justification}</p>
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
