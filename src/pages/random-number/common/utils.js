
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

// throwttle func
export function throwttle(func, delay) {
  let timer = null;

  // eslint-disable-next-line func-names
  return function () {
    const _this = this;

    // eslint-disable-next-line prefer-rest-params
    const args = arguments;

    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      func.apply(_this, args);
      timer = null;
    }, delay);
  };
}

export const isEmptyObject = obj => Object.keys(obj || {}).length === 0;

/**
 * down load QRcode
 * @param {*} id qr parent node
 */
export const exportCanvanAsPng = id => {
  const canvasElement = document.getElementById(id).children[0];
  const MIME_TYPE = 'image/png';

  const imgURL = canvasElement.toDataURL(MIME_TYPE);

  const downLink = document.createElement('a');

  downLink.download = `${+new Date()}.png`;
  downLink.href = imgURL;
  downLink.dataset.downloadurl = [MIME_TYPE, downLink.download, downLink.href].join(':');

  document.body.appendChild(downLink);
  downLink.click();
  document.body.removeChild(downLink);
};
