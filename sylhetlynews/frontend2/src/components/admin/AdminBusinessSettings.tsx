import { useEffect, useState } from "react";
import { adminService } from "../../services/dataService";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SettingsForm = {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  adRatePer1000Views: number;
};

type RevenueSummary = {
  totalNews: number;
  publishedNews: number;
  unpublishedNews: number;
  totalViews: number;
  adRatePer1000Views: number;
  estimatedRevenue: number;
};

export default function AdminBusinessSettings() {
  const [settings, setSettings] = useState<SettingsForm>({
    siteName: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    adRatePer1000Views: 2.5,
  });
  const [summary, setSummary] = useState<RevenueSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [settingsData, revenueData] = await Promise.all([
        adminService.getBusinessSettings(),
        adminService.getRevenueSummary(),
      ]);
      setSettings(settingsData);
      setSummary(revenueData);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await adminService.updateBusinessSettings(settings);
      setMessage("Business settings updated successfully.");
      await loadData();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-news-subtext">Loading settings...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-news-headline mb-3">Business Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Site name"
            value={settings.siteName}
            onChange={(e) => setSettings((prev) => ({ ...prev, siteName: e.target.value }))}
          />
          <Input
            placeholder="Contact email"
            value={settings.contactEmail}
            onChange={(e) => setSettings((prev) => ({ ...prev, contactEmail: e.target.value }))}
          />
          <Input
            placeholder="Contact phone"
            value={settings.contactPhone}
            onChange={(e) => setSettings((prev) => ({ ...prev, contactPhone: e.target.value }))}
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Ad rate per 1000 views"
            value={settings.adRatePer1000Views}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                adRatePer1000Views: Number(e.target.value || 0),
              }))
            }
          />
        </div>
        <textarea
          placeholder="Contact address"
          value={settings.contactAddress}
          onChange={(e) => setSettings((prev) => ({ ...prev, contactAddress: e.target.value }))}
          className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-lg"
          rows={3}
        />
        <div className="mt-4">
          <Button onClick={onSave} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>

      {summary && (
        <div>
          <h2 className="text-lg font-semibold text-news-headline mb-3">Revenue Dashboard</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard label="Total News" value={summary.totalNews} />
            <StatCard label="Published" value={summary.publishedNews} />
            <StatCard label="Unpublished" value={summary.unpublishedNews} />
            <StatCard label="Total Views" value={summary.totalViews} />
            <StatCard
              label="Ad Rate / 1K Views"
              value={`$${summary.adRatePer1000Views.toFixed(2)}`}
            />
            <StatCard
              label="Estimated Revenue"
              value={`$${summary.estimatedRevenue.toFixed(2)}`}
            />
          </div>
        </div>
      )}

      {message && <p className="text-sm text-news-subtext">{message}</p>}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border rounded-lg p-4 bg-background">
      <p className="text-xs text-news-subtext">{label}</p>
      <p className="text-xl font-bold text-news-headline">{value}</p>
    </div>
  );
}
