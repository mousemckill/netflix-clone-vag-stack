import { gql } from "@apollo/client/core";

export const addLikeMutation = gql`
  mutation AddLike($id: Int!) {
    addLike(id: $id) @client
  }
`;
