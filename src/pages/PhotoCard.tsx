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

      // Premium gradient overlay - covers entire image
      const gradient = ctx.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, "rgba(15, 23, 42, 0.3)");
      gradient.addColorStop(0.4, "rgba(15, 23, 42, 0.5)");
      gradient.addColorStop(0.7, "rgba(15, 23, 42, 0.85)");
      gradient.addColorStop(1, "rgba(15, 23, 42, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // Logo at top-center
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 52px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("সিলেটি নিউজ", size / 2, 70);
      
      // Subtle line under logo
      ctx.strokeStyle = "rgba(153, 27, 27, 0.8)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(size / 2 - 100, 90);
      ctx.lineTo(size / 2 + 100, 90);
      ctx.stroke();

      // Headline - positioned lower
      ctx.font = "bold 58px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "left";

      const maxWidth = size - 100;
      const lineHeight = 76;
      const words = selectedNews.title.split(" ");
      let line = "";
      let y = size * 0.58;

      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== "") {
          ctx.fillText(line.trim(), 50, y);
          line = word + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line.trim(), 50, y);

      // Category tag with premium styling
      const categoryY = y + 70;
      ctx.fillStyle = "#991B1B";
      const categoryWidth = ctx.measureText(selectedNews.categoryBn).width + 50;
      ctx.beginPath();
      ctx.roundRect(50, categoryY - 32, categoryWidth, 48, 4);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "600 28px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(selectedNews.categoryBn, 75, categoryY);

      // Bottom bar with date and website
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "24px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(selectedNews.date, size - 50, size - 45);
      ctx.textAlign = "left";
      ctx.fillText("sylhetynews.com", 50, size - 45);

      // Generate image URL
      const imageUrl = canvas.toDataURL("image/png");
      setGeneratedImage(imageUrl);
      setIsGenerating(false);
    };

    img.onerror = () => {
      // Fallback with solid color if image fails
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, size, size);

      // Premium gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, "rgba(15, 23, 42, 0.7)");
      gradient.addColorStop(1, "rgba(15, 23, 42, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // Logo at top-center
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 52px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("সিলেটি নিউজ", size / 2, 70);
      
      // Subtle line under logo
      ctx.strokeStyle = "rgba(153, 27, 27, 0.8)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(size / 2 - 100, 90);
      ctx.lineTo(size / 2 + 100, 90);
      ctx.stroke();

      ctx.font = "bold 58px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "left";
      const maxWidth = size - 100;
      const lineHeight = 76;
      const words = selectedNews.title.split(" ");
      let line = "";
      let y = size * 0.58;

      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== "") {
          ctx.fillText(line.trim(), 50, y);
          line = word + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line.trim(), 50, y);

      const categoryY = y + 70;
      ctx.fillStyle = "#991B1B";
      const categoryWidth = ctx.measureText(selectedNews.categoryBn).width + 50;
      ctx.beginPath();
      ctx.roundRect(50, categoryY - 32, categoryWidth, 48, 4);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "600 28px 'Hind Siliguri', sans-serif";
      ctx.fillText(selectedNews.categoryBn, 75, categoryY);

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "24px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(selectedNews.date, size - 50, size - 45);
      ctx.textAlign = "left";
      ctx.fillText("sylhetynews.com", 50, size - 45);

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
