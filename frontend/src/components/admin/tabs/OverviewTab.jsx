export default function OverviewTab({
  vehicles,
  occasions,
  testimonials,
  gallery,
  schemas,
  seo,
  setActiveTab
}) {
  const stats = [
    {
      label: 'Fleet Vehicles',
      count: vehicles.length,
      icon: '🚐',
      tab: 'vehicles',
      color: '#059669',
      bgGrad: 'linear-gradient(135deg, #ffffff 60%, #ecfdf5 100%)',
      borderColor: '#059669'
    },
    {
      label: 'Travel Occasions',
      count: occasions.length,
      icon: '🎉',
      tab: 'occasions',
      color: '#0d9488',
      bgGrad: 'linear-gradient(135deg, #ffffff 60%, #f0fdfa 100%)',
      borderColor: '#0d9488'
    },
    {
      label: 'Reviews / Ratings',
      count: testimonials.length,
      icon: '⭐',
      tab: 'testimonials',
      color: '#f59e0b',
      bgGrad: 'linear-gradient(135deg, #ffffff 60%, #fffbeb 100%)',
      borderColor: '#f59e0b'
    },
    {
      label: 'Gallery Photos',
      count: gallery.length,
      icon: '🖼️',
      tab: 'gallery',
      color: '#8b5cf6',
      bgGrad: 'linear-gradient(135deg, #ffffff 60%, #faf5ff 100%)',
      borderColor: '#8b5cf6'
    },
    {
      label: 'Active Schemas',
      count: schemas.filter(s => s.is_active).length,
      icon: '🏷️',
      tab: 'schemas',
      color: '#ec4899',
      bgGrad: 'linear-gradient(135deg, #ffffff 60%, #fdf2f8 100%)',
      borderColor: '#ec4899'
    },
    {
      label: 'SEO Status',
      count: seo?.meta_title ? 'Active ⚡' : 'Pending',
      icon: '🔍',
      tab: 'seo',
      color: '#3b82f6',
      bgGrad: 'linear-gradient(135deg, #ffffff 60%, #eff6ff 100%)',
      borderColor: '#3b82f6'
    }
  ];

  return (
    <div className="tab-pane">
      <div className="tab-header">
        <div>
          <h2>System Overview & Analytics</h2>
          <p>Quick summary of Royal Wheels Delhi dynamic homepage content, fleet, and SEO health.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-card"
            onClick={() => setActiveTab(s.tab)}
            style={{
              background: s.bgGrad,
              borderLeft: `4px solid ${s.borderColor}`,
              boxShadow: `0 4px 15px ${s.color}15`
            }}
          >
            <div className="stat-icon" style={{ backgroundColor: `${s.color}18`, color: s.color }}>
              {s.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{s.label}</span>
              <span className="stat-value" style={{ color: s.color }}>{s.count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">SEO & System Health Check</h3>
            <p className="card-subtitle">Real-time status of metadata, schemas, and live public sections</p>
          </div>
        </div>

        <div className="health-list">
          <div className="health-item">
            <div className="health-label">
              <span className={`health-badge ${seo?.meta_title ? 'badge-success' : 'badge-warning'}`}>
                {seo?.meta_title ? '✓' : '!'}
              </span>
              <span>Meta Title</span>
            </div>
            <span className="health-value">{seo?.meta_title || 'Not configured'}</span>
          </div>

          <div className="health-item">
            <div className="health-label">
              <span className={`health-badge ${seo?.canonical_url ? 'badge-success' : 'badge-info'}`}>
                {seo?.canonical_url ? '✓' : 'i'}
              </span>
              <span>Canonical URL</span>
            </div>
            <span className="health-value">{seo?.canonical_url || 'Defaulting to site URL'}</span>
          </div>

          <div className="health-item">
            <div className="health-label">
              <span className={`health-badge ${schemas.length > 0 ? 'badge-success' : 'badge-warning'}`}>
                {schemas.length > 0 ? '✓' : '!'}
              </span>
              <span>JSON-LD Schemas</span>
            </div>
            <span className="health-value">
              {schemas.filter(s => s.is_active).length} of {schemas.length} schemas enabled
            </span>
          </div>

          <div className="health-item">
            <div className="health-label">
              <span className={`health-badge ${vehicles.length > 0 ? 'badge-success' : 'badge-warning'}`}>
                {vehicles.length > 0 ? '✓' : '!'}
              </span>
              <span>Fleet Listing</span>
            </div>
            <span className="health-value">
              {vehicles.filter(v => v.is_active).length} vehicles live on website
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
