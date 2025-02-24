// import { useState } from 'react';
// import {useEffect} from 'react';
// import axios from  "axios";

// const CommentModal = ({ isOpen, onClose, children, responseId, userId, allComments }) => {

//     const [comment, setComment] = useState('');
//     // const [allComments, setAllComments] = useState([]);

//   if (!isOpen) return null;

//   const handleAddComment = async () => {
//     try{

//         const formData1 = new FormData();
//         formData1.append("userId", userId);
//         formData1.append("postId", responseId);
//         formData1.append("comment", comment);

//         const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}comment`,formData1);

//         console.log("The add comment response is :: ",response);

//         if(response.status === 200){
//             console.log("Comment added successfully");
//         }else{
//             console.log("comment not added");
//         }

//     }catch(Error){
//         console.log("Add comment error :: ",Error);
//     }
//   }

//   const handleChange = (e) => {

//     const { name, value } = e.target;
//     setComment(value);

//   };

// //   useEffect(()=>{
// //     handleFetchComments();
// //   },[responseId, userId])

//   return (
//     <>
//       <div className="fixed inset-0 bg-gray-500 bg-opacity-30 z-50" onClick={onClose}></div>
//       <div className="fixed top-[10vh] left-0 flex items-start justify-start z-50 p-6">
//         {/* Modal with fixed 80vh height, 10vw width, and margin from top */}
//         <div className="bg-white p-6 rounded-lg shadow-lg h-[80vh] w-[30vw] flex flex-col">
//           {/* Modal Content */}
//           <div className="flex-1 overflow-y-auto">
//             {children}
//           </div>
          
//           {/* Textbox at the bottom */}
//           <textarea
//             placeholder="Add a comment"
//             className="mt-4 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="3"
//             onChange={handleChange}
//             value={comment}
//           />
//           <div className="flex gap-3 justify-center mt-4">
//         <button
//           style={{ padding: "2px" }}
//           className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           onClick={handleAddComment}
//         >
//           {/* <PencilIcon size={19} /> */}
//           comment
//         </button>
//       </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CommentModal;

// import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from "axios";

// const CommentModal = ({ isOpen, onClose, children, responseId, userId, allComments, handleFetchComments }) => {

//     const [comment, setComment] = useState('');

//     if (!isOpen) return null;

//     const handleAddComment = async () => {
//         try {
//             const formData1 = new FormData();
//             formData1.append("userId", userId);
//             formData1.append("postId", responseId);
//             formData1.append("comment", comment);

//             const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}comment`, formData1);

//             console.log("The add comment response is :: ", response);

//             if (response.status === 200) {
//                 console.log("Comment added successfully");
//                 setComment('');
//                 handleFetchComments(responseId);
//             } else {
//                 console.log("comment not added");
//             }

//         } catch (Error) {
//             console.log("Add comment error :: ", Error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setComment(value);
//     };

//     return (
//         <>
//             {/* Overlay */}
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-30 z-50" onClick={onClose}></div>

//             {/* Modal Container */}
//             <div className="fixed inset-0 z-50 flex justify-center items-center p-6
//                 sm:h-[80vh] sm:w-[30vw] sm:flex-col sm:p-6 
//                 md:left-0 md:top-[10vh] md:w-[30vw] md:h-[80vh] md:flex md:items-start">

//                 <div className="bg-white p-6 rounded-lg shadow-lg sm:w-full sm:h-[80vh] sm:max-h-[90vh] flex flex-col">
//                     {/* Modal Content */}
//                     <div className="flex-1 overflow-y-auto">
//                         {children}
//                     </div>

//                     {/* Textbox at the bottom */}
//                     <textarea
//                         placeholder="Add a comment"
//                         className="mt-4 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         rows="3"
//                         onChange={handleChange}
//                         value={comment}
//                     />
//                     <div className="flex gap-3 justify-center mt-4">
//                         <button
//                             style={{ padding: "2px" }}
//                             className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                             onClick={handleAddComment}
//                         >
//                             comment
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CommentModal;

// import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from "axios";

// const CommentModal = ({ isOpen, onClose, children, responseId, userId, allComments, handleFetchComments }) => {
//     const [comment, setComment] = useState('');

//     if (!isOpen) return null;

//     const handleAddComment = async () => {
//         try {
//             const formData1 = new FormData();
//             formData1.append("userId", userId);
//             formData1.append("postId", responseId);
//             formData1.append("comment", comment);

//             const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}comment`, formData1);

//             console.log("The add comment response is :: ", response);

//             if (response.status === 200) {
//                 console.log("Comment added successfully");
//                 setComment('');
//                 handleFetchComments(responseId);
//             } else {
//                 console.log("comment not added");
//             }

//         } catch (Error) {
//             console.log("Add comment error :: ", Error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setComment(value);
//     };

//     return (
//         <>
//             {/* Overlay */}
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-30 z-50" onClick={onClose}></div>

//             {/* Modal Container */}
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto flex flex-col max-h-[90vh]">
//                     {/* Modal Content */}
//                     <div className="flex-1 overflow-y-auto p-6 min-h-0">
//                         {children}
//                     </div>

//                     {/* Comment Input Section */}
//                     <div className="border-t p-4 bg-white">
//                         <textarea
//                             placeholder="Add a comment"
//                             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                             rows="3"
//                             onChange={handleChange}
//                             value={comment}
//                         />
//                         <div className="flex justify-center mt-4">
//                             <button
//                                 className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                                 onClick={handleAddComment}
//                             >
//                                 Comment
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CommentModal;



// import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from "axios";

// const CommentModal = ({ isOpen, onClose, children, responseId, userId, allComments, handleFetchComments }) => {
//     const [comment, setComment] = useState('');

//     if (!isOpen) return null;

//     const handleAddComment = async () => {
//         try {
//             const formData1 = new FormData();
//             formData1.append("userId", userId);
//             formData1.append("postId", responseId);
//             formData1.append("comment", comment);

//             const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}comment`, formData1);

//             console.log("The add comment response is :: ", response);

//             if (response.status === 200) {
//                 console.log("Comment added successfully");
//                 setComment('');
//                 handleFetchComments(responseId);
//             } else {
//                 console.log("comment not added");
//             }

//         } catch (Error) {
//             console.log("Add comment error :: ", Error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setComment(value);
//     };

//     return (
//         <>
//             {/* Overlay */}
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-30 z-50" onClick={onClose}>jbfjewbfguob</div>

//             {/* Modal Container */}
//             <div className="fixed inset-0 z-50 flex items-center justify-center md:items-start md:justify-start p-4">
//                 <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto flex flex-col max-h-[90vh] 
//                               md:ml-0 md:mr-auto md:mt-[10vh] md:w-[30vw] md:h-[80vh]">
//                     {/* Modal Content */}
//                     <div className="flex-1 overflow-y-auto p-6 min-h-0">
//                         {children}
//                     </div>

//                     {/* Comment Input Section */}
//                     <div className="border-t p-4 bg-white">
//                         <textarea
//                             placeholder="Add a comment"
//                             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                             rows="3"
//                             onChange={handleChange}
//                             value={comment}
//                         />
//                         <div className="flex justify-center mt-4">
//                             <button
//                                 className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                                 onClick={handleAddComment}
//                             >
//                                 Comment
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CommentModal;

import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";

const CommentModal = ({ isOpen, onClose, children, responseId, userId, allComments, handleFetchComments }) => {
    const [comment, setComment] = useState('');

    if (!isOpen) return null;

    const handleAddComment = async () => {
        try {
            const formData1 = new FormData();
            formData1.append("userId", userId);
            formData1.append("postId", responseId);
            formData1.append("comment", comment);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}comment`, formData1);

            console.log("The add comment response is :: ", response);

            if (response.status === 200) {
                console.log("Comment added successfully");
                setComment('');
                handleFetchComments(responseId);
            } else {
                console.log("comment not added");
            }

        } catch (Error) {
            console.log("Add comment error :: ", Error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComment(value);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-30 z-50" onClick={handleOverlayClick}></div>

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center md:items-start md:justify-start p-4" onClick={handleOverlayClick}>
                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto flex flex-col max-h-[90vh] 
                              md:ml-0 md:mr-auto md:mt-[10vh] md:w-[30vw] md:h-[80vh]"
                     onClick={(e) => e.stopPropagation()}>
                    {/* Modal Content */}
                    <div className="flex-1 overflow-y-auto p-6 min-h-0">
                        {children}
                    </div>

                    {/* Comment Input Section */}
                    <div className="border-t p-4 bg-white">
                        <textarea
                            placeholder="Add a comment"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows="3"
                            onChange={handleChange}
                            value={comment}
                        />
                        <div className="flex justify-center mt-4">
                            <button
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                onClick={handleAddComment}
                            >
                                Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentModal;



