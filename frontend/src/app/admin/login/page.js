"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthService } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';
import BrandLogo from '@/components/common/BrandLogo';
import '@/styles/login.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const { checking } = useAuth({ requireAuth: false });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (checking) {
    return (
      <div className="login-container">
        <div className="login-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <div className="spinner" style={{ margin: '0 auto 16px' }} />
          <p style={{ color: '#64748b', fontSize: '14px' }}>Verifying admin session...</p>
        </div>
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await AuthService.login(email, password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <BrandLogo variant="dark" size="lg" />
          </div>
          <h1>Admin Control Portal</h1>
          <p>Royal Wheels Delhi • Dynamic Management</p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              required
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-login">
            {loading ? 'Signing in...' : 'Sign In 🔒'}
          </button>
        </form>

        {/* <div className="demo-box">
          <button type="button" onClick={fillDemo} className="btn-demo">
            Auto-fill Demo Credentials
          </button>
        </div> */}

        <Link href="/" className="back-link">
          ← Back to Public Website
        </Link>
      </div>
    </div>
  );
}
