// import QuestionPage from '@/app/questions/[id]/page'
import QuestionPage from './QuestionPage';
import React from 'react'

const QRPageContainer = ({params}) => {
  return (
    <>
        <div>
            <QuestionPage params={params}/>
        </div>
        <div className="text-1xl " style={{marginLeft:"100px", marginTop:'50px'}}>

          <h2 >Responses</h2>

        </div>
    </>
  )
}

export default QRPageContainer