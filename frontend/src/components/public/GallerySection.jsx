import { getImageUrl } from '@/utils/constants';

export default function GallerySection({ gallery }) {
  return (
    <section id="gallery" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Photo Gallery</span>
          <h2 className="section-title">Fleet & Tour Highlights</h2>
          <p className="section-desc">
            All images include descriptive SEO-friendly Alt Tags for search visibility.
          </p>
        </div>

        <div className="gallery-grid-public">
          {(!gallery || gallery.length === 0) ? (
            <p className="empty-section-hint">
              Gallery photos will appear here once added from the Admin Dashboard.
            </p>
          ) : (
            gallery.map((g) => (
              <div key={g.id} className="gallery-item-public">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl(g.image_url)}
                  alt={g.alt_tag}
                  onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                />
                <div className="gallery-alt-caption">{g.alt_tag}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
