import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { auth, firebaseInitError, firebaseReady } from '../config/firebase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!firebaseReady || !auth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white shadow-lg border border-gray-100">
          <div className="p-8 space-y-4">
            <h1 className="text-2xl font-semibold text-gray-900 text-center">
              Sylhet News Admin Panel
            </h1>
            <p className="text-sm text-gray-500 text-center">
              Firebase configuration is missing.
            </p>
            {firebaseInitError && (
              <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span>{firebaseInitError}</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white shadow-lg border border-gray-100">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Sylhet News Admin Panel
            </h1>
            <p className="text-sm text-gray-500">Sign in to continue</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="admin-email">
                Email
              </label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                autoComplete="off"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="admin-password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={async () => {
                  if (!email.trim()) {
                    setError('Email is required to reset password');
                    return;
                  }
                  try {
                    setError('');
                    await sendPasswordResetEmail(auth, email.trim());
                  } catch (err: any) {
                    setError(err.message || 'Reset failed');
                  }
                }}
                className="text-xs text-indigo-600 hover:text-indigo-700"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
