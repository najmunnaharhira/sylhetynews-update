import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import { useFeaturedNews, useNews, useNewsByCategory, useSingleNews } from "./hooks/useNews";
import { articleToDisplayItem } from "./utils/newsDisplay";

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
  const { articles } = useNews();
  const { articles: featuredArticles } = useFeaturedNews();
  const dynamicItems = articles.map(articleToDisplayItem);
  const sourceItems = dynamicItems.length > 0 ? dynamicItems : newsData;
  const featuredItem =
    featuredArticles[0] != null
      ? articleToDisplayItem(featuredArticles[0])
      : sourceItems.find((item) => item.featured) ?? featuredNews;
  const latestItems = sourceItems.slice(0, 5);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <LeadNews news={featuredItem} />
          <div className="grid gap-6">
            <TopStories news={latestItems} />
            <WeatherWidget />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="space-y-8">
            {categoryRoutes.slice(0, 6).map((category) => (
              <CategorySection
                key={category.key}
                title={category.title}
                news={sourceItems.filter((item) => item.category === category.key)}
                categoryPath={category.path}
              />
            ))}
          </div>

          <div className="grid gap-6">
            <LatestNewsSidebar news={latestItems} />
            <SylhetSpecial
              news={sourceItems.find((item) => item.category === "sylhet") ?? featuredItem}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function CategoryPage() {
  const location = useLocation();
  const category = categoryRoutes.find((item) => item.path === location.pathname);
  const { articles: dynamicArticles } = useNewsByCategory(category?.key ?? "");
  const articles =
    dynamicArticles.length > 0
      ? dynamicArticles.map(articleToDisplayItem)
      : getNewsByCategory(category?.key ?? "");

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
  const { article: dynamicArticle } = useSingleNews(id ?? "");
  const { articles } = useNews();
  const allItems =
    articles.length > 0 ? articles.map(articleToDisplayItem) : newsData;
  const article =
    dynamicArticle != null
      ? articleToDisplayItem(dynamicArticle)
      : allItems.find((item) => item.id === id);

  if (!article) {
    return <NotFoundPage />;
  }

  const related = allItems.filter((item) => item.id !== article.id).slice(0, 4);
  const sidebarItems = allItems.slice(0, 5);

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
            <LatestNewsSidebar news={sidebarItems} />
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
  return <PhotoCardStudio />;
}

function DistrictsPage() {
  const { articles } = useNews();
  const sourceItems = articles.length > 0 ? articles.map(articleToDisplayItem) : newsData;

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 border-b border-news-border pb-4">
          <h1 className="text-3xl font-bold text-news-headline">District Coverage</h1>
          <p className="mt-2 text-news-subtext">Browse stories from every district in the Sylhet division.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sylhetDistricts.map((district) => {
            const count = sourceItems.filter((article) => article.district === district.id).length;
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
  const { articles } = useNews();
  const districtInfo = sylhetDistricts.find((item) => item.id === district);
  const sourceItems = articles.length > 0 ? articles.map(articleToDisplayItem) : newsData;
  const districtArticles = sourceItems.filter((item) => item.district === district);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 border-b border-news-border pb-4">
          <h1 className="text-3xl font-bold text-news-headline">{districtInfo?.nameEn ?? "District"}</h1>
          <p className="mt-2 text-news-subtext">{districtInfo?.nameBn ?? "Latest district coverage"}.</p>
        </div>

        {districtArticles.length === 0 ? (
          <p className="rounded-md border border-news-border bg-card p-6 text-news-subtext">
            No district stories are available yet.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {districtArticles.map((article) => (
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
