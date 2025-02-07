import React from 'react'
// import {useQuestions} from @context/QuestionContext";
import { useQuestions } from '@/context/QuestionContext';

const QuestionPage = () => {

    // const [questions, setQuestions] = useQuestions();//Access the cotext state
    // const [questions, setQuestions] = useQuestions();
    // const questionsState = useQuestions();  // Call the hook
    // console.log("questionsState:", questionsState);  // Log it

    // const {questions2, setQuestionsData} = useQuestions();
    const {questions2} = useQuestions();
    console.log("The questions2 value inside the Questionspage is :: ",questions2);
    // console.log("The questions2 value inside the Questionspage is :: ",useQuestions().questions2);
    const questions3 = '';

  return (
    <>

<div className="space-y-4">
          {questions3.length > 0 ? (
            questions3.map((question) => (
              <div key={question.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex">
                  {/* Stats */}
                  <div className="flex flex-col items-center space-y-2 mr-6">
                    <div className="text-center">
                      <div className="text-gray-600">708</div>
                      <div className="text-sm text-gray-500">votes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600">18</div>
                      <div className="text-sm text-gray-500">answers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600">1200</div>
                      <div className="text-sm text-gray-500">views</div>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
                    <h2 className="text-xl font-medium text-blue-600 hover:text-blue-700 mb-2">
                      <a href={`/questions/${question.id}`}>{question.postDetails || "No Title"}</a>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{question.postDetails}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
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
                        asked {question.createTime} by{' '}
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

    </>
  )
}

export default QuestionPage