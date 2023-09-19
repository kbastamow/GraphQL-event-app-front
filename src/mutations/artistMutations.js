import { gql } from "@apollo/client";

const ADD_ARTIST = gql`
  mutation addArtist($name: String!) {
    addArtist(name: $name) {
      name,
      genres {
        id,
        name
      }
    }
  }
`

const UPDATE_ARTIST = gql`
  mutation updateArtist($id: ID!, $name: String!, $bio: String!, $type: UpdateArtistType! ) {
   updateArtist(id: $id, name: $name, bio: $bio,  type: $type) {
      name,
      bio,
      type
      genres {
        id,
        name
      }
}
  }
`

export { ADD_ARTIST, UPDATE_ARTIST }