import React from 'react'
import { useQuestions } from "../../context/QuestionContext";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import VoteBookmark from '../VoteBookmark';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { getToken, setToken } from '../utils/auth';
import { decodeToken } from '../utils/auth';
import { faComment } from '@fortawesome/free-solid-svg-icons';
// import CommentModal from './CommentModal';
import CommentModal from "./CommentModal";

const ResponsePage = ({ params }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseId, setResponseId] = useState('');
  const [allComments, setAllComments] = useState([]);

  const openModal = (responseId) => {
    setIsModalOpen(true);
    setResponseId(responseId);
  }
  const closeModal = () => setIsModalOpen(false);

  const [user, setUser] = useState({});

  // const [likeCount, setLikeCount] = useState('');
  // const [dislikeCount, setDislikeCount] = useState('');

  const [likeCounts, setLikeCounts] = useState({});
const [dislikeCounts, setDislikeCounts] = useState({});
const [responseCount, setResponseCounts] = useState({});

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
          console.log("THe payloadobj.loginId is :: ", payloadObj.loginId);

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

  const [question, setQuestion] = useState('');

  const { questions2 } = useQuestions();
  console.log("The questions2 value inside the ResponsePage is :: ", questions2);
  console.log("params are :: ", params.id);

  const [questionPost, setQuestionPost] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {

    if (Array.isArray(questions2)) {
      // Search for the question that matches params.id
      const matchedQuestion = questions2.find((question) => String(question.id) === String(params.id));
      if (matchedQuestion) {
        console.log("Match found! Setting question3");
        // setQuestion3(matchedQuestion); // Set the matched question object
        setQuestionPost(matchedQuestion);
        console.log("THe value that will be set in the questionPost is :: ", matchedQuestion);

        // setUser({
        //     username: username,
        //     // role: payloadObj.role.title,
        //     loginId: payloadObj.loginId,
        //   });

      } else {
        console.log("No match for id:", params.id);
      }
    }
  }, [questions2, params.id]); // Dependency array ensures it reruns when questions2 or params.id change

  const getResponsesOfQuestion = async () => {

    try {

      console.log("The questionPOst before sending to the backend is :: ", questionPost);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}getResponsesOfQuestion`, questionPost);
      setQuestions(response.data);
      console.log("The response that we get from responsesOfQuestion is :: ", response);
      // if(response.status.code === 200){

      // }else{
      //     console.log("No reponse available");
      // }

    } catch (Error) {
      console.log(Error);
    }

  }

  useEffect(() => {
    if (Object.keys(questionPost).length !== 0) {
      getResponsesOfQuestion();
      // console.log("the question post inside the useEffect is --------------> ",questionPost);
    }
  }, [questionPost]);

  useEffect(() => {
    console.log("questions in the ResponsePage are :: ", questions);
  }, [questions]);

  //----------------------------------------------------------------------------------------------

  // const [liked, setLiked] = useState(false);
  // const [dislike, setDislike] = useState(false);

  const [likedResponses, setLikedResponses] = useState({});
const [dislikedResponses, setDislikedResponses] = useState({});

  const handleClick = (e, postId) => {

    handleLikeBackend(e, postId);

    // setLiked(!liked);
    // console.log(liked ? 'Unliked' : 'Liked');  // You can log or perform other actions here
  };

  const handleLikeBackend = async (e, postId) => {
    // e.preventDefault();
    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append('userId', user.loginId);
      formData1.append('postId', postId);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}like`, formData1);

      console.log("The like response is :: ", response);

      if (response.status === 200) {
        if (response.data === 0) {
          console.log("If the data is like");
          // setLiked(true);
          setLikedResponses(prev => ({ ...prev, [postId]: true }));
          // setDislikedResponses(prev => ({ ...prev, [postId]: false }));
          handleLikeCount(postId);
        } else if (response.data === 1) {
          console.log(1);
          // setLiked(false);
          setLikedResponses(prev => ({ ...prev, [postId]: false }));
          // setDislikedResponses(prev => ({ ...prev, [postId]: false }));
          handleLikeCount(postId);
        } else {

          setLikedResponses(prev => ({ ...prev, [postId]: true }));
          setDislikedResponses(prev => ({ ...prev, [postId]: false }));

          // setLiked(true);
          // setDislike(false);
          handleLikeCount(postId);
          handleDislikeCount(postId);
        }
      }

    } catch (Error) {
      console.log(Error);
    }
  }

  const handleThumbsDownClick = (e, postId) => {
    // setDislike(!dislike);
    handleDislikeBackend(e, postId);
  }

  const handleDislikeBackend = async (e, postId) => {
    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append('userId', user.loginId);
      formData1.append('postId', postId);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}dislike`, formData1);

      console.log("The like response is :: ", response);

      if (response.status === 200) {
        if (response.data === 0) {
          console.log("If the data is like");
          // setDislike(true);
          // setLikedResponses(prev => ({ ...prev, [postId]: true }));
          setDislikedResponses(prev => ({ ...prev, [postId]: true }));
          handleDislikeCount(postId);
        }
        else if (response.data === 1) {

          console.log("If the data is not liked");
          // setDislike(false);
          // setLikedResponses(prev => ({ ...prev, [postId]: true }));
          setDislikedResponses(prev => ({ ...prev, [postId]: false }));
          handleDislikeCount(postId);

        } else {
          console.log("changed from like to dislike");
          // setDislike(true);
          // setLiked(false);
          setLikedResponses(prev => ({ ...prev, [postId]: false }));
          setDislikedResponses(prev => ({ ...prev, [postId]: true }));
          handleDislikeCount(postId);
          handleLikeCount(postId);

        }
      }

    } catch (Error) {
      console.log(Error);
    }
  }

  const handleLikeCount = async (postId) => {
    try {
      const formData1 = new FormData();
      formData1.append('postId', postId);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}getLikeCount`, formData1);

      if (response.status === 200) {
        // setLikeCount(response.data);
        setLikeCounts(prev => ({
          ...prev,
          [postId]: response.data,
        }));
      }

    } catch (Error) {
      console.log(Error);
    }
  }

  

  const handleDislikeCount = async (postId) => {
    try {
      const formData1 = new FormData();
      formData1.append('postId', postId);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}getDislikeCount`, formData1);

      if (response.status === 200) {
        // setDislikeCount(response.data);
        setDislikeCounts(prev => ({
          ...prev,
          [postId]: response.data,
        }));
      }

    } catch (Error) {
      console.log(Error);
    }
  }

  const handleIsVoted = async (responseId, userId) => {
    try {

      const formData1 = new FormData();
      formData1.append('userId', userId);
      formData1.append('postId', responseId);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}isVoted`, formData1);

      if (response.status === 200) {
        if (response.data === 1) { //1 for like
          // setLiked(true);
          // setDislike(false);
          setLikedResponses(prev => ({ ...prev, [responseId]: true }));
          setDislikedResponses(prev => ({ ...prev, [responseId]: false }));
        } else if (response.data === 2) { //2 for dislike
          // setDislike(true);
          // setLiked(false);
          setLikedResponses(prev => ({ ...prev, [responseId]: false }));
          setDislikedResponses(prev => ({ ...prev, [responseId]: true }));
        } else {
          // setDislike(false);
          // setLiked(false);
          setLikedResponses(prev => ({ ...prev, [responseId]: false }));
          setDislikedResponses(prev => ({ ...prev, [responseId]: false }));
        }
      }

    } catch (Error) {
      console.log(Error);
    }
  }

  useEffect(() => {
    // if(Object.keys(user).length !== 0){
    //   handleIsVoted();
    //   handleLikeCount();
    //   handleDislikeCount();
    // }

    // if(questions.length !== 0){
    //   // handleIsVoted();
    // }

  }, [questions])

  //-------------------------------------------------------------------------------------------

  // useEffect(() => {
  //   // Call `handleIsVoted` for each question when the component mounts or questions change

  //    // Initialize the like and dislike counts for each question


  //   const voteStatus = questions.reduce((acc, question) => {
  //     acc[question.responseId] = handleIsVoted(question.responseId, question.createdById);

  //     console.log("The question.responseId is :: ", question.responseId);

  //     handleLikeCount(question.responseId);
  //     handleDislikeCount(question.responseId);
  //     return acc;
  //   }, {});
  // }, [questions]); // This hook will run every time `questions` changes

  useEffect(()=>{

    questions.forEach((question) => {
      handleIsVoted(question.responseId, question.createdById);
      handleLikeCount(question.responseId);
      handleDislikeCount(question.responseId);
      // handleResponseCount(question.response.Id);
    });

  },[questions]); //This hook will run everytime 'questions' changes

  const handleCommentClick=(responseId)=>{

    try{

      setIsModalOpen(true);
      setResponseId(responseId);

    }catch(Error){
      console.log(Error);
    }

  }

  const handleFetchComments = async (responseId) => {
    try{

        const formData1 = new FormData();
        formData1.append("userId", user.loginId);
        formData1.append("postId", responseId);

        //At first we will only load the latest 200 comments and as user will scroll that 200 comments then we will load remaining other 200 comments
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}fetchComments`,formData1);

        console.log("THe fetchComments response is :: ",response);

        if(response.status === 200){
            setAllComments(response.data);
        }

    }catch(Error){
        console.log("The fetchComments error is :: ",Error);
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

      <div className="text-2xl" style={{ fontSize: '20px', fontStyle: "bold", marginBottom: "10px" }}>
        {questions.length} Response
      </div>

      <div className="flex justify-between items-center mb-6">
        {/* <div className="flex space-x-2">
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            Latest
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            Active
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            Unanswered
          </button>
        </div> */}

        {/* <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filter</span>
        </div> */}
      </div>

      <div className="scroll" style={{ height: '350px', overflowX: 'hidden', overflowY: 'auto', paddingRight: '10px' }}>
        <div className="space-y-4">
          {questions.length > 0 ? (
            questions.map((question) => (
              <div key={question.responseId} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                {/* {
                  handleIsVoted(question.responseId, question.createdById)
                } */}
                <div className="flex">
                  {/* Stats */}
                  <div className="flex flex-col items-center space-y-2 mr-6">
                    <div className="text-center">
                      {/* <div className="text-gray-600"><FontAwesomeIcon icon={faThumbsUp} /></div> */}
                      <div>
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          onClick={(e) => handleClick(e, question.responseId, question.createdById)}
                          style={{ cursor: 'pointer', color: likedResponses[question.responseId] ? 'blue' : 'gray' }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">{likeCounts[question.responseId] || 0}</div>
                    </div>
                    <div className="text-center">
                      {/* <div className="text-gray-600">{18}</div> */}
                      <FontAwesomeIcon
                          icon={faComment}
                          style={{cursor: 'pointer', color:'gray'}}
                          onClick={()=>{
                            setIsModalOpen(true);
                            setResponseId(question.responseId);
                            handleFetchComments(question.responseId);

                          }}
                          // onClick={(e) => handleClick(e, question.responseId, question.createdById)}
                          // style={{ cursor: 'pointer', color: likedResponses[question.responseId] ? 'blue' : 'gray' }}
                        />
                      <div className="text-sm text-gray-500">comments</div>

                    </div>
                    <div className="text-center">
                      <div className="text-gray-600"><FontAwesomeIcon icon={faThumbsDown} onClick={(e) => handleThumbsDownClick(e, question.responseId)}
                        style={{ cursor: 'pointer', color: dislikedResponses[question.responseId] ? 'blue' : 'gray' }} /></div>
                      <div className="text-sm text-gray-500">{dislikeCounts[question.responseId] || 0}</div>
                    </div>

                    {/* <VoteBookmark
                        initialVotes={question.votes || 0}
                        postId={question.responseId}
                        onVoteChange={(newVotes) => {
                          // Optional: Update your local state if needed
                          console.log(`New votes for post ${question.responseId}: ${newVotes}`);
                        }}
                      /> */}

                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
                    <h2 className="text-xl font-small text-gray-600 mb-2">
                      {/* <a href={`/questions/${question.id}`}>{question.postDetails || "No Title"}</a> */}
                      <div>
                        {question.postDetails || "No Title"}
                      </div>
                    </h2>
                    {/* <p className="text-gray-600 mb-4 line-clamp-2">{question.postDetails}</p> */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {/* Display tags or other information */}
                        {/* {question.tags && question.tags.map((tag) => (
                          <span key={tag.id} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                            {tag.tagName}
                          </span>
                        ))} */}
                        {/* {tag.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                            {tag}
                          </span>
                        ))} */}
                      </div>
                      <div className="text-sm text-gray-500">
                        asked {formatDate(question.responseCreatedTime)} by{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700">
                          {question.createdBy}
                        </a>
                      </div>
                    </div>

                  

                  </div>
                </div>
                        {
                          isModalOpen &&
                          <CommentModal isOpen={isModalOpen} onClose={closeModal} responseId={responseId} userId={user.loginId} allComments={allComments} handleFetchComments={handleFetchComments} >
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div>
          {
            allComments.map((comment,index)=>(
              
              <div key={index} className="flex-1" style={{border:"1px solid lightgray", marginTop:"8px", boxShadow:"0 2px 5px rgba(0, 0, 0, 0.1)", padding:"10px", borderRadius:"8px"}}>
              <h2 className="text-xl font-small text-gray-600 mb-2">
                {/* <a href={`/questions/${question.id}`}>{question.postDetails || "No Title"}</a> */}
                <div>
                  {comment.commentDescription || "No Title"}
                </div>
              </h2>
              {/* <p className="text-gray-600 mb-4 line-clamp-2">{question.postDetails}</p> */}
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {/* Display tags or other information */}
                  {/* {question.tags && question.tags.map((tag) => (
                    <span key={tag.id} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                      {tag.tagName}
                    </span>
                  ))} */}
                  {/* {tag.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                      {tag}
                    </span>
                  ))} */}
                </div>
                <div className="text-sm text-gray-500">
                  asked {formatDate(comment.createTime)} by{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    {comment.userName}
                  </a>
                </div>
              </div>

            

            </div>
              
            ))
          }
        </div>
      </CommentModal>
                        }
                

              </div>



            ))
          ) : (
            <div className="text-center text-gray-500">No questions available</div>
          )}
        </div>
      </div>

    </>
  )
}

export default ResponsePage