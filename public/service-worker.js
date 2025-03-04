// self.addEventListener('push', event => {
//   console.log('Push event received');
  
//   // Parse the data coming in
//   let notificationData = {};
//   try {
//     notificationData = event.data.json();
//   } catch (e) {
//     notificationData = {
//       title: 'New Notification',
//       message: event.data.text()
//     };
//   }

//   const options = {
//     body: notificationData.message || 'Default message',
//     icon: '/icon.png',
//     badge: '/badge.png',
//     vibrate: [200, 100, 200],
//     tag: 'notification-' + Date.now(),
//     renotify: true,
//     requireInteraction: true,
//     silent: false // Make sure sound is enabled
//   };

//   // Show the notification with more explicit error handling
//   event.waitUntil(
//     (async () => {
//       try {
//         // Try to show the notification
//         const showResult = await self.registration.showNotification(
//           notificationData.title || 'New Message',
//           options
//         );
//         console.log('Notification display attempted:', showResult);
//         return showResult;
//       } catch (error) {
//         console.error('Failed to show notification:', error);
//         throw error;
//       }
//     })()
//   );
// });

//=-------------------------------------------------------------=

// /public/service-worker.js
// self.addEventListener('push', function(event) {
//   if (event.data) {
//     const data = event.data.json();
    
//     event.waitUntil(
//       self.registration.showNotification(data.title || 'New Notification', {
//         body: data.message,
//         icon: data.icon || '/icon.png',
//         data: {
//           url: data.url || '/'
//         }
//       })
//     );
//   }
// });

// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();
  
//   event.waitUntil(
//     clients.openWindow(event.notification.data.url)
//   );
// });

//=--------------------------------------------------------------------=

self.addEventListener('push', function(event) {
  console.log('Push event received');
  
  // Parse the data coming in
  let notificationData = {};
  try {
    // Try to parse as JSON first
    notificationData = event.data.json();
  } catch (e) {
    console.log('Push data is not JSON, using as text:', e);
    // If it's not valid JSON, use the text as the message
    notificationData = {
      title: 'New Notification',
      message: event.data ? event.data.text() : 'Default message'
    };
  }

  const options = {
    body: notificationData.message || 'Default message',
    icon: '/icon.png',
    badge: '/badge.png',
    vibrate: [200, 100, 200],
    tag: 'notification-' + Date.now(),
    renotify: true,
    requireInteraction: true,
    silent: false,
    data: {
      url: notificationData.url || '/'
    }
  };

  // Show the notification with explicit error handling
  event.waitUntil(
    (async () => {
      try {
        // Try to show the notification
        const showResult = await self.registration.showNotification(
          notificationData.title || 'New Message',
          options
        );
        console.log('Notification display attempted:', showResult);
        return showResult;
      } catch (error) {
        console.error('Failed to show notification:', error);
        throw error;
      }
    })()
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});