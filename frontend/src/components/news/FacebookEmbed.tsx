import { useEffect } from "react";
import groupImage from "@/assets/group image.jpeg";

const FacebookEmbed = () => {
  useEffect(() => {
    // Load Facebook SDK
    if (typeof window !== "undefined" && !(window as any).FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    } else if ((window as any).FB) {
      (window as any).FB.XFBML.parse();
    }
  }, []);

  return (
    <div className="bg-card border border-news-border rounded-sm">
      <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
        <h2 className="font-bengali font-semibold">ফেসবুক পেজ</h2>
        <a
          href="https://www.facebook.com/share/1FdPD4PdC9/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary-foreground/90 hover:text-white transition-colors"
        >
          ভিজিট করুন
        </a>
      </div>
      <div className="p-4 space-y-4">
        <div
          className="fb-page"
          data-href="https://www.facebook.com/share/1FdPD4PdC9/"
          data-tabs="timeline"
          data-width=""
          data-height="520"
          data-small-header="true"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote
            cite="https://www.facebook.com/share/1FdPD4PdC9/"
            className="fb-xfbml-parse-ignore"
          >
            <a href="https://www.facebook.com/share/1FdPD4PdC9/">
              আমাদের ফেসবুক পেজ দেখুন
            </a>
          </blockquote>
        </div>
        <div className="border border-news-border rounded-sm overflow-hidden">
          <img
            src={groupImage}
            alt="Sylhety News Facebook group"
            className="w-full h-40 object-cover"
            loading="lazy"
          />
          <div className="p-3 flex items-center justify-between gap-3">
            <p className="text-sm font-bengali text-news-body">
              ফেসবুক গ্রুপে যুক্ত হন
            </p>
            <a
              href="https://www.facebook.com/share/g/17cyNBkTK8/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              গ্রুপ ভিজিট করুন
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacebookEmbed;
