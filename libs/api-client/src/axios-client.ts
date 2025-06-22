import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { format } from 'date-fns';
import queryString from 'query-string';

// ========== 1. TIMESTAMP LOGGING ==========
const getLabelLogRequest = (config: InternalAxiosRequestConfig) => {
  const method = config?.method?.toUpperCase();
  const url = config.url;
  return `${format(new Date(), 'HH:mm:ss:SSS')} <<< ${
    config['timeoutErrorMessage']
  } ${method} ${url}`;
};

// ========== 2. AXIOS INSTANCE ==========
export const instance = axios.create({
  baseURL: process.env.API_DOMAIN,
  timeout: 10000,
  paramsSerializer: (params: Record<string, any>) => {
    const newParams = { ...params };
    if (params?.orders && Array.isArray(params.orders)) {
      newParams.orders = JSON.stringify(params.orders);
    }
    return queryString.stringify(newParams, { arrayFormat: 'bracket' });
  },
});

// ========== 3. NORMALIZED ERROR HELPER ==========
const normalizeAxiosError = (error: AxiosError) => {
  const response = error?.response;
  return {
    success: false,
    status: response?.status || 500,
    message: (response?.data as any)?.message || error.message || 'Unknown error',
    error: true,
    data: response?.data || null,
  };
};

// ========== 4. REQUEST INTERCEPTOR ==========
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (process.env.NODE_ENV !== 'production') {
      config['timeoutErrorMessage'] = format(new Date(), 'HH:mm:ss:SSS');
    }
    return config;
  },
  (error: AxiosError) => {
    if (!error.response) {
      if (typeof window !== 'undefined') {
        console.log('No response received. Network/client issue.');
      }
    }
    return Promise.reject(normalizeAxiosError(error));
  }
);

// ========== 5. RESPONSE INTERCEPTOR ==========
instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (process.env.NODE_ENV !== 'production') {
      const labelLog = getLabelLogRequest(response.config);
      console.groupCollapsed(labelLog);
      if (response.config?.data) {
        console.log('Request Data:', response.config.data);
      }
      if (response.data) {
        console.log('Response Data:', response.data);
      }
      console.groupEnd();
    }
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(normalizeAxiosError(error));
  }
);

export type HeaderConf = {
  authorization?: boolean;
  locale?: string;
} & Record<string, unknown>;

export type Res<T = any> = T & {
  error?: boolean;
  message?: string;
};

export type ListParams<T = any> = T & {
  limit?: number;
  page?: number;
};

export type ListRes<T = any> = Res<{
  items: T[];
  total: number;
}>;

// ========== 6. TOKEN + HEADERS ==========
export const getAccessToken = async (): Promise<string | null> => {
  // Replace with your real logic TODO:
  return null;
};

export const getHeader = async (headerConf: HeaderConf = {}) => {
  const { authorization, locale, ...rest } = headerConf;
  const headers: Record<string, any> = { ...rest };

  if (authorization) {
    const token = await getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  if (locale) {
    headers['Accept-Language'] = locale;
  }

  return headers as AxiosRequestHeaders;
};

// ========== 7. EXPORT AXIOS CLIENT ==========
export const axiosClient = {
  async get<ReqType, ResType>(url: string, params?: ReqType, headerConf?: HeaderConf) {
    const headers = await getHeader(headerConf);
    return instance.get<ResType>(url, { params, headers });
  },

  async post<ReqType, ResType>(url: string, data: ReqType, headerConf?: HeaderConf) {
    const headers = await getHeader(headerConf);
    return instance.post<ResType>(url, data, { headers });
  },

  async put<ReqType, ResType>(url: string, data: ReqType, headerConf?: HeaderConf) {
    const headers = await getHeader(headerConf);
    return instance.put<ResType>(url, data, { headers });
  },

  async delete<ReqType, ResType>(url: string, data?: ReqType, headerConf?: HeaderConf) {
    const headers = await getHeader(headerConf);
    return instance.delete<ResType>(url, { data, headers });
  },
};
