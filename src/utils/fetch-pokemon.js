async function fetchPokemon(ids) {
  try {
    const results = await Promise.all(
      ids.map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      })
    );
    return results;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export default fetchPokemon;
