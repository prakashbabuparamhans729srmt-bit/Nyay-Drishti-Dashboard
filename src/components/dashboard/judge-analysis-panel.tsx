"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award, TrendingUp } from "lucide-react";

const topJudges = [
  { name: "न्यायमूर्ति ए.के. सिकरी", court: "दिल्ली उच्च", disposed: 2345, medal: "gold" },
  { name: "न्यायमूर्ति एस. रवींद्र भट", court: "सुप्रीम कोर्ट", disposed: 2189, medal: "silver" },
  { name: "न्यायमूर्ति बी.वी. नागरत्ना", court: "कर्नाटक उच्च", disposed: 1978, medal: "bronze" },
  { name: "न्यायमूर्ति दीपक मिश्रा", court: "मद्रास उच्च", disposed: 1856 },
  { name: "न्यायमूर्ति उदय उमेश ललित", court: "बॉम्बे उच्च", disposed: 1723 },
];

export function JudgeAnalysisPanel() {
  return (
    <Card className="border-white/5 shadow-2xl bg-card group neon-glow">
      <CardHeader className="border-b border-white/5 bg-secondary/40 px-6 py-5">
        <CardTitle className="text-lg flex items-center justify-between text-primary">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-primary group-hover:rotate-12 group-hover:scale-125 transition-all duration-500" />
            शीर्ष प्रदर्शन विश्लेषण
          </div>
          <Award className="h-5 w-5 text-muted-foreground animate-bounce cursor-help" title="मान्यता प्राप्त" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {topJudges.map((judge, idx) => (
          <div key={judge.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-primary/20 transition-all duration-500 group/judge cursor-pointer relative overflow-hidden">
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <Avatar className="h-14 w-14 border-2 border-white/10 group-hover/judge:border-primary group-hover/judge:rotate-3 transition-all duration-500 shadow-xl">
                  <AvatarFallback className="bg-background text-primary font-black text-xl">
                    {judge.name.split(' ').pop()?.[0]}
                  </AvatarFallback>
                </Avatar>
                {judge.medal && (
                  <span className={`absolute -top-1 -right-1 h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-black shadow-2xl border-2 border-card z-20 animate-in zoom-in-50 duration-500 ${
                    judge.medal === 'gold' ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-black' :
                    judge.medal === 'silver' ? 'bg-gradient-to-br from-slate-200 to-slate-400 text-black' : 'bg-gradient-to-br from-orange-400 to-orange-700 text-black'
                  }`}>
                    <Star className="h-4 w-4 fill-current" />
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-white group-hover/judge:text-primary transition-all duration-300 leading-none">{judge.name}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[9px] bg-secondary hover:bg-primary hover:text-black transition-colors py-0 px-2 font-black uppercase tracking-wider">{judge.court}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right relative z-10">
              <div className="flex items-center justify-end gap-1.5 mb-1 text-primary">
                <TrendingUp className="h-3 w-3" />
                <p className="text-xl font-black tracking-tighter drop-shadow-[0_0_10px_rgba(7,241,214,0.4)]">{judge.disposed.toLocaleString()}</p>
              </div>
              <p className="text-[9px] uppercase text-muted-foreground font-black tracking-widest">निस्तारित मामले</p>
            </div>
            {/* Background interactive element */}
            <div className="absolute top-0 right-0 w-24 h-full bg-primary/5 -skew-x-12 translate-x-32 group-hover/judge:translate-x-16 transition-transform duration-700" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}