
import dateConverter from "../helpers/dateConverter"
import {BsFillTrash3Fill} from "react-icons/bs";
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
    <div className="card">
  <h5 className="card-header">{dateConverter(date)}</h5>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    {price === 0 ? <p className="card-text">Free entry</p> : <p className="card-text">{price}€</p>}
    
    <button className='btn btn-primary btn-sm' onClick={showDetails}> Details </button>
    <DeleteConcertModal handleDelete={deleteEvent}></DeleteConcertModal>
    {/* <button className='btn btn-danger btn-sm' onClick={deleteEvent}> <BsFillTrash3Fill></BsFillTrash3Fill> </button> */}
  </div>
</div>
  )
}

export default Concert