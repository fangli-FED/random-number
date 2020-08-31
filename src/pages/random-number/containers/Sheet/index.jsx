import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import XLSXUtil from '../../common/sheetUtils';
import { request } from '../../../../common/request';

function Test() {
  const [data, setData] = useState([]);

  const handleUpload = async info => {
    const { file } = info;
    if (file.status === 'done') {
      return;
    }

    if (file.status === 'error') {
      const xlsxData = await XLSXUtil.getDataFromFile(
        file.originFileObj,
        { header: ['name', 'id'] },
        ws => {
          // eslint-disable-next-line no-param-reassign
          delete ws.A1;
          // eslint-disable-next-line no-param-reassign
          delete ws.B1;
        }
      );
      setData(xlsxData);
      message.error(`${file.name} 上传失败`);
    }
  };

  const handleClick = () => {
    XLSXUtil.exportFile(data, 'ssss.xlsx');
  };

  // 导入文件下载
  const handleInput = () => {
    request('http://127.0.0.1:9000/北京市小汽车指标摇号5期.xlsx', {}, {
      method: 'GET',
      responseType: 'blob'
    }).then(async res => {
      const xlsxData = await XLSXUtil.getDataFromFile(
        res,
        { header: ['name', 'id'] },
        ws => {
          // eslint-disable-next-line no-param-reassign
          delete ws.A1;
          // eslint-disable-next-line no-param-reassign
          delete ws.B1;
        }
      );

      setData(xlsxData);
      console.log(xlsxData);
    });
  };

  return (
    <div>
      <Upload
        name="file"
        onChange={handleUpload}
      >
        上传
      </Upload>
      <Button onClick={handleClick}>导出</Button>
      <Button onClick={handleInput}>导入</Button>
      {
        data.map(item => (
          <div key={item.id}>
            <span>{item.name}</span>
            <span>{item.id}</span>
          </div>
        ))
      }
    </div>
  );
}

export default Test;
