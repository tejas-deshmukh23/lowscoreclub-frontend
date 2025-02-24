import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, } from "@fortawesome/free-solid-svg-icons";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";

import { FaCheckCircle } from "react-icons/fa";
import TimeLine from "./TimeLine";
import FormComponent from "./FormComponent";
import React from 'react';
import { PencilIcon, EyeIcon } from 'lucide-react';
import SuggestionBox from "./SuggestionBox";
import { useState, useEffect } from "react";
import axios from "axios";

import { getToken, setToken } from '../utils/auth';
import { decodeToken } from '../utils/auth';


export default function AddPost() {

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

  const [postData, setPostData] = useState({
    'description': '',
    'tagId': '',
    'userId': user.loginId,
    'postTypeId': '1',
    'parentQuestionId': ''
  });

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  //We will load this tags suggestions from the database

  const [allSuggestions, setAllSuggestions] = useState([]);

  useEffect(() => {
    getAllTags();
  }, [])


  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      // Filter suggestions based on the input
      const filteredSuggestions = allSuggestions.filter((item) =>
        item.tagName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleChange2 = (e) => {

    const { name, value } = e.target;
    setPostData(
      prevState => ({
        ...prevState,
        [name]: value
      })
    );

  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

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

  const handlePostQuestion = async (e) => {

    e.preventDefault();
    try {

      console.log("THe postData is :: ", postData);

      console.log("Inside the handlePostQuestion and the allSuggestions are :: ", allSuggestions);
      //here we will need to scan the whole description so that we could add the tags 
      const foundTags = allSuggestions.filter(word => {
        return postData.description.toLowerCase().includes(word.tagName.toLowerCase());
      });

      const formData = new FormData();

      const tagIds = foundTags.map(tag => tag.id);
      console.log("tagIds are :: ", JSON.stringify(tagIds));
      formData.append('tagId', JSON.stringify(tagIds));
      setPostData(prevState => ({
        ...prevState,
        tagId: tagIds // Store an array of tag IDs if multiple tags are matched
      }));

      console.log("postData is :: ", postData);

      
      formData.append('description',postData.description);
      // formData.append('tagId', postData.tagId);
      console.log("The user.loginId is :: ",user);
      formData.append('userId',user.loginId);
      formData.append('postTypeId', '1');
      formData.append('parentQuestionId', '');

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}addpost`, formData);
      // const response2 = await axios.post("http://localhost:8080/addpost");

      if(response.status === 200){
        setPostData(prevState => (
          {
            ...prevState,
            description : ''
          }
        ))


        const response2 = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}api/notifications/send`,{
          body : JSON.stringify({
            message: 'Test notification'
          })
        });

         console.log("push notification response is : ",response2);

      }

    } catch (Error) {
      console.log(Error);
    }
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {/* <FontAwesomeIcon icon={faPen} style={{ color: "blue", fontSize: "24px" }} />   */}
        <FontAwesomeIcon icon={faPenFancy} size="2x" style={{ color: "blue" }} />
        <h1 className="text-3xl">Start a discussion!</h1>
        <span>Post your thoughts and engage with the community.</span>

      </div>

      {/* <TimeLine /> */}

      <div style={{marginTop: "100px"}}>
        <b>Ask Question</b>
        <div>Be specific and imagine you’re asking a question to another person.</div>
        {/* <textarea id="about" name="about" rows="3" style={{width:"500px", border:'2px solid black'}} className="ky vo agd aoc aty auk ayn baw bhh bhj bhm bqb bzo bzq bzx dai"></textarea> */}
        <textarea
          id="response"
          rows="6"
          placeholder="Write your Question here..."
          name="description"  // Name should match the field in postData
          value={postData.description}
          onChange={handleChange2}
          style={{ padding: "10px" }}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        ></textarea>
        {/* <b>Tags</b>
    <div>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</div>
      <input
        id="textbox"
        type="text"
        value={query}
        onChange={handleChange}
        style={{padding:"10px"}}
        placeholder="Type something..."
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            // position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: '0',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            maxHeight: '150px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                listStyle: 'none',
                borderBottom: '1px solid #eee',
              }}
            >
              {suggestion.tagName}
            </li>
          ))}
        </ul>
      )} */}
      </div>

      <div className="flex gap-3 justify-end mt-6">
        <button
          style={{ padding: "10px" }}
          className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handlePostQuestion}
        >
          <PencilIcon size={19} />
          Post Question
        </button>
      </div>
      {/* <StepIndicator/> */}
    </>
  );
}
