'use client'

import { useEffect } from 'react'

export function PushNotificationInit() {
    
  useEffect(() => {
    console.log("Outside the if of PushNotificationInit");
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
        console.log("Inside the if of PushNotificationInit");
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered successfully');

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BAcC6X9dbjG9VgsEXnYqprHQGL9LjI4FNgIFI9734W0pqaAwn0cVtGIIpEKKiCS3-y6DpadaXtOYpc-4MCvlNuY' // Get this from your Spring Boot server
      });

      // Send subscription to backend
      await fetch('http://localhost:8080/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
      });
      
      console.log('Push notification subscription successful');
    } catch (error) {
      console.error('Error registering service worker:', error);
    }
  };

  return null; // This component doesn't render anything
}