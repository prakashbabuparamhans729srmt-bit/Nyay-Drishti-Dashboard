"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Mic, Bot, User, Loader2, Zap, BrainCircuit, Headphones } from "lucide-react";
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
        context: "High Precision Dashboard Interaction Mode - A to Z Active Flow"
      });
      
      const assistantMsg: Message = { role: 'assistant', content: result.response };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Assistant failed", error);
      toast({ title: "AI Assistant Offline", description: "तंत्र से संपर्क विफल रहा।", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[60]">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-24 w-24 rounded-[3rem] bg-primary shadow-[0_0_60px_rgba(7,241,214,0.6)] hover:scale-110 transition-all group border-4 border-black/30 flex flex-col items-center justify-center gap-1"
        >
          <BrainCircuit className="h-10 w-10 text-black group-hover:rotate-[360deg] transition-all duration-1000" />
          <span className="text-[8px] font-black text-black/60 uppercase tracking-widest">Neural Live</span>
          <span className="absolute -top-1 -right-1 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-white border-4 border-primary shadow-[0_0_10px_white]"></span>
          </span>
        </Button>
      ) : (
        <Card className="w-[450px] sm:w-[550px] h-[800px] border-primary/40 shadow-[0_0_120px_rgba(0,0,0,0.9)] bg-card/95 backdrop-blur-3xl flex flex-col overflow-hidden neon-glow rounded-[4rem] animate-in zoom-in-90 slide-in-from-bottom-20 duration-500">
          <CardHeader className="bg-primary/10 border-b border-primary/20 flex flex-row items-center justify-between p-8">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-primary/20 rounded-[1.5rem] border border-primary/40 animate-glow-pule">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-primary text-3xl font-black tracking-tighter text-neon">
                  {t('aiAssistantTitle')}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-[9px] uppercase tracking-[0.3em] font-black border-primary/30 text-primary bg-primary/5 px-3 py-0.5">Quantum Core Active</Badge>
                  <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(7,241,214,1)]" />
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full h-14 w-14 hover:bg-destructive/20 hover:text-destructive transition-all border border-white/5">
              <X className="h-7 w-7" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 p-8 overflow-hidden relative">
            <div className="scan-line opacity-10" />
            <ScrollArea className="h-full pr-6">
              <div className="space-y-8">
                {messages.length === 0 && (
                  <div className="text-center py-28 space-y-8">
                    <div className="bg-primary/10 w-28 h-28 rounded-[3rem] flex items-center justify-center mx-auto mb-8 border-2 border-primary/20 animate-glow-pule relative">
                       <Zap className="h-14 w-14 text-primary" />
                       <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                    </div>
                    <div className="space-y-3">
                      <p className="text-2xl font-black text-white text-neon">{t('askAnything')}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-black opacity-50">Global Indian Judicial Language Support</p>
                    </div>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                    <div className={`max-w-[90%] p-6 rounded-[2.5rem] flex gap-5 shadow-2xl relative overflow-hidden ${
                      m.role === 'user' 
                        ? 'bg-primary text-black font-black' 
                        : 'bg-secondary/60 border border-white/10 text-white'
                    }`}>
                      {m.role === 'assistant' && (
                        <div className="p-3 bg-primary/20 rounded-2xl h-fit border border-primary/30">
                          <Bot className="h-6 w-6 shrink-0 text-primary" />
                        </div>
                      )}
                      <p className="text-base leading-relaxed">{m.content}</p>
                      {m.role === 'user' && (
                        <div className="p-3 bg-black/10 rounded-2xl h-fit">
                          <User className="h-6 w-6 shrink-0" />
                        </div>
                      )}
                      <div className="scan-line opacity-5" />
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start animate-pulse">
                    <div className="bg-secondary/60 p-6 rounded-[2.5rem] flex gap-5 border border-white/10">
                      <div className="p-3 bg-primary/20 rounded-2xl h-fit">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                      <span className="text-sm text-primary font-black uppercase tracking-[0.5em] flex items-center">Neural Scanning...</span>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-8 bg-secondary/50 border-t border-white/10">
            <div className="flex w-full gap-4 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={startVoiceInput}
                className={`shrink-0 h-16 w-16 rounded-[1.5rem] transition-all border-2 ${isListening ? 'bg-destructive border-destructive text-white animate-pulse shadow-[0_0_30px_rgba(247,31,38,0.7)]' : 'bg-primary/10 border-primary/30 hover:bg-primary/20 text-primary'}`}
              >
                {isListening ? <Headphones className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('typeMessage')}
                className="bg-background/90 border-white/10 focus-visible:ring-primary rounded-[1.5rem] h-16 text-xl font-medium shadow-inner px-8"
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-primary h-16 w-16 text-black hover:bg-primary/90 shrink-0 rounded-[1.5rem] shadow-[0_15px_30px_rgba(7,241,214,0.3)] transition-all hover:scale-110 active:scale-90"
              >
                <Send className="h-7 w-7" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}