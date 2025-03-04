'use client'

import React from 'react';
import { useState, useEffect } from 'react';
// import { Search, Filter, ArrowUp, MessageSquare, Eye, Home } from 'lucide-react';
import { Search, Filter, Home, Users, Tag, Star, Settings, HelpCircle } from 'lucide-react';
// import Navbar from "../Header/navbar";
import Navbar from "../Header/navbar";
import QuestionList from '../QuestionList/QuestionList';
import AskQuestionModule from "../UserInputs/AskQuestionModule";
import Sidebar from "../Sidebar/Sidebar";
import AddPost from '../UserInputs/AddPost';
import { useRouter } from 'next/router';
// import { QuestionsProvider } from '@/context/QuestionContext';
import { QuestionsProvider } from "../../context/QuestionContext";

import { usePathname } from 'next/navigation';
// import { subscribeToPushNotification, unsubscribeFromPushNotification } from "../../lib/PushNotificationService";
import PushNotificationButton from '../PushNotificationButton';

// import PushNotificationButton from '../PushNotificationButton';

import { getToken, setToken } from '../utils/auth';
import { decodeToken } from '../utils/auth';
// import { useRouter } from 'next/navigation';

import { subscribeToPushNotification, unsubscribeFromPushNotification } from "../../lib/PushNotificationService";


const HomePage = ({ children }) => {

    // const [permissionStatus, setPermissionStatus] = useState('default');

    const [pushNotificationFlag, setPushNotificationFlag] = useState(false);

    const [user, setUser] = useState({});
    // const router = useRouter();
  
    // useEffect(() => {
      
    // }, []);

    const [mounted, setMounted] = useState(false);
    const [permission, setPermission] = useState('default');
    const pathname = usePathname();
    const childrenPaths = ['/homepage', '/', '/questions'];

    const [showComponents, setShowComponents] = useState(true);
    const [askedQuestionPanel, setAskedQuestionPanel] = useState(false);

    useEffect(() => {
        setMounted(true);

        console.log("Inside useEffect");
      const token = getToken();
      console.log("THe token is :: ", token);
      if (!token) {
        console.log("Redirecting because of no token");
        // router.push('/login');
        // setActiveContainer("LoginPage");
        // window.location.href = "/loginPage";
      } else {
        const decodedToken = decodeToken(token);
        console.log("decoded token is :: ", decodedToken);
        if (!decodedToken || new Date(decodedToken.exp * 1000) < new Date()) {
          console.log("Inside the if");
          // setActiveContainer("LoginPage");
          console.log("Redirecting because token has expired");
        //   router.push('/login');
        } else {
          if (decodedToken && decodedToken.payload) {
            const payloadObj = JSON.parse(decodedToken.payload);
            console.log("The decoded token payload is :: ", payloadObj.username);
            console.log("THe payloadobj.loginId is :: ",payloadObj.loginId);
  
            setUser({
              username: payloadObj.username,
              // role: payloadObj.role.title,
              loginId: payloadObj.loginId,
            });
  
            //Here we will make that flag for PushNotification true so that we can ask the push notification only if the user is logged in
            // setPushNotificationFlag(true);

            if(Notification.permission !== 'granted'){
                console.log("Not granted and its :: ", Notification.permission);
                requestPermission(payloadObj.loginId);
                console.log("Notification.permission is :: ",Notification.permission);
              

            }

            // if ('Notification' in window) {
            //     console.log("The notification permisssion is ------> ",Notification.requestPermission());
            //   }
    
            // requestPermission();
            // if (typeof window !== 'undefined') {
            //   setPermission(Notification.permission);
            // }

          }
        }
      }

    }, []);

    

    // useEffect(()=>{
    //     console.log("Inside the homepage useEffect before the if");
    //     if (typeof window === 'undefined') {
    //         console.log("Inside the homepage under if");
    //         return null; // Don't render anything during SSR
    //       }
    // },[])

    // if (typeof window === 'undefined') {
    //     console.log("When windows is undefined");
    //     return null; // Don't render anything during SSR
    //   }


  

    // useEffect(() => {
    //     if (!mounted) return; 

    //     if ('Notification' in window) {
    //         Notification.requestPermission();
    //       }

    //     requestPermission();
    //     if (typeof window !== 'undefined') {
    //       setPermission(Notification.permission);
    //     }
    //   }, [mounted]);

      const requestPermission = async (userId) => {
        try {
          const result = await Notification.requestPermission();
          setPermission(result);
          console.log("The result after getting the permission :: ",result);

          if(result === 'granted'){
            subscribeToPushNotification(userId);
          }

        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }

      };
    
      
    //This useEffect is for normal notifications not push notifications
    useEffect(() => {
        if (!mounted) return; 
        // const socket = new WebSocket("ws://localhost:8080/ws/notifications");

        const socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_SPRING_URL}ws/notifications`);

        socket.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        socket.onmessage = (event) => {
            const message = event.data;
            console.log("Received message:", message);
            alert(message); // Display notification to the user
        };

        socket.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };

        // Cleanup WebSocket connection on component unmount
        return () => {
            socket.close();
        };
    }, [mounted]);

    const handleToggleVisibility = () => {
        setShowComponents(!showComponents);
    };

    // if (childrenPaths.includes(pathname)) {
    //     return(
    //         <>
    //              {showComponents && <AskQuestionModule onToggleVisibility={handleToggleVisibility} />}
    //                                     {showComponents && <QuestionList />}
    //                                     {!showComponents && <AddPost />}
    //         </>
    //     );
    // }

    // Handle any client-side only rendering
    if (!mounted) {
        return <div className="min-h-screen">Loading...</div>; // Show a loading state
    }

    return (

        <>
     

            {console.log(children)}
            <div>
                {<Navbar />}
            </div>

            <main style={{ marginTop: "20px" }} className="flex-1 mt-[50px] pt-6">

                <div className="flex min-h-screen">
                    <div className="hidden md:block w-64 min-w-64 bg-white border-r border-gray-200" style={{ width: "10rem" }}>
                        <nav className="space-y-1 px-4 pt-6">
                            <div >
                                <Sidebar />
                            </div>
                        </nav>
                    </div>

                    {/* Main content div */}
                    <div className="flex-1 p-6 bg-gray-50">
                        {/* style={{backgroundColor:'rgb(252 246 252)'}} */}
                        <div className="min-h-screen bg-gray-50 " >
                            <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                            {/* {
    pushNotificationFlag && 
   <PushNotificationButton userId={user.loginId}/>
} */}
                                {children ? (
                                    <>

                                        {
                                            (childrenPaths.includes(pathname) ? (<>
                                                {showComponents && <AskQuestionModule onToggleVisibility={handleToggleVisibility} />}
                                                {showComponents && <QuestionList />}
                                                {!showComponents && <AddPost />}
                                            </>) : (<>
                                                {/* <QuestionsProvider> */}
                                                
                                                {
                                                children
                                                }
                                                {/* </QuestionsProvider> */}
                                            </>))
                                        }





                                    </>
                                ) : (
                                    <>

                                    </>
                                )}

                            </div>
                        </div>

                    </div>

                </div>
            </main>

        </>
    );
};

export default HomePage;
