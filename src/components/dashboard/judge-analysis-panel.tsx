"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award } from "lucide-react";

const topJudges = [
  { name: "न्यायमूर्ति ए.के. सिकरी", court: "दिल्ली उच्च", disposed: 2345, medal: "gold" },
  { name: "न्यायमूर्ति एस. रवींद्र भट", court: "सुप्रीम कोर्ट", disposed: 2189, medal: "silver" },
  { name: "न्यायमूर्ति बी.वी. नागरत्ना", court: "कर्नाटक उच्च", disposed: 1978, medal: "bronze" },
  { name: "न्यायमूर्ति दीपक मिश्रा", court: "मद्रास उच्च", disposed: 1856 },
  { name: "न्यायमूर्ति उदय उमेश ललित", court: "बॉम्बे उच्च", disposed: 1723 },
];

export function JudgeAnalysisPanel() {
  return (
    <Card className="border-muted shadow-2xl bg-card group">
      <CardHeader className="border-b border-muted bg-secondary/30">
        <CardTitle className="text-lg flex items-center justify-between text-primary">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform" />
            शीर्ष प्रदर्शन विश्लेषण
          </div>
          <Award className="h-4 w-4 text-muted-foreground animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {topJudges.map((judge, idx) => (
          <div key={judge.name} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/30 transition-all duration-300 group/judge cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-muted group-hover/judge:border-primary/50 transition-colors shadow-lg">
                  <AvatarFallback className="bg-background text-primary font-black text-lg">
                    {judge.name.split(' ').pop()?.[0]}
                  </AvatarFallback>
                </Avatar>
                {judge.medal && (
                  <span className={`absolute -top-2 -right-2 h-7 w-7 rounded-full flex items-center justify-center text-xs font-black shadow-xl border-2 border-card ${
                    judge.medal === 'gold' ? 'bg-yellow-400 text-yellow-900' :
                    judge.medal === 'silver' ? 'bg-slate-300 text-slate-700' : 'bg-orange-500 text-orange-900'
                  }`}>
                    <Star className="h-3 w-3 fill-current" />
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-white group-hover/judge:text-primary transition-colors leading-none">{judge.name}</p>
                <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">{judge.court} बेंच</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-primary drop-shadow-[0_0_8px_rgba(7,241,214,0.3)]">{judge.disposed.toLocaleString()}</p>
              <p className="text-[9px] uppercase text-muted-foreground font-black tracking-tighter">मामले निस्तारित</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
