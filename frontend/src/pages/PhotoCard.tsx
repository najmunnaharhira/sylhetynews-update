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
import { Download, Image as ImageIcon, Upload, X, Sparkles } from "lucide-react";
import logoMain from "/sylhety-logo.jpeg";
import { photocardTemplateService, newsService } from "@/services/firebaseService";
import { firebaseReady } from "@/config/firebase";
import { NewsArticle } from "@/types/news";

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
  const [accentColor2, setAccentColor2] = useState("#DC2626");
  const [useGradient, setUseGradient] = useState(true);
  const [headlineScale, setHeadlineScale] = useState(1.15);
  const [imageHeightRatio, setImageHeightRatio] = useState(0.6);
  const [textColor, setTextColor] = useState("#ffffff");
  const [overlayStrength, setOverlayStrength] = useState(0.9);
  const [fontBold, setFontBold] = useState(true);
  const [fontItalic, setFontItalic] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [firebaseNews, setFirebaseNews] = useState<NewsArticle[]>([]);

  // Load news from Firebase
  useEffect(() => {
    const loadNews = async () => {
      if (firebaseReady) {
        try {
          const news = await newsService.getAllNews();
          if (news && news.length > 0) {
            setFirebaseNews(news);
          }
        } catch (error) {
          console.error("Failed to load news from Firebase:", error);
          // Silently fallback to static data
        }
      }
    };
    loadNews();
  }, []);

  // Auto-select news from URL parameter
  useEffect(() => {
    const newsId = searchParams.get('newsId') || searchParams.get('id');
    if (newsId) {
      setSelectedNewsId(newsId);
    }
  }, [searchParams]);

  // Use Firebase news if available, otherwise fallback to static data
  const availableNews = firebaseNews.length > 0 ? firebaseNews : newsData;
  const selectedNews = availableNews.find((n) => n.id === selectedNewsId);

  const dimensionOptions = [
    { label: "200 x 200 (Small Square)", value: "200x200" },
    { label: "300 x 300 (Small Square)", value: "300x300" },
    { label: "400 x 400 (Medium Square)", value: "400x400" },
    { label: "500 x 500 (Medium Square)", value: "500x500" },
    { label: "600 x 600 (Medium Square)", value: "600x600" },
    { label: "800 x 800 (Large Square)", value: "800x800" },
    { label: "1080 x 1080 (Square)", value: "1080x1080" },
    { label: "1080 x 1350 (Portrait)", value: "1080x1350" },
    { label: "1080 x 1920 (Story)", value: "1080x1920" },
    { label: "1200 x 630 (Facebook)", value: "1200x630" },
    { label: "1280 x 720 (HD)", value: "1280x720" },
    { label: "1600 x 900 (HD+)", value: "1600x900" },
    { label: "1920 x 1080 (Full HD)", value: "1920x1080" },
    { label: "2048 x 1152 (2K)", value: "2048x1152" },
    { label: "2560 x 1440 (2K+)", value: "2560x1440" },
    { label: "1080 x 566 (Twitter)", value: "1080x566" },
    { label: "1080 x 608 (LinkedIn)", value: "1080x608" },
    { label: "1500 x 1500 (Large Square)", value: "1500x1500" },
    { label: "2000 x 2000 (XL Square)", value: "2000x2000" },
    { label: "1200 x 1600 (Large Portrait)", value: "1200x1600" },
    { label: "1500 x 2000 (XL Portrait)", value: "1500x2000" },
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

  useEffect(() => {
    const loadTemplates = async () => {
      if (firebaseReady) {
        try {
          const templateList = await photocardTemplateService.getTemplates();
          if (templateList && templateList.length > 0) {
            setTemplates(templateList);
          }
        } catch (error) {
          console.error("Failed to load templates from Firebase:", error);
          // Silently continue without templates
        }
      }
    };
    loadTemplates();
  }, []);

  const handleDownloadTemplate = (template: any) => {
    const link = document.createElement("a");
    link.download = `${template.name || 'photocard'}.png`;
    link.href = template.imageUrl;
    link.target = "_blank";
    link.click();
  };

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

  const generatePhotoCard = async (
    includeLogo: boolean = true,
    updatePreview: boolean = true
  ) => {
    if (!selectedNews || !canvasRef.current) return null;

    setIsGenerating(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    // Polyfill for roundRect if not available
    if (!ctx.roundRect) {
      (ctx as any).roundRect = function (x: number, y: number, w: number, h: number, r: number) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
      };
    }

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

    return new Promise<string | null>((resolve) => {
      const finalize = (imageUrl: string) => {
        if (updatePreview) {
          setGeneratedImage(imageUrl);
        }
        setIsGenerating(false);
        resolve(imageUrl);
      };

      img.onload = () => {
        const paddingX = 50 * scale;
        const imgRatio = img.width / img.height;
        let drawWidth = width;
        let drawHeight = height * imageHeightRatio;
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

        // Enhanced gradient overlay with multiple color stops for more attractive look
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        const overlayLight = 0.2 * overlayStrength;
        const overlayMid = 0.5 * overlayStrength;
        const overlayDeep = 0.75 * overlayStrength;
        const overlayMax = overlayStrength;
        // Add subtle color tint to gradient
        gradient.addColorStop(0, `rgba(15, 23, 42, ${overlayLight})`);
        gradient.addColorStop(0.3, `rgba(30, 41, 59, ${overlayMid * 0.8})`);
        gradient.addColorStop(0.5, `rgba(15, 23, 42, ${overlayMid})`);
        gradient.addColorStop(0.7, `rgba(15, 23, 42, ${overlayDeep})`);
        gradient.addColorStop(0.9, `rgba(15, 23, 42, ${overlayMax * 0.95})`);
        gradient.addColorStop(1, `rgba(15, 23, 42, ${overlayMax})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add subtle vignette effect
        const vignette = ctx.createRadialGradient(
          width / 2, height / 2, 0,
          width / 2, height / 2, Math.max(width, height) * 0.8
        );
        vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);

        const fontStyle = fontItalic ? "italic" : "normal";
        const fontWeight = fontBold ? "bold" : "normal";

        // Load and draw logo image at top center with professional styling
        if (includeLogo) {
          const logoImg = new window.Image();
          logoImg.crossOrigin = "anonymous";
          logoImg.onload = () => {
            const logoSize = 150 * scale;
            const logoX = (width - logoSize) / 2; // Center horizontally
            const logoY = 35 * scale; // Top position

            // Draw beautiful professional logo with premium styling
            ctx.save();
            const cornerRadius = 18 * scale;
            const bgPadding = 18 * scale;
            const bgX = logoX - bgPadding;
            const bgY = logoY - bgPadding;
            const bgW = logoSize + (bgPadding * 2);
            const bgH = logoSize + (bgPadding * 2);

            // Enhanced shadow with multiple layers for depth
            ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
            ctx.shadowBlur = 25 * scale;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 8 * scale;

            // Premium gradient background for logo container
            const bgGradient = ctx.createLinearGradient(bgX, bgY, bgX + bgW, bgY + bgH);
            bgGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            bgGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.98)');
            bgGradient.addColorStop(0.7, 'rgba(250, 252, 255, 0.98)');
            bgGradient.addColorStop(1, 'rgba(248, 250, 252, 1)');

            // Rounded rectangle background with premium gradient
            ctx.beginPath();
            ctx.roundRect(bgX, bgY, bgW, bgH, cornerRadius);
            ctx.fillStyle = bgGradient;
            ctx.fill();

            // Elegant inner border with subtle gradient
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.lineWidth = 2.5 * scale;
            ctx.stroke();

            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Clip to rounded rectangle for logo
            ctx.beginPath();
            ctx.roundRect(bgX, bgY, bgW, bgH, cornerRadius);
            ctx.clip();

            // Draw logo with premium quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.globalAlpha = 1;
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
            ctx.restore();

            // Add subtle outer glow ring
            ctx.save();
            ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
            ctx.shadowBlur = 10 * scale;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.beginPath();
            ctx.roundRect(bgX - 2, bgY - 2, bgW + 4, bgH + 4, cornerRadius + 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1 * scale;
            ctx.stroke();
            ctx.restore();

            drawHeadline();
          };
          logoImg.onerror = () => {
            drawHeadline();
          };
          logoImg.src = logoMain;
        } else {
          drawHeadline();
        }

        function drawHeadline() {
          // Draw headline positioned right under image with better alignment - BOLD and PROFESSIONAL
          // Adaptive font size for small dimensions
          const baseFontSize = Math.max(24, 58 * scale * headlineScale);
          const headlineFontSize = Math.min(baseFontSize, width * 0.08);
          // Make headline extra bold for professional look
          const boldWeight = 'bold';
          ctx.font = `${fontStyle} ${boldWeight} ${headlineFontSize}px 'Hind Siliguri', sans-serif`;
          ctx.textAlign = "left";

          const maxWidth = width - Math.max(60 * scale, 40);
          const lineHeight = headlineFontSize * 1.3; // Tighter line height
          const words = (selectedNews?.title || "").split(" ");
          let line = "";
          // Position headline right under image - calculate based on image height
          const imageBottom = drawHeight + offsetY;
          const headlineGap = Math.max(15 * scale, 12); // Small gap after image
          let y = imageBottom + headlineGap + headlineFontSize;

          words.forEach((word) => {
            const testLine = line + word + " ";
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && line !== "") {
              // Draw text shadow
              ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
              ctx.fillText(line.trim(), paddingX + 2 * scale, y + 2 * scale);
              // Draw main text
              ctx.fillStyle = textColor;
              ctx.fillText(line.trim(), paddingX, y);
              line = word + " ";
              y += lineHeight;
            } else {
              line = testLine;
            }
          });

          // Draw last line with shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillText(line.trim(), paddingX + 2 * scale, y + 2 * scale);
          ctx.fillStyle = textColor;
          ctx.fillText(line.trim(), paddingX, y);

          // Footer: Vertical layout - বিস্তারিত কমেন্টে first, then Website and Chilekotha
          if (includeLogo) {
            // Calculate position right after headline
            const lastLineY = y + lineHeight;
            const detailsGap = Math.max(15 * scale, 12); // Less space after headline
            let currentY = lastLineY + detailsGap;
            
            // First: "বিস্তারিত কমেন্টে" button (centered, right after headline)
            const detailsText = "বিস্তারিত কমেন্টে";
            const detailsFontSize = Math.max(16, Math.min(24 * scale, width * 0.04));
            ctx.font = `${fontStyle} ${fontWeight} ${detailsFontSize}px 'Hind Siliguri', sans-serif`;
            ctx.textAlign = "center";
            const detailsTextWidth = ctx.measureText(detailsText).width;
            const detailsPadding = Math.max(15 * scale, 12);
            const detailsX = width / 2;
            const detailsY = currentY + detailsFontSize;

            // Minimal button background with gradient
            ctx.save();
            ctx.beginPath();
            const buttonX = detailsX - (detailsTextWidth / 2) - detailsPadding;
            const buttonY = detailsY - Math.max(20 * scale, 18);
            const buttonW = detailsTextWidth + (detailsPadding * 2);
            const buttonH = Math.max(35, detailsFontSize + 20);

            ctx.roundRect(buttonX, buttonY, buttonW, buttonH, Math.max(6, 8 * scale));

            // Minimal outer glow effect
            ctx.shadowColor = accentColor;
            ctx.shadowBlur = Math.max(8, 12 * scale);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            if (useGradient) {
              const buttonGradient = ctx.createLinearGradient(buttonX, buttonY, buttonX, buttonY + buttonH);
              buttonGradient.addColorStop(0, accentColor);
              buttonGradient.addColorStop(0.5, accentColor2);
              buttonGradient.addColorStop(1, accentColor);
              ctx.fillStyle = buttonGradient;
            } else {
              ctx.fillStyle = accentColor;
            }
            ctx.fill();

            // Inner highlight
            ctx.beginPath();
            ctx.roundRect(buttonX + 2 * scale, buttonY + 2 * scale, buttonW - 4 * scale, buttonH - 4 * scale, Math.max(6, 7 * scale));
            const innerGradient = ctx.createLinearGradient(buttonX, buttonY, buttonX, buttonY + buttonH / 2);
            innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = innerGradient;
            ctx.fill();

            // Minimal button shadow
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = Math.max(6, 10 * scale);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = Math.max(3, 4 * scale);
            ctx.beginPath();
            ctx.roundRect(buttonX, buttonY, buttonW, buttonH, Math.max(6, 8 * scale));
            if (useGradient) {
              const shadowGradient = ctx.createLinearGradient(buttonX, buttonY, buttonX, buttonY + buttonH);
              shadowGradient.addColorStop(0, accentColor);
              shadowGradient.addColorStop(1, accentColor2);
              ctx.fillStyle = shadowGradient;
            } else {
              ctx.fillStyle = accentColor;
            }
            ctx.fill();
            ctx.restore();

            // Draw button text with minimal enhanced styling
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = Math.max(3, 4 * scale);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = Math.max(2, 2.5 * scale);
            ctx.fillText(detailsText, detailsX, detailsY);

            // Minimal text highlight/glow
            ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
            ctx.shadowBlur = Math.max(2, 3 * scale);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.fillText(detailsText, detailsX, detailsY);

            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            
            // Second: Website and Chilekotha (below button, not much space)
            const footerGap = Math.max(18 * scale, 15); // Not much space
            currentY = detailsY + buttonH / 2 + footerGap;
            const footerFontSize = Math.max(12, Math.min(18 * scale, width * 0.025));
            
            // Website link (left aligned)
            const websiteText = "sylhetynews.com";
            ctx.font = `${fontStyle} ${fontWeight} ${footerFontSize}px 'Inter', sans-serif`;
            ctx.textAlign = "left";
            
            if (useGradient) {
              const websiteGradient = ctx.createLinearGradient(
                paddingX,
                currentY - 10 * scale,
                paddingX + ctx.measureText(websiteText).width,
                currentY + 10 * scale
              );
              websiteGradient.addColorStop(0, accentColor);
              websiteGradient.addColorStop(0.5, accentColor2);
              websiteGradient.addColorStop(1, accentColor);
              
              ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
              ctx.fillText(websiteText, paddingX + 1 * scale, currentY + 1 * scale);
              ctx.fillStyle = websiteGradient;
              ctx.fillText(websiteText, paddingX, currentY);
              
              ctx.shadowColor = accentColor;
              ctx.shadowBlur = Math.max(4, 6 * scale);
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 0;
              ctx.fillText(websiteText, paddingX, currentY);
              ctx.shadowColor = 'transparent';
              ctx.shadowBlur = 0;
            } else {
              ctx.fillStyle = accentColor;
              ctx.fillText(websiteText, paddingX, currentY);
            }
            
            // Right side: Chilekotha
            const chilekothaText = "TechPartner: Chilekotha";
            ctx.textAlign = "right";
            
            if (useGradient) {
              const chilekothaGradient = ctx.createLinearGradient(
                width - paddingX - ctx.measureText(chilekothaText).width,
                currentY - 10 * scale,
                width - paddingX,
                currentY + 10 * scale
              );
              chilekothaGradient.addColorStop(0, accentColor);
              chilekothaGradient.addColorStop(0.5, accentColor2);
              chilekothaGradient.addColorStop(1, accentColor);
              
              ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
              ctx.fillText(chilekothaText, width - paddingX + 1 * scale, currentY + 1 * scale);
              ctx.fillStyle = chilekothaGradient;
              ctx.fillText(chilekothaText, width - paddingX, currentY);
              
              ctx.shadowColor = accentColor;
              ctx.shadowBlur = Math.max(4, 6 * scale);
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 0;
              ctx.fillText(chilekothaText, width - paddingX, currentY);
              ctx.shadowColor = 'transparent';
              ctx.shadowBlur = 0;
            } else {
              ctx.fillStyle = accentColor;
              ctx.fillText(chilekothaText, width - paddingX, currentY);
            }
          }

          const imageUrl = canvas.toDataURL("image/png");
          finalize(imageUrl);
        }
      };

      img.onerror = () => {
        const paddingX = 50 * scale;

        // Polyfill for roundRect if not available
        if (!ctx.roundRect) {
          (ctx as any).roundRect = function (x: number, y: number, w: number, h: number, r: number) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            this.beginPath();
            this.moveTo(x + r, y);
            this.arcTo(x + w, y, x + w, y + h, r);
            this.arcTo(x + w, y + h, x, y + h, r);
            this.arcTo(x, y + h, x, y, r);
            this.arcTo(x, y, x + w, y, r);
            this.closePath();
            return this;
          };
        }

        ctx.fillStyle = "#0F172A";
        ctx.fillRect(0, 0, width, height);

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        const overlayLight = 0.3 * overlayStrength;
        const overlayMax = overlayStrength;
        gradient.addColorStop(0, `rgba(15, 23, 42, ${overlayLight})`);
        gradient.addColorStop(1, `rgba(15, 23, 42, ${overlayMax})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        const fontStyle = fontItalic ? "italic" : "normal";
        const fontWeight = fontBold ? "bold" : "normal";

        // Load and draw logo image at top center with professional styling
        if (includeLogo) {
          const logoImg = new window.Image();
          logoImg.crossOrigin = "anonymous";
          logoImg.onload = () => {
            const logoSize = 150 * scale;
            const logoX = (width - logoSize) / 2; // Center horizontally
            const logoY = 35 * scale; // Top position

            // Draw beautiful professional logo with premium styling
            ctx.save();
            const cornerRadius = 18 * scale;
            const bgPadding = 18 * scale;
            const bgX = logoX - bgPadding;
            const bgY = logoY - bgPadding;
            const bgW = logoSize + (bgPadding * 2);
            const bgH = logoSize + (bgPadding * 2);

            // Enhanced shadow with multiple layers for depth
            ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
            ctx.shadowBlur = 25 * scale;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 8 * scale;

            // Premium gradient background for logo container
            const bgGradient = ctx.createLinearGradient(bgX, bgY, bgX + bgW, bgY + bgH);
            bgGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            bgGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.98)');
            bgGradient.addColorStop(0.7, 'rgba(250, 252, 255, 0.98)');
            bgGradient.addColorStop(1, 'rgba(248, 250, 252, 1)');

            // Rounded rectangle background with premium gradient
            ctx.beginPath();
            ctx.roundRect(bgX, bgY, bgW, bgH, cornerRadius);
            ctx.fillStyle = bgGradient;
            ctx.fill();

            // Elegant inner border with subtle gradient
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.lineWidth = 2.5 * scale;
            ctx.stroke();

            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Clip to rounded rectangle for logo
            ctx.beginPath();
            ctx.roundRect(bgX, bgY, bgW, bgH, cornerRadius);
            ctx.clip();

            // Draw logo with premium quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.globalAlpha = 1;
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
            ctx.restore();

            // Add subtle outer glow ring
            ctx.save();
            ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
            ctx.shadowBlur = 10 * scale;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.beginPath();
            ctx.roundRect(bgX - 2, bgY - 2, bgW + 4, bgH + 4, cornerRadius + 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1 * scale;
            ctx.stroke();
            ctx.restore();

            drawHeadlineError();
          };
          logoImg.onerror = () => {
            drawHeadlineError();
          };
          logoImg.src = logoMain;
        } else {
          drawHeadlineError();
        }

      function drawHeadlineError() {
        // Draw headline positioned right under top with better alignment
        // Adaptive font size for small dimensions
        const baseFontSize = Math.max(24, 58 * scale * headlineScale);
        const headlineFontSize = Math.min(baseFontSize, width * 0.08);
        // Make headline extra bold for professional look
        const boldWeight = 'bold';
        ctx.font = `${fontStyle} ${boldWeight} ${headlineFontSize}px 'Hind Siliguri', sans-serif`;
        ctx.textAlign = "left";
        
        const maxWidth = width - Math.max(60 * scale, 40);
        const lineHeight = headlineFontSize * 1.3; // Tighter line height
        const words = (selectedNews?.title || "").split(" ");
        let line = "";
        // Position headline - calculate based on logo or top
        const logoBottom = includeLogo ? (Math.max(80, Math.min(150 * scale, width * 0.15)) + Math.max(15 * scale, 10) + Math.max(8, 12 * scale) * 2) : 0;
        const headlineGap = Math.max(15 * scale, 12);
        let y = logoBottom + headlineGap + headlineFontSize;

          words.forEach((word) => {
            const testLine = line + word + " ";
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && line !== "") {
              // Draw text shadow
              ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
              ctx.fillText(line.trim(), paddingX + 2 * scale, y + 2 * scale);
              // Draw main text
              ctx.fillStyle = textColor;
              ctx.fillText(line.trim(), paddingX, y);
              line = word + " ";
              y += lineHeight;
            } else {
              line = testLine;
            }
          });

          // Draw last line with shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillText(line.trim(), paddingX + 2 * scale, y + 2 * scale);
          ctx.fillStyle = textColor;
          ctx.fillText(line.trim(), paddingX, y);

          // Footer: Vertical layout - বিস্তারিত কমেন্টে first, then Website and Chilekotha
          if (includeLogo) {
            // Calculate position right after headline
            const lastLineY = y + lineHeight;
            const detailsGap = Math.max(15 * scale, 12); // Less space after headline
            let currentY = lastLineY + detailsGap;
            
            // First: "বিস্তারিত কমেন্টে" button (centered, right after headline)
            const detailsText = "বিস্তারিত কমেন্টে";
            const detailsFontSize = Math.max(16, Math.min(24 * scale, width * 0.04));
            ctx.font = `${fontStyle} ${fontWeight} ${detailsFontSize}px 'Hind Siliguri', sans-serif`;
            ctx.textAlign = "center";
            const detailsTextWidth = ctx.measureText(detailsText).width;
            const detailsPadding = Math.max(15 * scale, 12);
            const detailsX = width / 2;
            const detailsY = currentY + detailsFontSize;

            // Minimal button background with gradient
            ctx.save();
            ctx.beginPath();
            const buttonX = detailsX - (detailsTextWidth / 2) - detailsPadding;
            const buttonY = detailsY - Math.max(20 * scale, 18);
            const buttonW = detailsTextWidth + (detailsPadding * 2);
            const buttonH = Math.max(35, detailsFontSize + 20);

            ctx.roundRect(buttonX, buttonY, buttonW, buttonH, Math.max(6, 8 * scale));

            // Minimal outer glow effect
            ctx.shadowColor = accentColor;
            ctx.shadowBlur = Math.max(8, 12 * scale);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            if (useGradient) {
              const buttonGradient = ctx.createLinearGradient(buttonX, buttonY, buttonX, buttonY + buttonH);
              buttonGradient.addColorStop(0, accentColor);
              buttonGradient.addColorStop(0.5, accentColor2);
              buttonGradient.addColorStop(1, accentColor);
              ctx.fillStyle = buttonGradient;
            } else {
              ctx.fillStyle = accentColor;
            }
            ctx.fill();

            // Inner highlight
            ctx.beginPath();
            ctx.roundRect(buttonX + 2 * scale, buttonY + 2 * scale, buttonW - 4 * scale, buttonH - 4 * scale, Math.max(6, 7 * scale));
            const innerGradient = ctx.createLinearGradient(buttonX, buttonY, buttonX, buttonY + buttonH / 2);
            innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = innerGradient;
            ctx.fill();

            // Minimal button shadow
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = Math.max(6, 10 * scale);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = Math.max(3, 4 * scale);
            ctx.beginPath();
            ctx.roundRect(buttonX, buttonY, buttonW, buttonH, Math.max(6, 8 * scale));
            if (useGradient) {
              const shadowGradient = ctx.createLinearGradient(buttonX, buttonY, buttonX, buttonY + buttonH);
              shadowGradient.addColorStop(0, accentColor);
              shadowGradient.addColorStop(1, accentColor2);
              ctx.fillStyle = shadowGradient;
            } else {
              ctx.fillStyle = accentColor;
            }
            ctx.fill();
            ctx.restore();

            // Draw button text with minimal enhanced styling
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = Math.max(3, 4 * scale);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = Math.max(2, 2.5 * scale);
            ctx.fillText(detailsText, detailsX, detailsY);

            // Minimal text highlight/glow
            ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
            ctx.shadowBlur = Math.max(2, 3 * scale);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.fillText(detailsText, detailsX, detailsY);

            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            
            // Second: Website and Chilekotha (below button, not much space)
            const footerGap = Math.max(18 * scale, 15); // Not much space
            currentY = detailsY + buttonH / 2 + footerGap;
            const footerFontSize = Math.max(12, Math.min(18 * scale, width * 0.025));
            
            // Website link (left aligned)
            const websiteText = "sylhetynews.com";
            ctx.font = `${fontStyle} ${fontWeight} ${footerFontSize}px 'Inter', sans-serif`;
            ctx.textAlign = "left";
            
            if (useGradient) {
              const websiteGradient = ctx.createLinearGradient(
                paddingX,
                currentY - 10 * scale,
                paddingX + ctx.measureText(websiteText).width,
                currentY + 10 * scale
              );
              websiteGradient.addColorStop(0, accentColor);
              websiteGradient.addColorStop(0.5, accentColor2);
              websiteGradient.addColorStop(1, accentColor);
              
              ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
              ctx.fillText(websiteText, paddingX + 1 * scale, currentY + 1 * scale);
              ctx.fillStyle = websiteGradient;
              ctx.fillText(websiteText, paddingX, currentY);
              
              ctx.shadowColor = accentColor;
              ctx.shadowBlur = Math.max(4, 6 * scale);
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 0;
              ctx.fillText(websiteText, paddingX, currentY);
              ctx.shadowColor = 'transparent';
              ctx.shadowBlur = 0;
            } else {
              ctx.fillStyle = accentColor;
              ctx.fillText(websiteText, paddingX, currentY);
            }
            
            // Right side: Chilekotha
            const chilekothaText = "TechPartner: Chilekotha";
            ctx.textAlign = "right";
            
            if (useGradient) {
              const chilekothaGradient = ctx.createLinearGradient(
                width - paddingX - ctx.measureText(chilekothaText).width,
                currentY - 10 * scale,
                width - paddingX,
                currentY + 10 * scale
              );
              chilekothaGradient.addColorStop(0, accentColor);
              chilekothaGradient.addColorStop(0.5, accentColor2);
              chilekothaGradient.addColorStop(1, accentColor);
              
              ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
              ctx.fillText(chilekothaText, width - paddingX + 1 * scale, currentY + 1 * scale);
              ctx.fillStyle = chilekothaGradient;
              ctx.fillText(chilekothaText, width - paddingX, currentY);
              
              ctx.shadowColor = accentColor;
              ctx.shadowBlur = Math.max(4, 6 * scale);
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 0;
              ctx.fillText(chilekothaText, width - paddingX, currentY);
              ctx.shadowColor = 'transparent';
              ctx.shadowBlur = 0;
            } else {
              ctx.fillStyle = accentColor;
              ctx.fillText(chilekothaText, width - paddingX, currentY);
            }
          }

          const imageUrl = canvas.toDataURL("image/png");
          finalize(imageUrl);
        }
      };

      let newsImage = '';
      if (selectedNews) {
        if ('imageUrl' in selectedNews) {
          newsImage = (selectedNews as NewsArticle).imageUrl;
        } else if ('image' in selectedNews) {
          newsImage = (selectedNews as any).image;
        }
      }
      img.src = uploadedImagePreview || newsImage || "";
    });
  };

  const downloadImage = async () => {
    const imageUrl = await generatePhotoCard(true, false);
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.download = `photocard-${selectedNewsId || 'custom'}.png`;
    link.href = imageUrl;
    link.click();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="section-title text-2xl">ফটোকার্ড জেনারেটর</h1>
          <Button
            onClick={() => setShowTemplates(!showTemplates)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {showTemplates ? "কাস্টম তৈরি করুন" : "রেডিমেড টেমপ্লেট"}
          </Button>
        </div>

        {/* Template Gallery */}
        {showTemplates && templates.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bengali font-semibold mb-4 text-news-headline">
              রেডিমেড ফটোকার্ড টেমপ্লেট
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-card border border-news-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                  onClick={() => handleDownloadTemplate(template)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={template.previewUrl || template.imageUrl}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Download className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bengali text-sm font-semibold text-news-headline truncate">
                      {template.name}
                    </h3>
                    {template.description && (
                      <p className="text-xs text-news-subtext mt-1 line-clamp-2">
                        {template.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!showTemplates && (
          <>

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
                      <div>
                        <label className="text-sm font-bengali text-news-subtext">
                          গ্রেডিয়েন্ট রঙ (ঐচ্ছিক)
                        </label>
                        <div className="mt-1 flex items-center gap-3">
                          <input
                            type="color"
                            value={accentColor2}
                            onChange={(e) => setAccentColor2(e.target.value)}
                            className="h-9 w-12 rounded-md border border-news-border bg-transparent"
                          />
                          <span className="text-xs text-news-subtext">
                            {accentColor2.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-bengali text-news-subtext flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={useGradient}
                            onChange={(e) => setUseGradient(e.target.checked)}
                            className="rounded"
                          />
                          <span>গ্রেডিয়েন্ট ব্যবহার করুন</span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-bengali text-news-subtext">
                          ফন্ট স্টাইল
                        </label>
                        <div className="mt-1 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setFontBold((prev) => !prev)}
                            className={`px-3 py-2 text-xs border rounded ${fontBold
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-news-border text-news-subtext"
                              }`}
                          >
                            Bold
                          </button>
                          <button
                            type="button"
                            onClick={() => setFontItalic((prev) => !prev)}
                            className={`px-3 py-2 text-xs border rounded ${fontItalic
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-news-border text-news-subtext"
                              }`}
                          >
                            Italic
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-bengali text-news-subtext">
                          টেক্সট রঙ
                        </label>
                        <div className="mt-1 flex items-center gap-3">
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="h-9 w-12 rounded-md border border-news-border bg-transparent"
                          />
                          <span className="text-xs text-news-subtext">
                            {textColor.toUpperCase()}
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
                    <div>
                      <label className="text-sm font-bengali text-news-subtext">
                        ছবি অংশের উচ্চতা
                      </label>
                      <div className="mt-1 flex items-center gap-3">
                        <input
                          type="range"
                          min="0.4"
                          max="0.75"
                          step="0.05"
                          value={imageHeightRatio}
                          onChange={(e) => setImageHeightRatio(Number(e.target.value))}
                          className="w-full"
                        />
                        <span className="text-xs text-news-subtext">
                          {Math.round(imageHeightRatio * 100)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bengali text-news-subtext">
                        ওভারলে শক্তি
                      </label>
                      <div className="mt-1 flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={overlayStrength}
                          onChange={(e) => setOverlayStrength(Number(e.target.value))}
                          className="w-full"
                        />
                        <span className="text-xs text-news-subtext">
                          {Math.round(overlayStrength * 100)}%
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
                        {availableNews.map((news) => (
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
                      onClick={() => generatePhotoCard(true, true)}
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default PhotoCard;
