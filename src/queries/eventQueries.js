import { gql } from '@apollo/client';

const GET_EVENTS = gql`
  query getEvents {
    events { 
        id,
        name,
        description,
        price,
        date,
        artists {
            id
            name
        }
    } 
  }
`

const GET_EVENT = gql`
query getEvent($id: ID!) {
    event(id: $id) {
        id,
        name,
        description,
        price,
        image,
        date,
        artists {
            id,
            name
        }
    }
}`
export { GET_EVENTS, GET_EVENT }


