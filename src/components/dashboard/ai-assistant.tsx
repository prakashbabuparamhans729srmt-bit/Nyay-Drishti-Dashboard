"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Mic, MicOff, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { judicialAssistant, JudicialAssistantOutput } from "@/ai/flows/judicial-assistant";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

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
        context: "Dashboard view, Administrator role"
      });
      
      const assistantMsg: Message = { role: 'assistant', content: result.response };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Assistant failed", error);
      toast({ title: "AI Error", description: "Could not get response", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-primary shadow-[0_0_30px_rgba(7,241,214,0.5)] hover:scale-110 transition-all group"
        >
          <Sparkles className="h-8 w-8 text-black group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        </Button>
      ) : (
        <Card className="w-[380px] sm:w-[450px] h-[600px] border-primary/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-card/95 backdrop-blur-2xl flex flex-col overflow-hidden neon-glow rounded-[2rem]">
          <CardHeader className="bg-primary/10 border-b border-primary/20 flex flex-row items-center justify-between p-4">
            <CardTitle className="text-primary flex items-center gap-3 font-black tracking-tighter">
              <Sparkles className="h-5 w-5 animate-pulse" />
              {t('aiAssistantTitle')}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 p-4 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-12 space-y-4">
                    <div className="bg-primary/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <Bot className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground font-bold">{t('askAnything')}</p>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl flex gap-3 ${
                      m.role === 'user' 
                        ? 'bg-primary text-black font-medium' 
                        : 'bg-secondary/50 border border-muted/30 text-white'
                    }`}>
                      {m.role === 'assistant' && <Bot className="h-5 w-5 shrink-0 text-primary" />}
                      <p className="text-sm leading-relaxed">{m.content}</p>
                      {m.role === 'user' && <User className="h-5 w-5 shrink-0" />}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary/50 p-4 rounded-2xl flex gap-3">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground italic">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 bg-secondary/20 border-t border-muted/20">
            <div className="flex w-full gap-2 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={startVoiceInput}
                className={`shrink-0 rounded-xl transition-all ${isListening ? 'bg-destructive/20 text-destructive animate-pulse' : 'hover:bg-primary/20 text-primary'}`}
              >
                {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('typeMessage')}
                className="bg-background border-muted/50 focus-visible:ring-primary rounded-xl h-12"
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-primary text-black hover:bg-primary/90 shrink-0 rounded-xl"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
