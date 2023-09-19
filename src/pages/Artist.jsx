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
    <div onClick={() => navigate(-1)}><BsArrowLeftSquare></BsArrowLeftSquare><p>Go back</p></div>
    <ArtistDetail artistDetail={data.artist}></ArtistDetail>
    </>
  )
}

export default Artist