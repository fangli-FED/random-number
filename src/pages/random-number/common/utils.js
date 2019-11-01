
export function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function stringToIntHash(str, lowerBound = 1, upperBound = 500) {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i);
  }

  return (result % (upperBound - lowerBound)) + upperBound;
}

export function randomSort() {
  return Math.ceil(Math.random() * 3) - 2;
}
