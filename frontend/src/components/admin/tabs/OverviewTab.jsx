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
    { label: 'Fleet Vehicles', count: vehicles.length, icon: '🚐', tab: 'vehicles', color: '#3b82f6' },
    { label: 'Travel Occasions', count: occasions.length, icon: '🎉', tab: 'occasions', color: '#10b981' },
    { label: 'Reviews / Ratings', count: testimonials.length, icon: '⭐', tab: 'testimonials', color: '#f59e0b' },
    { label: 'Gallery Photos', count: gallery.length, icon: '🖼️', tab: 'gallery', color: '#8b5cf6' },
    { label: 'Active Schemas', count: schemas.filter(s => s.is_active).length, icon: '🏷️', tab: 'schemas', color: '#ec4899' },
    { label: 'SEO Status', count: seo?.meta_title ? 'Active' : 'Pending', icon: '🔍', tab: 'seo', color: '#06b6d4' }
  ];

  return (
    <div className="tab-pane">
      <div className="tab-header">
        <div>
          <h2>System Overview</h2>
          <p>Quick summary of Urban Cruise dynamic homepage content and SEO configurations.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card" onClick={() => setActiveTab(s.tab)}>
            <div className="stat-icon" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
              {s.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">SEO & System Health Check</h3>
            <p className="card-subtitle">Real-time status of metadata and public sections</p>
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
              <span>Structured JSON-LD</span>
            </div>
            <span className="health-value">{schemas.length} active schemas registered</span>
          </div>

          <div className="health-item">
            <div className="health-label">
              <span className={`health-badge ${vehicles.length > 0 ? 'badge-success' : 'badge-warning'}`}>
                {vehicles.length > 0 ? '✓' : '!'}
              </span>
              <span>Fleet Listings</span>
            </div>
            <span className="health-value">{vehicles.length} vehicles active on homepage</span>
          </div>
        </div>
      </div>
    </div>
  );
}
