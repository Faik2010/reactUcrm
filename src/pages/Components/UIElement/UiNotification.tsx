import React from 'react';
import { notify, alert, ApiNotifications, FormNotifications } from '../../../helpers/notificationHelper';
import BreadCrumb from '../../../Common/BreadCrumb';

const UiNotification = () => {
  // Toast örnekleri
  const handleSuccessToast = () => {
    notify.success('İşlem başarıyla tamamlandı!');
  };

  const handleErrorToast = () => {
    notify.error('Bir hata oluştu! Lütfen tekrar deneyiniz.');
  };

  const handleWarningToast = () => {
    notify.warning('Dikkat! Bu işlem geri alınamaz olabilir.');
  };

  const handleInfoToast = () => {
    notify.info('Bilgi: Yeni güncelleme mevcut.');
  };

  // SweetAlert örnekleri
  const handleSuccessAlert = async () => {
    await alert.success('Başarılı!', 'İşlem başarıyla tamamlandı.');
  };

  const handleErrorAlert = async () => {
    await alert.error('Hata!', 'Bir sorun oluştu, lütfen tekrar deneyin.');
  };

  const handleWarningAlert = async () => {
    await alert.warning('Uyarı!', 'Bu işlem geri alınamaz.');
  };

  const handleInfoAlert = async () => {
    await alert.info('Bilgi', 'Yeni güncelleme mevcut.');
  };

  const handleConfirmAlert = async () => {
    const confirmed = await alert.confirm('Emin misiniz?', 'Bu işlem geri alınamaz!');
    if (confirmed) {
      notify.success('İşlem onaylandı!');
    } else {
      notify.info('İşlem iptal edildi.');
    }
  };

  const handleDeleteAlert = async () => {
    const deleted = await alert.delete('Kullanıcı Profili');
    if (deleted) {
      notify.success('Profil başarıyla silindi!');
    } else {
      notify.info('Silme işlemi iptal edildi.');
    }
  };

  const handleLoadingAlert = async () => {
    alert.loading('Veriler yükleniyor...', 'Lütfen bekleyiniz...');
    
    // 3 saniye sonra kapat
    setTimeout(() => {
      alert.close();
      notify.success('Veriler başarıyla yüklendi!');
    }, 3000);
  };

  // API Notification örnekleri
  const handleApiNotifications = () => {
    ApiNotifications.create('Yeni Kullanıcı');
  };

  const handleApiUpdate = () => {
    ApiNotifications.update('Profil Bilgileri');
  };

  const handleApiDelete = () => {
    ApiNotifications.delete('Dosya');
  };

  const handleApiError = () => {
    ApiNotifications.error('Sunucu hatası oluştu!');
  };

  // Form Notification örnekleri
  const handleFormRequired = () => {
    FormNotifications.required('E-posta adresi');
  };

  const handleFormInvalid = () => {
    FormNotifications.invalid('Telefon numarası');
  };

  const handleFormSuccess = () => {
    FormNotifications.success('Form başarıyla gönderildi!');
  };

  return (
    <React.Fragment>
      <BreadCrumb title="Notifications" pageTitle="UI Elements" />
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-5">
        
        {/* Toast Notifications */}
        <div className="card">
          <div className="card-body">
            <h5 className="mb-4 text-15">Toast Notifications</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleSuccessToast}
                className="btn bg-green-500 border-green-500 text-white hover:bg-green-600"
              >
                Success Toast
              </button>
              
              <button
                type="button"
                onClick={handleErrorToast}
                className="btn bg-red-500 border-red-500 text-white hover:bg-red-600"
              >
                Error Toast
              </button>
              
              <button
                type="button"
                onClick={handleWarningToast}
                className="btn bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600"
              >
                Warning Toast
              </button>
              
              <button
                type="button"
                onClick={handleInfoToast}
                className="btn bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
              >
                Info Toast
              </button>
            </div>
          </div>
        </div>

        {/* SweetAlert Dialogs */}
        <div className="card">
          <div className="card-body">
            <h5 className="mb-4 text-15">SweetAlert Dialogs</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleSuccessAlert}
                className="btn bg-green-500 border-green-500 text-white hover:bg-green-600"
              >
                Success Alert
              </button>
              
              <button
                type="button"
                onClick={handleErrorAlert}
                className="btn bg-red-500 border-red-500 text-white hover:bg-red-600"
              >
                Error Alert
              </button>
              
              <button
                type="button"
                onClick={handleWarningAlert}
                className="btn bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600"
              >
                Warning Alert
              </button>
              
              <button
                type="button"
                onClick={handleInfoAlert}
                className="btn bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
              >
                Info Alert
              </button>
              
              <button
                type="button"
                onClick={handleConfirmAlert}
                className="btn bg-purple-500 border-purple-500 text-white hover:bg-purple-600"
              >
                Confirm Dialog
              </button>
              
              <button
                type="button"
                onClick={handleDeleteAlert}
                className="btn bg-red-600 border-red-600 text-white hover:bg-red-700"
              >
                Delete Confirm
              </button>
              
              <button
                type="button"
                onClick={handleLoadingAlert}
                className="btn bg-gray-500 border-gray-500 text-white hover:bg-gray-600"
              >
                Loading Alert
              </button>
            </div>
          </div>
        </div>

        {/* API Notifications */}
        <div className="card">
          <div className="card-body">
            <h5 className="mb-4 text-15">API Notifications</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleApiNotifications}
                className="btn bg-green-500 border-green-500 text-white hover:bg-green-600"
              >
                Create Success
              </button>
              
              <button
                type="button"
                onClick={handleApiUpdate}
                className="btn bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
              >
                Update Success
              </button>
              
              <button
                type="button"
                onClick={handleApiDelete}
                className="btn bg-red-500 border-red-500 text-white hover:bg-red-600"
              >
                Delete Success
              </button>
              
              <button
                type="button"
                onClick={handleApiError}
                className="btn bg-red-600 border-red-600 text-white hover:bg-red-700"
              >
                API Error
              </button>
            </div>
          </div>
        </div>

        {/* Form Notifications */}
        <div className="card">
          <div className="card-body">
            <h5 className="mb-4 text-15">Form Notifications</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleFormRequired}
                className="btn bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600"
              >
                Required Field
              </button>
              
              <button
                type="button"
                onClick={handleFormInvalid}
                className="btn bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
              >
                Invalid Field
              </button>
              
              <button
                type="button"
                onClick={handleFormSuccess}
                className="btn bg-green-500 border-green-500 text-white hover:bg-green-600"
              >
                Form Success
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kullanım Örnekleri */}
      <div className="card mt-5">
        <div className="card-body">
          <h5 className="mb-4 text-15">Kullanım Örnekleri</h5>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h6 className="text-sm font-semibold mb-2">Toast Notifications:</h6>
            <pre className="text-xs text-gray-700">
{`import { notify } from '@/helpers/notificationHelper';

notify.success('İşlem başarılı!');
notify.error('Hata oluştu!');
notify.warning('Uyarı mesajı');
notify.info('Bilgi mesajı');`}
            </pre>
            
            <h6 className="text-sm font-semibold mb-2 mt-4">SweetAlert Dialogs:</h6>
            <pre className="text-xs text-gray-700">
{`import { alert } from '@/helpers/notificationHelper';

const confirmed = await alert.confirm('Emin misiniz?', 'Bu işlem geri alınamaz!');
if (confirmed) {
  // İşlemi gerçekleştir
}

const deleted = await alert.delete('Kullanıcı');
if (deleted) {
  // Silme işlemini gerçekleştir
}`}
            </pre>
            
            <h6 className="text-sm font-semibold mb-2 mt-4">API Notifications:</h6>
            <pre className="text-xs text-gray-700">
{`import { ApiNotifications } from '@/helpers/notificationHelper';

ApiNotifications.create('Kullanıcı');
ApiNotifications.update('Profil');
ApiNotifications.delete('Görev');
ApiNotifications.error('Bağlantı hatası!');`}
            </pre>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UiNotification;