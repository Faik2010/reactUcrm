import { Dispatch } from "@reduxjs/toolkit";
import apiClient from "../../helpers/api_helper";
import { setCashBoxes, setLoading, setError, setTotalPages, setSuccess } from "./reducer";

interface CashBoxCreateDto {
    name: string;
    balance: number;
    currency: number;
}

interface CashBoxUpdateDto {
    id: string;
    name: string;
    balance: number;
}

export const fetchCashBoxes = (page: number = 1, pageSize: number = 10) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await apiClient.get(`/cashBox?pageIndex=${page-1}&pageSize=${pageSize}`);
        dispatch(setCashBoxes(response.data.items));
        dispatch(setTotalPages(response.data.pages));
    } catch (error: any) {
        dispatch(setError(error.message || "Kasa listesi yüklenirken bir hata oluştu"));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createCashBox = (data: CashBoxCreateDto) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        await apiClient.post('/cashBox', data);
        dispatch(setSuccess("Kasa başarıyla oluşturuldu"));
    } catch (error: any) {
        dispatch(setError(error.message || "Kasa oluşturulurken bir hata oluştu"));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateCashBox = (data: CashBoxUpdateDto) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        await apiClient.put('/cashBox', data);
        dispatch(setSuccess("Kasa başarıyla güncellendi"));
    } catch (error: any) {
        dispatch(setError(error.message || "Kasa güncellenirken bir hata oluştu"));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteCashBox = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        await apiClient.delete(`/cashBox/${id}`);
        dispatch(setSuccess("Kasa başarıyla silindi"));
        await dispatch(fetchCashBoxes() as any);
    } catch (error: any) {
        dispatch(setError(error.message || "Kasa silinirken bir hata oluştu"));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};
