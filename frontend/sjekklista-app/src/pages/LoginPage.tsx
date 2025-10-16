import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      toast("Feil brukernavn/passord");
    } else {
      toast("Innlogging vellykket.");
      navigate("/");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast("Vennligst skriv inn e‑postadressen din først.");
      return;
    }
    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetLoading(false);

    if (error) {
      toast("Kunne ikke sende tilbakestillingslenke: " + error.message);
    } else {
      toast("En e‑post for tilbakestilling av passord er sendt.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-purple px-4">
      <div className="w-full max-w-md">
        {/* Branding header */}
        <div className="mb-6 text-center text-white">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Sjekklista
          </h1>
          <p className="mt-1 text-sm opacity-80">by Nordby Solutions</p>
        </div>

        {/* On mobile: simple white box; on desktop: card with shadow */}
        <Card className="w-full shadow-none sm:shadow-lg sm:rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-lg sm:text-xl">
              Innlogging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E‑post</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Passord</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-base"
                />
              </div>

              <Button
                className="w-full py-3 text-base"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logger inn..." : "Logg inn"}
              </Button>

              <Button
                variant="link"
                className="w-full text-sm text-white underline sm:text-brand-purple sm:no-underline sm:hover:underline"
                onClick={handleResetPassword}
                disabled={resetLoading}
              >
                {resetLoading ? "Sender lenke..." : "Tilbakestill passord"}
              </Button>

              {/* Link to signup */}
              <p className="text-center text-sm text-gray-100 sm:text-gray-600 mt-2">
                Har du ikke en konto?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="font-medium underline sm:text-brand-purple sm:no-underline sm:hover:underline"
                >
                  Registrer deg
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
