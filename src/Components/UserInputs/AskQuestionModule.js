import React from 'react'

const AskQuestionModule = ({ onToggleVisibility }) => {
  return (
    <>
        <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-3xl font-bold">Tejas, What's in your mind?</h2>
                                    <button onClick={onToggleVisibility} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                                        Ask Question
                                    </button>
                                </div>
    </>
  )
}

export default AskQuestionModule