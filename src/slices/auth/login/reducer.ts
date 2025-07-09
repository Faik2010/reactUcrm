import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../../helpers/tokenService";

// Login API response interface
export interface LoginResponse {
    success: boolean;
    dataCount: number;
    message: string;
    statusCode: number;
    data: {
        accessToken: string;
        mainToken: string;
        userId: number;
        twoFactorEnableMethod: number;
        hostUrl: string;
        fullName: string;
        memberNumber: number;
        memberId: number;
        firmName: string;
        isReopenOffer: boolean;
        isShowExchangeRates: boolean;
        showingExchangeRateNumbers: string[];
        isAssignTabFuncToEnter: boolean;
        firstPageUrl: string;
        isDarkMode: boolean;
        userRoles: number[];
    };
}

// Redux state interface - tokenService'den gelen bilgileri kullan
interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    userInfo: UserInfo | null; // tokenService'den gelen complete user info
    appSettings: {
        isDarkMode: boolean;
        firstPageUrl: string;
        isReopenOffer: boolean;
        isShowExchangeRates: boolean;
        showingExchangeRateNumbers: string[];
        isAssignTabFuncToEnter: boolean;
    } | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    userInfo: null,
    appSettings: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart(state: AuthState) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state: AuthState, action: PayloadAction<{ userInfo: UserInfo; appSettings: any }>) {
            const { userInfo, appSettings } = action.payload;
            
            state.loading = false;
            state.isAuthenticated = true;
            state.error = null;
            state.userInfo = userInfo;
            state.appSettings = appSettings;
        },
        loginError(state: AuthState, action: PayloadAction<string>) {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
            state.userInfo = null;
            state.appSettings = null;
        },
        logout(state: AuthState) {
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.userInfo = null;
            state.appSettings = null;
        },
        clearError(state: AuthState) {
            state.error = null;
        },
        updateUserInfo(state: AuthState, action: PayloadAction<UserInfo>) {
            state.userInfo = action.payload;
        },
        updateAppSettings(state: AuthState, action: PayloadAction<Partial<AuthState['appSettings']>>) {
            if (state.appSettings) {
                state.appSettings = { ...state.appSettings, ...action.payload };
            }
        }
    },
});

export const { 
    loginStart, 
    loginSuccess, 
    loginError, 
    logout, 
    clearError,
    updateUserInfo,
    updateAppSettings
} = authSlice.actions;

export default authSlice.reducer;
