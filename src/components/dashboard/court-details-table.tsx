
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Database, Activity, RefreshCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";

export function CourtDetailsTable() {
  const { t, language } = useLanguage();
  const db = useFirestore();

  const courtsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "courts"), orderBy("totalPendingCases", "desc"), limit(10));
  }, [db]);

  const { data: courtData, isLoading } = useCollection(courtsQuery);

  const courtNamesMap: Record<string, Record<string, string>> = {
    "hi": { "Supreme Court": "सुप्रीम कोर्ट", "Allahabad High Court": "इलाहाबाद उच्च न्यायालय", "Madras High Court": "मद्रास उच्च न्यायालय", "Bombay High Court": "बॉम्बे उच्च न्यायालय", "Delhi High Court": "दिल्ली उच्च न्यायालय" },
  };

  const getCourtName = (name: string) => {
    return courtNamesMap[language]?.[name] || name;
  };

  return (
    <Card className="border-white/5 shadow-3xl overflow-hidden bg-card/50 backdrop-blur-sm neon-glow">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-secondary/30 px-6 py-5">
        <CardTitle className="text-xl font-black text-primary flex items-center gap-3">
          <Database className="h-6 w-6 animate-pulse" />
          {t('courtDataTitle')}
        </CardTitle>
        <div className="flex gap-2">
           <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-all group">
             <RefreshCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-700" />
           </Button>
           <Button variant="outline" size="sm" className="gap-2 border-primary/30 text-primary hover:bg-primary hover:text-black transition-all rounded-full font-black px-4">
             {t('detailedReport')} <ExternalLink className="h-4 w-4" />
           </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-20 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Neural Data Fetching...</span>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-secondary/20">
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead className="font-black text-white/50 uppercase text-[10px] tracking-widest py-6 pl-6">{t('courtName')}</TableHead>
                <TableHead className="text-right font-black text-white/50 uppercase text-[10px] tracking-widest">{t('pending')}</TableHead>
                <TableHead className="text-right font-black text-white/50 uppercase text-[10px] tracking-widest">{t('new')}</TableHead>
                <TableHead className="text-right font-black text-white/50 uppercase text-[10px] tracking-widest">{t('disposed')}</TableHead>
                <TableHead className="text-right font-black text-white/50 uppercase text-[10px] tracking-widest">{t('disposalRate')}</TableHead>
                <TableHead className="text-center font-black text-white/50 uppercase text-[10px] tracking-widest">{t('sanctionedPosts')}</TableHead>
                <TableHead className="text-center font-black text-white/50 uppercase text-[10px] tracking-widest">{t('status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courtData?.map((court) => (
                <TableRow key={court.id} className="hover:bg-primary/5 transition-all border-white/5 group cursor-pointer h-16">
                  <TableCell className="font-black text-white pl-6 group-hover:text-primary group-hover:translate-x-1 transition-all">
                    {getCourtName(court.name)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-muted-foreground group-hover:text-white transition-colors">
                    {court.totalPendingCases?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground/60 group-hover:text-white transition-colors">
                    {court.newCasesThisYear?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground/60 group-hover:text-white transition-colors">
                    {court.disposedCasesThisYear?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-4">
                      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden hidden sm:block border border-white/5">
                        <div 
                          className={`h-full transition-all duration-1000 group-hover:brightness-125 ${
                            court.disposalRatePercentage > 90 ? 'bg-primary' : 
                            court.disposalRatePercentage > 80 ? 'bg-amber-400' : 'bg-destructive'
                          }`} 
                          style={{ width: `${court.disposalRatePercentage}%` }}
                        />
                      </div>
                      <span className="font-black text-sm text-white group-hover:text-primary">{court.disposalRatePercentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="font-mono bg-secondary border-primary/20 text-primary px-3 py-1 font-black group-hover:bg-primary group-hover:text-black transition-all">
                      {court.occupiedJudgePosts}/{court.sanctionedJudgePosts}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Activity className={`h-4 w-4 transition-all duration-500 group-hover:scale-125 ${
                         court.statusIndicator === '🟢' ? 'text-primary' : 
                         court.statusIndicator === '🟡' ? 'text-amber-400' : 'text-destructive'
                      }`} />
                      <div className="relative flex h-2 w-2">
                        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                          court.statusIndicator === '🟢' ? 'bg-primary' : 
                          court.statusIndicator === '🟡' ? 'bg-amber-400' : 'bg-destructive'
                        }`} />
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${
                          court.statusIndicator === '🟢' ? 'bg-primary shadow-[0_0_8px_rgba(7,241,214,1)]' : 
                          court.statusIndicator === '🟡' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,1)]' : 'bg-destructive shadow-[0_0_8px_rgba(247,31,38,1)]'
                        }`} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!courtData || courtData.length === 0) && !isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground font-black uppercase tracking-widest opacity-50">
                    No Regional Nodes Connected
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
