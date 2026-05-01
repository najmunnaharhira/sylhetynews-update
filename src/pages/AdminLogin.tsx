import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { display_name: displayName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check email to verify, then sign in.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/admin");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-news-slate to-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-bengali mb-1">সিলেটি নিউজ</h1>
          <p className="text-sm text-news-subtext">{isSignUp ? "Create account" : "Sign in"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display name" />
          )}
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required minLength={6} />
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isSignUp ? "Create account" : "Sign in"}
          </Button>
        </form>

        <button
          onClick={() => setIsSignUp((v) => !v)}
          className="mt-4 w-full text-sm text-primary hover:underline"
        >
          {isSignUp ? "Have an account? Sign in" : "No account? Sign up"}
        </button>

        <p className="mt-4 text-xs text-news-subtext text-center">
          New accounts have read-only access. An existing admin can grant editor/admin roles.
        </p>
      </Card>
    </div>
  );
}
