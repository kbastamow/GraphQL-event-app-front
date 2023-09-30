import { useState } from 'react'
import { GET_ARTISTS } from '../queries/artistQueries';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_ARTIST } from '../mutations/artistMutations';
import { GET_EVENTS } from '../queries/eventQueries';

const AddArtist = () => {

  const { loading, error, data } = useQuery(GET_ARTISTS);

  const [name, setName] = useState('');

  const [addArtist] = useMutation(ADD_ARTIST, {
    variables: { name },
    // refetchQueries: [{ query: GET_ARTISTS }],  
    update(cache, { data: { addArtist } }) {
      const { artists } = cache.readQuery({ query: GET_ARTISTS });

      cache.writeQuery({
        query: GET_ARTISTS,
        data: {
         artists: [...artists, addArtist],
        },
      })
    },
  })

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '') {
      return alert('Please fill artist name');
    }
    console.log("adding artist")

    addArtist();

    setName('');
  };

  return (
    <>
    <div className="d-flex flex-column align-items-center">
    <hr className="hr"/>
      <form onSubmit={onSubmit} className="d-flex flex-column align-items-center">
        <div className='mb-1 px-2'>
          <div className="small text-center">Add artist</div>
          <input
            type='text'
            className='form-control input-sm'
            id='name'
            placeholder= "name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='btn btn-secondary btn-sm my-2 px-2'
        >
          Add artist
        </button>
      </form>
      </div>
    </>
  )
}

export default AddArtist