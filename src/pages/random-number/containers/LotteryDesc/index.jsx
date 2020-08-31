import React from 'react';
import { Button } from 'antd';
import './index.less';

const classPreix = 'lottery-desc';

function LotteryDesc() {
  return (
    <div className={classPreix}>
      <div className={`${classPreix}-container`}>
        <div
          className={`${classPreix}-content`}
        >
          <div className={`${classPreix}-desc`}>
            sdkljfklsdjfklasdjfklasjdfkljasdklfjaskldfjilksadjflkasjdklfjsdklfjlksdjflksadjfklsdjflkajn
            sdkljfklsdjfklasdjfklasjdfkljasdklfjaskldfjilksadjflkasjdklfjsdklfjlksdjflksadjfklsdjflkajn
            sdkljfklsdjfklasdjfklasjdfkljasdklfjaskldfjilksadjflkasjdklfjsdklfjlksdjflksadjfklsdjflkajn
            sdkljfklsdjfklasdjfklasjdfkljasdklfjaskldfjilksadjflkasjdklfjsdklfjlksdjflksadjfklsdjflkajn
            sdkljfklsdjfklasdjfklasjdfkljasdklfjaskldfjilksadjflkasjdklfjsdklfjlksdjflksadjfklsdjflkajn
            sdkljfklsdjfklasdjfklasjdfkljasdklfjaskldfjilksadjflkasjdklfjsdklfjlksdjflksadjfklsdjflkajn
            sdkljfklsdjfklasdjfklasjdfkljasdklfjaskldfjilksadjflkasjdklfjsdklfjlksdjflksadjfklsdjflkajn
            sdkljfklsdjfklasdjfklasjdfkljasdklfjaskldfj
          </div>
          <Button type="primary">
            下一步
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LotteryDesc;
