import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";

import { useEffect, useState } from "react";

// To use this widget in production, store your OpenWeatherMap API key securely using Lovable Cloud.
// 1. Enable Lovable Cloud in your deployment environment.
// 2. Add the key as WEATHER_API_KEY in Lovable Cloud secrets.
// 3. Access it in your frontend via import.meta.env.VITE_WEATHER_API_KEY (see Vite docs for env vars).

const WeatherWidget = () => {
  const [weather, setWeather] = useState<{
    temp: string;
    condition: string;
    humidity: string;
    wind: string;
    location: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        if (!apiKey) {
          setError("Weather API key not set");
          setLoading(false);
          return;
        }
        // Sylhet city ID for OpenWeatherMap: 1185095
        const url = `https://api.openweathermap.org/data/2.5/weather?id=1185095&units=metric&lang=bn&appid=${apiKey}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch weather");
        const data = await res.json();
        setWeather({
          temp: Math.round(data.main.temp).toString(),
          condition: data.weather[0].description,
          humidity: data.main.humidity.toString(),
          wind: Math.round(data.wind.speed).toString(),
          location: data.name || "সিলেট",
        });
      } catch (err) {
        setError("লাইভ আবহাওয়া তথ্য আনতে ব্যর্থ");
      }
      setLoading(false);
    };
    fetchWeather();
  }, []);

  return (
    <div className="bg-card border border-news-border rounded-md overflow-hidden">
      <div className="bg-news-slate px-4 py-3">
        <h3 className="text-white font-bengali font-bold text-base flex items-center gap-2">
          <Cloud className="w-4 h-4" />
          আবহাওয়া
        </h3>
      </div>
      <div className="p-4">
        {loading ? (
          <div className="text-center text-news-subtext font-bengali">লোড হচ্ছে...</div>
        ) : error ? (
          <div className="text-center text-red-500 font-bengali">{error}</div>
        ) : weather ? (
          <>
            <div className="text-center mb-4">
              <p className="text-news-subtext font-bengali text-sm mb-1">
                {weather.location}
              </p>
              <div className="flex items-center justify-center gap-2">
                <Thermometer className="w-8 h-8 text-primary" />
                <span className="text-4xl font-bold text-news-headline font-bengali">
                  {weather.temp}°
                </span>
              </div>
              <p className="text-news-headline font-bengali font-medium mt-1">
                {weather.condition}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-news-border">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-xs text-news-subtext font-bengali">আর্দ্রতা</p>
                  <p className="text-sm font-semibold text-news-headline font-bengali">
                    {weather.humidity}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-teal-500" />
                <div>
                  <p className="text-xs text-news-subtext font-bengali">বাতাস</p>
                  <p className="text-sm font-semibold text-news-headline font-bengali">
                    {weather.wind} কি.মি./ঘ
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherWidget;
