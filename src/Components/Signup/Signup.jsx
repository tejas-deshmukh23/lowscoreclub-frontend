"use client"

import React from 'react';
import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Login from "../login/login";

const CustomAlert = ({ children, type }) => {
  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
  const borderColor = type === 'success' ? 'border-green-200' : 'border-red-200';
  
  return (
    <div className={`rounded-lg p-4 mb-6 border ${bgColor} ${borderColor}`}>
      <div className="flex items-center gap-2">
        {type === 'success' ? (
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-600" />
        )}
        <p className={textColor}>{children}</p>
      </div>
    </div>
  );
};

const SignupPage = () => {

  const [loginPage, setLoginPage] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    dob: '',
  });

  const [formErrors, setFormErrors] = useState({});
  
  const [otpData, setOtpData] = useState({
    otp: '',
    isOtpSent: false,
    isOtpVerified: false
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [userNameExists, setUserNameExists] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    return newErrors;
  };

  const handleSendOtp = async () => {

    setEmailAlreadyInUse(false);
    setUserNameExists(false);

    try {
      const response = await fetch('http://localhost:8080/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      
      if (response.ok) {
        setOtpData(prev => ({ ...prev, isOtpSent: true }));
        setErrors(prev => ({ ...prev, otp: null }));
      } else {
        setErrors(prev => ({ ...prev, otp: 'Failed to send OTP' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, otp: 'Failed to send OTP' }));
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otpData.otp,
        }),
      });
      
      if (response.ok) {
        setOtpData(prev => ({ ...prev, isOtpVerified: true }));
        setErrors(prev => ({ ...prev, otp: null }));
      } else {
        setErrors(prev => ({ ...prev, otp: 'Invalid OTP' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, otp: 'Failed to verify OTP' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    submitSignup(e);

    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      if (!otpData.isOtpVerified) {
        setErrors(prev => ({ ...prev, otp: 'Please verify your email with OTP' }));
        return;
      }

      // Here you would make an API call to create the user
      setSuccess(true);
      setErrors({});
    } else {
      setErrors(newErrors);
      setSuccess(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange2 = (date) => {
    console.log("Inside handle date change");
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setFormData({ ...formData, dob: formattedDate });

    console.log("The changed date is :: ", formattedDate);

    // (date) => setFormData({ ...formData, dob: date })
  };

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const sixtyYearsAgo = new Date(
    today.getFullYear() - 60,
    today.getMonth(),
    today.getDate()
  );

  const submitSignup=async (e)=>{
    try{

        console.log("inside submit signup");

        const formData2 = new FormData();
        formData2.append('email', formData.email);
        formData2.append('username', formData.username);
        formData2.append('password', formData.password);
        formData2.append('dob', formData.dob);
        formData2.append('pincode', 'null');

        console.log("Before axios");

        // const response = await axios.post(`${process.env.springurl}signup`,formData2);

        const response = await axios.post(
            `http://localhost:8080/api/auth/signup`,
            formData2
          );

        console.log("after axios");

        if(response.status===200){
            setLoginPage(true);
            console.log("signup successfull");
        }else{
            console.log("signup failed");
        }
    }catch(Error){
        
        console.log(Error);

        if(Error.response){
          console.log("Inside error.response");
          if(Error.response.status === 409){
            //Handle conflict errors email or username already exists
            console.log("handle conflict errors eamil or username");
            console.log("error response is :: ",Error.response.data);
            console.log("error response.error is :: ",Error.response.data.error);
            if(Error.response.data.error === "Email address is already in use"){
              console.log("Email address is already in use");
              // setSuccess(true);
              setOtpData({
                otp: '',
                isOtpSent: false,
                isOtpVerified: false
              });
              // setFailed(true);
              setEmailAlreadyInUse(true);
            }else if(Error.response.data.error === "Username is already taken"){
              console.log("Username is already taken");
              setUserNameExists(true);
            }

          }else{
            //handle other error statuses

            console.log("Handle other errors");

          }
        }else if(Error.request){
          //Reqest was made but no response recieved
          console.log("Request was made but no response recieved");
        }
    }
  }

  return (

    <>

    {
        loginPage && <Login/>
    }

    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {success && (
            <CustomAlert type="success">
              Account created successfully!
            </CustomAlert>
          )}

{emailAlreadyInUse && (
            <CustomAlert type="failed">
              Email already in use, try again with different mail!
            </CustomAlert>
          )}

{userNameExists && (
            <CustomAlert type="failed">
              Username is already taken, try again with different username! 
            </CustomAlert>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Previous form fields remain the same */}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative flex gap-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={otpData.isOtpVerified}
                />
                {!otpData.isOtpSent && (
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none  rounded-md"
                    type="button"
                    onClick={handleSendOtp}
                    // className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Send OTP
                  </button>
                )}
              </div>
            </div>

            {otpData.isOtpSent && !otpData.isOtpVerified && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <div className="mt-1 relative flex gap-2">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={otpData.otp}
                    onChange={(e) => setOtpData(prev => ({ ...prev, otp: e.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Verify OTP
                  </button>
                </div>
                {errors.otp && (
                  <p className="mt-2 text-sm text-red-600">{errors.otp}</p>
                )}
              </div>
            )}

            {
                otpData.isOtpVerified && 
                <>
                   <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative flex gap-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Create Password
              </label>
              <div className="mt-1 relative flex gap-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative flex gap-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-1 relative flex gap-2">
            <DatePicker
            className="mt-1 relative flex gap-2"
                    selected={formData.dob}
                    onChange={handleDateChange2}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={150}
                    maxDate={eighteenYearsAgo}
                    minDate={sixtyYearsAgo} // Use minYear here
                    placeholderText="Date of birth"
                  />

                  {formErrors.dob && (
                    <div className="pploan-invalid-feedback">{formErrors.dob}</div>
                  )}
            </div>
            </>
            }

            {/* Rest of the form fields */}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={!otpData.isOtpVerified}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignupPage;