import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // optional
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast("Passordene samsvarer ikke");
      return;
    }

    if (!firstName || !lastName) {
      toast("Vennligst fyll inn fornavn og etternavn");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      phone,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
        },
      },
    });
    setLoading(false);

    if (error) {
      toast("Registrering feilet: " + error.message);
    } else {
      toast("Registrering vellykket! Sjekk e‑posten din for bekreftelse.");
      navigate("/login");
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
          <p className="mt-1 text-sm opacity-80">by Sebastian</p>
        </div>

        {/* Mobile: flat white box; Desktop: card with shadow */}
        <Card className="w-full shadow-none sm:shadow-lg sm:rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-lg sm:text-xl">
              Registrer deg
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  Fornavn <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Ola"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Etternavn <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Nordmann"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  E‑post <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon (valgfritt)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+47 123 45 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Passord <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Bekreft passord <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="text-base"
                />
              </div>

              <Button
                className="w-full py-3 text-base"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? "Registrerer..." : "Registrer"}
              </Button>

              {/* Link to login */}
              <p className="text-center text-sm text-gray-100 sm:text-gray-600 mt-2">
                Har du allerede en konto?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-medium underline sm:text-brand-purple sm:no-underline sm:hover:underline"
                >
                  Logg inn
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
