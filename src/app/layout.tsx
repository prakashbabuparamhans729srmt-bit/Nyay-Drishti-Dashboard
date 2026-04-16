import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/language-context";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { AIAssistant } from "@/components/dashboard/ai-assistant";
import { Activity, Cpu, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: 'न्यायदृष्टि - न्यायिक डैशबोर्ड',
  description: 'Proactive Judicial System Monitoring and Analysis Dashboard - A to Z Neural Flow Activated',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground relative overflow-x-hidden selection:bg-primary selection:text-black">
        <FirebaseClientProvider>
          <LanguageProvider>
            {/* Global Background Effects - A to Z Active Flow */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <div className="scan-line opacity-10" />
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(7,241,214,0.1)_0%,transparent_75%)]" />
              <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute inset-0 neural-wire opacity-[0.08]" />
              <div className="neural-overlay" />
            </div>

            {/* A to Z Flow Global Indicator */}
            <div className="fixed top-28 right-4 z-[100] pointer-events-none flex flex-col gap-2 opacity-40 hover:opacity-100 transition-opacity">
              <div className="bg-black/80 border border-primary/30 rounded-full px-4 py-1.5 flex items-center gap-3 backdrop-blur-md shadow-[0_0_20px_rgba(7,241,214,0.2)]">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">A TO Z FLOW ACTIVE</span>
              </div>
              <div className="flex justify-end gap-2 pr-2">
                <Cpu className="h-3 w-3 text-primary/50 animate-pulse" />
                <Zap className="h-3 w-3 text-primary/50 animate-pulse delay-100" />
                <Activity className="h-3 w-3 text-primary/50 animate-pulse delay-200" />
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col min-h-screen">
              {children}
            </div>
            
            <AIAssistant />
            <Toaster />
          </LanguageProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}