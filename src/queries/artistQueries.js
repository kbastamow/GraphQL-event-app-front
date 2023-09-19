import  { gql } from '@apollo/client'

const GET_ARTISTS = gql`
query getArtists {
    artists {
        id,
        name,
        bio,
    }
}
`

const GET_ARTIST = gql`
query getArtist($id: ID!) {
    artist(id: $id) {
        id,
        name,
        bio,
}
}
`

export { GET_ARTISTS, GET_ARTIST }