// // pages/index.js
// import Header from "../Header/Header";
// import QuestionList from "../QuestionList/QuestionList";
// import Sidebar from "../Sidebar/Sidebar";

// export default function Home() {
//   return (
//     <div style={{backgroundColor:'#f8ecf8'}} className="min-h-screen bg-gray-100 font-roboto">
//       <Header />
//       <div className="container mx-auto px-25 py-6 flex gap-6 max-w-6xl">
//         <div className="w-3/4">
//           <QuestionList />
//         </div>
//         <div className="w-1/4">
//           <Sidebar />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
// import { Search, Filter, ArrowUp, MessageSquare, Eye, Home } from 'lucide-react';
import { Search, Filter, Home, Users, Tag, Star, Settings, HelpCircle } from 'lucide-react';
// import Navbar from "../Header/navbar";
import Navbar from "../Header/navbar";

const Sidebar = () => {
    return (
      <div className="w-50 bg-white border-r border-gray-200 h-screen fixed left-0 top-[50px] pt-6">
        <nav className="space-y-1 px-4">
          <a href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
            <Home className="h-5 w-5 mr-3" />
            <span>Home</span>
          </a>
          <a href="/users" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
            <Users className="h-5 w-5 mr-3" />
            <span>Users</span>
          </a>
          <a href="/tags" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
            <Tag className="h-5 w-5 mr-3" />
            <span>Tags</span>
          </a>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <h3 className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
              My Lists
            </h3>
            <a href="/bookmarks" className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-50 rounded-md">
              <Star className="h-5 w-5 mr-3" />
              <span>Bookmarks</span>
            </a>
          </div>
  
          <div className="pt-4 mt-4 border-t border-gray-200">
            <h3 className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
              Support
            </h3>
            <a href="/settings" className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-50 rounded-md">
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </a>
            <a href="/help" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              <HelpCircle className="h-5 w-5 mr-3" />
              <span>Help Center</span>
            </a>
          </div>
        </nav>
      </div>
    );
  };

const HomePage = () => {
  const questions = [
    {
      id: 1,
      title: "How to handle state management in Next.js application?",
      description: "I'm building a large scale Next.js application and wondering what's the best approach for state management. Should I use Redux, Context API, or something else?",
      votes: 42,
      answers: 5,
      views: 1200,
      tags: ["nextjs", "react", "javascript", "state-management"],
      askedBy: "user123",
      askedAt: "2 hours ago"
    },
    {
      id: 2,
      title: "TypeError: Cannot read property 'map' of undefined in React",
      description: "I'm getting this error when trying to map through an array in my React component. The data is coming from an API call.",
      votes: 15,
      answers: 3,
      views: 800,
      tags: ["react", "javascript", "error-handling"],
      askedBy: "dev456",
      askedAt: "5 hours ago"
    },
    // Add more questions as needed
  ];

  return (

    <>
    <div>
    {<Navbar/>}
    </div>

    <div >
    <Sidebar/>
    </div>
    
    <main style={{marginTop:"20px"}} className="flex-1 mt-[50px] pt-6">


   
    {/* style={{backgroundColor:'rgb(252 246 252)'}} */}
    <div className="min-h-screen bg-gray-50 " >
      {/* Navigation Bar */}
     
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Tejas, What's in your mind?</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Ask Question
          </button>
        </div>

        {/* Search Bar
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div> */}

        <div className="relative mb-6">
            <h5>Previously asked questions</h5>
        </div>

        {/* Filters and Sorting */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Newest
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Active
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Unanswered
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Filter</span>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map(question => (
            <div key={question.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex">
                {/* Stats */}
                <div className="flex flex-col items-center space-y-2 mr-6">
                  <div className="text-center">
                    <div className="text-gray-600">{question.votes}</div>
                    <div className="text-sm text-gray-500">votes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">{question.answers}</div>
                    <div className="text-sm text-gray-500">answers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">{question.views}</div>
                    <div className="text-sm text-gray-500">views</div>
                  </div>
                </div>

                {/* Question Content */}
                <div className="flex-1">
                  <h2 className="text-xl font-medium text-blue-600 hover:text-blue-700 mb-2">
                    <a href={`/questions/${question.id}`}>{question.title}</a>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{question.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {question.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      asked {question.askedAt} by{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-700">
                        {question.askedBy}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
    </main>

    </>
  );
};

export default HomePage;
