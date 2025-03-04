'use client'

// /components/NotificationSender.js
import { useState } from 'react';

export default function NotificationSender() {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [icon, setIcon] = useState('/icon.png');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setResult(null);

    try {

        console.log("Inside send notification");

      // const response = await fetch('http://localhost:8080/api/notifications/send', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     title,
      //     message,
      //     icon,
      //     url: window.location.origin
      //   })
      // });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SPRING_URL}api/notifications/send`,
        {
          title,
          message,
          icon,
          url: window.location.origin,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Response of send notification : ",response);

      const data = await response.json();
      setResult({
        success: true,
        message: `Sent to ${data.successCount} devices (${data.failureCount} failed)`
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.message
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {sending ? 'Sending...' : 'Send Notification'}
      </button>

      {result && (
        <div className={`mt-4 p-3 rounded ${
          result.success ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {result.message}
        </div>
      )}
    </form>
  );
}