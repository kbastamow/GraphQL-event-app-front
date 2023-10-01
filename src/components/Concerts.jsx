import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../queries/eventQueries";
import Concert from "./Concert";
import AddConcertModal from "./AddConcertModal";

const Concerts = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);
  if (error) return <p>There was a problem getting events</p>;
  return (
    <>
      {loading ? (
        <div className="spinner-border text-info" role="status"></div>
      ) : (
        <>
          <div className="overflow-auto h-75 px-5 mb-3 bg bg-info border border-info rounded-4">
            {data.events.map((event) => (
              <Concert key={event.id} event={event}></Concert>
            ))}
          </div>
          <div className="ms-5">
            <AddConcertModal></AddConcertModal>
          </div>
        </>
      )}
    </>
  );
};

export default Concerts;
