import { gql } from "@apollo/client";

const ADD_GENRE = gql`
  mutation addGenre($name: String!) {
    addGenre(name: $name) {
      name,
    }
  }
`
export { ADD_GENRE }