import EditArtistModal from "./EditArtistModal"

const ArtistDetail = ({ artistDetail }) => {
  console.log("Detail: ", artistDetail)
  const { name, bio, type, genres } = artistDetail

  return (
    <>

      <div className="card border rounded-4 mx-5 text-center h-75 p-3 m-3" >
        <div className="card-header d-flex justify-content-center">
          <h5 className="text-primary">{name}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">{type}</p>
          <p className="card-text">{bio}</p>
          <div>
            {genres && genres.map(genre => <span className="badge bg-danger rounded-pill px-4 py-1 small" key={genre.id}>{genre.name} </span>)}

          </div>
        </div>
      </div>
      <div>
        <EditArtistModal artistDetail={artistDetail} ></EditArtistModal>
      </div>

    </>

  )
}

export default ArtistDetail