const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

function getHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...extraHeaders,
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

export async function apiRequest<T = any>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  extraHeaders?: Record<string, string>
): Promise<T> {
  const url = `${API_URL}/${endpoint.replace(/^\//, '')}`;
  const options: RequestInit = {
    method,
    headers: getHeaders(extraHeaders),
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

// Authentication API Helper Functions
export const authApi = {
  register: (data: any) => apiRequest('register', 'POST', data),
  login: (data: any) => apiRequest('login', 'POST', data),
  logout: () => apiRequest('logout', 'POST'),
  profile: () => apiRequest('profile', 'GET'),
};

// Spaces API Helper Functions
export const spacesApi = {
  list: (params?: { search?: string; space_type?: string; status?: string; limit?: number; offset?: number }) => {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.space_type) query.append('space_type', params.space_type);
    if (params?.status) query.append('status', params.status);
    if (params?.limit !== undefined) query.append('limit', params.limit.toString());
    if (params?.offset !== undefined) query.append('offset', params.offset.toString());
    
    const queryString = query.toString();
    const endpoint = queryString ? `spaces?${queryString}` : 'spaces';
    return apiRequest(endpoint, 'GET');
  },
  get: (id: string) => apiRequest(`spaces/${id}`, 'GET'),
  create: (data: any) => apiRequest('spaces', 'POST', data),
  update: (id: string, data: any) => apiRequest(`spaces/${id}`, 'PUT', data),
  bookings: (id: string) => apiRequest(`spaces/${id}/bookings`, 'GET'),
};

// Bookings API Helper Functions
export const bookingsApi = {
  list: () => apiRequest('bookings', 'GET'),
  create: (data: any) => apiRequest('bookings', 'POST', data),
  update: (id: string, data: any) => apiRequest(`bookings/${id}`, 'PUT', data),
};

// Space Types API Helper Functions
export const spaceTypesApi = {
  list: () => apiRequest('space-types', 'GET'),
  get: (id: string) => apiRequest(`space-types/${id}`, 'GET'),
};

// Dashboard API Helper Functions
export const dashboardApi = {
  stats: () => apiRequest('dashboard/stats', 'GET'),
};
