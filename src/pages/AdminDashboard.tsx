import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { LogOut, Plus, Settings } from 'lucide-react';
import AdminNewsForm from '../components/admin/AdminNewsForm';
import AdminNewsList from '../components/admin/AdminNewsList';
import AdminCategoryManager from '../components/admin/AdminCategoryManager';

type AdminTab = 'news' | 'categories' | 'settings';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, userData, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('news');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">
              Welcome, {userData?.displayName || user.email}
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          <button
            onClick={() => setActiveTab('news')}
            className={`py-4 font-medium border-b-2 transition-colors ${
              activeTab === 'news'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Manage News
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-4 font-medium border-b-2 transition-colors ${
              activeTab === 'categories'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Categories
          </button>
          {userData?.role === 'admin' && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 font-medium border-b-2 transition-colors flex gap-2 items-center ${
                activeTab === 'settings'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings size={18} />
              Settings
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'news' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">News Articles</h2>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="flex gap-2 bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus size={18} />
                {showForm ? 'Cancel' : 'New Article'}
              </Button>
            </div>

            {showForm && (
              <div className="mb-8">
                <AdminNewsForm onSuccess={() => setShowForm(false)} />
              </div>
            )}

            <AdminNewsList />
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Manage Categories
            </h2>
            <AdminCategoryManager />
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-600">Settings page coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
