export const sumToArrayOptions = (sum: number, options: number[]) => {
  const resultArr = [];
  let i = options.length - 1;

  while (sum && i >= 0) {
    const currentSum = sum - options[i];
    if (currentSum >= 0) {
      resultArr.push(options[i]);
      sum = currentSum;
    } else {
      i -= 1;
    }
  }
  return resultArr;
};
