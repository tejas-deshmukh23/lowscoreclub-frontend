// 'use client'

// // /components/PushNotificationButton.js

// import { useState, useEffect } from 'react';
// // import { subscribeToPushNotification, unsubscribeFromPushNotification } from '../lib/pushNotificationService';
// import { subscribeToPushNotification, unsubscribeFromPushNotification } from "../lib/PushNotificationService";

// export default function PushNotificationButton({ userId }) {
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Check if already subscribed
//     console.log("Inside the pushNotificationButton");
//     const checkSubscription = async () => {
//       if ('serviceWorker' in navigator) {

//         console.log("Inside if serviceworker in navigator");

//         const registration = await navigator.serviceWorker.ready;
//         const subscription = await registration.pushManager.getSubscription();

//         console.log("The registration is :: ",registration);
//         console.log("The subscription is :: ",subscription);

//         setIsSubscribed(!!subscription);
//       }
//     };
    
//     checkSubscription();
//   }, []);

//   const handleSubscriptionToggle = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       if (isSubscribed) {
//         console.log("Inside the handleIsSubscribed");
//         await unsubscribeFromPushNotification();
//         setIsSubscribed(false);
//       } else {
//         console.log("else of isSubscribed");
//         await subscribeToPushNotification(userId);
//         setIsSubscribed(true);
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error('Subscription error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-2">
//       <button
//         onClick={handleSubscriptionToggle}
//         disabled={isLoading}
//         className={`px-4 py-2 rounded ${
//           isSubscribed 
//             ? 'bg-red-500 hover:bg-red-600' 
//             : 'bg-blue-500 hover:bg-blue-600'
//         } text-white disabled:opacity-50`}
//       >
//         {isLoading 
//           ? 'Processing...' 
//           : isSubscribed 
//             ? 'Disable Notifications' 
//             : 'Enable Notifications'
//         }
//       </button>
      
//       {error && (
//         <p className="text-red-500 text-sm">{error}</p>
//       )}
//     </div>
//   );
// }


// /components/PushNotificationButton.js




// 'use client'

// import { useState, useEffect } from 'react';
// import { subscribeToPushNotification, unsubscribeFromPushNotification } from "../lib/PushNotificationService";

// export default function PushNotificationButton({ userId }) {
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isPermissionGranted, setIsPermissionGranted] = useState(false);

//   useEffect(() => {
//     const checkNotificationPermission = async () => {
//       if ('Notification' in window) {
//         const permission = Notification.permission;

//         if (permission === 'granted') {
//           setIsPermissionGranted(true);
//           await checkSubscription();
//         } else if (permission === 'default') {
//           const newPermission = await Notification.requestPermission();
//           if (newPermission === 'granted') {
//             setIsPermissionGranted(true);
//             await subscribeToPushNotifications(); // Automatically subscribe after permission is granted
//           }
//         }
//       }
//     };

//     const checkSubscription = async () => {
//       if ('serviceWorker' in navigator) {
//         const registration = await navigator.serviceWorker.ready;
//         const subscription = await registration.pushManager.getSubscription();
//         setIsSubscribed(!!subscription);
//       }
//     };

//     const subscribeToPushNotifications = async () => {
//       if ('serviceWorker' in navigator && Notification.permission === 'granted') {
//         try {
//           setIsLoading(true);

//           // Subscribe using your existing subscribe function
//           await subscribeToPushNotification(userId); 
//           setIsSubscribed(true);
//         } catch (err) {
//           setError('Failed to subscribe to push notifications: ' + err.message);
//           console.error('Subscription error:', err);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     //   else{
//     //     console.log("In else");
//     //     try{
//     //         await unsubscribeFromPushNotification();
//     //         console.log("Adter unsubscribe");
            
//     //     }catch(err){

//     //         console.error('Subscription error:', err);

//     //     }

//     //   }
//     };

//     checkNotificationPermission();
//   }, [userId]);

//   return (
//     // <div className="flex flex-col items-center gap-2">
//     //   {isPermissionGranted && isSubscribed && (
//     //     <p className="text-green-500">Notifications enabled successfully.</p>
//     //   )}

//     //   {!isPermissionGranted && (
//     //     <p className="text-sm text-gray-500">Please enable notifications to receive updates.</p>
//     //   )}

//     //   {error && <p className="text-red-500 text-sm">{error}</p>}
//     // </div>
//     <></>
//   );
// }



'use client'

import { useState, useEffect } from 'react';
import { subscribeToPushNotification, unsubscribeFromPushNotification } from "../lib/PushNotificationService";

export default function PushNotificationButton({ userId }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('default');

  useEffect(() => {
    // Check current notification permission
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
      if (Notification.permission === 'granted') {
        checkSubscription();
      }
    }
  }, []);

  const checkSubscription = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      } catch (err) {
        console.error('Error checking subscription:', err);
      }
    }
  };

  const handleSubscriptionToggle = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (permissionStatus !== 'granted') {
        // Request permission first
        const newPermission = await Notification.requestPermission();
        setPermissionStatus(newPermission);
        
        if (newPermission !== 'granted') {
          setError('Notification permission denied');
          return;
        }
      }

      if (isSubscribed) {
        await unsubscribeFromPushNotification();
        setIsSubscribed(false);
      } else {
        await subscribeToPushNotification(userId);
        setIsSubscribed(true);
      }
    } catch (err) {
      setError(err.message);
      console.error('Subscription error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // No action possible if notifications are blocked
  if (permissionStatus === 'denied') {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-orange-500">
          Notifications are blocked. Please update your browser settings to enable notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
      style={{backgroundColor:"#6039D2"}}
        onClick={handleSubscriptionToggle}
        disabled={isLoading}
        className={`px-4 py-2 rounded ${
          isSubscribed 
            ? ' hover:bg-red-600' 
            : ' hover:bg-blue-600'
        } text-white disabled:opacity-50`}
      >
        {isLoading 
          ? 'Processing...' 
          : isSubscribed 
            ? 'Disable Notifications' 
            : 'Enable Notifications'
        }
      </button>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      
      {isSubscribed && (
        <p className="text-green-500 text-sm">Notifications enabled successfully.</p>
      )}
    </div>
  );
}