import { END_POINT, randomAddress } from '../../../common/constants';

let nightElf = null;

class NightElfUtil {
  static getInstace() {
    if (nightElf) {
      return nightElf;
    }

    nightElf = new NightElfUtil();
    return nightElf;
  }

  constructor() {
    this.check = false;
    this.aelf = null;
    let resovleTemp = null;

    this.check = new Promise((resolve, reject) => {
      if (window.NightElf) {
        resolve(true);
      }

      setTimeout(() => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(false);
      }, 1000);

      resovleTemp = resolve;
    });

    document.addEventListener('NightElf', result => {
      resovleTemp(result);

      this.aelf = new window.NightElf.AElf({
        httpProvider: [
          END_POINT,
        ],
        appName: 'lottle'
      });
    });
  }


  pluginCheck() {
    return this.check;
  }

  login() {
    return this.aelf.login({
      chainId: 'AELF',
      payload: {
        method: 'LOGIN',
        contracts: [{
          chainId: 'AELF',
          contractAddress: randomAddress,
          contractName: 'radndom',
          description: 'radndom contract',
          github: ''
        }]
      }
    });
  }

  logout(address) {
    return this.aelf.logout({
      chainId: 'AELF',
      address
    });
  }
}

export default NightElfUtil;
