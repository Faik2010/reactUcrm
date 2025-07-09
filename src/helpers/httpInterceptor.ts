// Global HTTP Interceptor Setup
// Tüm axios instance'larda otomatik Authorization header ve error handling

import axios, { AxiosInstance } from 'axios';
import tokenService from './tokenService';
import applyTurkishUpperCaseTransformation from './turkishUpperCase';

/**
 * Global HTTP Interceptor - Tüm HTTP isteklerinde otomatik Authorization header
 * 
 * Bu interceptor'lar:
 * 1. Otomatik Authorization: Bearer {accessToken} header'ı ekler
 * 2. User ID ve Member ID header'larını ekler
 * 3. Token süresi dolduğunda otomatik logout yapar
 * 4. Consistent error handling sağlar
 * 5. Debug logging yapar
 * 6. Request body'sini Türkçe büyük harfe çevirir
 */

// Global axios defaults'ları ayarla
export const setupGlobalAxiosDefaults = () => {
  // Axios varsayılan ayarları
  axios.defaults.timeout = 30000; // 30 saniye timeout
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';
  
  console.log('🌐 Global axios defaults configured');
};

// Global request interceptor
export const setupGlobalRequestInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const accessToken = tokenService.getAccessToken();
      
      // Headers'ı initialize et
      if (!config.headers) {
        config.headers = {} as any;
      }
      
      // Login endpoint'leri için Authorization header ekleme
      const isLoginEndpoint = config.url?.includes('/auth/login') || 
                             config.url?.includes('/auth/register') ||
                             config.url?.includes('/auth/forgot-password');
      
      // Authorization header ekle
      if (!isLoginEndpoint && accessToken && tokenService.isAccessTokenValid()) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        
        // User ID'yi header'a ekle
        const userId = tokenService.getUserId();
        if (userId) {
          config.headers['X-User-ID'] = userId;
        }
        
        // Member ID'yi header'a ekle
        const memberId = tokenService.getMemberId();
        if (memberId) {
          config.headers['X-Member-ID'] = memberId;
        }
        
        // Debug log
        console.log(`🔐 Global Interceptor: Authorization added to ${config.method?.toUpperCase()} ${config.url}`);
      } else if (!isLoginEndpoint && accessToken && !tokenService.isAccessTokenValid()) {
        // Token süresi dolmuş
        console.warn('🚨 Global Interceptor: Access token expired, redirecting to login');
        tokenService.clearTokens();
        
        // Login sayfasında değilsek yönlendir
        if (!window.location.pathname.includes('/login')) {
          window.location.href = "/login";
        }
        
        return Promise.reject(new Error('Token expired'));
      }
      
      // Request body'sini Türkçe büyük harfe çevir
      if (config.data && (config.method === 'post' || config.method === 'put' || config.method === 'patch')) {
        try {
          const originalBody = config.data;
          const transformedBody = applyTurkishUpperCaseTransformation(originalBody);
          
          // Body'yi güncelle
          config.data = transformedBody;
          
          // Debug log
          if (process.env.NODE_ENV === 'development') {
            console.log(`🔄 Turkish UpperCase: Applied to ${config.method?.toUpperCase()} ${config.url}`);
          }
        } catch (error) {
          console.error('❌ Turkish uppercase transformation failed:', error);
          // Hata durumunda orijinal body'yi kullan
        }
      }
      
      return config;
    },
    (error) => {
      console.error('❌ Global request interceptor error:', error);
      return Promise.reject(error);
    }
  );
  
  console.log('🔐 Global request interceptor configured with Turkish uppercase transformation');
};

// Global response interceptor
export const setupGlobalResponseInterceptor = () => {
  axios.interceptors.response.use(
    (response) => {
      // Başarılı yanıtlar için minimal log
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
      }
      return response;
    },
    (error) => {
      const status = error.response?.status;
      const responseData = error.response?.data;
      const url = error.config?.url;
      const method = error.config?.method?.toUpperCase();
      
      // Error logging
      console.error(`❌ ${method} ${url} - ${status}`);
      
      let errorMessage = "Bir hata oluştu";
      
      if (error.response) {
        switch (status) {
          case 400:
            // Backend standart hata formatını kontrol et
            if (responseData && typeof responseData === 'object' && 'success' in responseData && !responseData.success) {
              errorMessage = responseData.message || "Geçersiz istek";
            } else {
              errorMessage = "Geçersiz istek";
            }
            break;
            
          case 401:
            errorMessage = "Oturum süresi dolmuş";
            // Token'ları temizle ve login'e yönlendir
            tokenService.clearTokens();
            
            // Login sayfasında değilsek yönlendir
            if (!window.location.pathname.includes('/login')) {
              setTimeout(() => {
                window.location.href = "/login";
              }, 1000);
            }
            break;
            
          case 403:
            errorMessage = "Bu işlem için yetkiniz bulunmuyor";
            break;
            
          case 404:
            errorMessage = "İstenen kaynak bulunamadı";
            break;
            
          case 500:
            errorMessage = "Sunucu hatası oluştu";
            break;
            
          case 502:
          case 503:
          case 504:
            errorMessage = "Sunucu geçici olarak kullanılamıyor";
            break;
            
          default:
            if (responseData && typeof responseData === 'object' && 'success' in responseData && !responseData.success) {
              errorMessage = responseData.message || errorMessage;
            } else {
              errorMessage = error.message || errorMessage;
            }
        }
      } else if (error.request) {
        errorMessage = "Sunucuya bağlanılamadı";
        console.error('❌ Network error:', error.request);
      } else {
        errorMessage = error.message || errorMessage;
        console.error('❌ Request setup error:', error.message);
      }
      
      // Structured error object döndür
      const structuredError = {
        message: errorMessage,
        status: status,
        statusText: error.response?.statusText,
        url: url,
        method: method,
        data: responseData,
        originalError: error
      };
      
      return Promise.reject(structuredError);
    }
  );
  
  console.log('🔄 Global response interceptor configured');
};

// Belirli bir axios instance için interceptor'ları kur
export const setupInterceptorsForInstance = (instance: AxiosInstance): AxiosInstance => {
  // TokenService'e kaydet
  tokenService.registerAxiosInstance(instance);
  
  return instance;
};

// Global interceptor'ları temizle
export const clearGlobalInterceptors = () => {
  axios.interceptors.request.clear();
  axios.interceptors.response.clear();
  console.log('🧹 Global interceptors cleared');
};

// Türkçe büyük harf dönüştürme özelliğini test et
export const testTurkishUpperCaseTransformation = () => {
  const testData = {
    firmaAdi: "örnek firma adı",
    email: "test@example.com", // Bu değişmeyecek
    url: "https://example.com", // Bu değişmeyecek
    aciklama: "türkçe karakterli açıklama",
    password: "gizli123", // Bu değişmeyecek
    nested: {
      baslik: "iç nesne başlığı",
      eposta: "nested@test.com", // Bu değişmeyecek
      detay: "detay bilgisi"
    },
    liste: [
      { ad: "liste öğesi 1", kod: "K001" },
      { ad: "liste öğesi 2", resimUrl: "https://image.com/img.jpg" }
    ],
    sayisal: "123.45", // Bu değişmeyecek
    tarih: "2023-12-25", // Bu değişmeyecek
    id: "UUID-123-456", // Bu değişmeyecek
    token: "Bearer xyz123" // Bu değişmeyecek
  };
  
  console.group('🧪 Turkish UpperCase Test');
  console.log('Input:', testData);
  
  const transformed = applyTurkishUpperCaseTransformation(testData);
  console.log('Output:', transformed);
  
  console.groupEnd();
  
  return transformed;
};

// Tüm global HTTP interceptor'ları kur
export const initializeGlobalHttpInterceptors = () => {
  console.log('🚀 Initializing global HTTP interceptors...');
  
  // Defaults
  setupGlobalAxiosDefaults();
  
  // Request interceptor
  setupGlobalRequestInterceptor();
  
  // Response interceptor  
  setupGlobalResponseInterceptor();
  
  console.log('✅ Global HTTP interceptors initialized successfully with Turkish uppercase transformation');
};

// Test endpoint'i için interceptor'ları test et
export const testInterceptors = async () => {
  try {
    console.log('🧪 Testing interceptors...');
    
    // TokenService debug info
    tokenService.debugInfo();
    
    // Turkish uppercase test
    testTurkishUpperCaseTransformation();
    
    console.log('✅ Interceptors test completed');
  } catch (error) {
    console.error('❌ Interceptors test failed:', error);
  }
};

// Export default initialization function
export default initializeGlobalHttpInterceptors; 