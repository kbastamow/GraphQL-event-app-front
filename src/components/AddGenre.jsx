import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { ADD_GENRE } from '../mutations/genreMutations';
import { GET_GENRES } from '../queries/genreQueries';

const AddGenre = () => {

  const { loading, error, data } = useQuery(GET_GENRES);

  const [name, setName] = useState('');

  const [addGenre] = useMutation(ADD_GENRE, {
    variables: { name },
    // refetchQueries: [{ query: GET_ARTISTS }],  
    update(cache, { data: { addGenre } }) {
      const { genres } = cache.readQuery({ query: GET_GENRES });

      cache.writeQuery({
        query: GET_GENRES,
        data: {
        genres: [...genres, addGenre],
        },
      })
    },
  })

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '') {
      return alert('Please fill in genre');
    }
    console.log("adding genre")

    addGenre();

    setName('');
  };

  return (
    <>
    <div className="d-flex flex-column align-items-center">
    <hr className="hr"/>
      <form onSubmit={onSubmit} className="d-flex flex-column align-items-center">
        <div className='mb-1 px-2'>
          <div>Add Genre</div>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder= "name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='btn btn-danger btn-sm my-2 px-2'
        >
          Add Genre
        </button>
      </form>
</div>
    </>
  )
}

export default AddGenre