"use client"

import QRPageContainer from "@/Components/QuestionResponsePages/QRPageContainer";
// import { QuestionsProvider } from "@/context/QuestionContext";
import React from "react";

export default function QuestionPage({ params }) {
    // params.id will be the dynamic value (e.g., "1" from /questions/1)
    const unwrappedParams = React.use(params); // Unwrap the params Promise
    return (
      <div>
        
        {/* <h1>Question {unwrappedParams.id}</h1> */}
        {/* <QuestionsProvider> */}
        <QRPageContainer params={unwrappedParams} />
        {/* </QuestionsProvider> */}
        {/* Your question content here */}
      </div>
    );
  }