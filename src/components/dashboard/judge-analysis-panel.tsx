"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

const topJudges = [
  { name: "न्यायमूर्ति ए.के. सिकरी", court: "दिल्ली उच्च", disposed: 2345, medal: "gold" },
  { name: "न्यायमूर्ति एस. रवींद्र भट", court: "सुप्रीम कोर्ट", disposed: 2189, medal: "silver" },
  { name: "न्यायमूर्ति बी.वी. नागरत्ना", court: "कर्नाटक उच्च", disposed: 1978, medal: "bronze" },
  { name: "न्यायमूर्ति दीपक मिश्रा", court: "मद्रास उच्च", disposed: 1856 },
  { name: "न्यायमूर्ति उदय उमेश ललित", court: "बॉम्बे उच्च", disposed: 1723 },
];

export function JudgeAnalysisPanel() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          शीर्ष प्रदर्शन करने वाले न्यायाधीश
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topJudges.map((judge, idx) => (
          <div key={judge.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors border border-transparent hover:border-accent/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                    {judge.name.split(' ').pop()?.[0]}
                  </AvatarFallback>
                </Avatar>
                {judge.medal && (
                  <span className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ${
                    judge.medal === 'gold' ? 'bg-yellow-400 text-yellow-900' :
                    judge.medal === 'silver' ? 'bg-gray-300 text-gray-700' : 'bg-orange-400 text-orange-900'
                  }`}>
                    {idx + 1}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-bold leading-none">{judge.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{judge.court} न्यायालय</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{judge.disposed.toLocaleString()}</p>
              <p className="text-[10px] uppercase text-muted-foreground font-semibold">मामले निस्तारित</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
