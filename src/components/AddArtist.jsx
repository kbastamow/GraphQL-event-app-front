import { useState } from "react";
import { GET_ARTISTS } from "../queries/artistQueries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ARTIST } from "../mutations/artistMutations";

const AddArtist = () => {
  const { loading, error, data } = useQuery(GET_ARTISTS);
  const [name, setName] = useState("");
  const [addArtist] = useMutation(ADD_ARTIST, {
    variables: { name },
    update(cache, { data: { addArtist } }) {
      const { artists } = cache.readQuery({ query: GET_ARTISTS });

      cache.writeQuery({
        query: GET_ARTISTS,
        data: {
          artists: [...artists, addArtist],
        },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      return alert("Please fill artist name");
    }
    addArtist();
    setName("");
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <form onSubmit={onSubmit} className="d-flex flex-column align-items-center">
          <div className="mb-1 px-2">
            <div className="small text-center">Add artist</div>
            <input
              type="text"
              className="form-control input input-sm small p-1 ps-2"
              id="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-danger btn-sm my-2 px-2">
            Add artist
          </button>
        </form>
      </div>
    </>
  );
};

export default AddArtist;
