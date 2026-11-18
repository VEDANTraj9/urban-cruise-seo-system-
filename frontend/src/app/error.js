"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/common/BrandLogo';

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
      backgroundColor: '#090d16',
      color: '#f8fafc',
      padding: '24px',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '520px',
        background: '#0f172a',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '36px 28px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <BrandLogo variant="light" size="lg" />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#e2e8f0' }}>
          Royal Wheels Delhi
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '24px' }}>
          Connecting to live fleet server. If you just deployed, the server might be waking up from idle mode.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => reset()}
            style={{
              background: 'linear-gradient(135deg, #059669, #047857)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
            }}
          >
            Retry Connection 🔄
          </button>
          <Link
            href="/"
            style={{
              background: '#1e293b',
              color: '#94a3b8',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '10px 20px',
              fontWeight: '600',
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
