export default function Sidebar({ activeTab, setActiveTab, currentUser, onLogout, isOpen, onClose }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'seo', label: 'SEO Settings', icon: '🔍' },
    { id: 'schemas', label: 'Schema Markup', icon: '🏷️' },
    { id: 'homepage', label: 'Hero & About', icon: '🏠' },
    { id: 'vehicles', label: 'Fleet Management', icon: '🚐' },
    { id: 'occasions', label: 'Occasions', icon: '🎉' },
    { id: 'testimonials', label: 'Testimonials', icon: '⭐' },
    { id: 'gallery', label: 'Gallery (Alt Tags)', icon: '🖼️' },
    { id: 'contact', label: 'Contact & Map', icon: '📍' }
  ];

  return (
    <aside className={`dashboard-sidebar ${isOpen ? 'show' : ''}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-info">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Urban Cruise" className="sidebar-logo" />
          <p className="sidebar-tag">Control Panel</p>
        </div>
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close sidebar"
          title="Close Navigation Menu"
        >
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            {currentUser?.name?.charAt(0) || 'A'}
          </div>
          <div className="user-info">
            <span className="user-name">{currentUser?.name || 'Administrator'}</span>
            <span className="user-role">{currentUser?.role || 'admin'}</span>
          </div>
        </div>
        <div className="sidebar-actions">
          <button onClick={onLogout} className="btn-logout" title="Sign Out">
            Logout ⏻
          </button>
        </div>
      </div>
    </aside>
  );
}
