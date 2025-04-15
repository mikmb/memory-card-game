import "./../styles/card.css";
function Card({ pokemon, handleGuess }) {
  return (
    <div className="card" data-poke-id={pokemon.id} onClick={handleGuess}>
      <img
        className="card-image"
        draggable="false"
        src={pokemon.img}
        alt={pokemon.name}
      />
      <h3 className="card-name">{pokemon.name}</h3>
    </div>
  );
}

export default Card;
