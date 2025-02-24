"use client"

// import QuestionPage from '@/app/questions/[id]/page'
import QuestionPage from './QuestionPage';
import React from 'react'
import { PencilIcon, EyeIcon } from 'lucide-react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { getToken, setToken } from '../utils/auth';
import { decodeToken } from '../utils/auth';
import ResponsePage from './ResponsePage';

const QRPageContainer = ({params}) => {

  useEffect(()=>{
    console.log("Hey");
  },[]);

  const [user, setUser] = useState({});

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

  const [allSuggestions, setAllSuggestions] = useState([]);

  const [postData, setPostData] = useState({
    'description': '',
    'tagId': '',
    'userId': user.loginId,
    'postTypeId': '2',
    'parentQuestionId': ''
  });

  const getAllTags = async () => {
    // e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/getAllTags`
      );

      if (response !== null) {
        console.log(response);
        setAllSuggestions(response.data);
      }
    } catch (Error) {
      console.log(Error);
    }
  }

  useEffect(()=>{
    getAllTags();
  },[])

  

  const handlePostAnswer = () => {
    try{

      // const foundTags = allSuggestions.filter(word => {
      //   return postData.description.toLowerCase().includes(word.tagName.toLowerCase());
      // });

      const formData = new FormData();

      // const tagIds = foundTags.map(tag => tag.id);
      // console.log("tagIds are :: ", JSON.stringify(tagIds));

      // formData.append('tagId', JSON.stringify(tagIds));

      // setPostData(prevState => ({
      //   ...prevState,
      //   tagId: tagIds // Store an array of tag IDs if multiple tags are matched
      // }));

      console.log("postData is :: ", postData);

      
      formData.append('description',postData.description);
      // formData.append('tagId', postData.tagId);
      console.log("The user.loginId is :: ",user);
      formData.append('userId',user.loginId);
      formData.append('postTypeId', '2');
      console.log("parent question id :: is :: ", params.id);
      formData.append('parentQuestionId', params.id);

      const response = axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}addpost`, formData);

      console.log("The response response is :: ",response);

      if(response.status.code === 200){
        console.log("Answer posted successfully");

        const response2 = axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}send`,{
          body : JSON.stringify({
            message: 'Test notification'
          })
        });

         console.log("push notification response is : ",response);

      }else{
        console.log("The response is :: ",response);
      }
    }catch(Error)
    {
      console.log(Error);
    }
  }

  const handleChange2 = (e) => {

    const { name, value } = e.target;
    setPostData(
      prevState => ({
        ...prevState,
        [name]: value
      })
    );

  };

  useEffect(()=>{
    console.log("the postData.description is :: ",postData.description);
  },[postData]);

  return (
    <>
        <div>
            <QuestionPage params={params}/>
        </div>
        
        <div style={{marginLeft:"80px", marginTop:'50px'}}>
          
        {/* <div className="text-2xl" style={{fontSize:'20px', fontStyle:"bold", marginBottom:"10px"}}>
          Responses
          </div> */}

          <div>
            <ResponsePage params={params} />
          </div>

        </div>
        <div style={{marginTop: "100px"}} >

          <h1 className='text-1xl'>Your Answer</h1>

          <textarea
          id="response"
          rows="6"
          placeholder="Write your Answer here..."
          name="description"  // Name should match the field in postData
          value={postData.description}
          onChange={handleChange2}
          style={{ padding: "10px" }}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        ></textarea>

<div className="flex gap-3 justify-end mt-6">
        <button
          style={{ padding: "10px" }}
          className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handlePostAnswer}
        >
          <PencilIcon size={19} />
          Post Answer
        </button>
      </div>

        </div>
    </>
  )
}

export default QRPageContainer