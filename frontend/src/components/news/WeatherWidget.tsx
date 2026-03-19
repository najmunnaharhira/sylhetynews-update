import { Cloud, Droplets, Thermometer, Wind } from "lucide-react";

const WeatherWidget = () => {
  const weatherData = {
    temp: "28",
    condition: "Partly Cloudy",
    humidity: "75",
    wind: "12",
    location: "Sylhet",
  };

  return (
    <div className="portal-soft-panel overflow-hidden">
      <div className="bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)] px-5 py-4 text-white">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
          Weather Desk
        </p>
        <h3 className="mt-1 flex items-center gap-2 text-lg font-bold">
          <Cloud className="h-5 w-5" />
          Sylhet Forecast
        </h3>
      </div>

      <div className="p-5">
        <div className="rounded-[24px] bg-[linear-gradient(135deg,rgba(29,78,216,0.08),rgba(148,163,184,0.05))] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-news-subtext">
            {weatherData.location}
          </p>
          <div className="mt-3 flex items-end gap-3">
            <Thermometer className="h-9 w-9 text-primary" />
            <span className="font-display text-5xl font-extrabold tracking-[-0.05em] text-news-headline">
              {weatherData.temp}°
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-news-headline">{weatherData.condition}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[22px] border border-news-border/70 bg-white/90 p-4">
            <Droplets className="h-4 w-4 text-sky-500" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-news-subtext">
              Humidity
            </p>
            <p className="mt-2 text-lg font-bold text-news-headline">{weatherData.humidity}%</p>
          </div>
          <div className="rounded-[22px] border border-news-border/70 bg-white/90 p-4">
            <Wind className="h-4 w-4 text-teal-500" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-news-subtext">
              Wind
            </p>
            <p className="mt-2 text-lg font-bold text-news-headline">{weatherData.wind} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
