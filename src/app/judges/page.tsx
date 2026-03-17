
"use client";

import { Header } from "@/components/dashboard/header";
import { JudgeAnalysisPanel } from "@/components/dashboard/judge-analysis-panel";
import { Users, Award, Search, ArrowLeft, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function JudgesPage() {
  const router = useRouter();
  const { t } = useLanguage();

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
              <Users className="h-8 w-8 text-primary" />
              {t('judges')} {t('profile')}
            </h1>
          </div>
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('searchPlaceholder')} className="pl-10 rounded-full bg-secondary border-muted/20" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card border-primary/20 shadow-2xl rounded-[2rem] neon-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Trophy className="h-6 w-6" />
                  न्यायाधीश प्रदर्शन विश्लेषण
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground italic">यहाँ देश भर के शीर्ष प्रदर्शन करने वाले न्यायाधीशों की विस्तृत सूची और उनके द्वारा निस्तारित मामलों का विश्लेषण है।</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-secondary/50 border border-muted">
                    <h3 className="text-primary font-black mb-2">कुल सक्रिय न्यायाधीश</h3>
                    <p className="text-3xl font-black">1,079</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-secondary/50 border border-muted">
                    <h3 className="text-primary font-black mb-2">औसत निस्तारण दर</h3>
                    <p className="text-3xl font-black">88.5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/50 rounded-2xl border border-white/5 p-6 hover:border-primary/50 transition-all">
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">उत्कृष्टता पुरस्कार 2024</h3>
                  <p className="text-sm text-muted-foreground">उच्चतम निस्तारण दर के लिए मान्यता प्राप्त न्यायाधीशों का विवरण।</p>
                </Card>
                <Card className="bg-card/50 rounded-2xl border border-white/5 p-6 hover:border-primary/50 transition-all">
                  <Users className="h-10 w-10 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">कार्यभार प्रबंधन</h3>
                  <p className="text-sm text-muted-foreground">मामलों के वितरण और जजों के कार्यभार की निगरानी रिपोर्ट।</p>
                </Card>
            </div>
          </div>
          <div>
            <JudgeAnalysisPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
