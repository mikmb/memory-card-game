/*
There are 151 Pokemon in Generation I
We need total = 10 random pokemon to play the game at any moment.
This function generates #total of random numbers which will be used as Pokemon Ids to retrieve the specific Pokemon from PokeAPI
*/
function generateRandomIds(total) {
  const randomIds = [];

  while (randomIds.length < total) {
    const randomId = Math.floor(Math.random() * 151) + 1;
    if (!randomIds.includes(randomId)) {
      randomIds.push(randomId);
    }
  }
  return randomIds;
}

export default generateRandomIds;
