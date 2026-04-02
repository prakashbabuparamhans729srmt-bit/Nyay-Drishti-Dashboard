import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/language-context";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { AIAssistant } from "@/components/dashboard/ai-assistant";

export const metadata: Metadata = {
  title: 'न्यायदृष्टि - न्यायिक डैशबोर्ड',
  description: 'Proactive Judicial System Monitoring and Analysis Dashboard',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;700&family=Noto+Sans+Bengali:wght@400;700&family=Noto+Sans+Tamil:wght@400;700&family=Noto+Sans+Telugu:wght@400;700&family=Noto+Sans+Gujarati:wght@400;700&family=Noto+Sans+Kannada:wght@400;700&family=Noto+Sans+Malayalam:wght@400;700&family=Noto+Sans+Oriya:wght@400;700&family=Noto+Sans+Gurmukhi:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground relative overflow-x-hidden">
        <FirebaseClientProvider>
          <LanguageProvider>
            {/* Global Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <div className="scan-line opacity-10" />
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(7,241,214,0.05)_0%,transparent_75%)]" />
              <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
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