// 用await可以进行等待
export function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// 生成假数据
export const generatingData = length => {
  const data = [];
  for (let i = 0; i < length; i++) {
    data.push({
      index: i + 1,
      name: `小王${i}`,
      number: i
    });
  }
  return data;
};

// 给假数据添加index
export const listIndexSet = list => list.map((data, index) => ({ ...data, index: `第${index + 1}位` }));

// hash转number
export function stringToIntHash(str, lowerbound = 1, upperbound = 500,) {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i);
  }

  console.log(result, lowerbound, upperbound);

  return (result % (upperbound - lowerbound)) + lowerbound;
}
