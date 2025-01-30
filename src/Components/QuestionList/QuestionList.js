// export default function QuestionList() {
//     const questions = [
//       { id: 1, title: "How to use Next.js?", votes: 5, answers: 2 },
//       { id: 2, title: "What is React Server Components?", votes: 8, answers: 4 }
//     ];
    
//     return (
//       <div className="bg-white p-4 shadow rounded">
//         <h2 className="text-lg font-semibold mb-4">Top Questions</h2>
//         {questions.map((q) => (
//           <div key={q.id} className="p-2 border-b">
//             <h3 className="text-blue-600 cursor-pointer">{q.title}</h3>
//             <p>{q.votes} votes • {q.answers} answers</p>
//           </div>
//         ))}
//       </div>
//     );
//   }

import React from 'react'
import { Search, Filter, Home, Users, Tag, Star, Settings, HelpCircle } from 'lucide-react';

const QuestionList = () => {

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
    <div className="relative mb-6">
                                    <h5>Previously asked questions</h5>
                                </div>
        <div className="flex justify-between items-center mb-6">
                                    <div className="flex space-x-2">
                                        <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                                            Latest
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
                                <div className="scroll" style={{height: '350px', overflowX: 'hidden', overflowY: 'auto', paddingRight:'10px'}}>
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
                                </div>
    </>
  )
}

export default QuestionList

// import React from 'react'
// import { Filter } from 'lucide-react';

// const QuestionList = () => {
//     const questions = [
//                 {
//                     id: 1,
//                     title: "How to handle state management in Next.js application?",
//                     description: "I'm building a large scale Next.js application and wondering what's the best approach for state management. Should I use Redux, Context API, or something else?",
//                     votes: 42,
//                     answers: 5,
//                     views: 1200,
//                     tags: ["nextjs", "react", "javascript", "state-management"],
//                     askedBy: "user123",
//                     askedAt: "2 hours ago"
//                 },
//                 {
//                     id: 2,
//                     title: "TypeError: Cannot read property 'map' of undefined in React",
//                     description: "I'm getting this error when trying to map through an array in my React component. The data is coming from an API call.",
//                     votes: 15,
//                     answers: 3,
//                     views: 800,
//                     tags: ["react", "javascript", "error-handling"],
//                     askedBy: "dev456",
//                     askedAt: "5 hours ago"
//                 },
//                 // Add more questions as needed
//             ];

//     return (
//         // <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.46)', textAlign: 'left', height: '400px', overflowX: 'hidden', overflowY: 'auto', padding:'15px', fontWeight:'600' }} className="scroll">
               
//         <div className="flex flex-col h-screen">
//             {/* Static header with filters */}
//             <div className="flex justify-between items-center p-4 bg-white">
//                 <div className="flex space-x-2">
//                     <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
//                         Latest
//                     </button>
//                     <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
//                         Active
//                     </button>
//                     <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
//                         Unanswered
//                     </button>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <Filter className="h-5 w-5 text-gray-400" />
//                     <span className="text-sm text-gray-600">Filter</span>
//                 </div>
//             </div>

//             {/* Scrollable question list */}
//             <div className="scroll" style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.46)', textAlign: 'left', height: '300px', overflowX: 'hidden', overflowY: 'auto', padding:'15px', fontWeight:'600' }}>
//             <div className="overflow-y-auto flex-1" >
//                 <div className="space-y-4 p-4">
//                     {questions.map(question => (
//                         <div key={question.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//                             <div className="flex">
//                                 <div className="flex flex-col items-center space-y-2 mr-6">
//                                     <div className="text-center">
//                                         <div className="text-gray-600">{question.votes}</div>
//                                         <div className="text-sm text-gray-500">votes</div>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="text-gray-600">{question.answers}</div>
//                                         <div className="text-sm text-gray-500">answers</div>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="text-gray-600">{question.views}</div>
//                                         <div className="text-sm text-gray-500">views</div>
//                                     </div>
//                                 </div>

//                                 <div className="flex-1">
//                                     <h2 className="text-xl font-medium text-blue-600 hover:text-blue-700 mb-2">
//                                         <a href={`/questions/${question.id}`}>{question.title}</a>
//                                     </h2>
//                                     <p className="text-gray-600 mb-4 line-clamp-2">{question.description}</p>
//                                     <div className="flex justify-between items-center">
//                                         <div className="flex flex-wrap gap-2">
//                                             {question.tags.map(tag => (
//                                                 <span
//                                                     key={tag}
//                                                     className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md"
//                                                 >
//                                                     {tag}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                         <div className="text-sm text-gray-500">
//                                             asked {question.askedAt} by{" "}
//                                             <a href="#" className="text-blue-600 hover:text-blue-700">
//                                                 {question.askedBy}
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             </div>
//         </div>
//     )
// }

// export default QuestionList