function shuffleArray(array) {
  const tempArr = [...array];
  let currentIndex = tempArr.length;
  let temp = null;
  let randomIndex = 0;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temp = tempArr[currentIndex];
    tempArr[currentIndex] = tempArr[randomIndex];
    tempArr[randomIndex] = temp;
  }
  return tempArr;
}

export default shuffleArray;
