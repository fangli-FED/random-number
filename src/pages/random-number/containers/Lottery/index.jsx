import React from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './index.less';
import { Button } from 'antd';

const classPrefix = 'lottery';

class Lottery extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    i18n: PropTypes.shape({
      language: PropTypes.string,
    }).isRequired,
    t: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  historyPush = () => {
    const { history } = this.props;
    history.push('/lottlery/start/1');
  }

  render() {
    const { t } = this.props;
    return (
      <div className={classPrefix}>
        <div className={`${classPrefix}-container`}>
          <div className={`${classPrefix}-content`}>
            <h1>
              {t('aelfWheelSystem')}
            </h1>
            <h2>北京市小客车指标公证摇号第5期</h2>
            <div className={`${classPrefix}-data`}>
              <p>
                {t('joinWheel')}
                ：5000
              </p>
              <p>
                {t('indicatorsNumber')}
                ：5000
              </p>
            </div>
            <Button
              className={`${classPrefix}-start-btn`}
              type="primary"
              onClick={this.historyPush}
            >
              {t('startWheel')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Lottery));
