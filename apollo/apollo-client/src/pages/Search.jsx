import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_CHARACTER_LOCATIONS = gql`
  query GetCharacterLocations($name: String!) {
    characters(filter: { name: $name }) {
      results {
        location {
          name
        }
      }
    }
  }
`;

export default function Search() {
  const [name, setName] = useState("");

  const [getLocation, { loading, error, data, called }] = useLazyQuery(
    GET_CHARACTER_LOCATIONS,
    { variables: { name } }
  );

  console.log("called =>", called);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={getLocation}>Search</button>
      {loading && <div>loading ... </div>}
      {error && <div>error ... </div>}
      {data && (
        <ul>
          {data.characters.results.map((character, index) => (
            <li key={index}>{character.location.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
