import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export const ProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Load current user metadata
  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        toast("Kunne ikke hente brukerdata: " + error.message);
        return;
      }
      if (user) {
        setFirstName(user.user_metadata.first_name || "");
        setLastName(user.user_metadata.last_name || "");
        setPhone(user.user_metadata.phone || "");
      }
    };
    loadUser();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        phone,
      },
    });
    setLoading(false);

    if (error) {
      toast("Oppdatering feilet: " + error.message);
    } else {
      toast("Profilen ble oppdatert!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-purple px-4">
      <div className="w-full max-w-md">
        <Card className="w-full shadow-none sm:shadow-lg sm:rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-lg sm:text-xl">
              Min profil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Fornavn</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Etternavn</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-base"
                />
              </div>

              <Button
                className="w-full py-3 text-base"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Lagrer..." : "Oppdater profil"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
