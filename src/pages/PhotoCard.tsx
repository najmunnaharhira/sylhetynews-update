import { useState, useRef } from "react";
import { Download, Image as ImageIcon, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLatestArticles } from "@/hooks/useArticles";
import { formatDate } from "@/lib/format";
import { useI18n } from "@/contexts/I18nContext";

const PhotoCard = () => {
  const { lang } = useI18n();
  const { data: articles = [] } = useLatestArticles(30);
  const [selectedId, setSelectedId] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const selected = articles.find((a) => a.id === selectedId);

  const generate = async () => {
    if (!selected || !canvasRef.current) return;
    setBusy(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = 1080;
    canvas.width = size;
    canvas.height = size;

    const draw = (img?: HTMLImageElement) => {
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, size, size);
      if (img) {
        const r = img.width / img.height;
        let dw = size, dh = size / r, ox = 0, oy = 0;
        if (dh < size) { dh = size; dw = size * r; ox = (size - dw) / 2; }
        ctx.drawImage(img, ox, oy, dw, dh);
      }
      const grad = ctx.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, "rgba(15,23,42,0.4)");
      grad.addColorStop(0.6, "rgba(15,23,42,0.75)");
      grad.addColorStop(1, "rgba(15,23,42,0.95)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 52px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(lang === "en" ? "Cumilla News" : "কুমিল্লা নিউজ", size / 2, 80);
      ctx.strokeStyle = "rgba(153,27,27,0.9)";
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(size/2-100, 100); ctx.lineTo(size/2+100, 100); ctx.stroke();

      ctx.font = "bold 58px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "left";
      const title = (lang === "en" && selected.title_en) ? selected.title_en : selected.title_bn;
      const words = title.split(" ");
      let line = "", y = size * 0.6;
      const max = size - 100, lh = 76;
      words.forEach((w) => {
        const test = line + w + " ";
        if (ctx.measureText(test).width > max && line) {
          ctx.fillText(line.trim(), 50, y); line = w + " "; y += lh;
        } else line = test;
      });
      ctx.fillText(line.trim(), 50, y);

      const cat = lang === "en" ? selected.category?.name_en : selected.category?.name_bn;
      if (cat) {
        const cy = y + 70;
        ctx.fillStyle = "#991B1B";
        const cw = ctx.measureText(cat).width + 50;
        ctx.beginPath(); (ctx as any).roundRect(50, cy - 32, cw, 48, 4); ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "600 28px 'Hind Siliguri', sans-serif";
        ctx.fillText(cat, 75, cy);
      }

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "24px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(formatDate(selected.published_at, lang), size - 50, size - 45);
      ctx.textAlign = "left";
      ctx.fillText("cumillanews.com", 50, size - 45);

      setGenerated(canvas.toDataURL("image/png"));
      setBusy(false);
    };

    if (selected.image_url) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => draw(img);
      img.onerror = () => draw();
      img.src = selected.image_url;
    } else {
      draw();
    }
  };

  const download = () => {
    if (!generated) return;
    const a = document.createElement("a");
    a.href = generated;
    a.download = `photocard-${selected?.slug || "card"}.png`;
    a.click();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="section-title text-2xl mb-6">{lang === "en" ? "PhotoCard Generator" : "ফটোকার্ড জেনারেটর"}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-card border border-news-border rounded-sm p-6 space-y-4">
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger><SelectValue placeholder={lang === "en" ? "Select an article" : "একটি সংবাদ নির্বাচন করুন"} /></SelectTrigger>
                <SelectContent className="bg-card max-h-80">
                  {articles.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      <span className="line-clamp-1">{lang === "en" && a.title_en ? a.title_en : a.title_bn}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={generate} disabled={!selectedId || busy} className="w-full">
                {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImageIcon className="w-4 h-4 mr-2" />}
                {lang === "en" ? "Generate" : "তৈরি করুন"}
              </Button>
              {generated && (
                <Button onClick={download} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />{lang === "en" ? "Download" : "ডাউনলোড"}
                </Button>
              )}
            </div>
          </div>
          <div className="bg-muted border border-news-border rounded-sm aspect-square flex items-center justify-center overflow-hidden">
            {generated ? <img src={generated} alt="PhotoCard" className="w-full h-full object-contain" /> : (
              <div className="text-center text-news-subtext font-bengali p-8">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>{lang === "en" ? "Select an article and generate" : "সংবাদ নির্বাচন করে তৈরি করুন"}</p>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PhotoCard;
