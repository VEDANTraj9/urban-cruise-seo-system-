export default function AboutSection({ about }) {
  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="about-grid">
          <div className="about-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={about.featured_image} alt={about.section_title} />
          </div>
          <div className="about-content">
            <span className="section-tag">About Urban Cruise</span>
            <h2 className="about-title">{about.section_title}</h2>
            <p className="about-desc">{about.description}</p>
            <div style={{ marginTop: 16 }}>
              <a href="#contact" className="btn-nav">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
