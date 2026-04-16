"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Mic, Bot, User, Loader2, Zap, BrainCircuit, Headphones, History, Network, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { judicialAssistant } from "@/ai/flows/judicial-assistant";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({ title: t('micError'), variant: "destructive" });
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const result = await judicialAssistant({
        query: input,
        language,
        context: "High Precision A to Z Dashboard Interaction Mode - Active Neural Flow - Fully Calibrated"
      });
      
      const assistantMsg: Message = { role: 'assistant', content: result.response };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Assistant failed", error);
      toast({ title: "AI Assistant Offline", description: "तंत्र से संपर्क विफल रहा। कृपया पुन: प्रयास करें।", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-12 right-12 z-[60]">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-28 w-28 rounded-[3.5rem] bg-primary shadow-[0_0_80px_rgba(7,241,214,0.7)] hover:scale-110 transition-all group border-4 border-black/40 flex flex-col items-center justify-center gap-1 overflow-hidden active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <BrainCircuit className="h-12 w-12 text-black group-hover:rotate-[360deg] transition-all duration-1000 relative z-10" />
          <span className="text-[10px] font-black text-black/80 uppercase tracking-[0.3em] relative z-10">Neural Live</span>
          <span className="absolute -top-1 -right-1 flex h-8 w-8">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
            <span className="relative inline-flex rounded-full h-8 w-8 bg-white border-4 border-primary shadow-[0_0_20px_white]"></span>
          </span>
          <div className="scan-line opacity-0 group-hover:opacity-40" />
        </Button>
      ) : (
        <Card className="w-[500px] sm:w-[650px] h-[850px] border-primary/50 shadow-[0_0_150px_rgba(0,0,0,0.95)] bg-card/95 backdrop-blur-[40px] flex flex-col overflow-hidden neon-glow rounded-[5rem] animate-in zoom-in-95 slide-in-from-bottom-24 duration-700 border-2">
          <CardHeader className="bg-primary/10 border-b border-primary/30 flex flex-row items-center justify-between p-10">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-primary/20 rounded-[2rem] border-2 border-primary/50 animate-glow-pule shadow-[0_0_20px_rgba(7,241,214,0.4)]">
                <Bot className="h-10 w-10 text-primary" />
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-primary text-4xl font-black tracking-tighter text-neon uppercase italic">
                  {t('aiAssistantTitle')}
                </CardTitle>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-[0.4em] font-black border-primary/40 text-primary bg-primary/10 px-4 py-1 shadow-lg">Neural Core: Active Link</Badge>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(7,241,214,1)]" />
                    <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl hover:bg-white/10 border border-white/10 shadow-inner">
                <History className="h-6 w-6 opacity-60" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full h-14 w-14 hover:bg-destructive/30 hover:text-destructive transition-all border border-white/10 shadow-xl group">
                <X className="h-8 w-8 group-hover:rotate-90 transition-transform" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-10 overflow-hidden relative">
            <div className="scan-line opacity-10" />
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(7,241,214,0.2),transparent_70%)]" />
            <ScrollArea className="h-full pr-8">
              <div className="space-y-12">
                {messages.length === 0 && (
                  <div className="text-center py-32 space-y-10">
                    <div className="bg-primary/10 w-32 h-32 rounded-[3.5rem] flex items-center justify-center mx-auto mb-10 border-2 border-primary/30 animate-glow-pule relative shadow-2xl">
                       <Zap className="h-16 w-16 text-primary" />
                       <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full animate-pulse" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-3xl font-black text-white text-neon uppercase tracking-tighter italic">{t('askAnything')}</p>
                      <div className="flex items-center justify-center gap-6">
                        <div className="flex flex-col items-center gap-2 opacity-40">
                          <Cpu className="h-5 w-5 text-primary" />
                          <span className="text-[9px] uppercase font-black tracking-widest">Neural Link</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 opacity-40">
                          <Network className="h-5 w-5 text-primary" />
                          <span className="text-[9px] uppercase font-black tracking-widest">A-Z Sync</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 opacity-40">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                          <span className="text-[9px] uppercase font-black tracking-widest">Protocol 4.0</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-[0.5em] font-black opacity-50 mt-6">Advanced Indian Judicial Neural Intelligence Gateway</p>
                    </div>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6 duration-1000`}>
                    <div className={`max-w-[90%] p-8 rounded-[3.5rem] flex gap-6 shadow-3xl relative overflow-hidden group/msg ${
                      m.role === 'user' 
                        ? 'bg-primary text-black font-black shadow-[0_20px_40px_rgba(7,241,214,0.3)]' 
                        : 'bg-secondary/70 border border-white/10 text-white shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
                    }`}>
                      {m.role === 'assistant' && (
                        <div className="p-4 bg-primary/20 rounded-3xl h-fit border border-primary/40 shrink-0 shadow-lg group-hover/msg:rotate-12 transition-transform">
                          <Bot className="h-7 w-7 text-primary" />
                        </div>
                      )}
                      <p className="text-lg leading-relaxed font-medium">{m.content}</p>
                      {m.role === 'user' && (
                        <div className="p-4 bg-black/10 rounded-3xl h-fit shrink-0 shadow-lg">
                          <User className="h-7 w-7" />
                        </div>
                      )}
                      <div className="scan-line opacity-5" />
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start animate-pulse">
                    <div className="bg-secondary/70 p-8 rounded-[3.5rem] flex gap-6 border border-white/10 shadow-2xl">
                      <div className="p-4 bg-primary/20 rounded-3xl h-fit border border-primary/40">
                        <Loader2 className="h-7 w-7 animate-spin text-primary" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm text-primary font-black uppercase tracking-[0.6em] flex items-center text-neon">Neural Scanning...</span>
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">Crawl Unit Active: Node 01-A</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-10 bg-secondary/60 border-t border-white/10 backdrop-blur-3xl">
            <div className="flex w-full gap-5 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={startVoiceSearch}
                className={`shrink-0 h-20 w-20 rounded-[2rem] transition-all border-2 ${isListening ? 'bg-destructive border-destructive text-white animate-pulse shadow-[0_0_50px_rgba(247,31,38,0.8)]' : 'bg-primary/10 border-primary/40 hover:bg-primary/20 text-primary shadow-inner'}`}
              >
                {isListening ? <Mic className="h-9 w-9" /> : <MicOff className="h-9 w-9" />}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('typeMessage')}
                className="bg-background/90 border-white/10 focus-visible:ring-primary/60 rounded-[2rem] h-20 text-2xl font-medium shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] px-10 placeholder:text-muted-foreground/40"
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-primary h-20 w-20 text-black hover:bg-primary/90 shrink-0 rounded-[2rem] shadow-[0_20px_40px_rgba(7,241,214,0.4)] transition-all hover:scale-110 active:scale-90 border-2 border-black/10"
              >
                <Send className="h-9 w-9" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}