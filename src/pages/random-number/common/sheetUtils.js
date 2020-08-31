import XLSX from 'xlsx';

const { utils } = XLSX;

class XLSXUtil {
  constructor() {
    this.ws = null;
  }

  /**
   * data from xlsx file
   * @param {*} file a file object
   * @param {*} config See details in https://github.com/SheetJS/sheetjs
   * @param {*} handleWsData handle ws data
   */
  getDataFromFile(file, config = { header: 1 }, handleWsData = () => {}) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    return new Promise((resolve, reject) => {
      reader.onload = e => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        // handle Ws Data
        handleWsData(ws);

        this.ws = ws;
        /* Convert array of arrays */
        const data = utils.sheet_to_json(ws, config);
        /* Update state */
        resolve(data);
      };

      if (rABS) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsArrayBuffer(file);
      }

      setTimeout(() => {
        reject(new Error('Get sheet data failed'));
      }, 2000);
    });
  }

  /**
   * export file
   * @param {*} data [{name: li, id: 2}]
   * @param {*} fileName customFileNmae
   * @param {*} handleData handle
   */
  exportFile(data, fileName, headerData = {}) {
    if (Object.keys(headerData).length > 0) {
      data.forEach(item => {
        const newItem = item;
        newItem.__rowNum__ += 1;
      });
      data.unshift(headerData);
    }

    const ws = utils.json_to_sheet(data, { skipHeader: true });

    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, fileName);
  }
}

export default new XLSXUtil();
