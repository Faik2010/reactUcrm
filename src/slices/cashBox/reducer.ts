import { createSlice } from "@reduxjs/toolkit";

interface CashBoxState {
    cashBoxes: any[];
    loading: boolean;
    error: string | null;
    success: string | null;
    totalPages: number;
    currentPage: number;
}

const initialState: CashBoxState = {
    cashBoxes: [],
    loading: false,
    error: null,
    success: null,
    totalPages: 1,
    currentPage: 1
};

const cashBoxSlice = createSlice({
    name: "cashBox",
    initialState,
    reducers: {
        setCashBoxes: (state, action) => {
            state.cashBoxes = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.success = null;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
            state.error = null;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
});

export const {
    setCashBoxes,
    setLoading,
    setError,
    setSuccess,
    setTotalPages,
    setCurrentPage
} = cashBoxSlice.actions;

export default cashBoxSlice.reducer;
