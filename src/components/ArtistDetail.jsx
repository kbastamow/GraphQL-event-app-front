import EditArtistModal from "./EditArtistModal"

const ArtistDetail = ({artistDetail}) => {
    console.log("Detail: ",artistDetail)
    const { name, bio, type, genres } = artistDetail

  return (
    <>

     <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p>{type}</p>
    <p className="card-text">{bio}</p>
    <div>
    {genres && genres.map(genre => <span className="badge bg-info" key={genre.id}>{genre.name} </span>)}

                      </div>
  </div>

  <div className="card-body">
  <EditArtistModal artistDetail={artistDetail} ></EditArtistModal>
  </div>
</div>
    </>
   
  )
}

export default ArtistDetail