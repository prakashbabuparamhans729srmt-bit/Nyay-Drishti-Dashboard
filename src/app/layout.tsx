
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/language-context";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { AIAssistant } from "@/components/dashboard/ai-assistant";
import { Activity, Cpu, Zap, Radio, Database } from "lucide-react";

export const metadata: Metadata = {
  title: 'न्यायदृष्टि - न्यायिक डैशबोर्ड',
  description: 'Proactive Judicial System Monitoring and Analysis Dashboard - A to Z Neural Flow Activated',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'न्यायदृष्टि',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#07F1D6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
} : Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="https://picsum.photos/seed/nyaylogo/180/180" />
        <meta name="mobile-web-app-capable" content="yes" />
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

            {/* A to Z Flow Global Indicator - Fully Activated and Firebase Connected */}
            <div className="fixed top-28 right-4 z-[100] pointer-events-none flex flex-col gap-3 opacity-60 hover:opacity-100 transition-all duration-500">
              <div className="bg-black/90 border-2 border-primary/50 rounded-2xl px-5 py-2.5 flex items-center gap-4 backdrop-blur-xl shadow-[0_0_30px_rgba(7,241,214,0.4)] group">
                <div className="relative">
                  <div className="h-3 w-3 rounded-full bg-primary animate-ping" />
                  <div className="absolute inset-0 h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_rgba(7,241,214,1)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">A TO Z FLOW ACTIVE</span>
                  <span className="text-[8px] font-bold text-white/40 tracking-widest uppercase">Firebase Cloud Sync: 100%</span>
                </div>
              </div>
              <div className="flex justify-end gap-3 pr-2">
                <div className="bg-secondary/80 p-1.5 rounded-lg border border-white/5 backdrop-blur-md">
                   <Cpu className="h-3.5 w-3.5 text-primary animate-pulse" />
                </div>
                <div className="bg-secondary/80 p-1.5 rounded-lg border border-white/5 backdrop-blur-md">
                   <Zap className="h-3.5 w-3.5 text-primary animate-pulse delay-75" />
                </div>
                <div className="bg-secondary/80 p-1.5 rounded-lg border border-white/5 backdrop-blur-md">
                   <Radio className="h-3.5 w-3.5 text-primary animate-pulse delay-150" />
                </div>
                <div className="bg-secondary/80 p-1.5 rounded-lg border border-white/5 backdrop-blur-md">
                   <Database className="h-3.5 w-3.5 text-primary animate-pulse delay-300" />
                </div>
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
