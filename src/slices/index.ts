import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Front
import LayoutReducer from "./layouts/reducer";

// auth
import LoginReducer from "./auth/login/reducer";
import RegisterReducer from "./auth/register/reducer";
import ProfileReducer from "./auth/profile/reducer";

// cashBox (örnek olarak bırakıldı)
import CashBoxReducer from "./cashBox/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Register: RegisterReducer,
    Profile: ProfileReducer,
    CashBox: CashBoxReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default rootReducer;