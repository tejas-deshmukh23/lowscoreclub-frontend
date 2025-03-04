import axios from "axios";

// /lib/pushNotificationService.js
export const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const PUBLIC_VAPID_KEY = 'BAcC6X9dbjG9VgsEXnYqprHQGL9LjI4FNgIFI9734W0pqaAwn0cVtGIIpEKKiCS3-y6DpadaXtOYpc-4MCvlNuY'; // Replace with your VAPID key


//This function is used to add the subscription to the backend
export const subscribeToPushNotification = async (userId) => {

    console.log("The user id inside the subscribe to push notification is :: ",userId);
  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    // Get browser and device info
    const browserInfo = navigator.userAgent;
    const deviceType = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(browserInfo) 
      ? 'mobile' 
      : 'desktop';

    // Send subscription to backend

    const formData1 = new FormData();
    formData1.append('userId',userId);

    // const response = await fetch('http://localhost:8080/api/notifications/subscribe?userId=${userId}', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     endpoint: subscription.endpoint,
    //     keys: {
    //       p256dh: btoa(String.fromCharCode.apply(null, 
    //         new Uint8Array(subscription.getKey('p256dh')))),
    //       auth: btoa(String.fromCharCode.apply(null, 
    //         new Uint8Array(subscription.getKey('auth'))))
    //     },
    //     browserInfo,
    //     deviceType,
    //   }),
    // //   params: {
    // //     userId: userId
    // //   }
    // });

//     const response = await axios.post('http://localhost:8080/api/notifications/subscribe', {
//     endpoint: subscription.endpoint,
//     keys: {
//         p256dh: btoa(String.fromCharCode.apply(null, 
//             new Uint8Array(subscription.getKey('p256dh')))),
//         auth: btoa(String.fromCharCode.apply(null, 
//             new Uint8Array(subscription.getKey('auth'))))
//     },
//     browserInfo,
//     deviceType,
// }, {
//     params: {
//         userId: userId
//     },
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}api/notifications/subscribe`, {
    endpoint: subscription.endpoint,
    keys: {
        p256dh: btoa(String.fromCharCode.apply(null, 
            new Uint8Array(subscription.getKey('p256dh')))),
        auth: btoa(String.fromCharCode.apply(null, 
            new Uint8Array(subscription.getKey('auth'))))
    },
    browserInfo,
    deviceType,
}, {
    params: {
        userId: userId
    },
    headers: {
        'Content-Type': 'application/json'
    }
});

    console.log("THe response od the subscribe is   :: ",response);

    if (response.status !== 200) {
      throw new Error('Failed to store subscription');
    }

    return subscription;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    throw error;
  }
};

//This function is used to remove the subscription from the backend
export const unsubscribeFromPushNotification = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      await subscription.unsubscribe();
      
      // // Notify backend
      // await fetch(`http://localhost:8080/api/notifications/unsubscribe?endpoint=${
      //   encodeURIComponent(subscription.endpoint)}`, {
      //   method: 'DELETE',
      // });

      await axios.delete(
        `${process.env.NEXT_PUBLIC_SPRING_URL}api/notifications/unsubscribe`,
        {
          params: {
            endpoint: subscription.endpoint,
          },
        }
      );

    }
  } catch (error) {
    console.error('Error unsubscribing from push notifications:', error);
    throw error;
  }
};