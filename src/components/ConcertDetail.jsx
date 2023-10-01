
import { useNavigate } from "react-router-dom";
import dateConverter from "../helpers/dateConverter";
import EditConcertModal from "./EditConcertModal";
import { BsMusicNote } from "react-icons/bs";
import placeholderImage from "../assets/placeholder.png";

const ConcertDetail = ({ eventDetail }) => {
  const { name, description, date, price, artists, image } = eventDetail;
  const navigate = useNavigate();

  const showArtist = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <>
      <div className="card border rounded-4 mx-5 text-center h-75 p-3 m-3 bg bg-info">
        <div className="d-flex justify-content-center">
          <img className="card-img-top w-50" src={image ? image : placeholderImage} alt="Card image cap" />
        </div>
        <div className="card-body">
          <h5 className="card-title text-center text-primary mt-3">{name}</h5>
          <p className="card-text fst-italic">{description}</p>

          <hr className="hr hr-blurry text-white"></hr>
          {!artists ? (
            <></>
          ) : artists.length === 1 ? (
            <p>
              Artist:{" "}
              <div onClick={() => showArtist(artists[0].id)} className="link ps-3">
                {" "}
                <BsMusicNote className="pe-1 text-danger" />
                <span className="text-primary link">{artists[0].name}</span>
              </div>
            </p>
          ) : (
            <p>
              Artists:
              {artists.map((artist, index) => (
                <div key={index} onClick={() => showArtist(artist.id)} className="link ps-3">
                  {" "}
                  <BsMusicNote className="pe-1 text-danger" />
                  <span className="text-primary link">{artist.name}</span>
                </div>
              ))}
              <hr className="hr hr-blurry text-white"></hr>
            </p>
          )}
        </div>
        <div>{dateConverter(date)}</div>
        <div className="fw-bold">{price === 0 ? <>Free entry</> : <>{price}€</>}</div>
      </div>
      <div className="">
        <EditConcertModal eventDetail={eventDetail}></EditConcertModal>
      </div>
    </>
  );
};

export default ConcertDetail;