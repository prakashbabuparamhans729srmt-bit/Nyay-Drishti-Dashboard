"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Pie, PieChart, Cell, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useLanguage } from "@/lib/language-context";

const trendData = [
  { year: "2022", pending: 3.8 },
  { year: "2023", pending: 4.1 },
  { year: "2024", pending: 4.3 },
  { year: "2025", pending: 4.4 },
  { year: "2026", pending: 4.5 },
];

export function DashboardCharts() {
  const { t } = useLanguage();

  const typeData = [
    { name: t('home') === 'मुखपृष्ठ' ? "दिवाणी प्रकरणे" : "दीवानी मामले", value: 45, color: "hsl(var(--chart-1))" },
    { name: t('home') === 'मुखपृष्ठ' ? "फौजदारी प्रकरणे" : "आपराधिक मामले", value: 30, color: "hsl(var(--chart-4))" },
    { name: t('home') === 'मुखपृष्ठ' ? "घटनात्मक प्रकरणे" : "संवैधानिक मामले", value: 10, color: "hsl(var(--chart-3))" },
    { name: t('home') === 'मुखपृष्ठ' ? "रिट याचिका" : "रिट याचिकाएं", value: 8, color: "hsl(var(--chart-2))" },
    { name: t('home') === 'मुखपृष्ठ' ? "इतर" : "अन्य", value: 7, color: "hsl(var(--chart-5))" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="border-none shadow-md bg-card/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-lg text-primary font-black">{t('yearTrend')}</CardTitle>
          <CardDescription className="text-muted-foreground/60 italic">© NyayDrishti Data Sync</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} domain={[3, 5]} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card p-3 shadow-2xl rounded-2xl border border-primary/20 text-sm">
                          <p className="font-bold text-primary">{payload[0].payload.year}</p>
                          <p className="text-white">लंबित मामले: <span className="font-bold text-primary">{payload[0].value} Cr</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="pending" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorPending)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-card/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-lg text-primary font-black">{t('caseType')}</CardTitle>
          <CardDescription className="text-muted-foreground/60 italic">Classification Logic v4.0</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
