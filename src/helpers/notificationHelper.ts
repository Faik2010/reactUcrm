// Notification Helper
// Tüm projede kullanılacak notification helper'ları

export {
  // Toast notifications
  notify,
  alert,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showCustomToast,
  
  // SweetAlert notifications
  showSuccessAlert,
  showErrorAlert,
  showWarningAlert,
  showInfoAlert,
  showQuestionAlert,
  showConfirmAlert,
  showDeleteConfirmAlert,
  showLoadingAlert,
  closeLoadingAlert,
  showCustomAlert,
  
  // Helper collections
  ApiNotifications,
  FormNotifications,
  
  // Toast positions
  TOAST_POSITIONS,
  TOAST_CONFIG,
  
  // SweetAlert theme
  SWEET_ALERT_THEME,
  
  // Types
  type ToastOptions,
  type AlertOptions,
} from './notifications';

// Default export - kolay kullanım için
export { default } from './notifications';

/**
 * 🎯 KULLANIM ÖRNEKLERİ
 * 
 * // Toast notifications
 * import { notify } from '@/helpers/notificationHelper';
 * 
 * notify.success('İşlem başarılı!');
 * notify.error('Hata oluştu!');
 * notify.warning('Uyarı mesajı');
 * notify.info('Bilgi mesajı');
 * 
 * // SweetAlert dialogs
 * import { alert } from '@/helpers/notificationHelper';
 * 
 * alert.success('Başarılı', 'İşlem tamamlandı!');
 * alert.error('Hata', 'Bir sorun oluştu!');
 * 
 * const confirmed = await alert.confirm('Emin misiniz?', 'Bu işlem geri alınamaz!');
 * if (confirmed) {
 *   // İşlemi gerçekleştir
 * }
 * 
 * const deleted = await alert.delete('Kullanıcı');
 * if (deleted) {
 *   // Silme işlemini gerçekleştir
 * }
 * 
 * // API notifications
 * import { ApiNotifications } from '@/helpers/notificationHelper';
 * 
 * ApiNotifications.create('Kullanıcı');
 * ApiNotifications.update('Profil');
 * ApiNotifications.delete('Görev');
 * ApiNotifications.error('Bağlantı hatası!');
 * 
 * // Form notifications
 * import { FormNotifications } from '@/helpers/notificationHelper';
 * 
 * FormNotifications.required('E-posta');
 * FormNotifications.invalid('Telefon numarası');
 * FormNotifications.success('Form başarıyla gönderildi!');
 * 
 * // Loading alert
 * import { showLoadingAlert, closeLoadingAlert } from '@/helpers/notificationHelper';
 * 
 * showLoadingAlert('Kaydediliyor...', 'Lütfen bekleyiniz...');
 * 
 * // API call
 * setTimeout(() => {
 *   closeLoadingAlert();
 *   notify.success('Kayıt başarılı!');
 * }, 2000);
 * 
 * // Advanced usage
 * import { showSuccessToast, TOAST_POSITIONS } from '@/helpers/notificationHelper';
 * 
 * showSuccessToast({
 *   message: 'Özel mesaj',
 *   duration: 3000,
 *   position: TOAST_POSITIONS.TOP_LEFT,
 *   theme: 'dark'
 * });
 */ 