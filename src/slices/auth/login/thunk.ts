// thunks/auth/login/thunk.ts

import { loginApiClient } from "../../../helpers/api_helper";
import { loginStart, loginSuccess, loginError, logout } from "./reducer";
import tokenService from "../../../helpers/tokenService";
import { Dispatch } from "redux";
import { LoginResponse } from "./reducer";

// Login form interface
export interface LoginFormData {
    memberNumber: string;
    email: string;
    password: string;
}

// Login thunk
export const loginUser = (loginData: LoginFormData) => async (dispatch: Dispatch) => {
    try {
        dispatch(loginStart());
        
        const response = await loginApiClient.post("/auth/login", loginData);
        const loginResponse: LoginResponse = response.data;

        if (loginResponse.success && loginResponse.data) {
            const { mainToken, accessToken, userRoles, ...appData } = loginResponse.data;
            
            // Token'ları tokenService'e kaydet
            tokenService.setTokens(mainToken, accessToken, userRoles);
            
            // tokenService'den user bilgilerini al
            const userInfo = tokenService.getUserInfo();
            
            if (userInfo) {
                // App settings
                const appSettings = {
                    isDarkMode: appData.isDarkMode,
                    firstPageUrl: appData.firstPageUrl,
                    isReopenOffer: appData.isReopenOffer,
                    isShowExchangeRates: appData.isShowExchangeRates,
                    showingExchangeRateNumbers: appData.showingExchangeRateNumbers,
                    isAssignTabFuncToEnter: appData.isAssignTabFuncToEnter
                };
                
                // Redux state'i güncelle
                dispatch(loginSuccess({ userInfo, appSettings }));
                
                return { success: true, data: loginResponse.data };
            } else {
                const errorMessage = "Token parsing failed";
                dispatch(loginError(errorMessage));
                return { success: false, error: errorMessage };
            }
        } else {
            const errorMessage = loginResponse.message || "Giriş yapılamadı";
            dispatch(loginError(errorMessage));
            return { success: false, error: errorMessage };
        }
    } catch (error: any) {
        console.error("Login error:", error);
        
        // Backend'den gelen hata formatını kontrol et
        const backendError = error.response?.data;
        let errorMessage = "Giriş yapılırken bir hata oluştu";
        
        if (backendError && !backendError.success) {
            // Backend'den gelen standart hata formatı
            errorMessage = backendError.message || errorMessage;
        } else {
            // Diğer hatalar
            errorMessage = error.message || errorMessage;
        }
        
        dispatch(loginError(errorMessage));
        return { success: false, error: errorMessage };
    }
};

// Logout thunk
export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        // Token'ları temizle
        tokenService.clearTokens();
        
        // Redux state'i temizle
        dispatch(logout());
        
        return { success: true };
    } catch (error: any) {
        console.error("Logout error:", error);
        
        // Hata olsa bile token'ları temizle
        tokenService.clearTokens();
        dispatch(logout());
        
        return { success: false, error: error.message };
    }
};

// Token geçerliliğini kontrol et ve user bilgilerini güncelle
export const checkAuthStatus = () => async (dispatch: Dispatch) => {
    try {
        const userInfo = tokenService.getUserInfo();
        
        if (!userInfo || !userInfo.isTokensValid) {
            dispatch(logout());
            return { authenticated: false };
        }
        
        // Token'lar geçerli, user bilgilerini güncelle
        dispatch(loginSuccess({ 
            userInfo, 
            appSettings: {
                isDarkMode: false, // Default değerler
                firstPageUrl: '/dashboard',
                isReopenOffer: true,
                isShowExchangeRates: false,
                showingExchangeRateNumbers: [],
                isAssignTabFuncToEnter: false
            }
        }));
        
        return { authenticated: true };
    } catch (error) {
        console.error("Auth check error:", error);
        dispatch(logout());
        return { authenticated: false };
    }
};

// User info'yu manuel olarak refresh et
export const refreshUserInfo = () => async (dispatch: Dispatch) => {
    try {
        const userInfo = tokenService.getUserInfo();
        
        if (userInfo && userInfo.isTokensValid) {
            dispatch(loginSuccess({ 
                userInfo, 
                appSettings: {
                    isDarkMode: false,
                    firstPageUrl: '/dashboard',
                    isReopenOffer: true,
                    isShowExchangeRates: false,
                    showingExchangeRateNumbers: [],
                    isAssignTabFuncToEnter: false
                }
            }));
            return { success: true };
        } else {
            dispatch(logout());
            return { success: false, error: "Invalid tokens" };
        }
    } catch (error: any) {
        console.error("Refresh user info error:", error);
        return { success: false, error: error.message };
    }
};
