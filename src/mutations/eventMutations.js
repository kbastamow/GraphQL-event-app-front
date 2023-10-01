import { gql } from "@apollo/client";

const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
        id
        name
    }
  }
`
const ADD_EVENT = gql`
  mutation addEvent($name: String!, $description: String!, $price: Int!, $date: String!, $artistIds: [String] ) {
    addEvent(name: $name, description: $description, price: $price, date: $date, artistIds: $artistIds) {
      name,
      description,
      price,
      date,
      artists { name, id }
    }
  }
`

const UPDATE_EVENT = gql`
  mutation updateEvent($id: ID!, $name: String!, $description: String!, $price: Int!, $date: String!, $artistIds: [String] ) {
   updateEvent(id: $id, name: $name, description: $description, price: $price, date: $date, artistIds: $artistIds) {
      name,
      description,
      price,
      date,
      artists { name, id }
    }
  }
`

export { DELETE_EVENT, ADD_EVENT, UPDATE_EVENT }