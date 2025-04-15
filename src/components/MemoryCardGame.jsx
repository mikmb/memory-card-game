import { useState, useEffect } from "react";
import generateRandomIds from "../utils/generate-random-ids";
import fetchPokemon from "../utils/fetch-pokemon";
import Card from "./Card";
import shuffleArray from "../utils/shuffle-array";

function MemoryCardGame() {
  const [bestScore, setBestScore] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemonIds, setSelectedPokemonIds] = useState([]);

  const currentScore = selectedPokemonIds.length;
  const TOTAL_POKEMON = 10;

  useEffect(() => {
    const randomIds = generateRandomIds(TOTAL_POKEMON);
    fetchPokemon(randomIds)
      .then((data) => {
        setPokemonList(data);
      })
      .catch((error) => {
        console.log("Failed to fetch data:", error);
      });
  }, []);

  async function getNewPokemon() {
    try {
      const randomIds = generateRandomIds(TOTAL_POKEMON);
      const data = await fetchPokemon(randomIds);

      setPokemonList(data);
    } catch (error) {
      console.log("Failed to fetch data:", error);
    }
  }

  function handleGuess(e) {
    const targetId = e.target.closest("[data-poke-id]").dataset.pokeId;

    if (selectedPokemonIds.includes(targetId)) {
      // repeated guess
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }

      setSelectedPokemonIds([]);
    } else {
      setSelectedPokemonIds([...selectedPokemonIds, targetId]);
    }
    // shuffle pokemon list after each guess
    const shuffledArray = shuffleArray(pokemonList);
    setPokemonList(shuffledArray);
  }
  return (
    <main>
      <section className="top-info-container">
        <div className="info-container">
          <h1 className="title">Memory Card</h1>
          <h2 className="instruction">
            Click on unique Pokemon to increase your score. Clicking on the
            already clicked Pokemon with reset your score to 0!
          </h2>
        </div>
        <button className="new-pokemon" onClick={getNewPokemon}>
          New Pokemon
        </button>
        <div className="score-info-container">
          <h3 className="current-score">{"Current Score: " + currentScore}</h3>
          <h3 className="best-score">{"Your Best Score: " + bestScore}</h3>
        </div>
      </section>
      <section className="bottom-cards-container">
        {pokemonList.length > 0 &&
          pokemonList.map((pokemon) => {
            const poke = {
              id: pokemon.id,
              name: pokemon.name,
              img: pokemon.sprites.other["official-artwork"].front_default,
            };
            return (
              <Card key={poke.id} pokemon={poke} handleGuess={handleGuess} />
            );
          })}
      </section>
    </main>
  );
}

export default MemoryCardGame;
