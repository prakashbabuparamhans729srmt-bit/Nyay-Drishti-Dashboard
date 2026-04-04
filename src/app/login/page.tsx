
"use client";

import { useState } from "react";
import { Scale, Mail, Lock, ArrowRight, UserCheck, Sparkles, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { useRouter } from "next/navigation";
import { initiateEmailSignIn, initiateEmailSignUp } from "@/firebase/non-blocking-login";
import { useAuth } from "@/firebase";

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const auth = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      initiateEmailSignUp(auth, email, password);
    } else {
      initiateEmailSignIn(auth, email, password);
    }
    // Simulation of A to Z Neural Entry
    router.push("/");
  };

  const handleGuestMode = () => {
    localStorage.setItem("nyay-guest-mode", "true");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4 atoz-active-flow data-stream-animation">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-destructive/5 rounded-full blur-[120px] animate-pulse" />
        <div className="neural-background-mesh opacity-20" />
      </div>

      <Card className="w-full max-w-md border-primary/20 bg-card/50 backdrop-blur-2xl shadow-[0_0_50px_rgba(7,241,214,0.1)] relative z-10 neon-glow rounded-[2.5rem] group">
        <div className="scan-line opacity-10" />
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto bg-primary/20 p-5 rounded-[2rem] w-fit group-hover:rotate-[360deg] transition-all duration-1000 border-2 border-primary/40 shadow-xl relative overflow-hidden">
            <Scale className="h-10 w-10 text-primary relative z-10" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-black tracking-tighter text-white uppercase italic text-neon">
              {t('loginTitle')}
            </CardTitle>
            <CardDescription className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] opacity-60">
              Accessing Node: Central Neural Command
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4">
                {t('emailLabel')}
              </label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-3 h-5 w-5 text-muted-foreground group-focus-within/input:text-primary transition-colors mt-0.5" />
                <Input
                  type="email"
                  placeholder="name@example.gov.in"
                  className="bg-secondary/50 border-white/5 pl-14 h-14 rounded-2xl focus:border-primary/50 transition-all font-medium text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4">
                {t('passwordLabel')}
              </label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-3 h-5 w-5 text-muted-foreground group-focus-within/input:text-primary transition-colors mt-0.5" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-secondary/50 border-white/5 pl-14 h-14 rounded-2xl focus:border-primary/50 transition-all font-medium text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-16 bg-primary text-black font-black text-xl rounded-[2rem] shadow-[0_15px_30px_rgba(7,241,214,0.3)] hover:scale-[1.02] transition-all border-2 border-black/10 flex items-center gap-4 group/btn"
            >
              {isSignUp ? t('signUpButton') : t('signInButton')}
              <BrainCircuit className="h-6 w-6 group-hover/btn:rotate-90 transition-transform" />
            </Button>
          </form>

          <div className="mt-10 flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={handleGuestMode}
              className="w-full h-14 border-primary/30 text-primary hover:bg-primary/10 rounded-[1.8rem] font-black uppercase tracking-widest text-[11px] gap-3"
            >
              <UserCheck className="h-5 w-5" />
              {t('guestModeButton')}
            </Button>

            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[10px] text-muted-foreground hover:text-primary transition-colors font-black uppercase tracking-[0.3em] text-center mt-4"
            >
              {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}
            </button>
          </div>
        </CardContent>

        <CardFooter className="justify-center pt-6 pb-10 border-t border-white/5 mt-6">
          <div className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.5em] text-white/20">
            <Sparkles className="h-4 w-4 animate-pulse" />
            SECURED BY NYAYDRISHTI NEURAL V4
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
