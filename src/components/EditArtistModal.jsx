import { useState } from 'react'
import { GET_ARTISTS } from '../queries/artistQueries';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ARTIST } from '../mutations/artistMutations';
import AddGenre from './AddGenre';
import { GET_GENRES } from '../queries/genreQueries';

const EditArtistModal = ({ artistDetail }) => {

    const { loading, error, data } = useQuery(GET_GENRES);
    const [genres, setGenres] = useState(artistDetail.genres)
    const [name, setName] = useState(artistDetail.name);
    const [bio, setBio] = useState(artistDetail.bio);
    const [type, setType] = useState(artistDetail.type)

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };


    const [updateArtist] = useMutation(UPDATE_ARTIST, {
        variables: { id: artistDetail.id, name, bio, type },
        refetchQueries: [{ query: GET_ARTISTS }],
    })

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || bio === '' || type === '') {
            return alert('Please fill in all fields');
        }
        updateArtist();
        if (error) {
            console.log("error")
        }
        if (data) {
            setBio("")
            setType("")
            setName("")
        }
    };

    return (
        <>
            <button
                type='button'
                className='btn btn-secondary'
                data-bs-toggle='modal'
                data-bs-target='#editArtistModal'
            >
                Edit Artist
            </button>

            <div
                className='modal fade'
                id='editArtistModal'
                aria-labelledby='editArtistModalLabel'
                aria-hidden='true'
            >
                <div className='modal-dialog'>

                    <div className='modal-content'>
                        <div className='modal-header'>
                            <div className='modal-title' id='editArtistModalLabel'>
                                Edit Artist
                            </div>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className="d-flex flex-row">
                            <div className="bg bg-success flex-grow-1">
                                <div className='modal-body'>
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
                                        <div className='mb-1'>
                                            <label className='form-label'>Bio</label>
                                            <textarea
                                                className="form-control"
                                                id="bio"
                                                rows="3"
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className='mb-1'>
                                            <div>Type:</div>
                                            <div>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        value="solo"
                                                        checked={type === 'solo'}
                                                        onChange={handleTypeChange}
                                                    />{' '}
                                                    Solo
                                                </label>
                                            </div>

                                            <div>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        value="band"
                                                        checked={type === 'band'}
                                                        onChange={handleTypeChange}
                                                    />{' '}
                                                    band
                                                </label>
                                            </div>

                                            <div>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        value="dj"
                                                        checked={type === 'dj'}
                                                        onChange={handleTypeChange}
                                                    />{' '}
                                                    DJ
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                        {genres && genres.map(genre => <span className="badge bg-primary" key={genre.id}>{genre.name} <span onClick={() => setGenres(genres.filter(item => item.id !== genre.id))}>X</span></span>)}
                      </div>
                                        <button
                                            type='submit'
                                            data-bs-dismiss='modal'
                                            className='btn btn-secondary mt-2'
                                        >
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div>
                                <div className="bg bg-warning text-start small px-2 mh-300 overflow-auto ">
                                    <div>Select Genres:</div>
                                    <ul className="list-unstyled">
                                        {data?.genres?.map((genre) =>
                                        (
                                            <li key={genre.name} className="artistList" onClick={() => setGenres([...genres, { id: genre.id, name: genre.name }])}>
                                                {genre.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <AddGenre></AddGenre>
                            </div>

                        </div>
                    </div>
                </div>

            </div >

        </>
    )
}

export default EditArtistModal