import { useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Link, Route, Routes, useLocation, useParams, useSearchParams } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/layout/Layout";
import CategorySection from "./components/news/CategorySection";
import LatestNewsSidebar from "./components/news/LatestNewsSidebar";
import LeadNews from "./components/news/LeadNews";
import NewsCard from "./components/news/NewsCard";
import PhotocardDownload from "./components/news/PhotocardDownload";
import SylhetSpecial from "./components/news/SylhetSpecial";
import TopStories from "./components/news/TopStories";
import WeatherWidget from "./components/news/WeatherWidget";
import { sylhetDistricts } from "./data/districts";
import { getFeaturedNews, getLatestNews, getNewsByCategory, newsData } from "./data/newsData";
import { photocardService } from "./services/apiService";
import type { PhotoCardTemplate } from "./types/photocard";

const queryClient = new QueryClient();

const categoryRoutes = [
  { path: "/sylhet", title: "Sylhet", key: "sylhet" },
  { path: "/national", title: "National", key: "national" },
  { path: "/politics", title: "Politics", key: "politics" },
  { path: "/mofoshol", title: "Mofoshol", key: "mofoshol" },
  { path: "/international", title: "International", key: "international" },
  { path: "/economy", title: "Economy", key: "economy" },
  { path: "/entertainment", title: "Entertainment", key: "entertainment" },
  { path: "/expat", title: "Expat", key: "expat" },
  { path: "/sports", title: "Sports", key: "sports" },
  { path: "/lifestyle", title: "Lifestyle", key: "lifestyle" },
  { path: "/technology", title: "Technology", key: "technology" },
  { path: "/law", title: "Law", key: "law" },
  { path: "/opinion", title: "Opinion", key: "opinion" },
  { path: "/others", title: "Others", key: "others" },
] as const;

const featuredNews = getFeaturedNews();
const latestNews = getLatestNews(5);

function HomePage() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <LeadNews news={featuredNews} />
          <div className="grid gap-6">
            <TopStories news={latestNews} />
            <WeatherWidget />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="space-y-8">
            {categoryRoutes.slice(0, 6).map((category) => (
              <CategorySection
                key={category.key}
                title={category.title}
                news={getNewsByCategory(category.key)}
                categoryPath={category.path}
              />
            ))}
          </div>

          <div className="grid gap-6">
            <LatestNewsSidebar news={latestNews} />
            <SylhetSpecial news={getNewsByCategory("sylhet")[0] ?? featuredNews} />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function CategoryPage() {
  const location = useLocation();
  const category = categoryRoutes.find((item) => item.path === location.pathname);
  const articles = getNewsByCategory(category?.key ?? "");

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 border-b border-news-border pb-4">
          <h1 className="text-3xl font-bold text-news-headline">{category?.title ?? "Category"}</h1>
          <p className="mt-2 text-news-subtext">
            Latest stories from the {category?.title?.toLowerCase() ?? "selected"} desk.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="rounded-md border border-news-border bg-card p-6 text-news-subtext">
            No stories are available in this category yet.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <NewsCard key={article.id} news={article} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

function NewsDetailPage() {
  const { id } = useParams();
  const article = newsData.find((item) => item.id === id);

  if (!article) {
    return <NotFoundPage />;
  }

  const related = newsData.filter((item) => item.id !== article.id).slice(0, 4);

  return (
    <Layout>
      <article className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="rounded-md border border-news-border bg-card">
            <img src={article.image} alt={article.title} className="h-[320px] w-full object-cover" />
            <div className="space-y-5 p-6">
              <span className="inline-flex rounded bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                {article.categoryBn}
              </span>
              <h1 className="text-3xl font-bold leading-tight text-news-headline">{article.title}</h1>
              <div className="text-sm text-news-subtext">
                {article.author} | {article.date}
              </div>
              <p className="text-lg leading-8 text-news-headline">{article.content}</p>
              <PhotocardDownload imageUrl={article.image} title={article.title} />
            </div>
          </div>

          <div className="grid gap-6">
            <LatestNewsSidebar news={latestNews} />
            <section className="rounded-md border border-news-border bg-card p-4">
              <h2 className="mb-4 text-xl font-semibold text-news-headline">Related Stories</h2>
              <div className="space-y-4">
                {related.map((item) => (
                  <NewsCard key={item.id} news={item} variant="compact" />
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </Layout>
  );
}

function PhotoCardPage() {
  const [searchParams] = useSearchParams();
  const selectedNewsId = searchParams.get("newsId");
  const selectedArticle = newsData.find((item) => item.id === selectedNewsId) ?? featuredNews;
  const [templates, setTemplates] = useState<PhotoCardTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [mode, setMode] = useState<"template" | "headline">("template");

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
          setMode("headline");
        }
      } catch {
        if (!isMounted) return;
        setTemplates([]);
        setSelectedTemplateId(null);
        setMode("headline");
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

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) ?? templates[0] ?? null,
    [selectedTemplateId, templates]
  );

  const previewImage =
    mode === "template" && selectedTemplate
      ? selectedTemplate.previewUrl || selectedTemplate.imageUrl
      : selectedTemplate?.previewUrl || selectedTemplate?.imageUrl || selectedArticle.image;

  const downloadImage =
    mode === "template" && selectedTemplate
      ? selectedTemplate.imageUrl
      : selectedTemplate?.previewUrl || selectedTemplate?.imageUrl || selectedArticle.image;

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="rounded-[28px] border border-news-border bg-card p-6 shadow-xl shadow-black/5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">Photocard Studio</p>
                <h1 className="mt-2 text-3xl font-bold text-news-headline">Modern export-ready card maker</h1>
                <p className="mt-3 max-w-2xl text-news-subtext">
                  Default mode downloads the active admin template. Switch to headline mode to place the story title in the middle of the image.
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
                  onClick={() => setMode("headline")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    mode === "headline"
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-news-subtext"
                  }`}
                >
                  Centered Headline
                </button>
              </div>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-news-slate shadow-2xl shadow-news-slate/20">
              <img src={previewImage} alt={selectedArticle.title} className="h-[620px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/70" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 text-white/80">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] backdrop-blur">
                  Sylhety News
                </span>
                <span className="text-sm font-medium">{selectedArticle.date}</span>
              </div>

              {mode === "headline" ? (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="max-w-2xl rounded-[32px] border border-white/15 bg-black/35 px-8 py-10 text-center text-white shadow-2xl backdrop-blur-md">
                    <span className="inline-flex rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground">
                      {selectedArticle.categoryBn}
                    </span>
                    <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                      {selectedArticle.title}
                    </h2>
                    <p className="mt-5 text-sm uppercase tracking-[0.35em] text-white/75">
                      {selectedArticle.author}
                    </p>
                  </div>
                </div>
              ) : (
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
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PhotocardDownload
                imageUrl={downloadImage}
                title={mode === "template" && selectedTemplate ? selectedTemplate.name : selectedArticle.title}
                label={
                  mode === "template" && selectedTemplate
                    ? "Download Admin Template"
                    : "Download Centered-Headline Card"
                }
              />
              <p className="text-sm text-news-subtext">
                {mode === "template" && selectedTemplate
                  ? "Default mode downloads the active photocard from the admin dashboard."
                  : "Headline mode keeps the title locked to the center of the picture."}
              </p>
            </div>
          </div>

          <section className="rounded-[28px] border border-news-border bg-card p-4 shadow-xl shadow-black/5">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-news-headline">Story Selector</h2>
              <p className="mt-2 text-sm text-news-subtext">
                Choose the headline that will appear in centered-headline mode.
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

            <div className="mt-8 border-t border-news-border pt-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-news-headline">Admin Templates</h2>
                  <p className="mt-2 text-sm text-news-subtext">
                    Active templates uploaded from the admin dashboard become the default download mode here.
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
                  No active admin template is available yet. Headline mode stays enabled until one is uploaded and activated.
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

function DistrictsPage() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 border-b border-news-border pb-4">
          <h1 className="text-3xl font-bold text-news-headline">District Coverage</h1>
          <p className="mt-2 text-news-subtext">Browse stories from every district in the Sylhet division.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sylhetDistricts.map((district) => {
            const count = newsData.filter((article) => article.district === district.id).length;
            return (
              <Link
                key={district.id}
                to={`/district/${district.id}`}
                className="rounded-md border border-news-border bg-card p-5 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold text-news-headline">{district.nameEn}</h2>
                <p className="mt-1 text-news-subtext">{district.nameBn}</p>
                <p className="mt-4 text-sm text-primary">{count} stories available</p>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

function DistrictPage() {
  const { district } = useParams();
  const districtInfo = sylhetDistricts.find((item) => item.id === district);
  const articles = newsData.filter((item) => item.district === district);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 border-b border-news-border pb-4">
          <h1 className="text-3xl font-bold text-news-headline">{districtInfo?.nameEn ?? "District"}</h1>
          <p className="mt-2 text-news-subtext">{districtInfo?.nameBn ?? "Latest district coverage"}.</p>
        </div>

        {articles.length === 0 ? (
          <p className="rounded-md border border-news-border bg-card p-6 text-news-subtext">
            No district stories are available yet.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <NewsCard key={article.id} news={article} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

function TeamPage() {
  const team = [
    { name: "Rahim Uddin", role: "Editor", summary: "Leads editorial decisions and the daily news desk." },
    { name: "Fatema Begum", role: "National Correspondent", summary: "Covers parliament, policy, and national affairs." },
    { name: "Mahmud Hasan", role: "Sports Reporter", summary: "Tracks cricket, football, and local sporting events." },
  ];

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 border-b border-news-border pb-4">
          <h1 className="text-3xl font-bold text-news-headline">Editorial Team</h1>
          <p className="mt-2 text-news-subtext">The people behind Sylhety News coverage and publishing.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="rounded-md border border-news-border bg-card p-6">
              <h2 className="text-xl font-semibold text-news-headline">{member.name}</h2>
              <p className="mt-2 text-primary">{member.role}</p>
              <p className="mt-4 text-news-subtext">{member.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function NotFoundPage() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-news-headline">Page Not Found</h1>
        <p className="mt-4 text-news-subtext">The page you requested does not exist in this build.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded bg-primary px-5 py-3 font-semibold text-primary-foreground"
        >
          Back To Homepage
        </Link>
      </section>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {categoryRoutes.map((category) => (
            <Route key={category.path} path={category.path} element={<CategoryPage />} />
          ))}
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/photocard" element={<PhotoCardPage />} />
          <Route path="/districts" element={<DistrictsPage />} />
          <Route path="/district/:district" element={<DistrictPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
