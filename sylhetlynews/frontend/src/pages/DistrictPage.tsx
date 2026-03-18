import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NewsCard from "@/components/news/NewsCard";
import FacebookEmbed from "@/components/news/FacebookEmbed";
import { getNewsByDistrict } from "@/data/newsData";
import { sylhetDistricts } from "@/data/districts";

const DistrictPage = () => {
  const { district } = useParams<{ district: string }>();
  const districtInfo = sylhetDistricts.find((item) => item.id === district);
  const districtNews = district ? getNewsByDistrict(district) : [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-primary text-primary-foreground px-4 py-2 font-bengali font-semibold text-sm">
            {districtInfo?.nameBn || "জেলা"}
          </div>
          <div className="flex-1 border-t border-news-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {districtNews.length > 0 ? (
              <div className="space-y-4">
                {districtNews.map((news) => (
                  <NewsCard key={news.id} news={news} variant="horizontal" />
                ))}
              </div>
            ) : (
              <div className="bg-card border border-news-border rounded-sm p-8 text-center">
                <p className="text-news-subtext font-bengali">
                  এই জেলায় কোনো সংবাদ নেই।
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <FacebookEmbed />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DistrictPage;
