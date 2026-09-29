"use client";

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0b1120',
      color: '#f8fafc',
      padding: '24px',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '520px',
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '36px 28px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Urban Cruise"
          style={{ width: '64px', height: '64px', margin: '0 auto 18px', objectFit: 'contain' }}
        />
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px', color: '#e2e8f0' }}>
          Urban Cruise Delhi
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
          Connecting to live fleet server. The backend server might be starting up from idle state.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => reset()}
            style={{
              background: '#4f46e5',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ↻ Try Again
          </button>
          <Link
            href="/"
            onClick={() => window.location.reload()}
            style={{
              background: '#334155',
              color: '#f1f5f9',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Refresh Home
          </Link>
        </div>
      </div>
    </div>
  );
}
