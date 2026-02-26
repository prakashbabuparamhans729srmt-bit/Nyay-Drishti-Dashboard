"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Pie, PieChart, Cell, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const trendData = [
  { year: "2022", pending: 3.8 },
  { year: "2023", pending: 4.1 },
  { year: "2024", pending: 4.3 },
  { year: "2025", pending: 4.4 },
  { year: "2026", pending: 4.5 },
];

const typeData = [
  { name: "दीवानी मामले", value: 45, color: "hsl(var(--chart-1))" },
  { name: "आपराधिक मामले", value: 30, color: "hsl(var(--chart-4))" },
  { name: "संवैधानिक मामले", value: 10, color: "hsl(var(--chart-3))" },
  { name: "रिट याचिकाएं", value: 8, color: "hsl(var(--chart-2))" },
  { name: "अन्य", value: 7, color: "hsl(var(--chart-5))" },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">लंबित मामलों का रुझान</CardTitle>
          <CardDescription>पिछले 5 वर्षों का वार्षिक डेटा (करोड़ में)</CardDescription>
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
                        <div className="bg-white p-3 shadow-xl rounded-lg border text-sm">
                          <p className="font-bold text-primary">{payload[0].payload.year}</p>
                          <p className="text-muted-foreground">लंबित मामले: <span className="font-bold text-foreground">{payload[0].value} करोड़</span></p>
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

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">मामलों का प्रकारवार विभाजन</CardTitle>
          <CardDescription>वर्तमान लंबित मामलों का श्रेणी-आधारित प्रतिशत</CardDescription>
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
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
