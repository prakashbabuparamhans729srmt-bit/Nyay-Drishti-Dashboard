"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Mic, MicOff, Bot, User, Loader2, Zap, BrainCircuit, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { judicialAssistant, JudicialAssistantOutput } from "@/ai/flows/judicial-assistant";
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
        context: "Dashboard view, Advanced User Interaction"
      });
      
      const assistantMsg: Message = { role: 'assistant', content: result.response };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Assistant failed", error);
      toast({ title: "AI Error", description: "सहायक से संपर्क विफल।", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[60]">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-20 w-20 rounded-[2rem] bg-primary shadow-[0_0_50px_rgba(7,241,214,0.6)] hover:scale-110 transition-all group border-4 border-black/20"
        >
          <BrainCircuit className="h-10 w-10 text-black group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-2 -right-2 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-white border-4 border-primary"></span>
          </span>
        </Button>
      ) : (
        <Card className="w-[420px] sm:w-[500px] h-[750px] border-primary/40 shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-card/95 backdrop-blur-3xl flex flex-col overflow-hidden neon-glow rounded-[3rem] animate-in zoom-in-90 slide-in-from-bottom-20 duration-500">
          <CardHeader className="bg-primary/10 border-b border-primary/20 flex flex-row items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-2xl border border-primary/40 animate-pulse">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-primary text-2xl font-black tracking-tighter">
                  {t('aiAssistantTitle')}
                </CardTitle>
                <Badge variant="outline" className="text-[9px] uppercase tracking-[0.3em] font-black border-primary/30 text-primary bg-primary/5 px-2">Neural Engine Live</Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full h-12 w-12 hover:bg-destructive/20 hover:text-destructive transition-all">
              <X className="h-6 w-6" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 p-6 overflow-hidden relative">
            <div className="scan-line opacity-5" />
            <ScrollArea className="h-full pr-4">
              <div className="space-y-6">
                {messages.length === 0 && (
                  <div className="text-center py-20 space-y-6">
                    <div className="bg-primary/10 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 border-2 border-primary/20 animate-glow-pule">
                      <Zap className="h-12 w-12 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-black text-white">{t('askAnything')}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">20+ भाषाओं का समर्थन</p>
                    </div>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                    <div className={`max-w-[90%] p-5 rounded-[2rem] flex gap-4 shadow-2xl ${
                      m.role === 'user' 
                        ? 'bg-primary text-black font-black' 
                        : 'bg-secondary/40 border border-white/5 text-white'
                    }`}>
                      {m.role === 'assistant' && <div className="p-2 bg-primary/20 rounded-xl h-fit border border-primary/30"><Bot className="h-5 w-5 shrink-0 text-primary" /></div>}
                      <p className="text-sm leading-relaxed">{m.content}</p>
                      {m.role === 'user' && <div className="p-2 bg-black/10 rounded-xl h-fit"><User className="h-5 w-5 shrink-0" /></div>}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start animate-pulse">
                    <div className="bg-secondary/40 p-5 rounded-[2rem] flex gap-4 border border-white/5">
                      <div className="p-2 bg-primary/20 rounded-xl h-fit"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
                      <span className="text-sm text-primary font-black uppercase tracking-widest">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-6 bg-secondary/30 border-t border-white/5">
            <div className="flex w-full gap-3 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={startVoiceInput}
                className={`shrink-0 h-14 w-14 rounded-2xl transition-all border border-white/5 ${isListening ? 'bg-destructive text-white animate-pulse shadow-[0_0_20px_rgba(247,31,38,0.5)]' : 'bg-primary/10 hover:bg-primary/20 text-primary'}`}
              >
                {isListening ? <Headphones className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('typeMessage')}
                className="bg-background/80 border-white/5 focus-visible:ring-primary rounded-2xl h-14 text-lg font-medium shadow-inner px-6"
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-primary h-14 w-14 text-black hover:bg-primary/90 shrink-0 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <Send className="h-6 w-6" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}