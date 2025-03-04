// 'use client'

// // components/NotificationsList.jsx
// import React, { useState, useEffect } from 'react';
// import { Bell, Check, Trash2, Clock, Mail, UserPlus, AlertTriangle } from 'lucide-react';

// import { getToken, setToken } from '../utils/auth';
// import { decodeToken } from '../utils/auth';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// const NotificationsList = () => {

//     const router = useRouter();

//     const [user, setUser] = useState(null);
//     const [pushNotificationFlag, setPushNotificationFlag] = useState(false);

//     useEffect(()=>{

//         console.log("Inside useEffect");
//       const token = getToken();
//       console.log("THe token is :: ", token);
//       if (!token) {
//         console.log("Redirecting because of no token");
//         router.push('/login');
//         // setActiveContainer("LoginPage");
//         // window.location.href = "/loginPage";
//       } else {
//         const decodedToken = decodeToken(token);
//         console.log("decoded token is :: ", decodedToken);
//         if (!decodedToken || new Date(decodedToken.exp * 1000) < new Date()) {
//           console.log("Inside the if");
//           // setActiveContainer("LoginPage");
//           console.log("Redirecting because token has expired");
//           router.push('/login');
//         } else {
//           if (decodedToken && decodedToken.payload) {
//             const payloadObj = JSON.parse(decodedToken.payload);
//             console.log("The decoded token payload is :: ", payloadObj.username);
//             console.log("THe payloadobj.loginId is :: ",payloadObj.loginId);
  
//             setUser({
//               username: payloadObj.username,
//               // role: payloadObj.role.title,
//               loginId: payloadObj.loginId,
//             });
  
//             //Here we will make that flag for PushNotification true so that we can ask the push notification only if the user is logged in
//             // setPushNotificationFlag(true);\
            


//           }
//         }
//       }

//     },[])

//     useEffect(()=>{
//       if(user!==null){
//         getPostTypeNotifications(user.loginId);
//       }
//     },[user])

//     const getPostTypeNotifications = async(userId) =>{
//       try{
        
//         const formData2 = new FormData();
//         formData2.append('userId', userId);
//         const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}api/notifications/getAllPostTypeNotifications`,formData2);

//         console.log("The response is : ",response);

//         if(response.status === 200){
//           setNotifications(response.data);
//         }
//       }catch(Error)
//       {
//         console.log("getPostTypeNotifications : ",Error);
//       }
//     }

    

//   const [notifications, setNotifications] = useState([
//     // {
//     //   id: 1,
//     //   type: 'message',
//     //   title: 'New message received',
//     //   description: 'Sarah sent you a message about the project deadline.',
//     //   time: '5 minutes ago',
//     //   read: false,
//     // },
//     // {
//     //   id: 2,
//     //   type: 'friend',
//     //   title: 'Friend request',
//     //   description: 'John Smith wants to connect with you.',
//     //   time: '2 hours ago',
//     //   read: false,
//     // },
//     // {
//     //   id: 3,
//     //   type: 'alert',
//     //   title: 'System alert',
//     //   description: 'Your storage is almost full. Consider upgrading your plan.',
//     //   time: '1 day ago',
//     //   read: true,
//     // },
//     // {
//     //   id: 4,
//     //   type: 'reminder',
//     //   title: 'Meeting reminder',
//     //   description: 'Team standup in 30 minutes.',
//     //   time: '30 minutes ago',
//     //   read: false,
//     // },
//   ]);

//   const getIcon = (type) => {
//     switch (type) {
//       case 'message':
//         return <Mail className="h-5 w-5 text-blue-500" />;
//       case 'friend':
//         return <UserPlus className="h-5 w-5 text-green-500" />;
//       case 'alert':
//         return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
//       case 'reminder':
//         return <Clock className="h-5 w-5 text-purple-500" />;
//       default:
//         return <Bell className="h-5 w-5 text-gray-500" />;
//     }
//   };

//   // useState(()=>{
//   //   if(notifications.length>0){
//   //     console.log("notifications are :: ",notifications);
//   //   }
//   // },[notifications])

//   const markAsRead = (id) => {
//     setNotifications(
//       notifications.map((notification) =>
//         notification.id === id ? { ...notification, read: true } : notification
//       )
//     );
//   };

//   const deleteNotification = (id) => {
//     setNotifications(notifications.filter((notification) => notification.id !== id));
//   };

//   const unreadCount = notifications.filter((notification) => !notification.read).length;

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
    
//     const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if single digit
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
//     const year = date.getFullYear();
  
//     return `${day}-${month}-${year}`;
//   };

//   return (
//     <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//       <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
//         <div className="flex items-center">
//           <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
//           {unreadCount > 0 && (
//             <span className="ml-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//               {unreadCount}
//             </span>
//           )}
//         </div>
//         <button className="text-sm text-blue-600 hover:text-blue-800">
//           Mark all as read
//         </button>
//       </div>

//       <div className="divide-y divide-gray-200">
//         {notifications.length > 0 ? (
//           notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className={`p-4 flex ${
//                 notification.read ? 'bg-white' : 'bg-blue-50'
//               } hover:bg-gray-50 transition-colors duration-150`}
//             >
              
//               <div className="mr-4 mt-1">
//                 {getIcon(notification.type)}
//               </div>
//               <div className="flex-1">
//                 <div className="flex justify-between">
//                   <h3 className={`text-sm font-medium ${notification.read ? 'text-gray-900' : 'text-black'}`}>
//                     {notification.title}
//                   </h3>
//                   <span className="text-xs text-gray-500">{formatDate(notification.createTime)}</span>
//                 </div>
//                 <Link href={`/questions/${notification.post.id}`} passHref>
//   <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
// </Link>
//               </div>
//               {/* <div className="flex ml-4 space-x-2">
//                 {!notification.read && (
//                   <button
//                     onClick={() => markAsRead(notification.id)}
//                     className="text-blue-500 hover:text-blue-700 focus:outline-none"
//                     title="Mark as read"
//                   >
//                     <Check className="h-5 w-5" />
//                   </button>
//                 )}
//                 <button
//                   onClick={() => deleteNotification(notification.id)}
//                   className="text-red-500 hover:text-red-700 focus:outline-none"
//                   title="Delete notification"
//                 >
//                   <Trash2 className="h-5 w-5" />
//                 </button>
//               </div> */}
//             </div>
//           ))
//         ) : (
//           <div className="p-8 text-center text-gray-500">
//             <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
//             <p>No notifications yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsList;

'use client'

// components/NotificationsList.jsx
import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, Clock, Mail, UserPlus, AlertTriangle } from 'lucide-react';
import { getToken, decodeToken } from '../utils/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useQuestions } from '../../context/QuestionContext'; // Update with the correct path

const NotificationsList = () => {
    const router = useRouter();
    const { questions2, setQuestionsData } = useQuestions(); // Use the context

    const [user, setUser] = useState(null);
    const [pushNotificationFlag, setPushNotificationFlag] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        console.log("Inside useEffect");
        const token = getToken();
        console.log("THe token is :: ", token);
        if (!token) {
            console.log("Redirecting because of no token");
            router.push('/login');
        } else {
            const decodedToken = decodeToken(token);
            console.log("decoded token is :: ", decodedToken);
            if (!decodedToken || new Date(decodedToken.exp * 1000) < new Date()) {
                console.log("Inside the if");
                console.log("Redirecting because token has expired");
                router.push('/login');
            } else {
                if (decodedToken && decodedToken.payload) {
                    const payloadObj = JSON.parse(decodedToken.payload);
                    console.log("The decoded token payload is :: ", payloadObj.username);
                    console.log("THe payloadobj.loginId is :: ", payloadObj.loginId);

                    setUser({
                        username: payloadObj.username,
                        loginId: payloadObj.loginId,
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (user !== null) {
            getPostTypeNotifications(user.loginId);
        }
    }, [user]);

    const getPostTypeNotifications = async (userId) => {
        try {
            const formData2 = new FormData();
            formData2.append('userId', userId);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}api/notifications/getAllPostTypeNotifications`, formData2);

            console.log("The response is : ", response);

            if (response.status === 200) {
                setNotifications(response.data);
                
                // If you need to store the related questions data in the context
                const questionsFromNotifications = response.data
                    .filter(notification => notification.post)
                    .map(notification => notification.post);
                
                // Only update if there are questions to add
                if (questionsFromNotifications.length > 0) {
                    setQuestionsData(questionsFromNotifications);
                }
            }
        } catch (Error) {
            console.log("getPostTypeNotifications : ", Error);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'message':
                return <Mail className="h-5 w-5 text-blue-500" />;
            case 'friend':
                return <UserPlus className="h-5 w-5 text-green-500" />;
            case 'alert':
                return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
            case 'reminder':
                return <Clock className="h-5 w-5 text-purple-500" />;
            default:
                return <Bell className="h-5 w-5 text-gray-500" />;
        }
    };

    const handleNotificationClick = (questionId) => {
        // You can use the questions data from context if needed
        console.log("Current questions in context:", questions2);
        
        // Navigate to the question
        router.push(`/questions/${questionId}`);
    };

    const markAsRead = (id) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter((notification) => notification.id !== id));
    };

    const unreadCount = notifications.filter((notification) => !notification.read).length;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
      
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <div className="flex items-center">
                    <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
                    {unreadCount > 0 && (
                        <span className="ml-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                    Mark all as read
                </button>
            </div>

            <div className="divide-y divide-gray-200">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 flex ${
                                notification.read ? 'bg-white' : 'bg-blue-50'
                            } hover:bg-gray-50 transition-colors duration-150`}
                        >
                            <div className="mr-4 mt-1">
                                {getIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className={`text-sm font-medium ${notification.read ? 'text-gray-900' : 'text-black'}`}>
                                        {notification.title}
                                    </h3>
                                    <span className="text-xs text-gray-500">{formatDate(notification.createTime)}</span>
                                </div>
                                <div 
                                    className="text-sm text-gray-600 mt-1 cursor-pointer hover:text-blue-600"
                                    onClick={() => notification.post && handleNotificationClick(notification.post.id)}
                                >
                                    {notification.message}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p>No notifications yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsList;