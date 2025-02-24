'use client'

import { useState, useEffect } from 'react';

export default function NotificationButton() {
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  if (typeof window === 'undefined') {
    return null; // Don't render anything during SSR
  }

  return (
    <button 
      onClick={requestPermission}
      disabled={permission === 'granted'}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400" 
    >
      {permission === 'granted' ? 'Notifications Enabled' : 'Enable Notifications'}
    </button>
  );
}