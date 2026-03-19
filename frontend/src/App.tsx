import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ArrowRight, Images, MapPinned, Newspaper, Sparkles } from "lucide-react";
import Layout from "./components/layout/Layout";
import CategorySection from "./components/news/CategorySection";
import LatestNewsSidebar from "./components/news/LatestNewsSidebar";
import LeadNews from "./components/news/LeadNews";
import NewsCard from "./components/news/NewsCard";
import PhotoCardStudio from "./components/news/PhotoCardStudio";
import PhotocardDownload from "./components/news/PhotocardDownload";
import SylhetSpecial from "./components/news/SylhetSpecial";
import TopStories from "./components/news/TopStories";
import WeatherWidget from "./components/news/WeatherWidget";
import { sylhetDistricts } from "./data/districts";
import { getFeaturedNews, getLatestNews, getNewsByCategory, newsData } from "./data/newsData";

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
  const homepageStats = [
    { label: "Front Page Stories", value: newsData.length, icon: Newspaper },
    { label: "Featured Report", value: 1, icon: Sparkles },
    { label: "District Coverage", value: sylhetDistricts.length, icon: MapPinned },
  ];

  return (
    <Layout>
      <section className="container mx-auto px-4 py-6">
        <div className="portal-panel relative overflow-hidden px-6 py-7 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.12),transparent_56%)]" />
          <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />
          <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,1fr)] xl:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                <Sparkles className="h-4 w-4" />
                Sylhety News Frontline
              </span>
              <h1 className="font-display mt-5 max-w-4xl text-4xl font-extrabold tracking-[-0.04em] text-news-headline md:text-5xl xl:text-6xl">
                A sharper, more visual Sylhet news homepage with stronger editorial focus.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-news-subtext md:text-lg">
                Follow breaking updates, feature stories, district reporting, and share-ready photocard content from one cleaner public experience.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/news/${featuredNews.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_35px_rgba(185,28,28,0.24)] transition-all hover:-translate-y-0.5"
                >
                  Read Lead Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/photocard"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-news-headline shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:text-primary"
                >
                  <Images className="h-4 w-4 text-primary" />
                  Open Photocard Studio
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              {homepageStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-[26px] border border-white/80 bg-white/90 p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)] backdrop-blur"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-news-subtext">
                        {stat.label}
                      </span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/8 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="font-display mt-6 text-4xl font-extrabold tracking-[-0.04em] text-news-headline">
                      {stat.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
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
        <div className="portal-panel mb-6 px-6 py-6">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            News Section
          </p>
          <h1 className="mt-2 text-3xl font-bold text-news-headline">{category?.title ?? "Category"}</h1>
          <p className="mt-3 text-news-subtext">
            Latest stories from the {category?.title?.toLowerCase() ?? "selected"} desk.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="portal-soft-panel p-6 text-news-subtext">
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
          <div className="portal-panel overflow-hidden">
            <img src={article.image} alt={article.title} className="h-[320px] w-full object-cover md:h-[420px]" />
            <div className="space-y-5 p-6 md:p-8">
              <span className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_10px_24px_rgba(185,28,28,0.18)]">
                {article.categoryBn}
              </span>
              <h1 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] text-news-headline md:text-4xl">
                {article.title}
              </h1>
              <div className="text-sm text-news-subtext">
                {article.author} | {article.date}
              </div>
              <p className="text-lg leading-8 text-news-headline">{article.content}</p>
              <PhotocardDownload imageUrl={article.image} title={article.title} />
            </div>
          </div>

          <div className="grid gap-6">
            <LatestNewsSidebar news={latestNews} />
            <section className="portal-soft-panel p-5">
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
  return <PhotoCardStudio />;
}

function DistrictsPage() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <div className="portal-panel mb-6 px-6 py-6">
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
                className="news-card p-5"
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
        <div className="portal-panel mb-6 px-6 py-6">
          <h1 className="text-3xl font-bold text-news-headline">{districtInfo?.nameEn ?? "District"}</h1>
          <p className="mt-2 text-news-subtext">{districtInfo?.nameBn ?? "Latest district coverage"}.</p>
        </div>

        {articles.length === 0 ? (
          <p className="portal-soft-panel p-6 text-news-subtext">
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
        <div className="portal-panel mb-6 px-6 py-6">
          <h1 className="text-3xl font-bold text-news-headline">Editorial Team</h1>
          <p className="mt-2 text-news-subtext">The people behind Sylhety News coverage and publishing.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="news-card p-6">
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
        <div className="portal-panel mx-auto max-w-2xl px-8 py-10">
          <h1 className="font-display text-4xl font-extrabold tracking-[-0.04em] text-news-headline">
            Page Not Found
          </h1>
          <p className="mt-4 text-news-subtext">The page you requested does not exist in this build.</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-[0_16px_32px_rgba(185,28,28,0.22)]"
          >
            Back To Homepage
          </Link>
        </div>
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
