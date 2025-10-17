import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { NonAuthenticatedLayout } from "@/components/NonAuthenticatedLayout";

export const LoginPage = () => {
  const { t } = useTranslation();
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
      toast(t("login.invalidCredentials", "Feil brukernavn/passord"));
    } else {
      toast(t("login.success", "Innlogging vellykket."));
      navigate("/");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast(
        t(
          "login.enterEmailFirst",
          "Vennligst skriv inn e‑postadressen din først."
        )
      );
      return;
    }
    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetLoading(false);

    if (error) {
      toast(
        t("login.resetLinkError", "Kunne ikke sende tilbakestillingslenke:") +
          " " +
          error.message
      );
    } else {
      toast(
        t(
          "login.resetLinkSent",
          "En e‑post for tilbakestilling av passord er sendt."
        )
      );
    }
  };

  return (
    <NonAuthenticatedLayout>
      <Card className="w-full shadow-none sm:shadow-lg sm:rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg sm:text-xl">
            {t("login.title", "Innlogging")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("login.email", "E‑post")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("login.emailPlaceholder", "you@example.com")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("login.password", "Passord")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("login.passwordPlaceholder", "••••••••")}
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
              {loading
                ? t("login.loggingIn", "Logger inn...")
                : t("login.loginButton", "Logg inn")}
            </Button>

            <Button
              variant="link"
              className="w-full text-sm text-white underline sm:text-brand-purple sm:no-underline sm:hover:underline"
              onClick={handleResetPassword}
              disabled={resetLoading}
            >
              {resetLoading
                ? t("login.sendingLink", "Sender lenke...")
                : t("login.resetPassword", "Tilbakestill passord")}
            </Button>

            {/* Link to signup */}
            <p className="text-center text-sm text-gray-100 sm:text-gray-600 mt-2">
              {t("login.noAccount", "Har du ikke en konto?")}{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-medium underline sm:text-brand-purple sm:no-underline sm:hover:underline"
              >
                {t("login.signup", "Registrer deg")}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </NonAuthenticatedLayout>
  );
};
