// Global Notification System
// Toast ve SweetAlert için merkezi yönetim sistemi

import { toast, ToastPosition, Theme } from 'react-toastify';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

/**
 * 🎯 GLOBAL TOAST SYSTEM
 * react-toastify için merkezi yapılandırma ve helper'lar
 */

// Toast default ayarları
export const TOAST_CONFIG = {
  position: 'top-right' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored' as Theme,
  icon: true,
};

// Toast pozisyonları
export const TOAST_POSITIONS = {
  TOP_LEFT: 'top-left' as ToastPosition,
  TOP_CENTER: 'top-center' as ToastPosition,
  TOP_RIGHT: 'top-right' as ToastPosition,
  BOTTOM_LEFT: 'bottom-left' as ToastPosition,
  BOTTOM_CENTER: 'bottom-center' as ToastPosition,
  BOTTOM_RIGHT: 'bottom-right' as ToastPosition,
};

// Toast tipleri için interface
export interface ToastOptions {
  message: string;
  duration?: number;
  position?: ToastPosition;
  closeButton?: boolean;
  icon?: boolean;
  theme?: Theme;
}

/**
 * Success Toast - Başarılı işlemler için
 */
export const showSuccessToast = (options: ToastOptions) => {
  const config = {
    ...TOAST_CONFIG,
    autoClose: options.duration || 3000,
    position: options.position || TOAST_POSITIONS.TOP_RIGHT,
    closeButton: options.closeButton !== false,
    icon: options.icon !== false,
    theme: options.theme || 'colored' as Theme,
  };

  return toast.success(options.message, config);
};

/**
 * Error Toast - Hata durumları için
 */
export const showErrorToast = (options: ToastOptions) => {
  const config = {
    ...TOAST_CONFIG,
    autoClose: options.duration || 5000,
    position: options.position || TOAST_POSITIONS.TOP_RIGHT,
    closeButton: options.closeButton !== false,
    icon: options.icon !== false,
    theme: options.theme || 'colored' as Theme,
  };

  return toast.error(options.message, config);
};

/**
 * Warning Toast - Uyarı mesajları için
 */
export const showWarningToast = (options: ToastOptions) => {
  const config = {
    ...TOAST_CONFIG,
    autoClose: options.duration || 4000,
    position: options.position || TOAST_POSITIONS.TOP_RIGHT,
    closeButton: options.closeButton !== false,
    icon: options.icon !== false,
    theme: options.theme || 'colored' as Theme,
  };

  return toast.warning(options.message, config);
};

/**
 * Info Toast - Bilgi mesajları için
 */
export const showInfoToast = (options: ToastOptions) => {
  const config = {
    ...TOAST_CONFIG,
    autoClose: options.duration || 4000,
    position: options.position || TOAST_POSITIONS.TOP_RIGHT,
    closeButton: options.closeButton !== false,
    icon: options.icon !== false,
    theme: options.theme || 'colored' as Theme,
  };

  return toast.info(options.message, config);
};

/**
 * Custom Toast - Özel yapılandırma için
 */
export const showCustomToast = (options: ToastOptions & { type?: 'success' | 'error' | 'warning' | 'info' }) => {
  const config = {
    ...TOAST_CONFIG,
    autoClose: options.duration || 4000,
    position: options.position || TOAST_POSITIONS.TOP_RIGHT,
    closeButton: options.closeButton !== false,
    icon: options.icon !== false,
    theme: options.theme || 'colored' as Theme,
  };

  switch (options.type) {
    case 'success':
      return toast.success(options.message, config);
    case 'error':
      return toast.error(options.message, config);
    case 'warning':
      return toast.warning(options.message, config);
    case 'info':
      return toast.info(options.message, config);
    default:
      return toast(options.message, config);
  }
};

/**
 * 🚨 GLOBAL SWEETALERT SYSTEM
 * SweetAlert2 için özelleştirilmiş wrapper'lar
 */

// SweetAlert default tema
export const SWEET_ALERT_THEME = {
  confirmButtonColor: '#3b82f6', // blue-500
  cancelButtonColor: '#ef4444',  // red-500
  background: '#ffffff',
  color: '#1f2937',
  iconColor: '#3b82f6',
  customClass: {
    container: 'font-sans',
    popup: 'rounded-lg shadow-xl',
    title: 'text-lg font-semibold',
    content: 'text-sm text-gray-600',
    confirmButton: 'px-4 py-2 rounded-md font-medium',
    cancelButton: 'px-4 py-2 rounded-md font-medium',
  },
};

// Alert options interface
export interface AlertOptions {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  html?: string;
}

/**
 * Success Alert - Başarılı işlemler için
 */
export const showSuccessAlert = async (options: AlertOptions): Promise<SweetAlertResult> => {
  const config: SweetAlertOptions = {
    ...SWEET_ALERT_THEME,
    title: options.title,
    text: options.message,
    html: options.html,
    icon: 'success',
    confirmButtonText: options.confirmText || 'Tamam',
    showCancelButton: options.showCancel || false,
    cancelButtonText: options.cancelText || 'İptal',
  };

  return await Swal.fire(config);
};

/**
 * Error Alert - Hata durumları için
 */
export const showErrorAlert = async (options: AlertOptions): Promise<SweetAlertResult> => {
  const config: SweetAlertOptions = {
    ...SWEET_ALERT_THEME,
    title: options.title,
    text: options.message,
    html: options.html,
    icon: 'error',
    confirmButtonText: options.confirmText || 'Tamam',
    showCancelButton: options.showCancel || false,
    cancelButtonText: options.cancelText || 'İptal',
  };

  return await Swal.fire(config);
};

/**
 * Warning Alert - Uyarı mesajları için
 */
export const showWarningAlert = async (options: AlertOptions): Promise<SweetAlertResult> => {
  const config: SweetAlertOptions = {
    ...SWEET_ALERT_THEME,
    title: options.title,
    text: options.message,
    html: options.html,
    icon: 'warning',
    confirmButtonText: options.confirmText || 'Tamam',
    showCancelButton: options.showCancel || false,
    cancelButtonText: options.cancelText || 'İptal',
  };

  return await Swal.fire(config);
};

/**
 * Info Alert - Bilgi mesajları için
 */
export const showInfoAlert = async (options: AlertOptions): Promise<SweetAlertResult> => {
  const config: SweetAlertOptions = {
    ...SWEET_ALERT_THEME,
    title: options.title,
    text: options.message,
    html: options.html,
    icon: 'info',
    confirmButtonText: options.confirmText || 'Tamam',
    showCancelButton: options.showCancel || false,
    cancelButtonText: options.cancelText || 'İptal',
  };

  return await Swal.fire(config);
};

/**
 * Question Alert - Onay sorguları için
 */
export const showQuestionAlert = async (options: AlertOptions): Promise<SweetAlertResult> => {
  const config: SweetAlertOptions = {
    ...SWEET_ALERT_THEME,
    title: options.title,
    text: options.message,
    html: options.html,
    icon: 'question',
    confirmButtonText: options.confirmText || 'Evet',
    showCancelButton: options.showCancel !== false,
    cancelButtonText: options.cancelText || 'Hayır',
  };

  return await Swal.fire(config);
};

/**
 * Confirm Alert - Onaylama işlemleri için
 */
export const showConfirmAlert = async (options: AlertOptions): Promise<boolean> => {
  const result = await showQuestionAlert({
    ...options,
    showCancel: true,
  });

  return result.isConfirmed;
};

/**
 * Delete Confirm Alert - Silme onayı için
 */
export const showDeleteConfirmAlert = async (itemName?: string): Promise<boolean> => {
  const result = await Swal.fire({
    ...SWEET_ALERT_THEME,
    title: 'Silme Onayı',
    text: itemName ? `"${itemName}" silmek istediğinizden emin misiniz?` : 'Bu öğeyi silmek istediğinizden emin misiniz?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Evet, Sil',
    cancelButtonText: 'İptal',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    reverseButtons: true,
  });

  return result.isConfirmed;
};

/**
 * Loading Alert - Yükleme ekranı için
 */
export const showLoadingAlert = (title: string = 'İşlem yapılıyor...', message?: string) => {
  Swal.fire({
    ...SWEET_ALERT_THEME,
    title: title,
    text: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

/**
 * Close Loading Alert
 */
export const closeLoadingAlert = () => {
  Swal.close();
};

/**
 * Custom Alert - Özel yapılandırma için
 */
export const showCustomAlert = async (options: SweetAlertOptions): Promise<SweetAlertResult> => {
  const config: SweetAlertOptions = {
    ...SWEET_ALERT_THEME,
    ...options,
  };

  return await Swal.fire(config);
};

/**
 * 🔥 GELIŞMIŞ NOTIFICATION HELPER'LARI
 */

/**
 * API İşlemleri için özel notification'lar
 */
export const ApiNotifications = {
  // CRUD işlemleri
  create: (itemName: string) => showSuccessToast({ 
    message: `${itemName} başarıyla oluşturuldu!` 
  }),
  
  update: (itemName: string) => showSuccessToast({ 
    message: `${itemName} başarıyla güncellendi!` 
  }),
  
  delete: (itemName: string) => showSuccessToast({ 
    message: `${itemName} başarıyla silindi!` 
  }),
  
  save: (itemName?: string) => showSuccessToast({ 
    message: itemName ? `${itemName} kaydedildi!` : 'Kaydetme işlemi başarılı!' 
  }),

  // Error notifications
  error: (message: string = 'Bir hata oluştu!') => showErrorToast({ message }),
  
  networkError: () => showErrorToast({ 
    message: 'Bağlantı hatası! Lütfen internet bağlantınızı kontrol edin.' 
  }),
  
  unauthorized: () => showErrorToast({ 
    message: 'Oturum süresi dolmuş! Lütfen tekrar giriş yapın.' 
  }),
  
  forbidden: () => showErrorToast({ 
    message: 'Bu işlem için yetkiniz bulunmuyor!' 
  }),

  // Warning notifications
  unsavedChanges: () => showWarningToast({ 
    message: 'Kaydedilmemiş değişiklikler var!' 
  }),
  
  // Info notifications
  loading: (message: string = 'Yükleniyor...') => showInfoToast({ 
    message, 
    duration: 2000 
  }),
};

/**
 * Form Validation için notification'lar
 */
export const FormNotifications = {
  required: (fieldName: string) => showWarningToast({ 
    message: `${fieldName} alanı zorunludur!` 
  }),
  
  invalid: (fieldName: string) => showWarningToast({ 
    message: `${fieldName} geçerli bir formatta olmalıdır!` 
  }),
  
  success: (message: string = 'Form başarıyla gönderildi!') => showSuccessToast({ 
    message 
  }),
};

/**
 * Quick access notification methods
 */
export const notify = {
  success: (message: string, duration?: number) => showSuccessToast({ message, duration }),
  error: (message: string, duration?: number) => showErrorToast({ message, duration }),
  warning: (message: string, duration?: number) => showWarningToast({ message, duration }),
  info: (message: string, duration?: number) => showInfoToast({ message, duration }),
};

export const alert = {
  success: (title: string, message?: string) => showSuccessAlert({ title, message }),
  error: (title: string, message?: string) => showErrorAlert({ title, message }),
  warning: (title: string, message?: string) => showWarningAlert({ title, message }),
  info: (title: string, message?: string) => showInfoAlert({ title, message }),
  confirm: (title: string, message?: string) => showConfirmAlert({ title, message }),
  delete: (itemName?: string) => showDeleteConfirmAlert(itemName),
  loading: (title?: string, message?: string) => showLoadingAlert(title, message),
  close: () => closeLoadingAlert(),
};

// Named default export
const NotificationSystem = {
  toast: notify,
  alert,
  api: ApiNotifications,
  form: FormNotifications,
};

export default NotificationSystem; 