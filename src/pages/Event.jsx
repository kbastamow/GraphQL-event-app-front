import React from 'react'
import ConcertDetail from '../components/ConcertDetail';
import { GET_EVENT } from '../queries/eventQueries'
import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom';
import { BsArrowLeftSquare } from "react-icons/bs";


const Event = () => {
  const navigate = useNavigate();
  const { eventId } = useParams(); 

  const { loading, error, data } = useQuery(GET_EVENT, 
    {
        variables: {id: eventId},
    })
  
  if (loading) return <p>Loading</p>
  if (error) return <p>There was a problem getting the event</p>

  return (
    <>
    
    <div onClick={() => navigate(-1)}><BsArrowLeftSquare></BsArrowLeftSquare><p>Go back</p></div>
    <ConcertDetail eventDetail={data.event}></ConcertDetail>
    </>
  )
}

export default Event