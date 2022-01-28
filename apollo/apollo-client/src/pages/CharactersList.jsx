import React from "react";
import { Link } from "react-router-dom";
import { useCharacters } from "../hooks/useCharacters";

export function CharactersList() {
  const { error, data, loading } = useCharacters();

  if (loading) return <div>loading ... </div>;
  if (error) return <div>error ... </div>;

  return (
    <div className="CharactersList">
      {data.characters.results.map((character) => (
        <Link to={`/${character.id}`} key={character.id}>
          <img src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
        </Link>
      ))}
    </div>
  );
}
