import React from "react";
import Layout from "../components/layout/Layout";
import LeadNews from "../components/news/LeadNews";
import TopStories from "../components/news/TopStories";
import SylhetSpecial from "../components/news/SylhetSpecial";
import LatestNewsSidebar from "../components/news/LatestNewsSidebar";
import FacebookEmbed from "../components/news/FacebookEmbed";
import CategorySection from "../components/news/CategorySection";
import { newsData, getFeaturedNews, getLatestNews, getNewsByCategory } from "../data/newsData";

const HomePage = () => {
  const leadNews = getFeaturedNews();
  const topStories = newsData.slice(0, 5);
  const sylhetSpecial = newsData.find(n => n.category === "sylhet" && n.id !== leadNews.id) || newsData[1];
  const latestNews = getLatestNews(6);
  const nationalNews = getNewsByCategory("national");
  const sportsNews = getNewsByCategory("sports");
  const expatNews = getNewsByCategory("expat");
  const politicsNews = getNewsByCategory("politics");
  const othersNews = getNewsByCategory("others");

  return (
    <Layout>
      <div className="container mx-auto px-2 md:px-0 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 flex flex-col gap-6">
            <LeadNews news={leadNews} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SylhetSpecial news={sylhetSpecial} />
              <CategorySection title="জাতীয়" news={nationalNews} categoryPath="/national" />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <TopStories news={topStories} />
            <LatestNewsSidebar news={latestNews} />
            <FacebookEmbed />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <CategorySection title="খেলাধুলা" news={sportsNews} categoryPath="/sports" />
          <CategorySection title="প্রবাস" news={expatNews} categoryPath="/expat" />
        </div>
        <div className="mb-8">
          <CategorySection title="রাজনীতি" news={politicsNews} categoryPath="/politics" />
        </div>
        <div className="mb-8">
          <CategorySection title="অন্যান্য" news={othersNews} categoryPath="/others" />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
