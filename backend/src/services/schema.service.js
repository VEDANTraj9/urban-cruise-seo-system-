const SchemaModel = require('../models/schema.model');

class SchemaService {
  static async getAllSchemas() {
    const rows = await SchemaModel.getAll();
    return rows.map(r => ({
      ...r,
      schema_data: typeof r.schema_data === 'string' ? JSON.parse(r.schema_data) : r.schema_data
    }));
  }

  static async getSchemaByType(schemaType) {
    const row = await SchemaModel.getByType(schemaType);
    if (!row) return null;
    return {
      ...row,
      schema_data: typeof row.schema_data === 'string' ? JSON.parse(row.schema_data) : row.schema_data
    };
  }

  static async saveSchema(schemaType, schemaData, isActive = true) {
    const row = await SchemaModel.upsert(schemaType, schemaData, isActive);
    return {
      ...row,
      schema_data: typeof row.schema_data === 'string' ? JSON.parse(row.schema_data) : row.schema_data
    };
  }

  static async toggleStatus(schemaType, isActive) {
    const row = await SchemaModel.toggleStatus(schemaType, isActive);
    return {
      ...row,
      schema_data: typeof row.schema_data === 'string' ? JSON.parse(row.schema_data) : row.schema_data
    };
  }

  /**
   * Generates valid JSON-LD representations for all active schemas.
   * Injected directly into the website's head section.
   */
  static async generateJsonLdMarkup() {
    const activeSchemas = await SchemaModel.getActiveSchemas();
    const jsonLdObjects = [];

    for (const record of activeSchemas) {
      const data = typeof record.schema_data === 'string' ? JSON.parse(record.schema_data) : record.schema_data;

      switch (record.schema_type) {
        case 'Organization': {
          jsonLdObjects.push({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: data.name || '',
            url: data.url || '',
            logo: data.logo || undefined,
            contactPoint: data.contactPoint ? {
              '@type': 'ContactPoint',
              telephone: data.contactPoint.telephone,
              contactType: data.contactPoint.contactType || 'customer service',
              areaServed: data.contactPoint.areaServed || 'IN',
              availableLanguage: data.contactPoint.availableLanguage || ['English', 'Hindi']
            } : undefined,
            sameAs: Array.isArray(data.sameAs) ? data.sameAs.filter(Boolean) : undefined
          });
          break;
        }

        case 'FAQ': {
          const faqs = Array.isArray(data.faqs) ? data.faqs : [];
          if (faqs.length > 0) {
            jsonLdObjects.push({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            });
          }
          break;
        }

        case 'Breadcrumb': {
          const items = Array.isArray(data.items) ? data.items : [];
          if (items.length > 0) {
            jsonLdObjects.push({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: items.map((item, index) => ({
                '@type': 'ListItem',
                position: item.position || (index + 1),
                name: item.name,
                item: item.item
              }))
            });
          }
          break;
        }

        case 'Website': {
          const siteObj = {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: data.name || '',
            url: data.url || '',
            description: data.description || undefined
          };
          if (data.searchTarget) {
            siteObj.potentialAction = {
              '@type': 'SearchAction',
              target: data.searchTarget,
              'query-input': 'required name=search_term_string'
            };
          }
          jsonLdObjects.push(siteObj);
          break;
        }

        case 'LocalBusiness': {
          jsonLdObjects.push({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: data.name || '',
            image: data.image || undefined,
            telephone: data.telephone || undefined,
            priceRange: data.priceRange || '₹₹',
            address: data.address ? {
              '@type': 'PostalAddress',
              streetAddress: data.address.streetAddress,
              addressLocality: data.address.addressLocality,
              addressRegion: data.address.addressRegion,
              postalCode: data.address.postalCode,
              addressCountry: data.address.addressCountry || 'IN'
            } : undefined,
            geo: data.geo ? {
              '@type': 'GeoCoordinates',
              latitude: data.geo.latitude,
              longitude: data.geo.longitude
            } : undefined,
            openingHours: data.openingHours || 'Mo-Su 00:00-23:59'
          });
          break;
        }

        default:
          break;
      }
    }

    return jsonLdObjects;
  }
}

module.exports = SchemaService;
