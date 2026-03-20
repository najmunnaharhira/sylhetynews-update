import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";

const WeatherWidget = () => {
  // Static weather data for Sylhet
  // In production, this would fetch from a weather API
  const weatherData = {
    temp: "২৮",
    condition: "আংশিক মেঘলা",
    humidity: "৭৫",
    wind: "১২",
    location: "সিলেট",
  };

  return (
    <div className="bg-card border border-news-border rounded-md overflow-hidden">
      <div className="bg-news-slate px-4 py-3">
        <h3 className="text-white font-bengali font-bold text-base flex items-center gap-2">
          <Cloud className="w-4 h-4" />
          আবহাওয়া
        </h3>
      </div>
      <div className="p-4">
        <div className="text-center mb-4">
          <p className="text-news-subtext font-bengali text-sm mb-1">
            {weatherData.location}
          </p>
          <div className="flex items-center justify-center gap-2">
            <Thermometer className="w-8 h-8 text-primary" />
            <span className="text-4xl font-bold text-news-headline font-bengali">
              {weatherData.temp}°
            </span>
          </div>
          <p className="text-news-headline font-bengali font-medium mt-1">
            {weatherData.condition}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-news-border">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-xs text-news-subtext font-bengali">আর্দ্রতা</p>
              <p className="text-sm font-semibold text-news-headline font-bengali">
                {weatherData.humidity}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-teal-500" />
            <div>
              <p className="text-xs text-news-subtext font-bengali">বাতাস</p>
              <p className="text-sm font-semibold text-news-headline font-bengali">
                {weatherData.wind} কি.মি./ঘ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
