const errorCheck = {
  isData(array) {
    if (array.length === 0) {
      throw new Error("Data가 없습니다.");
    } else return array;
  }
};

export default errorCheck;
