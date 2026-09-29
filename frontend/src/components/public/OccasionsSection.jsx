import { getImageUrl } from '@/utils/constants';

export default function OccasionsSection({ occasions }) {
  return (
    <section id="occasions" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Occasions</span>
          <h2 className="section-title">Specialized Travel Services</h2>
          <p className="section-desc">
            Customized luxury transportation packages for every travel need.
          </p>
        </div>

        <div className="occasions-grid">
          {(!occasions || occasions.length === 0) ? (
            <p className="empty-section-hint">
              Occasions and packages will appear here once added from the Admin Dashboard.
            </p>
          ) : (
            occasions.map((o) => (
              <div key={o.id} className="occasion-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl(o.image)}
                  alt={o.title}
                  className="occasion-bg"
                  onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                />
                <div className="occasion-overlay" />
                <div className="occasion-text">
                  <h3 className="occasion-title">{o.title}</h3>
                  <p className="occasion-desc">{o.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
