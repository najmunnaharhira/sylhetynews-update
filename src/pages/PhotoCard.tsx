import { useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { newsData, NewsItem } from "@/data/newsData";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Image as ImageIcon } from "lucide-react";

const PhotoCard = () => {
  const [selectedNewsId, setSelectedNewsId] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedNews = newsData.find((n) => n.id === selectedNewsId);

  const generatePhotoCard = async () => {
    if (!selectedNews || !canvasRef.current) return;

    setIsGenerating(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const size = 1080;
    canvas.width = size;
    canvas.height = size;

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Load and draw image
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Draw image with cover effect
      const imgRatio = img.width / img.height;
      let drawWidth = size;
      let drawHeight = size * 0.6;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > size / drawHeight) {
        drawWidth = drawHeight * imgRatio;
        offsetX = (size - drawWidth) / 2;
      } else {
        drawHeight = size / imgRatio;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Gradient overlay at bottom
      const gradient = ctx.createLinearGradient(0, size * 0.4, 0, size);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.3, "rgba(0, 0, 0, 0.7)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // Red accent bar at top
      ctx.fillStyle = "#cc0000";
      ctx.fillRect(0, 0, size, 8);

      // Logo text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 48px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("সিলেট ভিউ ২৪", 40, 80);

      // Headline
      ctx.font = "bold 56px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "left";

      const maxWidth = size - 80;
      const lineHeight = 72;
      const words = selectedNews.title.split(" ");
      let line = "";
      let y = size * 0.65;

      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== "") {
          ctx.fillText(line.trim(), 40, y);
          line = word + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line.trim(), 40, y);

      // Category tag
      ctx.fillStyle = "#cc0000";
      const categoryY = y + 60;
      const categoryWidth = ctx.measureText(selectedNews.categoryBn).width + 40;
      ctx.fillRect(40, categoryY - 30, categoryWidth, 44);
      ctx.fillStyle = "#ffffff";
      ctx.font = "600 28px 'Hind Siliguri', sans-serif";
      ctx.fillText(selectedNews.categoryBn, 60, categoryY);

      // Date
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "24px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(selectedNews.date, size - 40, size - 40);

      // Website
      ctx.textAlign = "left";
      ctx.fillText("sylhetview24.news", 40, size - 40);

      // Generate image URL
      const imageUrl = canvas.toDataURL("image/png");
      setGeneratedImage(imageUrl);
      setIsGenerating(false);
    };

    img.onerror = () => {
      // Fallback with solid color if image fails
      ctx.fillStyle = "#333333";
      ctx.fillRect(0, 0, size, size * 0.6);

      // Continue with rest of the design
      const gradient = ctx.createLinearGradient(0, size * 0.4, 0, size);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.3, "rgba(0, 0, 0, 0.7)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      ctx.fillStyle = "#cc0000";
      ctx.fillRect(0, 0, size, 8);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 48px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("সিলেট ভিউ ২৪", 40, 80);

      ctx.font = "bold 56px 'Hind Siliguri', sans-serif";
      const maxWidth = size - 80;
      const lineHeight = 72;
      const words = selectedNews.title.split(" ");
      let line = "";
      let y = size * 0.65;

      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== "") {
          ctx.fillText(line.trim(), 40, y);
          line = word + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line.trim(), 40, y);

      ctx.fillStyle = "#cc0000";
      const categoryY = y + 60;
      const categoryWidth = ctx.measureText(selectedNews.categoryBn).width + 40;
      ctx.fillRect(40, categoryY - 30, categoryWidth, 44);
      ctx.fillStyle = "#ffffff";
      ctx.font = "600 28px 'Hind Siliguri', sans-serif";
      ctx.fillText(selectedNews.categoryBn, 60, categoryY);

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "24px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(selectedNews.date, size - 40, size - 40);
      ctx.textAlign = "left";
      ctx.fillText("sylhetview24.news", 40, size - 40);

      const imageUrl = canvas.toDataURL("image/png");
      setGeneratedImage(imageUrl);
      setIsGenerating(false);
    };

    img.src = selectedNews.image;
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.download = `photocard-${selectedNewsId}.png`;
    link.href = generatedImage;
    link.click();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="section-title text-2xl mb-6">ফটোকার্ড জেনারেটর</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-card border border-news-border rounded-sm p-6">
              <h2 className="font-bengali font-semibold text-lg mb-4">
                সংবাদ নির্বাচন করুন
              </h2>

              <div className="space-y-4">
                <Select
                  value={selectedNewsId}
                  onValueChange={setSelectedNewsId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="একটি সংবাদ নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {newsData.map((news) => (
                      <SelectItem key={news.id} value={news.id}>
                        <span className="line-clamp-1">{news.title}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={generatePhotoCard}
                  disabled={!selectedNewsId || isGenerating}
                  className="w-full"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  {isGenerating ? "তৈরি হচ্ছে..." : "ফটোকার্ড তৈরি করুন"}
                </Button>

                {generatedImage && (
                  <Button
                    onClick={downloadImage}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    ডাউনলোড করুন
                  </Button>
                )}
              </div>
            </div>

            {selectedNews && (
              <div className="bg-card border border-news-border rounded-sm p-6">
                <h3 className="font-bengali font-semibold mb-2">নির্বাচিত সংবাদ:</h3>
                <p className="text-news-subtext text-sm">{selectedNews.title}</p>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h2 className="font-bengali font-semibold text-lg">প্রিভিউ</h2>

            <div className="bg-muted border border-news-border rounded-sm aspect-square flex items-center justify-center overflow-hidden">
              {generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated PhotoCard"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center text-news-subtext font-bengali p-8">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>সংবাদ নির্বাচন করে ফটোকার্ড তৈরি করুন</p>
                </div>
              )}
            </div>

            {/* Hidden canvas for generation */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PhotoCard;
