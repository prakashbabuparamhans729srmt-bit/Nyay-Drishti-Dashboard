
"use client";

import { Header } from "@/components/dashboard/header";
import { CourtDetailsTable } from "@/components/dashboard/court-details-table";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { Search, Filter, Database, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

export default function CourtsPage() {
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
              <Database className="h-8 w-8 text-primary" />
              {t('courts')} {t('reports')}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t('searchPlaceholder')} className="pl-10 rounded-full bg-secondary border-muted/20" />
            </div>
            <Button variant="outline" className="rounded-full gap-2 border-primary/20">
              <Filter className="h-4 w-4 text-primary" /> {t('settings')}
            </Button>
          </div>
        </div>

        <section>
           <StatsOverview />
        </section>

        <section className="bg-card/30 backdrop-blur-xl rounded-[2rem] border border-white/5 p-6 shadow-2xl">
           <CourtDetailsTable />
        </section>
      </main>
    </div>
  );
}
