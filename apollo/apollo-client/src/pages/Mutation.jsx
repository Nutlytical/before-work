import { gql, useMutation } from "@apollo/client";
import React from "react";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $quality: Int!) {
    createProduct(record: { name: $name, quality: $quality }) {
      record {
        name
      }
    }
  }
`;

export default function Mutation() {
  const [createProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT,
    {
      variables: {
        name: "hotdog",
        quality: 1,
      },
    }
  );

  return (
    <div>
      <button onClick={() => createProduct()}></button>
    </div>
  );
}
