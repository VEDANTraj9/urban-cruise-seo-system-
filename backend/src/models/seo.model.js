const pool = require('../config/db');

class SeoModel {
  static async getByPageIdentifier(pageIdentifier = 'homepage') {
    const [rows] = await pool.query(
      'SELECT * FROM seo_settings WHERE page_identifier = ? LIMIT 1',
      [pageIdentifier]
    );
    return rows[0] || null;
  }

  static async update(pageIdentifier, data) {
    const {
      meta_title,
      meta_description,
      focus_keywords,
      canonical_url,
      robots_index,
      robots_follow,
      og_title,
      og_description,
      og_image,
      twitter_title,
      twitter_description,
      twitter_image,
      twitter_card_type
    } = data;

    const [existing] = await pool.query(
      'SELECT id FROM seo_settings WHERE page_identifier = ?',
      [pageIdentifier]
    );

    if (existing.length === 0) {
      await pool.query(
        `INSERT INTO seo_settings (
          page_identifier, meta_title, meta_description, focus_keywords, canonical_url,
          robots_index, robots_follow, og_title, og_description, og_image,
          twitter_title, twitter_description, twitter_image, twitter_card_type
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          pageIdentifier, meta_title, meta_description, focus_keywords, canonical_url,
          robots_index, robots_follow, og_title, og_description, og_image,
          twitter_title, twitter_description, twitter_image, twitter_card_type || 'summary_large_image'
        ]
      );
    } else {
      await pool.query(
        `UPDATE seo_settings SET
          meta_title = ?,
          meta_description = ?,
          focus_keywords = ?,
          canonical_url = ?,
          robots_index = ?,
          robots_follow = ?,
          og_title = ?,
          og_description = ?,
          og_image = ?,
          twitter_title = ?,
          twitter_description = ?,
          twitter_image = ?,
          twitter_card_type = ?
        WHERE page_identifier = ?`,
        [
          meta_title,
          meta_description,
          focus_keywords,
          canonical_url,
          robots_index,
          robots_follow,
          og_title,
          og_description,
          og_image,
          twitter_title,
          twitter_description,
          twitter_image,
          twitter_card_type || 'summary_large_image',
          pageIdentifier
        ]
      );
    }

    return this.getByPageIdentifier(pageIdentifier);
  }
}

module.exports = SeoModel;
