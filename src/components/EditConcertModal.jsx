import { useState } from 'react'
import { GET_ARTISTS } from '../queries/artistQueries';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EVENT } from '../mutations/eventMutations';
import { GET_EVENTS } from '../queries/eventQueries';
import AddArtist from './AddArtist';
import { BsFillTrash3Fill } from "react-icons/bs";

const EditConcertModal = ({ eventDetail }) => {

  const { loading, error, data } = useQuery(GET_ARTISTS);

  const [name, setName] = useState(eventDetail.name);
  const [description, setDescription] = useState(eventDetail.description);
  const [price, setPrice] = useState(eventDetail.price);

  const [date, setDate] = useState(eventDetail.date);
  const [artists, setArtists] = useState(eventDetail.artists)

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    variables: { id: eventDetail.id, name, description, price: +price, date, artistIds: artists.map(a => a.id) },
    refetchQueries: [{ query: GET_EVENTS }],
  })

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || price === '' || date === '') {
      return alert('Please fill in all fields');
    }
    updateEvent();
  };

  return (
    <>
     <div className="d-flex justify-content-end">
      <button
        type='button'
        className='btn btn-danger btn-sm'
        data-bs-toggle='modal'
        data-bs-target='#addEventModal'
      >
        <div className='d-flex align-items-center'>
         Edit Event
        </div>
      </button>
      </div>
      {loading || error ? <></> : (
        <div
          className='modal fade'
          id='addEventModal'
          aria-labelledby='addEventModalLabel'
          aria-hidden='true'
        >


          <div className='modal-dialog modal-lg'>

            <div className='modal-content '>
              <div className='modal-header'>
                <div className='modal-title text-danger' id='addEventModalLabel'>
                  Edit Event
                </div>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className="d-flex flex-wrap bg bg-light justify-content-around" >

                  <div className="modal-body px-5">
                    <form onSubmit={onSubmit}>
                      <div className='mb-1'>
                        <label className='form-label'>Name</label>
                        <input
                          type='text'
                          className='form-control'
                          id='name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className='mb-1 d-flex flex-row'>
                        <div className='me-2'>
                          <label className='form-label'>Price</label>
                          <input
                            type='price'
                            className='form-control'
                            id='price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div className='flex-grow-1'>
                          <label className='form-label'>Date</label>
                          <input
                            type='date'
                            className='form-control'
                            id='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>

                      </div>

                      <div className='mb-1'>
                        <label className='form-label'>Description</label>
                        <textarea
                          className="form-control"
                          id="description"
                          rows="3"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="d-flex flex-wrap">
                        {artists && artists.map(artist => <span className="badge bg-primary text-danger rounded-pill px-3 py-1 m-1 small" key={artist.id}> {artist.name} <span onClick={() => setArtists(artists.filter(item => item.id !== artist.id))}><BsFillTrash3Fill/></span></span>)}

                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type='submit'
                          data-bs-dismiss='modal'
                          className='btn btn-danger mt-2'
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                     
                <div className="d-flex flex-column justify-content-around px-4 pt-2" style={{ maxHeight: '500px' }}>  
                  <div className="text-start small px-2 h-50 overflow-auto">
                    <div>Select Artists:</div>
                      <ul className="list-unstyled ps-3">
                        {data?.artists?.map((artist) =>
                        (
                          <li key={artist.id} className="artistList text-danger link" onClick={() => setArtists([...artists, { id: artist.id, name: artist.name }])}>
                            {artist.name}
                          </li>
                        ))}
                      </ul>
                 
                  </div>
                
                  <AddArtist></AddArtist>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default EditConcertModal