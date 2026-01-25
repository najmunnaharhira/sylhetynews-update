import Layout from "@/components/layout/Layout";
import { sylhetDistricts } from "@/data/districts";
import { Link } from "react-router-dom";

const Districts = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="section-title text-2xl mb-6">সিলেট জেলার উপজেলা</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sylhetDistricts.map((district) => (
            <Link
              key={district.id}
              to={`/district/${district.id}`}
              className="bg-card border border-news-border rounded-sm p-4 hover:border-primary transition-colors"
            >
              <h2 className="font-bengali font-semibold text-lg text-news-headline">
                {district.nameBn}
              </h2>
              <p className="text-xs text-news-subtext mt-1">{district.nameEn}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Districts;
