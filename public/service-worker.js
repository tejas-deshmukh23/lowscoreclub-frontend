// self.addEventListener('push', event => {
//     const options = {
//       body: event.data.text(),
//       icon: '/icon.png',
//       badge: '/badge.png'
      
//     };
  
//     event.waitUntil(
//       self.registration.showNotification('Push Notification', options)
//     );
//   });

// public/service-worker.js
self.addEventListener('push', event => {
  console.log('Push received:', event.data.text());  // Add logging
  
  const options = {
    body: event.data.text(),
    icon: '/icon.png',
    badge: '/badge.png',
    vibrate: [200, 100, 200], // Add vibration
    tag: 'test-notification',  // Add tag
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification('New Notification', options)
    .then(() => {
      console.log('Notification shown successfully');
    })
    .catch(err => {
      console.error('Error showing notification:', err);
    })
  );
});

// Log when service worker is installed
self.addEventListener('install', event => {
  console.log('Service Worker installed');
});

// Log when service worker is activated
self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});