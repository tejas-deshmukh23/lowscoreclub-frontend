'use client'

// pages/settings.jsx (or app/settings/page.jsx for App Router)
import { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  CreditCard, 
  Monitor, 
  Moon, 
  ChevronRight, 
  Lock, 
  LogOut 
} from 'lucide-react';

import PushNotificationButton from './PushNotificationButton';
import { getToken, setToken } from '../Components/utils/auth';
import { decodeToken } from '../Components/utils/auth';
import { removeToken } from '../Components/utils/auth';
import { useRouter } from 'next/navigation';

// import { getToken, setToken } from '../utils/auth';
// import {decodeToken } from '../utils/auth';

export default function SettingsPage() {

  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    console.log("Inside useEffect");
    const token = getToken();
    console.log("THe token is :: ", token);
    if (!token) {
      console.log("Redirecting because of no token");
      router.push('/login');
      // setActiveContainer("LoginPage");
      // window.location.href = "/loginPage";
    } else {
      const decodedToken = decodeToken(token);
      console.log("decoded token is :: ", decodedToken);
      if (!decodedToken || new Date(decodedToken.exp * 1000) < new Date()) {
        console.log("Inside the if");
        // setActiveContainer("LoginPage");
        console.log("Redirecting because token has expired");
        router.push('/login');
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

          // if (payloadObj.username === 'admin' && payloadObj.role.title === 'Techsuper') {
          //   setActiveContainer("TLDashboard");
          // } else {
          //   setActiveContainer("MainPage");
          // }
        }
      }
    }
  }, []);

  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    console.log('Checked:', event.target.checked);
  };

  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    // { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    // { id: 'privacy', label: 'Privacy & Security', icon: <Shield className="h-5 w-5" /> },
    // { id: 'appearance', label: 'Appearance', icon: <Monitor className="h-5 w-5" /> },
    // { id: 'billing', label: 'Billing', icon: <CreditCard className="h-5 w-5" /> },
    // { id: 'language', label: 'Language & Region', icon: <Globe className="h-5 w-5" /> },
  ];

  const handleSignout=()=>{
    try{
      removeToken();
      router.push("/");

    }catch(Error){
      console.log(Error);
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <nav className="divide-y divide-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className={`mr-3 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-500'}`}>
                    {tab.icon}
                  </span>
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <ChevronRight className="ml-auto h-5 w-5 text-blue-500" />
                  )}
                </button>
              ))}
            </nav>
            
            <div className="px-4 py-3 border-t border-gray-200">
              <button onClick={handleSignout} className="w-full flex items-center text-left text-red-600 hover:text-red-800 transition-colors">
                <LogOut className="h-5 w-5 mr-3" />
                <span className="font-medium">Sign out</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 rounded-full p-3 h-16 w-16 flex items-center justify-center text-blue-600 text-xl font-bold mr-4">
                      JD
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                        Change Profile Picture
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="john.doe@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="Product designer and developer based in San Francisco."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                  <button className="px-4 py-2 ml-2 text-gray-700 hover:text-gray-900 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )} */}
            
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    {/* <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New messages</p>
                          <p className="text-sm text-gray-500">Get notified when you receive a message</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New followers</p>
                          <p className="text-sm text-gray-500">Get notified when someone follows you</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Product updates</p>
                          <p className="text-sm text-gray-500">Get notified about new features and updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div> */}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        {/* <div>
                          <p className="font-medium">Same as email</p>
                          <p className="text-sm text-gray-500">Use the same settings as email notifications</p>
                        </div> */}
                        <div>
                          <p className="font-medium">New messages</p>
                          <p className="text-sm text-gray-500">Get notified when you receive a message</p>
                        </div>
                        {/* <label className="relative inline-flex items-center cursor-pointer"> */}

                        <PushNotificationButton userId = {user.loginId}/>
      {/* <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label> */}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* <div className="border-t border-gray-200 mt-6 pt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Save Preferences
                  </button>
                </div> */}
              </div>
            )}
            
            
          </div>
        </div>
      </div>
    </div>
  );
}