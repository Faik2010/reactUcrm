import tokenService from '../tokenService';

// Backward compatibility için eski fonksiyonları tokenService'e yönlendir

// LocalStorage'dan mainToken al
export const getMainToken = (): string | null => {
  return tokenService.getMainToken();
};

// LocalStorage'dan accessToken al
export const getAccessToken = (): string | null => {
  return tokenService.getAccessToken();
};

// LocalStorage'dan userRoles al
export const getUserRoles = (): number[] => {
  return tokenService.getUserRoles();
};

// Token'ları localStorage'a kaydet
export const setTokens = (mainToken: string, accessToken: string, userRoles: number[]) => {
  tokenService.setTokens(mainToken, accessToken, userRoles);
};

// Token'ları temizle
export const clearTokens = () => {
  tokenService.clearTokens();
};

// Parse JWT token
export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1]; // JWT'nin payload kısmı
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

// MainToken payload'ını al
export const getMainTokenPayload = () => {
  return tokenService.getMainTokenPayload();
};

// AccessToken payload'ını al
export const getAccessTokenPayload = () => {
  return tokenService.getAccessTokenPayload();
};

// Kullanıcıya özel backend URL'ini al (mainToken'dan)
export const getUserBackendUrl = (): string | null => {
  return tokenService.getHostUrl() || null;
};

// Member Number'ı al (mainToken'dan)
export const getMemberNumber = (): string | null => {
  return tokenService.getMemberNumber() || null;
};

// Member Name'i al (mainToken'dan)
export const getMemberName = (): string | null => {
  return tokenService.getMemberName() || null;
};

// License Codes'ları al (mainToken'dan)
export const getLicenseCodes = (): string | null => {
  const userInfo = tokenService.getUserInfo();
  return userInfo?.licenseInfo.rawLicenseCode || null;
};

// Member ID'yi al (mainToken'dan) - Company ID olarak kullanılır
export const getCompanyId = (): string | null => {
  return tokenService.getMemberId() || null;
};

// User ID'yi al (accessToken'dan)
export const getUserId = (): string | null => {
  return tokenService.getUserId() || null;
};

// User Name'i al (accessToken'dan)
export const getUserName = (): string | null => {
  return tokenService.getFullName() || null;
};

// Session Token'ı al (accessToken'dan) - Bu özellik şimdilik tokenService'de yok
export const getSessionToken = (): string | null => {
  const payload = tokenService.getAccessTokenPayload();
  return payload ? (payload as any).SessionToken : null;
};

// Token geçerlilik süresini kontrol et
export const isTokenValid = (token: string | null): boolean => {
  return tokenService.isTokenValid(token);
};

// MainToken geçerli mi?
export const isMainTokenValid = (): boolean => {
  return tokenService.isMainTokenValid();
};

// AccessToken geçerli mi?
export const isAccessTokenValid = (): boolean => {
  return tokenService.isAccessTokenValid();
};

// Token'ın oluşturulma süresini al (Not Before)
export const getTokenNotBefore = (token: string) => {
  const payload = parseJwt(token);
  return payload ? payload.nbf : null;
};

// Token'ın son kullanma süresini al
export const getTokenExpiration = (token: string) => {
  const payload = parseJwt(token);
  return payload ? payload.exp : null;
};

// Issuer'ı al
export const getIssuer = (token: string) => {
  const payload = parseJwt(token);
  return payload ? payload.iss : null;
};

// Audience'ı al
export const getAudience = (token: string) => {
  const payload = parseJwt(token);
  return payload ? payload.aud : null;
};

// Kullanıcının belirli bir lisansa sahip olup olmadığını kontrol et
export const hasLicense = (licenseCode: string): boolean => {
  return tokenService.hasSpecificLicense(licenseCode);
};

// Kullanıcının belirli bir role sahip olup olmadığını kontrol et
export const hasRole = (roleId: number): boolean => {
  return tokenService.hasRole(roleId);
};

// Yeni tokenService fonksiyonları için export
export { tokenService };
export default tokenService;
