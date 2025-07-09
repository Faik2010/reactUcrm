// Token Service - JWT token parsing ve yönetim sistemi

import { AxiosInstance } from 'axios';
import applyTurkishUpperCaseTransformation from './turkishUpperCase';

// JWT Token'ları parse et
const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Token parse error:", error);
    return null;
  }
};

// AccessToken içerik interface
export interface AccessTokenPayload {
  NameLastName: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}

// MainToken içerik interface
export interface MainTokenPayload {
  MemberName: string;
  HostUrl: string;
  MemberNumber: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  LicenceCodes: string;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}

// Lisans tipleri
export interface LicenseInfo {
  hasExtraPackage: boolean; // CRMMIK ile başlayan
  hasStandardPackage: boolean; // CRMKUL ile başlayan
  allLicenses: string[]; // Tüm lisanslar split edilmiş halde
  rawLicenseCode: string; // Ham lisans kodu
}

// Global user bilgileri
export interface UserInfo {
  // AccessToken'dan gelen bilgiler
  fullName: string;
  userId: string;
  
  // MainToken'dan gelen bilgiler
  memberName: string;
  hostUrl: string;
  memberNumber: string;
  memberId: string;
  
  // Lisans bilgileri
  licenseInfo: LicenseInfo;
  
  // Token geçerlilik durumu
  isTokensValid: boolean;
}

/**
 * TokenService Class - Singleton pattern
 */
class TokenService {
  private static instance: TokenService;
  private userInfo: UserInfo | null = null;
  private registeredAxiosInstances: Set<AxiosInstance> = new Set();

  private constructor() {
    this.initializeUserInfo();
  }

  // Singleton instance
  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  // Token'ları localStorage'a kaydet
  public setTokens(mainToken: string, accessToken: string, userRoles: number[]): void {
    localStorage.setItem('mainToken', mainToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userRoles', JSON.stringify(userRoles));
    
    // UserInfo'yu güncelle
    this.initializeUserInfo();
    
    // Kayıtlı axios instance'larında interceptor'ları güncelle
    this.updateInterceptorsForAllInstances();
  }

  // Token'ları temizle
  public clearTokens(): void {
    localStorage.removeItem('mainToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRoles');
    this.userInfo = null;
    
    // Kayıtlı axios instance'larında interceptor'ları güncelle
    this.updateInterceptorsForAllInstances();
  }

  // Axios instance'ı kaydet (interceptor yönetimi için)
  public registerAxiosInstance(axiosInstance: AxiosInstance): void {
    this.registeredAxiosInstances.add(axiosInstance);
    console.log(`📝 Registered axios instance. Total: ${this.registeredAxiosInstances.size}`);
  }

  // Axios instance'ı kaydı iptal et
  public unregisterAxiosInstance(axiosInstance: AxiosInstance): void {
    this.registeredAxiosInstances.delete(axiosInstance);
    console.log(`📝 Unregistered axios instance. Total: ${this.registeredAxiosInstances.size}`);
  }

  // Tüm kayıtlı axios instance'larda interceptor'ları güncelle
  private updateInterceptorsForAllInstances(): void {
    this.registeredAxiosInstances.forEach(instance => {
      this.setupAuthInterceptorForInstance(instance);
    });
  }

  // Belirli bir axios instance için auth interceptor kur
  private setupAuthInterceptorForInstance(axiosInstance: AxiosInstance): void {
    // Önce mevcut interceptor'ları temizle (çift kayıt önlemek için)
    axiosInstance.interceptors.request.clear();
    
    // Yeni interceptor ekle
    axiosInstance.interceptors.request.use(
      (config: any) => {
        const accessToken = this.getAccessToken();
        
        // Headers'ı initialize et
        if (!config.headers) {
          config.headers = {};
        }
        
        // Login endpoint kontrolü
        const isLoginEndpoint = config.url?.includes('/auth/login') || 
                               config.url?.includes('/auth/register') ||
                               config.url?.includes('/auth/forgot-password');
        
        // Authorization header ekle
        if (!isLoginEndpoint && accessToken && this.isAccessTokenValid()) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          
          // Debug log
          console.log(`🔐 TokenService: Adding Authorization header to ${config.method?.toUpperCase()} ${config.url}`);
        } else if (!isLoginEndpoint && accessToken && !this.isAccessTokenValid()) {
          // Token süresi dolmuş
          console.warn('🚨 TokenService: Access token expired');
          this.clearTokens();
          window.location.href = "/login";
          return Promise.reject(new Error('Token expired'));
        }
        
        // User ID ve Member ID'yi header'a ekle
        const userId = this.getUserId();
        if (userId) {
          config.headers['X-User-ID'] = userId;
        }
        
        const memberId = this.getMemberId();
        if (memberId) {
          config.headers['X-Member-ID'] = memberId;
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
              console.log(`🔄 TokenService: Turkish UpperCase applied to ${config.method?.toUpperCase()} ${config.url}`);
            }
          } catch (error) {
            console.error('❌ TokenService: Turkish uppercase transformation failed:', error);
            // Hata durumunda orijinal body'yi kullan
          }
        }
        
        return config;
      },
      (error) => {
        console.error('❌ TokenService interceptor error:', error);
        return Promise.reject(error);
      }
    );
  }

  // MainToken'ı al
  public getMainToken(): string | null {
    return localStorage.getItem('mainToken');
  }

  // AccessToken'ı al
  public getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // UserRoles'ları al
  public getUserRoles(): number[] {
    const roles = localStorage.getItem('userRoles');
    return roles ? JSON.parse(roles) : [];
  }

  // MainToken payload'ını parse et
  public getMainTokenPayload(): MainTokenPayload | null {
    const token = this.getMainToken();
    return token ? parseJwt(token) as MainTokenPayload : null;
  }

  // AccessToken payload'ını parse et
  public getAccessTokenPayload(): AccessTokenPayload | null {
    const token = this.getAccessToken();
    return token ? parseJwt(token) as AccessTokenPayload : null;
  }

  // Token geçerlilik kontrolü
  public isTokenValid(token: string | null): boolean {
    if (!token) return false;
    
    const payload = parseJwt(token);
    if (!payload) return false;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  }

  // MainToken geçerli mi?
  public isMainTokenValid(): boolean {
    return this.isTokenValid(this.getMainToken());
  }

  // AccessToken geçerli mi?
  public isAccessTokenValid(): boolean {
    return this.isTokenValid(this.getAccessToken());
  }

  // Her iki token da geçerli mi?
  public areTokensValid(): boolean {
    return this.isMainTokenValid() && this.isAccessTokenValid();
  }

  // Lisans kodlarını parse et
  private parseLicenseCodes(licenseCodesStr: string): LicenseInfo {
    const licenses = licenseCodesStr.split(',').map(code => code.trim());
    
    return {
      hasExtraPackage: licenses.some(license => license.startsWith('CRMMIK')),
      hasStandardPackage: licenses.some(license => license.startsWith('CRMKUL')),
      allLicenses: licenses,
      rawLicenseCode: licenseCodesStr
    };
  }

  // UserInfo'yu initialize et
  private initializeUserInfo(): void {
    try {
      const mainPayload = this.getMainTokenPayload();
      const accessPayload = this.getAccessTokenPayload();

      if (!mainPayload || !accessPayload) {
        this.userInfo = null;
        return;
      }

      this.userInfo = {
        // AccessToken'dan
        fullName: accessPayload.NameLastName,
        userId: accessPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        
        // MainToken'dan
        memberName: mainPayload.MemberName,
        hostUrl: mainPayload.HostUrl,
        memberNumber: mainPayload.MemberNumber,
        memberId: mainPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        
        // Lisans bilgileri
        licenseInfo: this.parseLicenseCodes(mainPayload.LicenceCodes),
        
        // Token geçerlilik durumu
        isTokensValid: this.areTokensValid()
      };
    } catch (error) {
      console.error('UserInfo initialization error:', error);
      this.userInfo = null;
    }
  }

  // UserInfo'yu al
  public getUserInfo(): UserInfo | null {
    if (!this.userInfo || !this.areTokensValid()) {
      this.initializeUserInfo();
    }
    return this.userInfo;
  }

  // Kullanıcının tam adını al (Header'da gösterilecek)
  public getFullName(): string {
    return this.getUserInfo()?.fullName || '';
  }

  // Member name'i al (Header'da gösterilecek)
  public getMemberName(): string {
    return this.getUserInfo()?.memberName || '';
  }

  // Backend URL'ini al (API istekleri için)
  public getHostUrl(): string {
    return this.getUserInfo()?.hostUrl || '';
  }

  // User ID'yi al (Backend istekleri için)
  public getUserId(): string {
    return this.getUserInfo()?.userId || '';
  }

  // Member Number'ı al
  public getMemberNumber(): string {
    return this.getUserInfo()?.memberNumber || '';
  }

  // Member ID'yi al (Company ID olarak kullanılabilir)
  public getMemberId(): string {
    return this.getUserInfo()?.memberId || '';
  }

  // Lisans kontrolü - Extra package var mı?
  public hasExtraPackage(): boolean {
    return this.getUserInfo()?.licenseInfo.hasExtraPackage || false;
  }

  // Lisans kontrolü - Standard package var mı?
  public hasStandardPackage(): boolean {
    return this.getUserInfo()?.licenseInfo.hasStandardPackage || false;
  }

  // Belirli bir lisansa sahip mi?
  public hasSpecificLicense(licenseCode: string): boolean {
    const userInfo = this.getUserInfo();
    return userInfo?.licenseInfo.allLicenses.includes(licenseCode) || false;
  }

  // Belirli bir prefix ile başlayan lisans var mı?
  public hasLicenseWithPrefix(prefix: string): boolean {
    const userInfo = this.getUserInfo();
    return userInfo?.licenseInfo.allLicenses.some(license => license.startsWith(prefix)) || false;
  }

  // Kullanıcının belirli bir role sahip olup olmadığını kontrol et
  public hasRole(roleId: number): boolean {
    const userRoles = this.getUserRoles();
    return userRoles.includes(roleId);
  }

  // Token'ları refresh et (yeni token geldiğinde)
  public refreshTokens(mainToken: string, accessToken: string, userRoles: number[]): void {
    this.setTokens(mainToken, accessToken, userRoles);
  }

  // Yeni axios instance oluşturup otomatik interceptor kur
  public createAxiosInstance(config?: any): AxiosInstance {
    const axios = require('axios');
    const instance = axios.create(config);
    
    // Bu instance'ı kaydet ve interceptor kur
    this.registerAxiosInstance(instance);
    this.setupAuthInterceptorForInstance(instance);
    
    return instance;
  }

  // Debug: Tüm bilgileri yazdır
  public debugInfo(): void {
    console.log('=== TOKEN SERVICE DEBUG ===');
    console.log('UserInfo:', this.getUserInfo());
    console.log('MainToken valid:', this.isMainTokenValid());
    console.log('AccessToken valid:', this.isAccessTokenValid());
    console.log('User roles:', this.getUserRoles());
    console.log('Registered instances:', this.registeredAxiosInstances.size);
    console.log('Turkish uppercase enabled:', true);
    console.log('==========================');
  }
}

// Singleton instance'ı export et
export const tokenService = TokenService.getInstance();
export default tokenService; 