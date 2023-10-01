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
      variables: { id: eventId },
    })

  if (error) return <p>There was a problem getting the event</p>

  return (
    <>
      <div className="col-md-6 bg bg-transparent ">
        <div className="d-flex flex-column justify-content-center align-items-center py-5 mt-5">
          <h1>Event</h1>
          <div onClick={() => navigate(-1)} className="link text-white"><BsArrowLeftSquare></BsArrowLeftSquare><span className="ps-2">Back</span></div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="d-flex flex-column justify-content-center align-items-center my-5 py-5">
        {loading ? (<div className="spinner-border text-info" role="status">
            </div>) : (
          <ConcertDetail eventDetail={data.event}></ConcertDetail>)}
        </div>
      </div>
    </>
  )
}

export default Event