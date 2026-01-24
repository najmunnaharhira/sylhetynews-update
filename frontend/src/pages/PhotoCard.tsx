import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { newsData } from "@/data/newsData";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Image as ImageIcon, Upload, X } from "lucide-react";

const PhotoCard = () => {
  const [searchParams] = useSearchParams();
  const [selectedNewsId, setSelectedNewsId] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [taglineBn, setTaglineBn] = useState("সত্যের পথে অবিচল");
  const [taglineEn, setTaglineEn] = useState("Unwavering on the path of truth");
  const [contactNumber, setContactNumber] = useState("");
  const [detailsBn, setDetailsBn] = useState("");
  const [detailsEn, setDetailsEn] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [cardWidth, setCardWidth] = useState(1080);
  const [cardHeight, setCardHeight] = useState(1080);
  const [accentColor, setAccentColor] = useState("#991B1B");
  const [headlineScale, setHeadlineScale] = useState(1);

  const selectedNews = newsData.find((n) => n.id === selectedNewsId);

  const dimensionOptions = [
    { label: "1080 x 1080", value: "1080x1080" },
    { label: "1080 x 1350", value: "1080x1350" },
    { label: "1080 x 1920", value: "1080x1920" },
  ];

  const handleDimensionChange = (value: string) => {
    const [width, height] = value.split("x").map(Number);
    if (!Number.isNaN(width) && !Number.isNaN(height)) {
      setCardWidth(width);
      setCardHeight(height);
    }
  };

  useEffect(() => {
    const param = searchParams.get("newsId");
    if (param && !selectedNewsId) {
      setSelectedNewsId(param);
    }
  }, [searchParams, selectedNewsId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedImage(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    setUploadedImagePreview(null);
  };

  const generatePhotoCard = async () => {
    if (!selectedNews || !canvasRef.current) return;

    setIsGenerating(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const width = cardWidth;
    const height = cardHeight;
    const scale = width / 1080;
    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Load and draw image
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const paddingX = 50 * scale;
      const imgRatio = img.width / img.height;
      let drawWidth = width;
      let drawHeight = height * 0.6;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > width / drawHeight) {
        drawWidth = drawHeight * imgRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawHeight = width / imgRatio;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "rgba(15, 23, 42, 0.3)");
      gradient.addColorStop(0.4, "rgba(15, 23, 42, 0.5)");
      gradient.addColorStop(0.7, "rgba(15, 23, 42, 0.85)");
      gradient.addColorStop(1, "rgba(15, 23, 42, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${52 * scale}px 'Hind Siliguri', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("সিলেটি নিউজ", width / 2, 70 * scale);
      ctx.font = `${24 * scale}px 'Hind Siliguri', sans-serif`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillText(taglineBn, width / 2, 104 * scale);
      ctx.font = `${20 * scale}px 'Inter', sans-serif`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillText(taglineEn, width / 2, 132 * scale);

      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 100 * scale, 90 * scale);
      ctx.lineTo(width / 2 + 100 * scale, 90 * scale);
      ctx.stroke();

      ctx.font = `bold ${58 * scale * headlineScale}px 'Hind Siliguri', sans-serif`;
      ctx.textAlign = "left";

      const maxWidth = width - 100 * scale;
      const lineHeight = 76 * scale * headlineScale;
      const words = selectedNews.title.split(" ");
      let line = "";
      let y = height * 0.58;

      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== "") {
          ctx.fillText(line.trim(), paddingX, y);
          line = word + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line.trim(), paddingX, y);

      const detailsY = y + 48 * scale;
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = `${22 * scale}px 'Hind Siliguri', sans-serif`;
      ctx.textAlign = "left";
      if (detailsBn) {
        ctx.fillText(detailsBn, paddingX, detailsY);
      }
      ctx.font = `${20 * scale}px 'Inter', sans-serif`;
      if (detailsEn) {
        ctx.fillText(detailsEn, paddingX, detailsY + 28 * scale);
      }

      const categoryY = y + (detailsBn || detailsEn ? 110 * scale : 70 * scale);
      ctx.fillStyle = accentColor;
      const categoryWidth =
        ctx.measureText(selectedNews.categoryBn).width + 50 * scale;
      ctx.beginPath();
      ctx.roundRect(
        paddingX,
        categoryY - 32 * scale,
        categoryWidth,
        48 * scale,
        4 * scale
      );
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = `600 ${28 * scale}px 'Hind Siliguri', sans-serif`;
      ctx.textAlign = "left";
      ctx.fillText(selectedNews.categoryBn, paddingX + 25 * scale, categoryY);

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = `${24 * scale}px 'Hind Siliguri', sans-serif`;
      ctx.textAlign = "right";
      ctx.fillText(selectedNews.date, width - 50 * scale, height - 45 * scale);
      ctx.textAlign = "left";
      const contactText = contactNumber ? `যোগাযোগ: ${contactNumber}` : "";
      if (contactText) {
        ctx.fillText(contactText, paddingX, height - 75 * scale);
      }
      ctx.fillText("sylhetynews.com", paddingX, height - 45 * scale);

      const imageUrl = canvas.toDataURL("image/png");
      setGeneratedImage(imageUrl);
      setIsGenerating(false);
    };

    img.onerror = () => {
      const paddingX = 50 * scale;
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "rgba(15, 23, 42, 0.7)");
      gradient.addColorStop(1, "rgba(15, 23, 42, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${52 * scale}px 'Hind Siliguri', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("সিলেটি নিউজ", width / 2, 70 * scale);
      ctx.font = `${24 * scale}px 'Hind Siliguri', sans-serif`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillText(taglineBn, width / 2, 104 * scale);
      ctx.font = `${20 * scale}px 'Inter', sans-serif`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillText(taglineEn, width / 2, 132 * scale);

      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 100 * scale, 90 * scale);
      ctx.lineTo(width / 2 + 100 * scale, 90 * scale);
      ctx.stroke();

      ctx.font = `bold ${58 * scale * headlineScale}px 'Hind Siliguri', sans-serif`;
      ctx.textAlign = "left";
      const maxWidth = width - 100 * scale;
      const lineHeight = 76 * scale * headlineScale;
      const words = selectedNews.title.split(" ");
      let line = "";
      let y = height * 0.58;

      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== "") {
          ctx.fillText(line.trim(), paddingX, y);
          line = word + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line.trim(), paddingX, y);

      const detailsY = y + 48 * scale;
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = `${22 * scale}px 'Hind Siliguri', sans-serif`;
      ctx.textAlign = "left";
      if (detailsBn) {
        ctx.fillText(detailsBn, paddingX, detailsY);
      }
      ctx.font = `${20 * scale}px 'Inter', sans-serif`;
      if (detailsEn) {
        ctx.fillText(detailsEn, paddingX, detailsY + 28 * scale);
      }

      const categoryY = y + (detailsBn || detailsEn ? 110 * scale : 70 * scale);
      ctx.fillStyle = accentColor;
      const categoryWidth =
        ctx.measureText(selectedNews.categoryBn).width + 50 * scale;
      ctx.beginPath();
      ctx.roundRect(
        paddingX,
        categoryY - 32 * scale,
        categoryWidth,
        48 * scale,
        4 * scale
      );
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = `600 ${28 * scale}px 'Hind Siliguri', sans-serif`;
      ctx.fillText(selectedNews.categoryBn, paddingX + 25 * scale, categoryY);

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = `${24 * scale}px 'Hind Siliguri', sans-serif`;
      ctx.textAlign = "right";
      ctx.fillText(selectedNews.date, width - 50 * scale, height - 45 * scale);
      ctx.textAlign = "left";
      const contactText = contactNumber ? `যোগাযোগ: ${contactNumber}` : "";
      if (contactText) {
        ctx.fillText(contactText, paddingX, height - 75 * scale);
      }
      ctx.fillText("sylhetynews.com", paddingX, height - 45 * scale);

      const imageUrl = canvas.toDataURL("image/png");
      setGeneratedImage(imageUrl);
      setIsGenerating(false);
    };

    img.src = uploadedImagePreview || selectedNews.image;
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
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-bengali text-news-subtext">
                      ট্যাগলাইন (বাংলা)
                    </label>
                    <input
                      type="text"
                      value={taglineBn}
                      onChange={(e) => setTaglineBn(e.target.value)}
                      className="mt-1 w-full rounded-md border border-news-border px-3 py-2 text-sm"
                      placeholder="সত্যের পথে অবিচল"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-news-subtext">
                      Tagline (English)
                    </label>
                    <input
                      type="text"
                      value={taglineEn}
                      onChange={(e) => setTaglineEn(e.target.value)}
                      className="mt-1 w-full rounded-md border border-news-border px-3 py-2 text-sm"
                      placeholder="Unwavering on the path of truth"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bengali text-news-subtext">
                      যোগাযোগ নম্বর (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="mt-1 w-full rounded-md border border-news-border px-3 py-2 text-sm"
                      placeholder="০১XXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bengali text-news-subtext">
                      সংক্ষিপ্ত তথ্য (বাংলা)
                    </label>
                    <input
                      type="text"
                      value={detailsBn}
                      onChange={(e) => setDetailsBn(e.target.value)}
                      className="mt-1 w-full rounded-md border border-news-border px-3 py-2 text-sm"
                      placeholder="সংক্ষিপ্ত তথ্য লিখুন"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-news-subtext">
                      Short details (English)
                    </label>
                    <input
                      type="text"
                      value={detailsEn}
                      onChange={(e) => setDetailsEn(e.target.value)}
                      className="mt-1 w-full rounded-md border border-news-border px-3 py-2 text-sm"
                      placeholder="Short detail line"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bengali text-news-subtext">
                      ফটোকার্ড সাইজ
                    </label>
                    <select
                      value={`${cardWidth}x${cardHeight}`}
                      onChange={(e) => handleDimensionChange(e.target.value)}
                      className="mt-1 w-full rounded-md border border-news-border px-3 py-2 text-sm"
                    >
                      {dimensionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-bengali text-news-subtext">
                      অ্যাকসেন্ট রঙ
                    </label>
                    <div className="mt-1 flex items-center gap-3">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="h-9 w-12 rounded-md border border-news-border bg-transparent"
                      />
                      <span className="text-xs text-news-subtext">
                        {accentColor.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bengali text-news-subtext">
                    শিরোনাম ফন্ট সাইজ
                  </label>
                  <div className="mt-1 flex items-center gap-3">
                    <input
                      type="range"
                      min="0.8"
                      max="1.4"
                      step="0.05"
                      value={headlineScale}
                      onChange={(e) => setHeadlineScale(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-xs text-news-subtext">
                      {Math.round(headlineScale * 100)}%
                    </span>
                  </div>
                </div>
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

                <div className="space-y-2">
                  <label className="text-sm font-bengali text-news-subtext">
                    কাস্টম ছবি আপলোড (ঐচ্ছিক)
                  </label>
                  <div className="border-2 border-dashed border-news-border rounded-md p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="photocard-image-upload"
                    />
                    <label
                      htmlFor="photocard-image-upload"
                      className="cursor-pointer inline-flex items-center gap-2 text-sm text-news-subtext"
                    >
                      <Upload className="w-4 h-4" />
                      {uploadedImage ? "ছবি পরিবর্তন করুন" : "ছবি আপলোড করুন"}
                    </label>
                  </div>
                  {uploadedImagePreview && (
                    <div className="relative">
                      <img
                        src={uploadedImagePreview}
                        alt="Uploaded preview"
                        className="w-full rounded-md border border-news-border max-h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={clearUploadedImage}
                        className="absolute top-2 right-2 rounded-full bg-black/70 text-white p-1"
                        aria-label="Remove uploaded image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

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
