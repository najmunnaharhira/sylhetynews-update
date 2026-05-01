import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Plus, Settings, Newspaper, FolderOpen, Home, Menu, X, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import AdminNewsForm from "@/components/admin/AdminNewsForm";
import AdminNewsList from "@/components/admin/AdminNewsList";
import AdminCategoryManager from "@/components/admin/AdminCategoryManager";
import AdminSubscribers from "@/components/admin/AdminSubscribers";

type Tab = "news" | "categories" | "subscribers" | "settings";

const items: { id: Tab; name: string; icon: any }[] = [
  { id: "news", name: "সংবাদ ব্যবস্থাপনা", icon: Newspaper },
  { id: "categories", name: "ক্যাটাগরি", icon: FolderOpen },
  { id: "subscribers", name: "সাবস্ক্রাইবার", icon: Mail },
  { id: "settings", name: "সেটিংস", icon: Settings },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isEditor, isAdmin, loading, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("news");
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/admin/login");
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div className="flex items-center justify-center min-h-screen text-news-subtext font-bengali">লোড হচ্ছে...</div>;
  }

  if (!isEditor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-bold mb-2">No editor access</h1>
        <p className="text-news-subtext mb-4 max-w-md">
          Your account exists but doesn't have editor or admin permissions yet. Ask an admin to grant a role,
          or run this in the database:
          <br />
          <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
            insert into user_roles(user_id, role) values ('{user.id}', 'admin');
          </code>
        </p>
        <Button onClick={() => { logout(); navigate("/admin/login"); }}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-news-slate text-white transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2 hover:text-primary">
              <Home className="w-5 h-5" />
              <span className="font-bengali font-bold">সিলেটি নিউজ</span>
            </Link>
            <p className="text-xs text-white/60 font-bengali mt-1">অ্যাডমিন প্যানেল</p>
          </div>
          <div className="p-4 border-b border-white/10">
            <p className="text-sm text-white/80 truncate">{user.email}</p>
            <p className="text-xs text-white/50 font-bengali">{isAdmin ? "অ্যাডমিন" : "এডিটর"}</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => { setTab(it.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-bengali text-sm transition-colors ${tab === it.id ? "bg-primary text-white" : "text-white/80 hover:bg-white/10"}`}
              >
                <it.icon className="w-5 h-5" />
                {it.name}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10">
            <Button onClick={async () => { await logout(); navigate("/admin/login"); }} variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="font-bengali">লগআউট</span>
            </Button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-news-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-muted rounded-md" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-bold font-bengali">{items.find((i) => i.id === tab)?.name}</h1>
            </div>
            {tab === "news" && (
              <Button onClick={() => setShowForm((v) => !v)} size="sm">
                {showForm ? <X className="w-4 h-4 sm:mr-2" /> : <Plus className="w-4 h-4 sm:mr-2" />}
                <span className="hidden sm:inline font-bengali">{showForm ? "বাতিল" : "নতুন সংবাদ"}</span>
              </Button>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {tab === "news" && (
            <div className="space-y-6">
              {showForm && (
                <div className="bg-card border border-news-border rounded-lg p-4 lg:p-6">
                  <h2 className="text-lg font-bold font-bengali mb-4">নতুন সংবাদ যোগ করুন</h2>
                  <AdminNewsForm onSuccess={() => setShowForm(false)} />
                </div>
              )}
              <div className="bg-card border border-news-border rounded-lg p-4 lg:p-6">
                <AdminNewsList />
              </div>
            </div>
          )}
          {tab === "categories" && (
            <div className="bg-card border border-news-border rounded-lg p-4 lg:p-6"><AdminCategoryManager /></div>
          )}
          {tab === "subscribers" && (
            <div className="bg-card border border-news-border rounded-lg p-4 lg:p-6"><AdminSubscribers /></div>
          )}
          {tab === "settings" && (
            <div className="bg-card border border-news-border rounded-lg p-4 lg:p-6">
              <h2 className="text-lg font-bold font-bengali mb-2">সেটিংস</h2>
              <p className="text-sm text-news-subtext">User ID: <code className="text-xs">{user.id}</code></p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
