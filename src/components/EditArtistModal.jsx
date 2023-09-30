import { useState } from 'react'
import { GET_ARTISTS } from '../queries/artistQueries';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ARTIST } from '../mutations/artistMutations';
import AddGenre from './AddGenre';
import { GET_GENRES } from '../queries/genreQueries';
import { BsFillTrash3Fill } from "react-icons/bs";

const EditArtistModal = ({ artistDetail }) => {
console.log(artistDetail)
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

        if (name === '' || bio === '') {
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
            <div className="d-flex justify-content-end">
                <button
                    type='button'
                    className='btn btn-secondary btn-sm'
                    data-bs-toggle='modal'
                    data-bs-target='#editArtistModal'
                >
                    <div className='d-flex align-items-center'>
                        Edit Artist
                    </div>
                </button>
            </div>

            <div
                className='modal fade'
                id='editArtistModal'
                aria-labelledby='editArtistModalLabel'
                aria-hidden='true'
            >
                <div className='modal-dialog modal-lg'>

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
                            <div className="bg bg-light flex-grow-1">
                                <div className='modal-body px-5'>
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
                                                rows="5"
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className='mb-1'>
                                            <div>Type</div>
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
                                        <div className="d-flex flex-wrap">
                                            {genres && genres.map(genre => <span className="badge bg-primary text-danger rounded-pill px-3 py-1 m-1 small" key={genre.id}>{genre.name} <span onClick={() => setGenres(genres.filter(item => item.id !== genre.id))}><BsFillTrash3Fill /></span></span>)}
                                        </div>

                                        <div className="d-flex justify-content-center mb-5">
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
                            </div>

                            <div className="flex flex-column bg bg-light px-4 pt-2">
                                <div className="bg bg-light text-start small px-2 overflow-auto">
                                    <div>Select Genres:</div>
                                    <div className="ps-3">
                                        <ul className="list-unstyled">
                                            {data?.genres?.map((genre) =>
                                            (
                                                <li key={genre.name} className="artistList text-danger link" onClick={() => setGenres([...genres, { id: genre.id, name: genre.name }])}>
                                                    {genre.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
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