import React, { useEffect } from 'react';
import Route from './Routes/Index';
import { initializeGlobalHttpInterceptors } from './helpers/httpInterceptor';
import { initializeNotificationSystem, NotificationProvider } from './helpers/notificationProvider';

// CSS
import './assets/scss/tailwind.scss';

function App() {
  useEffect(() => {
    // HTTP interceptor'u başlat
    initializeGlobalHttpInterceptors();
    
    // Notification system'i başlat
    initializeNotificationSystem();
  }, []);

  return (
    <NotificationProvider>
      <Route />
    </NotificationProvider>
  );
}

export default App;
