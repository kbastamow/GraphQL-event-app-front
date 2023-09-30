import { useQuery } from "@apollo/client"
import { GET_EVENTS } from "../queries/eventQueries"
import Concert from "./Concert"
import { BsFillPlusSquareFill } from 'react-icons/bs'
import AddConcertModal from "./AddConcertModal"
import { ADD_EVENT } from "../mutations/eventMutations"

const Concerts = () => {

  const { loading, error, data } = useQuery(GET_EVENTS)

  if (loading) return <p>Loading</p>
  if (error) return <p>There was a problem getting events</p>
  console.log(data)


  return (
    <>
      {!loading && !error && (
        <>

          {/* <h1 className="fs-3 text-primary">Schedule</h1> */}
          <div className="overflow-auto h-75 px-5 mb-3 bg bg-info border border-info rounded-4">
            {data.events.map(event => (
              <Concert key={event.id} event={event}></Concert>
            ))}
          </div>
          <div className="ms-5">
            <AddConcertModal></AddConcertModal>
          </div>
        </>
      )}
    </>
  )
}

export default Concerts