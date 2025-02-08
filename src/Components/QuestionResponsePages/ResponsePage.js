import React from 'react'

const ResponsePage = ({id}) => {

    const [responses, setResponses] = useState([]);

    const getResponsesOfQuestion=async()=>{

        try{

            const response = axios.post(`${process.env.NEXT_PUBLIC_SPRING_URL}responsesOfQuestion`,id);

            if(response.status.code === 200){

            }else{
                console.log("No reponse available");
            }

        }catch(Error){
            console.log(Error);
        }

    }

    useEffect(()=>{
        getResponsesOfQuestion();
    },[])

  return (
    <>
    </>
  )
}

export default ResponsePage