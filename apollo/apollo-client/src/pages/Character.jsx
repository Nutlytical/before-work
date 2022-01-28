import React from "react";
import { useParams } from "react-router";
import { useCharacter } from "../hooks/useCharacter";

export default function Character() {
  const { id } = useParams();

  const { data, error, loading } = useCharacter(id);

  if (loading) return <div>loading ... </div>;
  if (error) return <div>error ... </div>;

  return (
    <div className="Character">
      <img src={data.character.image} alt={data.character.name} />
      <div className="Character-content">
        <h1>{data.character.name}</h1>
        <p>{data.character.gender}</p>
        <div className="Character-episode">
          {data.character.episode.map((episode) => (
            <div key={episode.episode}>
              {episode.name} - <b>{episode.episode}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
