
import dateConverter from "../helpers/dateConverter"
import {HiMusicNote} from "react-icons/hi";
import {FaPaperPlane} from "react-icons/fa";
import { useMutation } from '@apollo/client';
import { DELETE_EVENT } from "../mutations/eventMutations";
import { GET_EVENTS } from "../queries/eventQueries";
import { useNavigate } from "react-router-dom";
import DeleteConcertModal from "./DeleteConcertModal";

/* eslint-disable react/prop-types */

const Concert = ({event}) => {
    const navigate = useNavigate();
    const { id, name, date, price } = event
    const [deleteEvent] = useMutation(DELETE_EVENT, {
        variables: {id: id},
        // refetchQueries: [{ query: GET_EVENTS }],  
        update(cache, { data: { deleteEvent } }) {
            const { events } = cache.readQuery({ query: GET_EVENTS });
            cache.writeQuery({
              query: GET_EVENTS,
              data: {
                events: events.filter((event) => event.id !== deleteEvent.id),
              },
    })
    },
})

   const showDetails = () => {
    console.log("Details btn")
    navigate('/'+ id)
    }

  return (
    <>
    <hr className="hr hr-blur"></hr>
    <div className="card px-2 d-flex flex-column">
  <div className="d-flex justify-content-between">
    <div className="small text-primary mb-2">{dateConverter(date)}</div>
    <div className="fw-bold">{price === 0 ? <>Free entry</> : <>{price}€</>}</div>
    </div>
  <div className="card-body">
    <h5 className="card-title "><HiMusicNote className="text-danger me-2"/> {name}</h5>
    
    <div className="d-flex justify-content-end gap-5">
    <div onClick={showDetails} className="link text-primary"><FaPaperPlane className="text-danger me-2"></FaPaperPlane> Details </div>
    <DeleteConcertModal handleDelete={deleteEvent}></DeleteConcertModal>
    {/* <button className='btn btn-danger btn-sm' onClick={deleteEvent}> <BsFillTrash3Fill></BsFillTrash3Fill> </button> */}
    </div>
  </div>
</div>
</>
  )
}

export default Concert