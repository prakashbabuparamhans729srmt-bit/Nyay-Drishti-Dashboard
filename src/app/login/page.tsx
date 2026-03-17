"use client";

import { useState } from "react";
import { Scale, Mail, Lock, ArrowRight, UserCheck, Sparkles } from "lucide-react";
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
    // Note: In a real scenario, we'd wait for onAuthStateChanged in layout to redirect.
    // For MVP/Simulation, we redirect to home.
    router.push("/");
  };

  const handleGuestMode = () => {
    localStorage.setItem("nyay-guest-mode", "true");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-destructive/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <Card className="w-full max-w-md border-primary/20 bg-card/50 backdrop-blur-2xl shadow-[0_0_50px_rgba(7,241,214,0.1)] relative z-10 neon-glow rounded-[2.5rem]">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto bg-primary/20 p-4 rounded-3xl w-fit group-hover:rotate-12 transition-transform duration-500">
            <Scale className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-black tracking-tighter text-white">
              {t('loginTitle')}
            </CardTitle>
            <CardDescription className="text-muted-foreground font-medium">
              {t('loginSubtitle')}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">
                {t('emailLabel')}
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="bg-secondary/50 border-muted/30 pl-12 h-12 rounded-2xl focus:border-primary/50 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">
                {t('passwordLabel')}
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-secondary/50 border-muted/30 pl-12 h-12 rounded-2xl focus:border-primary/50 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-primary text-background font-black text-lg rounded-2xl shadow-[0_10px_20px_rgba(7,241,214,0.2)] hover:scale-[1.02] transition-all"
            >
              {isSignUp ? t('signUpButton') : t('signInButton')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-8 flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={handleGuestMode}
              className="w-full h-12 border-primary/30 text-primary hover:bg-primary/10 rounded-2xl font-bold gap-2"
            >
              <UserCheck className="h-4 w-4" />
              {t('guestModeButton')}
            </Button>

            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold text-center underline underline-offset-4"
            >
              {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}
            </button>
          </div>
        </CardContent>

        <CardFooter className="justify-center pt-0">
          <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-white/20">
            <Sparkles className="h-3 w-3" />
            SECURED BY NYAYDRISHTI AI
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
