
import { useNavigate } from 'react-router-dom'
import dateConverter from '../helpers/dateConverter'
import EditConcertModal from './EditConcertModal'

const ConcertDetail = ({eventDetail}) => {
    console.log("Detail: ", eventDetail)
    const { name, description, date, price, artists, image } = eventDetail
    const navigate = useNavigate()


    const showArtist = (artistId) => {
      console.log("navigating")
      navigate(`/artist/${artistId}`)

    }

  return (
    <>

     <div className="card" >
  <img className="card-img-top" src={image} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>


 {!artists ? <></> :( 
    artists.length === 1 ? (
  <p>Artist: <span onClick={() => showArtist(artists[0].id)}>{artists[0].name}</span></p>
) : (
  <p>
    Artists: 
    {artists.map((artist, index) => (
      <span key={index} onClick={() => showArtist(artist.id)}> {artist.name}</span>
    ))}
  </p>
)

)} 
    <p className="card-text">{description}</p>
  </div>

  <ul className="list-group list-group-flush">
    <li className="list-group-item">{dateConverter(date)}</li>
    <li className="list-group-item">{price}€</li>
  </ul>
  <div className="card-body">
  <EditConcertModal eventDetail={eventDetail}></EditConcertModal>
  </div>
</div>
    </>
   
  )
}

export default ConcertDetail