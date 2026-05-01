import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useI18n } from "@/contexts/I18nContext";
import { z } from "zod";

const NewsletterSignup = () => {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) {
      toast.error(t("yourEmail"));
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.toLowerCase() });
    setLoading(false);
    if (error && !String(error.message).includes("duplicate")) {
      toast.error(error.message);
      return;
    }
    toast.success(t("subscribed"));
    setEmail("");
  };

  return (
    <aside className="bg-news-slate text-white rounded-sm p-5">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-5 h-5 text-primary" />
        <h2 className="font-bengali font-semibold">{t("newsletter")}</h2>
      </div>
      <p className="text-sm text-white/70 font-bengali mb-3">{t("newsletterDesc")}</p>
      <form onSubmit={submit} className="space-y-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("yourEmail")}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {t("subscribe")}
        </Button>
      </form>
    </aside>
  );
};

export default NewsletterSignup;
