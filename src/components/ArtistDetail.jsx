
const ArtistDetail = ({artistDetail}) => {
    console.log("Detail: ",artistDetail)
    const { name, bio } = artistDetail

  return (
    <>

     <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p className="card-text">{bio}</p>
  </div>

  <div className="card-body">
  {/* <EditConcertModal eventDetail={eventDetail}></EditConcertModal> */}
  </div>
</div>
    </>
   
  )
}

export default ArtistDetail