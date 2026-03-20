import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../layout/Layout";
import PhotocardDownload from "./PhotocardDownload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getFeaturedNews, newsData } from "@/data/newsData";
import { photocardService } from "@/services/apiService";
import type { PhotoCardTemplate } from "@/types/photocard";

const featuredNews = getFeaturedNews();
const PHOTO_CARD_WIDTH = 1080;
const PHOTO_CARD_HEIGHT = 1350;
const PHOTO_CARD_LOGO = "/logo-main.jpeg";

type CustomCardSettings = {
  imageScale: number;
  imageOffsetX: number;
  imageOffsetY: number;
  overlayColor: string;
  overlayOpacity: number;
  logoWidth: number;
  headlineTop: number;
  headlineWidth: number;
  headlineAlign: "left" | "center";
  headlineMaxLines: number;
  headlineFontSize: number;
  headlineLineHeight: number;
  headlineColor: string;
  footerHeight: number;
  footerBackground: string;
  footerOpacity: number;
  detailsFontSize: number;
  detailsColor: string;
  websiteFontSize: number;
  websiteColor: string;
};

const defaultSettings: CustomCardSettings = {
  imageScale: 100,
  imageOffsetX: 0,
  imageOffsetY: 0,
  overlayColor: "#04111d",
  overlayOpacity: 28,
  logoWidth: 240,
  headlineTop: 208,
  headlineWidth: 860,
  headlineAlign: "left",
  headlineMaxLines: 4,
  headlineFontSize: 92,
  headlineLineHeight: 1.06,
  headlineColor: "#ffffff",
  footerHeight: 232,
  footerBackground: "#07111f",
  footerOpacity: 88,
  detailsFontSize: 34,
  detailsColor: "#e2e8f0",
  websiteFontSize: 28,
  websiteColor: "#ffffff",
};

const portalPresets = [
  {
    id: "prime",
    name: "Prime",
    description: "Balanced newsroom-style card with strong contrast.",
    settings: defaultSettings,
  },
  {
    id: "spotlight",
    name: "Spotlight",
    description: "Bigger headline treatment for major feature stories.",
    settings: {
      imageScale: 112,
      imageOffsetY: -24,
      overlayColor: "#020617",
      overlayOpacity: 36,
      headlineTop: 254,
      headlineWidth: 900,
      headlineMaxLines: 3,
      headlineFontSize: 102,
      footerHeight: 216,
      footerBackground: "#020617",
      footerOpacity: 84,
      detailsFontSize: 30,
      websiteFontSize: 26,
    },
  },
  {
    id: "breaking",
    name: "Breaking",
    description: "Stronger framing and deeper footer for urgent stories.",
    settings: {
      imageScale: 108,
      overlayColor: "#12070b",
      overlayOpacity: 42,
      headlineTop: 234,
      headlineWidth: 840,
      headlineMaxLines: 4,
      headlineFontSize: 88,
      footerHeight: 252,
      footerBackground: "#2b0a12",
      footerOpacity: 92,
      detailsColor: "#fde7eb",
      websiteColor: "#ffd7df",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Cleaner portal look with centered headline balance.",
    settings: {
      imageScale: 104,
      overlayColor: "#0f172a",
      overlayOpacity: 24,
      logoWidth: 220,
      headlineTop: 266,
      headlineWidth: 820,
      headlineAlign: "center" as const,
      headlineMaxLines: 3,
      headlineFontSize: 84,
      headlineLineHeight: 1.08,
      footerHeight: 208,
      footerBackground: "#0f172a",
      footerOpacity: 82,
      detailsFontSize: 28,
      websiteFontSize: 24,
    },
  },
] as const;

const toDownloadName = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "photocard";

const loadCanvasImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load the image for photocard export."));
    image.src = src;
  });

const drawCoverImage = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  options: {
    zoomPercent?: number;
    offsetX?: number;
    offsetY?: number;
  } = {},
) => {
  const { zoomPercent = 100, offsetX = 0, offsetY = 0 } = options;
  const scale = Math.max(width / image.width, height / image.height) * (zoomPercent / 100);
  const scaledWidth = image.width * scale;
  const scaledHeight = image.height * scale;
  const maxOffsetX = Math.max(0, (scaledWidth - width) / 2);
  const maxOffsetY = Math.max(0, (scaledHeight - height) / 2);
  const clampedOffsetX = Math.max(-maxOffsetX, Math.min(maxOffsetX, offsetX));
  const clampedOffsetY = Math.max(-maxOffsetY, Math.min(maxOffsetY, offsetY));
  const drawOffsetX = (width - scaledWidth) / 2 + clampedOffsetX;
  const drawOffsetY = (height - scaledHeight) / 2 + clampedOffsetY;

  ctx.drawImage(image, drawOffsetX, drawOffsetY, scaledWidth, scaledHeight);
};

const wrapCanvasText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];

  if (words.length === 0) {
    return lines;
  }

  let currentLine = words[0];
  let consumedWords = 1;

  for (let index = 1; index < words.length; index += 1) {
    const candidate = `${currentLine} ${words[index]}`;
    if (ctx.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
      consumedWords += 1;
      continue;
    }

    lines.push(currentLine);
    currentLine = words[index];
    consumedWords += 1;

    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (consumedWords < words.length && lines.length > 0) {
    let shortened = lines[lines.length - 1];
    while (ctx.measureText(`${shortened}...`).width > maxWidth && shortened.length > 0) {
      shortened = shortened.slice(0, -1);
    }
    lines[lines.length - 1] = `${shortened.trim()}...`;
  }

  return lines.slice(0, maxLines);
};

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((part) => `${part}${part}`)
          .join("")
      : normalized.padEnd(6, "0").slice(0, 6);

  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const drawRoundedRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));

  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
};

const downloadDataUrl = (href: string, title: string) => {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = `${toDownloadName(title)}.jpg`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
};

const drawLogo = async (ctx: CanvasRenderingContext2D, logoWidth: number) => {
  const logoImage = await loadCanvasImage(PHOTO_CARD_LOGO).catch(() => null);
  const chipX = 26;
  const chipY = 24;

  if (!logoImage) {
    drawRoundedRectPath(ctx, chipX, chipY, 312, 108, 28);
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = '700 44px "Segoe UI", sans-serif';
    ctx.fillText("Sylhety News", 54, 96);
    return;
  }

  const scale = logoWidth / logoImage.width;
  const logoHeight = logoImage.height * scale;
  const chipWidth = logoWidth + 48;
  const chipHeight = logoHeight + 34;

  drawRoundedRectPath(ctx, chipX, chipY, chipWidth, chipHeight, 28);
  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.drawImage(logoImage, chipX + 24, chipY + 17, logoWidth, logoHeight);
};

const createCustomPhotocard = async ({
  imageUrl,
  headline,
  details,
  websiteLabel,
  settings,
}: {
  imageUrl: string;
  headline: string;
  details: string;
  websiteLabel: string;
  settings: CustomCardSettings;
}) => {
  const canvas = document.createElement("canvas");
  canvas.width = PHOTO_CARD_WIDTH;
  canvas.height = PHOTO_CARD_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Your browser could not prepare the photocard export.");
  }

  try {
    const backgroundImage = await loadCanvasImage(imageUrl);

    ctx.fillStyle = "#020817";
    ctx.fillRect(0, 0, PHOTO_CARD_WIDTH, PHOTO_CARD_HEIGHT);
    drawCoverImage(ctx, backgroundImage, PHOTO_CARD_WIDTH, PHOTO_CARD_HEIGHT, {
      zoomPercent: settings.imageScale,
      offsetX: settings.imageOffsetX,
      offsetY: settings.imageOffsetY,
    });

    ctx.fillStyle = hexToRgba(settings.overlayColor, settings.overlayOpacity / 100);
    ctx.fillRect(0, 0, PHOTO_CARD_WIDTH, PHOTO_CARD_HEIGHT);

    const topGlow = ctx.createRadialGradient(180, 120, 0, 180, 120, 720);
    topGlow.addColorStop(0, "rgba(255, 255, 255, 0.18)");
    topGlow.addColorStop(0.35, "rgba(255, 255, 255, 0.07)");
    topGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, PHOTO_CARD_WIDTH, PHOTO_CARD_HEIGHT);

    const depthGradient = ctx.createLinearGradient(0, 0, 0, PHOTO_CARD_HEIGHT);
    depthGradient.addColorStop(0, "rgba(2, 6, 23, 0.08)");
    depthGradient.addColorStop(0.45, "rgba(2, 6, 23, 0.04)");
    depthGradient.addColorStop(0.78, "rgba(2, 6, 23, 0.24)");
    depthGradient.addColorStop(1, "rgba(2, 6, 23, 0.52)");
    ctx.fillStyle = depthGradient;
    ctx.fillRect(0, 0, PHOTO_CARD_WIDTH, PHOTO_CARD_HEIGHT);

    await drawLogo(ctx, settings.logoWidth);

    const maxHeadlineHeight = PHOTO_CARD_HEIGHT - settings.footerHeight - settings.headlineTop - 72;
    const headlineLineHeight = settings.headlineFontSize * settings.headlineLineHeight;
    const maxHeadlineLines = Math.max(1, Math.floor(maxHeadlineHeight / headlineLineHeight));
    const headlineX = settings.headlineAlign === "center" ? PHOTO_CARD_WIDTH / 2 : 60;

    ctx.fillStyle = settings.headlineColor;
    ctx.font = `700 ${settings.headlineFontSize}px "Noto Sans Bengali", "Segoe UI", sans-serif`;
    ctx.textBaseline = "top";
    ctx.textAlign = settings.headlineAlign;
    ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 8;

    const headlineLines = wrapCanvasText(
      ctx,
      headline,
      settings.headlineWidth,
      Math.min(settings.headlineMaxLines, maxHeadlineLines),
    );
    let headlineY = settings.headlineTop;
    headlineLines.forEach((line) => {
      ctx.fillText(line, headlineX, headlineY);
      headlineY += headlineLineHeight;
    });

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    ctx.textAlign = "left";

    drawRoundedRectPath(ctx, 22, 22, PHOTO_CARD_WIDTH - 44, PHOTO_CARD_HEIGHT - 44, 32);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
    ctx.lineWidth = 2;
    ctx.stroke();

    const footerGradient = ctx.createLinearGradient(
      0,
      PHOTO_CARD_HEIGHT - settings.footerHeight,
      0,
      PHOTO_CARD_HEIGHT,
    );
    footerGradient.addColorStop(
      0,
      hexToRgba(settings.footerBackground, Math.max(0, settings.footerOpacity / 100 - 0.14)),
    );
    footerGradient.addColorStop(
      1,
      hexToRgba(settings.footerBackground, settings.footerOpacity / 100),
    );
    ctx.fillStyle = footerGradient;
    ctx.fillRect(0, PHOTO_CARD_HEIGHT - settings.footerHeight, PHOTO_CARD_WIDTH, settings.footerHeight);
    ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
    ctx.fillRect(42, PHOTO_CARD_HEIGHT - settings.footerHeight, PHOTO_CARD_WIDTH - 84, 2);

    const footerTop = PHOTO_CARD_HEIGHT - settings.footerHeight;
    const footerPaddingX = 54;
    const footerPaddingY = 42;
    const websiteColumnWidth = 300;
    const websiteText = websiteLabel.toUpperCase();
    ctx.font = `700 ${settings.websiteFontSize}px "Segoe UI", sans-serif`;
    const websiteTextWidth = ctx.measureText(websiteText).width;
    const websitePillWidth = Math.min(Math.max(websiteTextWidth + 68, 210), websiteColumnWidth);
    const websitePillHeight = settings.websiteFontSize + 38;
    const websitePillX = PHOTO_CARD_WIDTH - footerPaddingX - websitePillWidth;
    const websitePillY = footerTop + footerPaddingY;
    const detailsWidth = Math.max(320, websitePillX - footerPaddingX - 44);
    const detailsLineHeight = settings.detailsFontSize * 1.4;
    const detailsMaxLines = Math.max(
      1,
      Math.floor((settings.footerHeight - footerPaddingY * 2) / detailsLineHeight),
    );

    ctx.fillStyle = settings.detailsColor;
    ctx.font = `500 ${settings.detailsFontSize}px "Noto Sans Bengali", "Segoe UI", sans-serif`;
    ctx.textBaseline = "top";
    const detailLines = wrapCanvasText(ctx, details, detailsWidth, Math.min(5, detailsMaxLines));
    let detailsY = footerTop + footerPaddingY;
    detailLines.forEach((line) => {
      ctx.fillText(line, footerPaddingX, detailsY);
      detailsY += detailsLineHeight;
    });

    ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
    ctx.fillRect(
      websitePillX - 24,
      footerTop + 32,
      2,
      Math.max(0, settings.footerHeight - 64),
    );

    drawRoundedRectPath(ctx, websitePillX, websitePillY, websitePillWidth, websitePillHeight, websitePillHeight / 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.10)";
    ctx.fill();
    ctx.strokeStyle = hexToRgba(settings.websiteColor, 0.45);
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = settings.websiteColor;
    ctx.font = `700 ${settings.websiteFontSize}px "Segoe UI", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      websiteText,
      websitePillX + websitePillWidth / 2,
      websitePillY + websitePillHeight / 2,
    );
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    return canvas.toDataURL("image/jpeg", 0.94);
  } catch {
    throw new Error(
      "This image source blocked photocard export. Try another story image or use the admin template download.",
    );
  }
};

type RangeControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
};

const RangeControl = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: RangeControlProps) => (
  <label className="grid gap-2">
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium text-news-headline">{label}</span>
      <span className="text-xs font-semibold text-news-subtext">
        {value}
        {unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="w-full accent-primary"
    />
  </label>
);

type ColorControlProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const ColorControl = ({ label, value, onChange }: ColorControlProps) => (
  <label className="grid gap-2">
    <span className="text-sm font-medium text-news-headline">{label}</span>
    <div className="flex items-center gap-3 rounded-2xl border border-news-border bg-background px-3 py-2">
      <input
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-12 cursor-pointer rounded-md border-0 bg-transparent p-0"
      />
      <span className="text-sm text-news-subtext">{value.toUpperCase()}</span>
    </div>
  </label>
);

export default function PhotoCardStudio() {
  const [searchParams] = useSearchParams();
  const previewRef = useRef<HTMLDivElement | null>(null);
  const selectedNewsId = searchParams.get("newsId");
  const selectedArticle = newsData.find((item) => item.id === selectedNewsId) ?? featuredNews;

  const [templates, setTemplates] = useState<PhotoCardTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [mode, setMode] = useState<"template" | "custom">("template");
  const [headlineText, setHeadlineText] = useState(selectedArticle.title);
  const [cardDetails, setCardDetails] = useState(selectedArticle.excerpt);
  const [websiteLabel, setWebsiteLabel] = useState("sylhetynews.com");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("prime");
  const [customSettings, setCustomSettings] = useState<CustomCardSettings>(defaultSettings);
  const [downloadError, setDownloadError] = useState("");
  const [isGeneratingDownload, setIsGeneratingDownload] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const [showGuides, setShowGuides] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTemplates = async () => {
      try {
        const loadedTemplates = await photocardService.getTemplates();
        if (!isMounted) return;

        const activeTemplates = loadedTemplates.filter((template) => template.isActive);
        setTemplates(activeTemplates);
        setSelectedTemplateId(activeTemplates[0]?.id ?? null);
        if (activeTemplates.length === 0) {
          setMode("custom");
        }
      } catch {
        if (!isMounted) return;
        setTemplates([]);
        setSelectedTemplateId(null);
        setMode("custom");
      } finally {
        if (isMounted) {
          setLoadingTemplates(false);
        }
      }
    };

    void loadTemplates();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setHeadlineText(selectedArticle.title);
    setCardDetails(selectedArticle.excerpt);
    setDownloadError("");
  }, [selectedArticle.excerpt, selectedArticle.id, selectedArticle.title]);

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;

    const updateScale = () => {
      setPreviewScale(node.clientWidth / PHOTO_CARD_WIDTH);
    };

    updateScale();

    const observer = new ResizeObserver(() => updateScale());
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) ?? templates[0] ?? null,
    [selectedTemplateId, templates],
  );

  const previewImage =
    mode === "template" && selectedTemplate
      ? selectedTemplate.previewUrl || selectedTemplate.imageUrl
      : selectedArticle.image;

  const detailText = cardDetails.trim();
  const finalHeadline = headlineText.trim() || selectedArticle.title;
  const finalWebsiteLabel = websiteLabel.trim() || "sylhetynews.com";
  const headlineBlockLeft =
    customSettings.headlineAlign === "center"
      ? (PHOTO_CARD_WIDTH - customSettings.headlineWidth) / 2
      : 60;

  const updateSetting = <K extends keyof CustomCardSettings>(
    key: K,
    value: CustomCardSettings[K],
  ) => {
    setSelectedPresetId("custom");
    setCustomSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const applyPreset = (presetId: string) => {
    const preset = portalPresets.find((item) => item.id === presetId);
    if (!preset) return;

    setSelectedPresetId(preset.id);
    setCustomSettings((current) => ({
      ...current,
      ...preset.settings,
    }));
  };

  const handleCustomDownload = async () => {
    setDownloadError("");
    setIsGeneratingDownload(true);

    try {
      const photocardUrl = await createCustomPhotocard({
        imageUrl: selectedArticle.image,
        headline: finalHeadline,
        details: detailText,
        websiteLabel: finalWebsiteLabel,
        settings: customSettings,
      });

      downloadDataUrl(photocardUrl, `${selectedArticle.title}-custom-photocard`);
    } catch (error) {
      setDownloadError(
        error instanceof Error ? error.message : "Unable to prepare the photocard download.",
      );
    } finally {
      setIsGeneratingDownload(false);
    }
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(360px,1fr)]">
          <div className="rounded-[28px] border border-news-border bg-card p-6 shadow-xl shadow-black/5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                  Photocard Studio
                </p>
                <h1 className="mt-2 text-3xl font-bold text-news-headline">
                  Premium newsroom photocard studio
                </h1>
                <p className="mt-3 max-w-2xl text-news-subtext">
                  Build a cleaner portal-style photocard with editorial presets, crop controls, premium framing, and full headline and footer customization before export.
                </p>
              </div>
              <div className="inline-flex rounded-full border border-news-border bg-muted p-1">
                <button
                  type="button"
                  onClick={() => setMode("template")}
                  disabled={!selectedTemplate}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    mode === "template"
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-news-subtext"
                  } ${selectedTemplate ? "" : "cursor-not-allowed opacity-50"}`}
                >
                  Admin Template
                </button>
                <button
                  type="button"
                  onClick={() => setMode("custom")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    mode === "custom"
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-news-subtext"
                  }`}
                >
                  Custom Layout
                </button>
              </div>
            </div>

            <div
              ref={previewRef}
              className="relative mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-news-slate shadow-2xl shadow-news-slate/20"
              style={{ aspectRatio: `${PHOTO_CARD_WIDTH} / ${PHOTO_CARD_HEIGHT}` }}
            >
              <div
                className="absolute left-0 top-0 origin-top-left"
                style={{
                  width: PHOTO_CARD_WIDTH,
                  height: PHOTO_CARD_HEIGHT,
                  transform: `scale(${previewScale})`,
                }}
              >
                <img
                  src={previewImage}
                  alt={selectedArticle.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={
                    mode === "custom"
                      ? {
                          transform: `translate(${customSettings.imageOffsetX}px, ${customSettings.imageOffsetY}px) scale(${customSettings.imageScale / 100})`,
                          transformOrigin: "center center",
                        }
                      : undefined
                  }
                />

                {mode === "custom" ? (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundColor: hexToRgba(
                          customSettings.overlayColor,
                          customSettings.overlayOpacity / 100,
                        ),
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 15% 10%, rgba(255,255,255,0.18), rgba(255,255,255,0) 42%)",
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(2,6,23,0.08) 0%, rgba(2,6,23,0.04) 44%, rgba(2,6,23,0.24) 78%, rgba(2,6,23,0.52) 100%)",
                      }}
                    />
                    <div className="pointer-events-none absolute inset-[22px] rounded-[34px] border border-white/20" />
                    {showGuides ? (
                      <>
                        <div className="pointer-events-none absolute inset-[44px] rounded-[28px] border border-dashed border-white/20" />
                        <div
                          className="pointer-events-none absolute left-[54px] right-[54px] border-t border-dashed border-white/25"
                          style={{ top: PHOTO_CARD_HEIGHT - customSettings.footerHeight }}
                        />
                      </>
                    ) : null}

                    <div
                      className="absolute left-[26px] top-[24px] rounded-[28px] border border-white/20 bg-white/10 px-6 py-[17px] shadow-[0_16px_50px_rgba(2,6,23,0.3)]"
                    >
                      <div style={{ width: customSettings.logoWidth }}>
                        <img
                          src={PHOTO_CARD_LOGO}
                          alt="Sylhety News"
                          className="w-full object-contain"
                        />
                      </div>
                    </div>

                    <div
                      className="absolute"
                      style={{
                        left: headlineBlockLeft,
                        top: customSettings.headlineTop,
                        width: customSettings.headlineWidth,
                      }}
                    >
                      <h2
                        style={{
                          color: customSettings.headlineColor,
                          fontSize: customSettings.headlineFontSize,
                          lineHeight: customSettings.headlineLineHeight,
                          textShadow: "0 8px 24px rgba(0, 0, 0, 0.55)",
                          fontWeight: 700,
                          textAlign: customSettings.headlineAlign,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: customSettings.headlineMaxLines,
                          overflow: "hidden",
                        }}
                      >
                        {finalHeadline}
                      </h2>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        height: customSettings.footerHeight,
                        background: `linear-gradient(180deg, ${hexToRgba(
                          customSettings.footerBackground,
                          Math.max(0, customSettings.footerOpacity / 100 - 0.14),
                        )} 0%, ${hexToRgba(
                          customSettings.footerBackground,
                          customSettings.footerOpacity / 100,
                        )} 100%)`,
                        borderTop: "2px solid rgba(255, 255, 255, 0.16)",
                        padding: "42px 54px",
                      }}
                    >
                      <div className="flex h-full items-end justify-between gap-8">
                        <p
                          className="min-w-0 flex-1"
                          style={{
                            color: customSettings.detailsColor,
                            fontSize: customSettings.detailsFontSize,
                            lineHeight: 1.4,
                            maxWidth: 640,
                          }}
                        >
                          {detailText || "Add footer details or comments from the control panel."}
                        </p>
                        <div className="h-full w-px self-stretch bg-white/15" />
                        <div
                          className="shrink-0 rounded-full border bg-white/10 px-8 py-4 shadow-[0_12px_28px_rgba(2,6,23,0.22)]"
                          style={{
                            borderColor: hexToRgba(customSettings.websiteColor, 0.45),
                          }}
                        >
                          <span
                            style={{
                              color: customSettings.websiteColor,
                              fontSize: customSettings.websiteFontSize,
                              letterSpacing: "0.24em",
                              fontWeight: 700,
                              textTransform: "uppercase",
                            }}
                          >
                            {finalWebsiteLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <div className="max-w-xl rounded-[28px] border border-white/15 bg-black/35 px-6 py-5 shadow-2xl backdrop-blur-md">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/65">
                          {selectedTemplate?.name ?? "No active admin template"}
                        </p>
                        <h2 className="mt-3 text-2xl font-bold leading-tight">
                          {selectedTemplate?.description || "Direct template download mode is active."}
                        </h2>
                        <p className="mt-3 text-white/80">
                          {selectedTemplate
                            ? "This mode downloads the photocard uploaded from the admin panel."
                            : "Upload and activate a template from the admin panel to enable direct template downloads here."}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PhotocardDownload
                imageUrl={selectedTemplate?.imageUrl}
                title={mode === "template" && selectedTemplate ? selectedTemplate.name : finalHeadline}
                label={
                  mode === "template"
                    ? "Download Admin Template"
                    : isGeneratingDownload
                      ? "Preparing Custom Photocard..."
                      : "Download Custom Photocard"
                }
                onClick={mode === "custom" ? handleCustomDownload : undefined}
                disabled={mode === "custom" ? isGeneratingDownload : !selectedTemplate}
              />
              <p className="text-sm text-news-subtext">
                {mode === "template"
                  ? "Admin template mode downloads the active photocard uploaded from the dashboard."
                  : "Custom layout exports the exact logo, headline, footer link, and comment settings shown in the preview."}
              </p>
            </div>

            {downloadError ? (
              <p className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {downloadError}
              </p>
            ) : null}
          </div>

          <section className="rounded-[28px] border border-news-border bg-card p-4 shadow-xl shadow-black/5">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-news-headline">Story Selector</h2>
              <p className="mt-2 text-sm text-news-subtext">
                Choose a news image, then customize the headline and footer the way you want.
              </p>
            </div>

            <div className="space-y-3">
              {newsData.map((item) => (
                <Link
                  key={item.id}
                  to={`/photocard?newsId=${item.id}`}
                  className={`block rounded-2xl border p-4 transition-colors ${
                    item.id === selectedArticle.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-news-border hover:border-primary/40"
                  }`}
                >
                  <p className="font-semibold text-news-headline">{item.title}</p>
                  <p className="mt-1 text-sm text-news-subtext">{item.categoryBn}</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-news-border bg-muted/40 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-news-headline">Portal Presets</h2>
                  <p className="mt-2 text-sm text-news-subtext">
                    Start from a professional portal-style preset, then fine-tune the card.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGuides((current) => !current)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    showGuides
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-news-border bg-background text-news-headline hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {showGuides ? "Hide Safe Guides" : "Show Safe Guides"}
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {portalPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset.id)}
                    className={`rounded-[22px] border p-4 text-left transition ${
                      selectedPresetId === preset.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-news-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
                      {preset.name}
                    </p>
                    <p className="mt-2 text-base font-semibold text-news-headline">{preset.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-news-border bg-muted/40 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-news-headline">Content Controls</h2>
                  <p className="mt-2 text-sm text-news-subtext">
                    These controls affect the custom studio mode only.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCustomSettings(defaultSettings);
                    setSelectedPresetId("prime");
                  }}
                  className="rounded-full border border-news-border bg-background px-4 py-2 text-xs font-semibold text-news-headline transition hover:border-primary/40 hover:text-primary"
                >
                  Reset Settings
                </button>
              </div>

              <div className="mt-4 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-news-headline">Headline Text</span>
                  <Textarea
                    value={headlineText}
                    onChange={(event) => setHeadlineText(event.target.value)}
                    placeholder="Write or edit the headline here..."
                    className="min-h-[110px] rounded-2xl border-news-border"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-news-headline">Footer Details / Comment</span>
                  <Textarea
                    value={cardDetails}
                    onChange={(event) => setCardDetails(event.target.value)}
                    placeholder="Add footer details or comment here..."
                    className="min-h-[120px] rounded-2xl border-news-border"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-news-headline">Website Link Text</span>
                  <Input
                    value={websiteLabel}
                    onChange={(event) => setWebsiteLabel(event.target.value)}
                    placeholder="sylhetynews.com"
                    className="rounded-2xl border-news-border"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-news-border bg-muted/40 p-4">
              <h2 className="text-xl font-semibold text-news-headline">Image Framing</h2>
              <p className="mt-2 text-sm text-news-subtext">
                Reframe the source photo for Facebook format without changing the story.
              </p>

              <div className="mt-4 grid gap-5">
                <RangeControl
                  label="Image Zoom"
                  value={customSettings.imageScale}
                  min={100}
                  max={140}
                  unit="%"
                  onChange={(value) => updateSetting("imageScale", value)}
                />
                <RangeControl
                  label="Image Horizontal Position"
                  value={customSettings.imageOffsetX}
                  min={-220}
                  max={220}
                  unit="px"
                  onChange={(value) => updateSetting("imageOffsetX", value)}
                />
                <RangeControl
                  label="Image Vertical Position"
                  value={customSettings.imageOffsetY}
                  min={-260}
                  max={260}
                  unit="px"
                  onChange={(value) => updateSetting("imageOffsetY", value)}
                />
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-news-border bg-muted/40 p-4">
              <h2 className="text-xl font-semibold text-news-headline">Layout Controls</h2>
              <p className="mt-2 text-sm text-news-subtext">
                Adjust the visual balance of the logo, headline, and footer.
              </p>

              <div className="mt-4 grid gap-5">
                <RangeControl
                  label="Logo Width"
                  value={customSettings.logoWidth}
                  min={120}
                  max={320}
                  unit="px"
                  onChange={(value) => updateSetting("logoWidth", value)}
                />
                <RangeControl
                  label="Headline Top Position"
                  value={customSettings.headlineTop}
                  min={120}
                  max={760}
                  unit="px"
                  onChange={(value) => updateSetting("headlineTop", value)}
                />
                <RangeControl
                  label="Headline Width"
                  value={customSettings.headlineWidth}
                  min={360}
                  max={940}
                  unit="px"
                  onChange={(value) => updateSetting("headlineWidth", value)}
                />
                <div className="grid gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-news-headline">Headline Alignment</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-news-subtext">
                      {customSettings.headlineAlign}
                    </span>
                  </div>
                  <div className="inline-flex rounded-full border border-news-border bg-background p-1">
                    {(["left", "center"] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => updateSetting("headlineAlign", value)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          customSettings.headlineAlign === value
                            ? "bg-primary text-primary-foreground shadow"
                            : "text-news-subtext"
                        }`}
                      >
                        {value === "left" ? "Left" : "Center"}
                      </button>
                    ))}
                  </div>
                </div>
                <RangeControl
                  label="Headline Max Lines"
                  value={customSettings.headlineMaxLines}
                  min={2}
                  max={6}
                  onChange={(value) => updateSetting("headlineMaxLines", value)}
                />
                <RangeControl
                  label="Headline Font Size"
                  value={customSettings.headlineFontSize}
                  min={48}
                  max={120}
                  unit="px"
                  onChange={(value) => updateSetting("headlineFontSize", value)}
                />
                <RangeControl
                  label="Headline Line Height"
                  value={Number(customSettings.headlineLineHeight.toFixed(2))}
                  min={0.9}
                  max={1.5}
                  step={0.01}
                  onChange={(value) => updateSetting("headlineLineHeight", value)}
                />
                <RangeControl
                  label="Footer Height"
                  value={customSettings.footerHeight}
                  min={150}
                  max={340}
                  unit="px"
                  onChange={(value) => updateSetting("footerHeight", value)}
                />
                <RangeControl
                  label="Footer Details Font Size"
                  value={customSettings.detailsFontSize}
                  min={22}
                  max={48}
                  unit="px"
                  onChange={(value) => updateSetting("detailsFontSize", value)}
                />
                <RangeControl
                  label="Website Font Size"
                  value={customSettings.websiteFontSize}
                  min={20}
                  max={40}
                  unit="px"
                  onChange={(value) => updateSetting("websiteFontSize", value)}
                />
                <RangeControl
                  label="Overlay Strength"
                  value={customSettings.overlayOpacity}
                  min={0}
                  max={85}
                  unit="%"
                  onChange={(value) => updateSetting("overlayOpacity", value)}
                />
                <RangeControl
                  label="Footer Opacity"
                  value={customSettings.footerOpacity}
                  min={30}
                  max={100}
                  unit="%"
                  onChange={(value) => updateSetting("footerOpacity", value)}
                />
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-news-border bg-muted/40 p-4">
              <h2 className="text-xl font-semibold text-news-headline">Color Controls</h2>
              <p className="mt-2 text-sm text-news-subtext">
                Fine-tune the text colors, overlay color, and footer background.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <ColorControl
                  label="Headline Color"
                  value={customSettings.headlineColor}
                  onChange={(value) => updateSetting("headlineColor", value)}
                />
                <ColorControl
                  label="Overlay Color"
                  value={customSettings.overlayColor}
                  onChange={(value) => updateSetting("overlayColor", value)}
                />
                <ColorControl
                  label="Footer Background"
                  value={customSettings.footerBackground}
                  onChange={(value) => updateSetting("footerBackground", value)}
                />
                <ColorControl
                  label="Footer Details Color"
                  value={customSettings.detailsColor}
                  onChange={(value) => updateSetting("detailsColor", value)}
                />
                <ColorControl
                  label="Website Link Color"
                  value={customSettings.websiteColor}
                  onChange={(value) => updateSetting("websiteColor", value)}
                />
              </div>
            </div>

            <div className="mt-8 border-t border-news-border pt-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-news-headline">Admin Templates</h2>
                  <p className="mt-2 text-sm text-news-subtext">
                    Active templates uploaded from the admin dashboard remain available as direct downloads.
                  </p>
                </div>
                {loadingTemplates ? (
                  <span className="text-sm text-news-subtext">Loading...</span>
                ) : (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-news-subtext">
                    {templates.length} active
                  </span>
                )}
              </div>

              {templates.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-news-border bg-muted/40 p-4 text-sm text-news-subtext">
                  No active admin template is available yet. Custom layout mode is ready for direct editing and download.
                </div>
              ) : (
                <div className="mt-4 grid gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => {
                        setSelectedTemplateId(template.id);
                        setMode("template");
                      }}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                        selectedTemplate?.id === template.id && mode === "template"
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-news-border hover:border-primary/40"
                      }`}
                    >
                      <img
                        src={template.previewUrl || template.imageUrl}
                        alt={template.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-news-headline">{template.name}</p>
                        <p className="mt-1 text-sm text-news-subtext">
                          {template.description || "Active admin-uploaded photocard template"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
}
