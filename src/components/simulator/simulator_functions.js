export const moveRight = (bitsArray,currentBitIndex,setCurrentBitIndex) => {
    if (bitsArray.length > currentBitIndex + 1){
      setCurrentBitIndex((prev) => prev + 1);
      
    }
  };

  export const moveLeft = (currentBitIndex,setCurrentBitIndex,) => {
        if (currentBitIndex > 1) {setCurrentBitIndex((prev) => prev - 1)}
  };

  export const add = (bitsArray,setBitsArray,currentBitIndex,setCurrentBitIndex) => {
    if (bitsArray[bitsArray.length - 1] !== "/") {
      setBitsArray((prev) => {
        let state = [...prev];
        state.splice(currentBitIndex + 1, 0, "");
        return state;
      });
      setCurrentBitIndex((prev) => prev + 1);
    }
  };

  export const remove = async (currentBitIndex,bitsArray,setBitsArray) => {
    if (currentBitIndex > 1 || (bitsArray.length > 3 && currentBitIndex >= 1)) {
      setBitsArray((prev) => {
        let state = [...prev];
        state.splice(currentBitIndex, 1);
        return state;
      });
      moveLeft();
    }
  };