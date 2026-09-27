import { apiRequest } from './api.service';

export const DashboardService = {
  // Fetch all initial data concurrently
  async fetchAll() {
    const [
      seoRes,
      schemasRes,
      heroRes,
      aboutRes,
      vehiclesRes,
      occasionsRes,
      testimonialsRes,
      galleryRes,
      contactRes
    ] = await Promise.all([
      apiRequest('/seo'),
      apiRequest('/schemas'),
      apiRequest('/homepage/hero'),
      apiRequest('/homepage/about'),
      apiRequest('/vehicles'),
      apiRequest('/occasions'),
      apiRequest('/testimonials'),
      apiRequest('/gallery'),
      apiRequest('/contact')
    ]);

    return {
      seo: seoRes.data || null,
      schemas: schemasRes.data || [],
      hero: heroRes.data || null,
      about: aboutRes.data || null,
      vehicles: vehiclesRes.data || [],
      occasions: occasionsRes.data || [],
      testimonials: testimonialsRes.data || [],
      gallery: galleryRes.data || [],
      contact: contactRes.data || null
    };
  },

  // SEO
  updateSeo(seoData) {
    return apiRequest('/seo', { method: 'PUT', body: JSON.stringify(seoData) });
  },

  // Schemas
  saveSchema(schemaType, schemaData, isActive) {
    return apiRequest('/schemas', {
      method: 'POST',
      body: JSON.stringify({
        schema_type: schemaType,
        schema_data: schemaData,
        is_active: isActive
      })
    });
  },

  toggleSchema(schemaType, isActive) {
    return apiRequest(`/schemas/${schemaType}/toggle`, {
      method: 'PATCH',
      body: JSON.stringify({ is_active: isActive })
    });
  },

  // Hero & About
  updateHero(heroData) {
    return apiRequest('/homepage/hero', { method: 'PUT', body: JSON.stringify(heroData) });
  },

  updateAbout(aboutData) {
    return apiRequest('/homepage/about', { method: 'PUT', body: JSON.stringify(aboutData) });
  },

  // Vehicles
  createVehicle(data) {
    return apiRequest('/vehicles', { method: 'POST', body: JSON.stringify(data) });
  },

  updateVehicle(id, data) {
    return apiRequest(`/vehicles/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },

  deleteVehicle(id) {
    return apiRequest(`/vehicles/${id}`, { method: 'DELETE' });
  },

  reorderVehicles(items) {
    return apiRequest('/vehicles/reorder', { method: 'PUT', body: JSON.stringify({ items }) });
  },

  // Occasions
  createOccasion(data) {
    return apiRequest('/occasions', { method: 'POST', body: JSON.stringify(data) });
  },

  updateOccasion(id, data) {
    return apiRequest(`/occasions/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },

  deleteOccasion(id) {
    return apiRequest(`/occasions/${id}`, { method: 'DELETE' });
  },

  // Testimonials
  createTestimonial(data) {
    return apiRequest('/testimonials', { method: 'POST', body: JSON.stringify(data) });
  },

  updateTestimonial(id, data) {
    return apiRequest(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },

  deleteTestimonial(id) {
    return apiRequest(`/testimonials/${id}`, { method: 'DELETE' });
  },

  // Gallery
  createGalleryItem(data) {
    return apiRequest('/gallery', { method: 'POST', body: JSON.stringify(data) });
  },

  deleteGalleryItem(id) {
    return apiRequest(`/gallery/${id}`, { method: 'DELETE' });
  },

  // Contact
  updateContact(data) {
    return apiRequest('/contact', { method: 'PUT', body: JSON.stringify(data) });
  }
};
