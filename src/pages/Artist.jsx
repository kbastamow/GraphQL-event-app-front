import { GET_ARTIST } from '../queries/artistQueries'
import { useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom';
import { BsArrowLeftSquare } from "react-icons/bs";
import ArtistDetail from '../components/ArtistDetail';


const Artist = () => {
  const navigate = useNavigate();
    const { id } = useParams(); 
    console.log(id)
    const { loading, error, data } = useQuery(GET_ARTIST,   {
        variables: {id: id},
    })
  
    console.log("artistdata: ", data)
    if (loading) return <p>Loading</p>
    if (error) return <p>There was a problem getting the artist</p>

  return (
    <>
    <div className="col-md-6 bg bg-transparent">
        <div className="d-flex flex-column justify-content-center align-items-center py-5  mt-5">
          <h1 className="h1">Artist</h1>
          <div onClick={() => navigate(-1)} className="link text-primary"><BsArrowLeftSquare></BsArrowLeftSquare><span className="ps-2">Back</span></div>
      </div>
      </div>
      <div className="col-md-6">
        <div className="d-flex flex-column justify-content-center align-items-center my-5 py-5">
    <ArtistDetail artistDetail={data.artist}></ArtistDetail>
    </div>
      </div>
    </>
  )
}

export default Artist