 

import React, { useState, useEffect } from 'react';
import { useQuestions } from "../../context/QuestionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { getToken, setToken } from '../utils/auth';
import { decodeToken } from '../utils/auth';
import axios from 'axios';

const QuestionPage = ({ params }) => {

  const [user, setUser] = useState({});

  const [likeCount, setLikeCount] = useState('');
  const [dislikeCount, setDislikeCount] = useState('');

  useEffect(() => {
    console.log("Inside useEffect");
    const token = getToken();
    console.log("THe token is :: ", token);
    if (!token) {
      // router.push('/login');
      // setActiveContainer("LoginPage");
    } else {
      const decodedToken = decodeToken(token);
      console.log("decoded token is :: ", decodedToken);
      if (!decodedToken || new Date(decodedToken.exp * 1000) < new Date()) {
        console.log("Inside the if");
        // setActiveContainer("LoginPage");
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

  const [liked, setLiked] = useState(false);
  const [dislike, setDislike] = useState(false);

  // Handle the click event
  const handleClick = (e) => {
    
    handleLikeBackend(e);

    // setLiked(!liked);
    console.log(liked ? 'Unliked' : 'Liked');  // You can log or perform other actions here
  };

  const handleLikeBackend= async (e)=>{
    e.preventDefault();
    try{
      const formData1 = new FormData();
      formData1.append('userId', user.loginId);
      formData1.append('postId', params.id);
      const response =await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}like`,formData1);

      console.log("The like response is :: ",response);

      if(response.status === 200){
        if(response.data === 0){
          console.log("If the data is like");
          setLiked(true);
          handleLikeCount();
        }else if(response.data === 1){
          console.log(1);
          setLiked(false);
          handleLikeCount();
        }else{
          setLiked(true);
          setDislike(false);
          handleLikeCount();
          handleDislikeCount();
        }
      }

    }catch(Error)
    {
      console.log(Error);
    }
  }

  const handleThumbsDownClick = (e) =>{
    // setDislike(!dislike);
    handleDislikeBackend(e);
  }

  const handleDislikeBackend= async (e)=>{
    e.preventDefault();
    try{
      const formData1 = new FormData();
      formData1.append('userId', user.loginId);
      formData1.append('postId', params.id);
      const response =await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}dislike`,formData1);

      console.log("The like response is :: ",response);

      if(response.status === 200){
        if(response.data === 0){
          console.log("If the data is like");
          setDislike(true);
          handleDislikeCount();
        }
        else if (response.data === 1) {

          console.log("If the data is not liked");
          setDislike(false);
          handleDislikeCount();
          
        }else{
          console.log("changed from like to dislike");
          setDislike(true);
          setLiked(false);
          handleDislikeCount();
          handleLikeCount();
          
        }
      }

    }catch(Error)
    {
      console.log(Error);
    }
  }

  const handleLikeCount = async ()=>{
    try{
      const formData1 = new FormData();
      formData1.append('postId', params.id);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}getLikeCount`,formData1);

      if(response.status === 200){
        setLikeCount(response.data);
      }

    }catch(Error){
      console.log(Error);
    }
  }

  const handleDislikeCount = async ()=>{
    try{
      const formData1 = new FormData();
      formData1.append('postId', params.id);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}getDislikeCount`,formData1);

      if(response.status === 200){
        setDislikeCount(response.data);
      }

    }catch(Error){
      console.log(Error);
    }
  }

  const handleIsVoted = async()=>{
    try{
      
      const formData1 = new FormData();
      formData1.append('userId', user.loginId);
      formData1.append('postId', params.id);
      const response =await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}isVoted`,formData1);

      if(response.status === 200){
        if(response.data === 1){ //1 for like
          setLiked(true);
          setDislike(false);
        }else if (response.data === 2) { //2 for dislike
          setDislike(true);
          setLiked(false);
        }else{
          setDislike(false);
          setLiked(false);
        }
      }

    }catch(Error)
    {
      console.log(Error);
    }
  }

  useEffect(()=>{
    if(Object.keys(user).length !== 0){
      handleIsVoted();
      handleLikeCount();
      handleDislikeCount();
    }
    
  },[user])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if single digit
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div className="space-y-4">
        {question3 ? ( // Check if question3 is not null
          <div key={question3.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex">
              {/* Stats */}
              <div className="flex flex-col items-center space-y-2 mr-6">
                <div className="text-center">
                  {/* <div className="text-gray-600"><FontAwesomeIcon icon={faThumbsUp} /></div> */}
                  <div>
                  <FontAwesomeIcon 
        icon={faThumbsUp} 
        onClick={handleClick} 
        style={{ cursor: 'pointer', color: liked ? 'blue' : 'gray' }} 
      />
      </div>
                  <div className="text-sm text-gray-500">{likeCount}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600">{18}</div>
                  <div className="text-sm text-gray-500">answers</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600"><FontAwesomeIcon icon={faThumbsDown} onClick={handleThumbsDownClick} 
        style={{ cursor: 'pointer', color: dislike ? 'blue' : 'gray' }}  /></div>
                  <div className="text-sm text-gray-500">{dislikeCount}</div>
                </div>
              </div>

              {/* Question Content */}
              <div className="flex-1">
                <h2 className="text-xl font-small text-blue-600 hover:text-blue-700 mb-2">
                  <a href={`/questions/${question3.id}`}>{question3.postDetails || "No Title"}</a>
                </h2>
                {/* <p className="text-gray-600 mb-4 line-clamp-2">{question3.postDetails}</p> */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2" style={{marginTop:"10px"}}>
                    {/* Display tags or other information */}
                    {question3.tags && question3.tags.map((tag) => (
                      <span key={tag.id} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                        {tag.tagName}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    asked {formatDate(question3.createTime)} by{' '}
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
