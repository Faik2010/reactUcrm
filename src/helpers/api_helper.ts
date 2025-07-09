import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import tokenService from './tokenService';

// Ana login URL'i - constant olarak sakla
export const MAIN_LOGIN_URL = 'https://login.ucrm.com.tr';

// Ana login için apiClient (token gerekmez)
export const loginApiClient = axios.create({
    baseURL: MAIN_LOGIN_URL,
});

// Kullanıcıya özel backend URL'ini JWT token'dan al
const getUserBackendUrl = () => {
    return tokenService.getHostUrl();
};

// Multi-tenant için dinamik apiClient (JWT token gerekir)
const createDynamicApiClient = () => {
    const backendUrl = getUserBackendUrl();
    
    if (!backendUrl) {
        // Eğer backend URL yoksa fallback olarak env kullan
        return axios.create({
            baseURL: process.env.REACT_APP_API_URL,
        });
    }

    return axios.create({
        baseURL: backendUrl,
    });
};

// Ana apiClient - dinamik backend URL ile
const apiClient = createDynamicApiClient();

// apiClient'ı tokenService'e kaydet (global interceptor'lar otomatik uygulanacak)
tokenService.registerAxiosInstance(apiClient);

// Login API için minimal error handling (global interceptor yeterli)
loginApiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`✅ LOGIN ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
        }
        return response;
    },
    (error: AxiosError) => {
        // Global interceptor'dan farklı olarak login-specific error handling
        let message = "Giriş yapılırken bir hata oluştu";
        
        if (error.response?.data && typeof error.response.data === 'object' && 'success' in error.response.data && !error.response.data.success) {
            message = (error.response.data as any).message || message;
        } else {
            message = error.message || message;
        }
        
        console.error(`❌ LOGIN ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`);
        
        // Login için structured error
        return Promise.reject({
            message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            originalError: error
        });
    }
);

// API client'ları yeniden oluşturma fonksiyonu (token refresh sonrası)
export const recreateApiClient = () => {
    const newApiClient = createDynamicApiClient();
    
    // Eski client'ı tokenService'den kaldır
    tokenService.unregisterAxiosInstance(apiClient);
    
    // Yeni client'ı kaydet
    tokenService.registerAxiosInstance(newApiClient);
    
    return newApiClient;
};

// Yeni axios instance oluştur ve tokenService'e kaydet
export const createApiClient = (config?: any): AxiosInstance => {
    return tokenService.createAxiosInstance(config);
};

// Debug: API client durumunu kontrol et
export const debugApiClients = () => {
    console.log('=== API CLIENTS DEBUG ===');
    console.log('apiClient baseURL:', apiClient.defaults.baseURL);
    console.log('loginApiClient baseURL:', loginApiClient.defaults.baseURL);
    console.log('TokenService debug:');
    tokenService.debugInfo();
    console.log('========================');
};

export default apiClient;
