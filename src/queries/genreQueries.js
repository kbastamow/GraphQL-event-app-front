import  { gql } from '@apollo/client'

const GET_GENRES = gql`
query getGenres {
    genres {
        id,
        name,
    }
}
`
export { GET_GENRES }