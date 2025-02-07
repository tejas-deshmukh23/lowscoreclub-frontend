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
import { QuestionsProvider } from '@/context/QuestionContext';

import { usePathname } from 'next/navigation';


const HomePage = ({ children }) => {

    const pathname = usePathname();
    const childrenPaths = ['/homepage', '/'];

    const [showComponents, setShowComponents] = useState(true);
    const [askedQuestionPanel, setAskedQuestionPanel] = useState(false);

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
                            {children ? (
                                    <>

                                        {
                                            (childrenPaths.includes(pathname)?(<>
                                                {showComponents && <AskQuestionModule onToggleVisibility={handleToggleVisibility} />}
                                        {showComponents && <QuestionList />}
                                        {!showComponents && <AddPost />}
                                            </>):(<>
                                                <QuestionsProvider>
                                                {children}
                                                </QuestionsProvider>
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
