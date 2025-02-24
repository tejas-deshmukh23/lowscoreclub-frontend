"use client"

import { createContext, useState, useContext, useEffect } from "react";

// Create the context with a default value
const QuestionsContext = createContext({
  questions2: [],
  setQuestionsData: () => {},
});

// Provider component
export const QuestionsProvider = ({ children }) => {

  useEffect(()=>{
    if (typeof window === 'undefined') {
        return null; // Don't render anything during SSR
      }
},[])

  const [questions2, setQuestions] = useState([]);

  // Monitoring changes to questions2
  useEffect(() => {
    console.log("The questions2 value is :: ", questions2);
  }, [questions2]);

  const setQuestionsData = (data) => {
    console.log("The data is :: ", data);
    setQuestions(data);
  };

  const value = {
    questions2,
    setQuestionsData,
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};

// Custom hook with error handling
export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  
  return context;
};