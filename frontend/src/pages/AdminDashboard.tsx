import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { 
  LogOut, 
  Plus, 
  Settings, 
  Newspaper, 
  FolderOpen, 
  Home,
  Menu,
  X
} from 'lucide-react';
import AdminNewsForm from '../components/admin/AdminNewsForm';
import AdminNewsList from '../components/admin/AdminNewsList';
import AdminCategoryManager from '../components/admin/AdminCategoryManager';
import AdminTeamManager from '../components/admin/AdminTeamManager';

type AdminTab = 'news' | 'categories' | 'team' | 'settings';

const sidebarItems = [
  { id: 'news' as AdminTab, name: 'সংবাদ ব্যবস্থাপনা', icon: Newspaper },
  { id: 'categories' as AdminTab, name: 'ক্যাটাগরি', icon: FolderOpen },
  { id: 'team' as AdminTab, name: 'টিম', icon: Settings },
  { id: 'settings' as AdminTab, name: 'সেটিংস', icon: Settings },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userData, isAdmin, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('news');
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-news-subtext font-bengali">লোড হচ্ছে...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-news-slate text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-bengali font-bold">সিলেটি নিউজ</span>
            </Link>
            <p className="text-xs text-white/60 font-bengali mt-1">অ্যাডমিন প্যানেল</p>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-white/10">
            <p className="text-sm text-white/80 font-bengali truncate">
              {userData?.displayName || user?.email}
            </p>
            <p className="text-xs text-white/50 font-bengali">
              {userData?.role === 'admin' ? 'অ্যাডমিন' : 'এডিটর'}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-bengali text-sm transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-white/10">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full flex gap-2 bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              <LogOut size={18} />
              <span className="font-bengali">লগআউট</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-card border-b border-news-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-muted rounded-md"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-bold text-news-headline font-bengali">
                {sidebarItems.find(item => item.id === activeTab)?.name}
              </h1>
            </div>
            {activeTab === 'news' && (
              <Button
                onClick={() => setShowForm(!showForm)}
                className="flex gap-2"
                size="sm"
              >
                {showForm ? <X size={16} /> : <Plus size={16} />}
                <span className="hidden sm:inline font-bengali">
                  {showForm ? 'বাতিল' : 'নতুন সংবাদ'}
                </span>
              </Button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {activeTab === 'news' && (
            <div className="space-y-6">
              {showForm && (
                <div className="bg-card border border-news-border rounded-lg p-4 lg:p-6">
                  <h2 className="text-lg font-bold text-news-headline font-bengali mb-4">
                    নতুন সংবাদ যোগ করুন
                  </h2>
                  <AdminNewsForm onSuccess={() => setShowForm(false)} />
                </div>
              )}
              <div className="bg-card border border-news-border rounded-lg p-4 lg:p-6">
                <AdminNewsList />
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="bg-card border border-news-border rounded-lg p-4 lg:p-6">
              <AdminCategoryManager />
            </div>
          )}

          {activeTab === 'team' && (
            <div className="bg-card border border-news-border rounded-lg p-4 lg:p-6">
              <AdminTeamManager />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-card border border-news-border rounded-lg p-4 lg:p-6">
              <h2 className="text-lg font-bold text-news-headline font-bengali mb-4">
                সেটিংস
              </h2>
              <p className="text-news-subtext font-bengali">
                সেটিংস পেজ শীঘ্রই আসছে...
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
