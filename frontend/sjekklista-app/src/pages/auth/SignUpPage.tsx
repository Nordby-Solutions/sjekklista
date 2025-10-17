import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NonAuthenticatedLayout } from "@/components/NonAuthenticatedLayout";

export const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (password !== confirmPassword) {
      setError(t("signup.passwordsDontMatch", "Passordene er ikke like"));
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <NonAuthenticatedLayout>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            {t("signup.title", "Opprett konto")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="space-y-2">
              <Label htmlFor="firstName">
                {t("signup.firstName", "Fornavn")}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder={t("signup.firstNamePlaceholder", "Fornavn")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                {t("signup.lastName", "Etternavn")}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder={t("signup.lastNamePlaceholder", "Etternavn")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                {t("signup.email", "E-postadresse")}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t("signup.emailPlaceholder", "you@example.com")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                {t("signup.phone", "Telefon (valgfritt)")}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t("signup.phonePlaceholder", "+47 123 45 678")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                {t("signup.password", "Passord")}{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={t("signup.passwordPlaceholder", "••••••••")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("signup.confirmPassword", "Bekreft passord")}{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t("signup.confirmPasswordPlaceholder", "••••••••")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="text-base"
              />
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <Button
              className="w-full py-3 text-base"
              type="submit"
              disabled={loading}
            >
              {loading
                ? t("signup.registering", "Registrerer...")
                : t("signup.registerButton", "Registrer")}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-100 sm:text-gray-600 mt-2">
            {t("signup.alreadyHaveAccount", "Har du allerede en konto?")}{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium underline sm:text-brand-purple sm:no-underline sm:hover:underline"
            >
              {t("login.loginButton", "Logg inn")}
            </button>
          </p>
        </CardContent>
      </Card>
    </NonAuthenticatedLayout>
  );
};
