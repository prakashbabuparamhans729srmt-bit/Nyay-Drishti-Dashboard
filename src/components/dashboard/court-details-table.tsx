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
import { ExternalLink, Database, Activity, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const courtData = [
  {
    name: "सुप्रीम कोर्ट",
    pending: "78,342",
    new: "8,234",
    disposed: "7,891",
    rate: 95,
    posts: "34/34",
    status: "success",
  },
  {
    name: "इलाहाबाद उच्च न्यायालय",
    pending: "8,92,345",
    new: "1,23,456",
    disposed: "98,234",
    rate: 79,
    posts: "120/160",
    status: "critical",
  },
  {
    name: "मद्रास उच्च न्यायालय",
    pending: "4,56,789",
    new: "67,890",
    disposed: "56,789",
    rate: 83,
    posts: "85/100",
    status: "warning",
  },
  {
    name: "बॉम्बे उच्च न्यायालय",
    pending: "5,23,456",
    new: "78,901",
    disposed: "67,890",
    rate: 86,
    posts: "94/110",
    status: "warning",
  },
  {
    name: "दिल्ली उच्च न्यायालय",
    pending: "3,89,234",
    new: "56,789",
    disposed: "52,345",
    rate: 92,
    posts: "60/60",
    status: "success",
  },
];

export function CourtDetailsTable() {
  return (
    <Card className="border-white/5 shadow-3xl overflow-hidden bg-card/50 backdrop-blur-sm neon-glow">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-secondary/30 px-6 py-5">
        <CardTitle className="text-xl font-black text-primary flex items-center gap-3">
          <Database className="h-6 w-6 animate-pulse" />
          न्यायालयवार डेटा तालिका
        </CardTitle>
        <div className="flex gap-2">
           <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-all group">
             <RefreshCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-700" />
           </Button>
           <Button variant="outline" size="sm" className="gap-2 border-primary/30 text-primary hover:bg-primary hover:text-black transition-all rounded-full font-black px-4">
             विस्तृत रिपोर्ट <ExternalLink className="h-4 w-4" />
           </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow className="hover:bg-transparent border-white/5">
              <TableHead className="font-black text-white/50 uppercase text-[10px] tracking-widest py-6 pl-6">न्यायालय</TableHead>
              <TableHead className="text-right font-black text-white/50 uppercase text-[10px] tracking-widest">लंबित</TableHead>
              <TableHead className="text-right font-black text-white/50 uppercase text-[10px] tracking-widest">नए</TableHead>
              <TableHead className="text-right font-black text-white/50 uppercase text-[10px] tracking-widest">निस्तारित</TableHead>
              <TableHead className="text-right font-black text-white/50 uppercase text-[10px] tracking-widest">निस्तारण दर</TableHead>
              <TableHead className="text-center font-black text-white/50 uppercase text-[10px] tracking-widest">स्वीकृत पद</TableHead>
              <TableHead className="text-center font-black text-white/50 uppercase text-[10px] tracking-widest">स्थिति</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courtData.map((court) => (
              <TableRow key={court.name} className="hover:bg-primary/5 transition-all border-white/5 group cursor-pointer h-16">
                <TableCell className="font-black text-white pl-6 group-hover:text-primary group-hover:translate-x-1 transition-all">
                  {court.name}
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-muted-foreground group-hover:text-white transition-colors">
                  {court.pending}
                </TableCell>
                <TableCell className="text-right font-mono text-muted-foreground/60 group-hover:text-white transition-colors">
                  {court.new}
                </TableCell>
                <TableCell className="text-right font-mono text-muted-foreground/60 group-hover:text-white transition-colors">
                  {court.disposed}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-4">
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden hidden sm:block border border-white/5">
                      <div 
                        className={`h-full transition-all duration-1000 group-hover:brightness-125 ${
                          court.rate > 90 ? 'bg-primary' : 
                          court.rate > 80 ? 'bg-amber-400' : 'bg-destructive'
                        }`} 
                        style={{ width: `${court.rate}%` }}
                      />
                    </div>
                    <span className="font-black text-sm text-white group-hover:text-primary">{court.rate}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="font-mono bg-secondary border-primary/20 text-primary px-3 py-1 font-black group-hover:bg-primary group-hover:text-black transition-all">
                    {court.posts}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Activity className={`h-4 w-4 transition-all duration-500 group-hover:scale-125 ${
                       court.status === 'success' ? 'text-primary' : 
                       court.status === 'warning' ? 'text-amber-400' : 'text-destructive'
                    }`} />
                    <div className="relative flex h-2 w-2">
                      <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                        court.status === 'success' ? 'bg-primary' : 
                        court.status === 'warning' ? 'bg-amber-400' : 'bg-destructive'
                      }`} />
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${
                        court.status === 'success' ? 'bg-primary shadow-[0_0_8px_rgba(7,241,214,1)]' : 
                        court.status === 'warning' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,1)]' : 'bg-destructive shadow-[0_0_8px_rgba(247,31,38,1)]'
                      }`} />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}