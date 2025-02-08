import React, { useState, useEffect } from 'react';
import { useQuestions } from "../../context/QuestionContext";

const QuestionPage = ({ params }) => {
  const { questions2 } = useQuestions();
  console.log("The questions2 value inside the Questionspage is :: ", questions2);
  console.log("params are :: ", params.id);

  const [question3, setQuestion3] = useState(null); // Initialize as null, since you're storing a single object

  useEffect(() => {
    console.log("Inside useEffect");
    console.log("questions2:", questions2);
    console.log("params.id:", params.id);

    if (Array.isArray(questions2)) {
      // Search for the question that matches params.id
      const matchedQuestion = questions2.find((question) => String(question.id) === String(params.id));
      if (matchedQuestion) {
        console.log("Match found! Setting question3");
        setQuestion3(matchedQuestion); // Set the matched question object
      } else {
        console.log("No match for id:", params.id);
      }
    }
  }, [questions2, params.id]); // Dependency array ensures it reruns when questions2 or params.id change

  return (
    <>
      <div className="space-y-4">
        {question3 ? ( // Check if question3 is not null
          <div key={question3.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
                  <a href={`/questions/${question3.id}`}>{question3.postDetails || "No Title"}</a>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{question3.postDetails}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {/* Display tags or other information */}
                    {question3.tags && question3.tags.map((tag) => (
                      <span key={tag.id} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                        {tag.tagName}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    asked {question3.createTime} by{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700">
                      {question3.user.userName}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Question not found or loading...</div>
        )}
      </div>
    </>
  );
};

export default QuestionPage;
