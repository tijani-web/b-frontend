// Centralized API client — all requests go through here
// import.meta.env.DEV is true during `npm run dev`, false in production builds
const BASE = import.meta.env.DEV
  ? 'http://localhost:5000/api'
  : 'https://b-backend-kv4v.onrender.com/api';

function getToken(): string {
  return localStorage.getItem('token') || '';
}

function authHeaders(extra: Record<string, string> = {}): HeadersInit {
  return { Authorization: `Bearer ${getToken()}`, ...extra };
}

/** Strip undefined/null/empty-string values so URLSearchParams never sends "undefined" */
function buildQuery(params?: Record<string, any>): string {
  if (!params) return '';
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') {
      clean[k] = String(v);
    }
  }
  const qs = new URLSearchParams(clean).toString();
  return qs ? `?${qs}` : '';
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  isFormData = false
): Promise<T> {
  const headers: HeadersInit = isFormData
    ? { Authorization: `Bearer ${getToken()}` }
    : { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' };

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
  });

  // Safely parse response — server might return HTML error pages (e.g. 405, 502)
  let data: any = {};
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try { data = await res.json(); } catch { data = {}; }
  } else {
    await res.text(); // consume body to prevent memory leaks
  }

  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

// ─── Coins ────────────────────────────────────────────────────────────────────
export const coinsApi = {
  getAll: () => request<any>('GET', '/coins'),
  adminGetAll: () => request<any>('GET', '/coins/admin'),
  create: (body: any) => request<any>('POST', '/coins/admin', body),
  update: (id: string, body: any) => request<any>('PUT', `/coins/admin/${id}`, body),
  delete: (id: string) => request<any>('DELETE', `/coins/admin/${id}`),
  addAddress: (coinId: string, body: any) => request<any>('POST', `/coins/admin/${coinId}/addresses`, body),
  updateAddress: (addrId: string, body: any) => request<any>('PUT', `/coins/admin/addresses/${addrId}`, body),
};

// ─── Deposits ─────────────────────────────────────────────────────────────────
export const depositsApi = {
  create: (form: FormData) => request<any>('POST', '/deposits', form, true),
  getMyDeposits: (page = 1) => request<any>('GET', `/deposits?page=${page}`),
  adminGetAll: (params?: { status?: string; coin?: string; page?: number }) =>
    request<any>('GET', `/deposits/admin${buildQuery(params)}`),
  approve: (id: string) => request<any>('PUT', `/deposits/admin/${id}/approve`),
  reject: (id: string, reason?: string) =>
    request<any>('PUT', `/deposits/admin/${id}/reject`, { reason }),
};

// ─── Withdrawals ──────────────────────────────────────────────────────────────
export const withdrawalsApi = {
  create: (body: any) => request<any>('POST', '/withdrawals', body),
  getMyWithdrawals: (page = 1) => request<any>('GET', `/withdrawals?page=${page}`),
  getAddresses: () => request<any>('GET', '/withdrawals/addresses'),
  saveAddress: (body: any) => request<any>('POST', '/withdrawals/addresses', body),
  adminGetAll: (params?: { status?: string; coin?: string; page?: number }) =>
    request<any>('GET', `/withdrawals/admin${buildQuery(params)}`),
  approve: (id: string) => request<any>('PUT', `/withdrawals/admin/${id}/approve`),
  reject: (id: string, reason?: string) =>
    request<any>('PUT', `/withdrawals/admin/${id}/reject`, { reason }),
};

// ─── KYC ─────────────────────────────────────────────────────────────────────
export const kycApi = {
  upload: (form: FormData) => request<any>('POST', '/kyc/upload', form, true),
  getMyDocs: () => request<any>('GET', '/kyc'),
  adminGetAll: (params?: { status?: string; docType?: string; page?: number }) =>
    request<any>('GET', `/kyc/admin${buildQuery(params)}`),
  approve: (id: string) => request<any>('PUT', `/kyc/admin/${id}/approve`),
  reject: (id: string, reason?: string) =>
    request<any>('PUT', `/kyc/admin/${id}/reject`, { reason }),
  fileUrl: (id: string) => `${BASE}/kyc/admin/${id}/file`,
};

// ─── Admin ────────────────────────────────────────────────────────────────────
export const adminApi = {
  getStats: () => request<any>('GET', '/admin/stats'),
  getUsers: (params?: { kycStatus?: string; search?: string; page?: number }) =>
    request<any>('GET', `/admin/users${buildQuery(params)}`),
  getUser: (id: string) => request<any>('GET', `/admin/users/${id}`),
};

