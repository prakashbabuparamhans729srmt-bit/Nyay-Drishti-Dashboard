import { Header } from "@/components/dashboard/header";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { CourtDetailsTable } from "@/components/dashboard/court-details-table";
import { JudgeAnalysisPanel } from "@/components/dashboard/judge-analysis-panel";
import { AlertsAndNotifications } from "@/components/dashboard/alerts-and-notifications";
import { AIBottleneckAnalysisTrigger } from "@/components/dashboard/ai-bottleneck-analysis-trigger";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default function NyayDrishtiDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8 max-w-7xl">
        <section>
          <StatsOverview />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DashboardCharts />
            <CourtDetailsTable />
          </div>
          <div className="space-y-8">
            <AlertsAndNotifications />
            <JudgeAnalysisPanel />
            <AIBottleneckAnalysisTrigger />
          </div>
        </section>

        <section>
          <QuickActions />
        </section>
      </main>

      <footer className="py-6 border-t bg-white/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} न्यायदृष्टि डैशबोर्ड - न्यायिक प्रणाली की पारदर्शिता और दक्षता के लिए।
        </div>
      </footer>
    </div>
  );
}
