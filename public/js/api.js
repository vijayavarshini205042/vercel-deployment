/**
 * Central REST API Client
 * Automatically handles Authorization headers, JSON serialization,
 * error parsing, and transparent fallback to local datasets when offline.
 */

class ApiService {
  constructor() {
    // Force backend URL if running locally (localhost, 127.0.0.1, or file:///)
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
    this.baseUrl = isLocal ? 'http://localhost:5000/api' : '/api';
  }

  getHeaders(isFormData = false) {
    const headers = {};
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    const user = window.appState ? window.appState.user : null;
    if (user && user.token) {
      headers['Authorization'] = `Bearer ${user.token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const isFormData = options.body instanceof FormData;
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(isFormData),
        ...(options.headers || {})
      }
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (err) {
      // Auth endpoints must NOT fall back to simulated data
      if (endpoint.startsWith('/auth/')) {
        throw err;
      }
      console.warn(`API request to ${endpoint} failed, checking fallback dataset.`, err.message);
      return this.handleFallback(endpoint, options);
    }
  }

  // Fallback simulator for smooth client-side operations
  handleFallback(endpoint, options) {
    const fallback = window.AppFallbackData;
    if (!fallback) throw new Error('Data service unavailable');

    // GET endpoints
    if (endpoint.startsWith('/regulations')) {
      return { success: true, data: fallback.regulations };
    }
    if (endpoint.startsWith('/departments')) {
      return { success: true, data: fallback.departments };
    }
    if (endpoint.startsWith('/resources/notes')) {
      return { success: true, data: fallback.notes };
    }
    if (endpoint.startsWith('/resources/question-papers')) {
      return { success: true, data: fallback.questionPapers };
    }
    if (endpoint.startsWith('/careers/roles')) {
      return { success: true, data: fallback.jobRoles };
    }
    if (endpoint.startsWith('/careers/roadmaps')) {
      return { success: true, data: fallback.roadmaps };
    }
    if (endpoint.startsWith('/projects')) {
      return { success: true, data: fallback.projects };
    }
    if (endpoint.startsWith('/certifications')) {
      return { success: true, data: fallback.certifications };
    }
    if (endpoint.startsWith('/search')) {
      return { success: true, data: [] };
    }

    return { success: true, message: 'Simulated response' };
  }

  // Convenience methods
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body)
    });
  }

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

window.apiService = new ApiService();
