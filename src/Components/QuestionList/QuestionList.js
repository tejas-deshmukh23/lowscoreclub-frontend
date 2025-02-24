'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useQuestions } from '@/context/QuestionContext';
import { useQuestions } from "../../context/QuestionContext";
import Link from 'next/link';

const QuestionList = () => {

    const tag = ["creditcard", "personalLoan"];
    const {questions2, setQuestionsData} = useQuestions();

    // const question2 = [
    //     {
            // tags: ["creditcard", "personalLoa", "javascript", "state-management"],
    //     }
        
    // ]

  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);

  const getAllQuestionList = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_URL}getAllQuestions`);

      console.log("The API response:", response);  // Check the response format

      // Ensure that the response contains data and it's an array of questions
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setQuestions(response.data);  // Set the questions data to the state
        setQuestionsData(response.data);

      } else {
        console.log("No questions data found");
      }
    } catch (error) {
      console.log("Error fetching questions: ", error);
    }
  };

  useEffect(() => {
    getAllQuestionList();
  }, []);

  const getTagsForPost=async()=>{
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_URL}getTagsForPost`);
    } catch (error) {
        console.log(error);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if single digit
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };

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
          <span className="text-sm text-gray-600">Filter</span>
        </div>
      </div>

      <div className="scroll" style={{ height: '350px', overflowX: 'hidden', overflowY: 'auto', paddingRight: '10px' }}>
        <div className="space-y-4">
          {questions.length > 0 ? (
            questions.map((question) => (
              <div key={question.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex">
                  {/* Stats */}
                  <div className="flex flex-col items-center space-y-2 mr-6">
                    <div className="text-center">
                      <div className="text-gray-600">708</div>
                      <div className="text-sm text-gray-500">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600">18</div>
                      <div className="text-sm text-gray-500">answers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600">120</div>
                      <div className="text-sm text-gray-500">Dislikes</div>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
                    <h2 className="text-xl font-small text-blue-600 hover:text-blue-700 mb-2">
                      {/* <a href={`/questions/${question.id}`}>{question.postDetails || "No Title"}</a> */}
                      <Link href={`/questions/${question.id}`}>
    {question.postDetails || "No Title"}
</Link>
                    </h2>
                    {/* <p className="text-gray-600 mb-4 line-clamp-2">{question.postDetails}</p> */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2" style={{marginTop:"10px"}}>
                        {/* Display tags or other information */}
                        {question.tags && question.tags.map((tag) => (
                          <span key={tag.id} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                            {tag.tagName}
                          </span>
                        ))}
                        {/* {tag.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                            {tag}
                          </span>
                        ))} */}
                      </div>
                      <div className="text-sm text-gray-500">
                        asked {formatDate(question.createTime)} by{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700">
                          {question.user.userName}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No questions available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionList;

