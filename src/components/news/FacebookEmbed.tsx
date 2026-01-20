import { useEffect } from "react";

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
      <div className="bg-primary text-primary-foreground px-4 py-2">
        <h2 className="font-bengali font-semibold">ফেসবুক পেজ</h2>
      </div>
      <div className="p-4">
        <div
          className="fb-page"
          data-href="https://www.facebook.com/share/1FdPD4PdC9/"
          data-tabs="timeline"
          data-width=""
          data-height="400"
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
      </div>
    </div>
  );
};

export default FacebookEmbed;
