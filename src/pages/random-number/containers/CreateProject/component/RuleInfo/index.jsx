import React from 'react';
import { shape, func, string } from 'prop-types';
import {
  Form,
  DatePicker,
  Button,
  Radio
} from 'antd';
import { withTranslation } from 'react-i18next';
import './index.less';


const FormItem = Form.Item;
const { Group } = Radio;
const classPreix = 'data-info';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 8,
      offset: 0,
    },
    sm: {
      span: 8,
      offset: 8,
    },
  },
};

const RADIO_STYLE = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
};

function RuleInfo({
  form,
  onClick,
  formData,
  t
}) {
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  const handleSubmit = e => {
    e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }

      onClick(values, true);
    });
  };

  return (
    <div className={`${classPreix}`}>
      <Form
        {...formItemLayout}
        onSubmit={handleSubmit}
      >
        <FormItem
          label={t('wheelDarwTime')}
        >
          {
            getFieldDecorator('time', {
              initialValue: formData.time,
              rules: [
                {
                  required: true,
                  message: t('pleaseInputSeedTime')
                }
              ]
            })(<DatePicker style={{ width: '100%' }} />)
          }
        </FormItem>
        <FormItem
          label={t('wheelDrawTimes')}
        >
          {
            getFieldDecorator('lottleNumberType', {
              initialValue: formData.lottleNumberType || '0',
            })(
              <Group>
                <Radio style={RADIO_STYLE} value="0">{t('oneTimeLottle')}</Radio>
                <Radio style={RADIO_STYLE} value="1">
                  {t('multiTimeLottle')}
                  <span>{t('noLimitlottle')}</span>
                </Radio>
              </Group>
            )
          }
        </FormItem>
        <FormItem
          label={t('lotteryWays')}
        >
          {
            getFieldDecorator('lottleWayType', {
              initialValue: formData.lottleWayType || '0',
            })(
              <Group>
                <Radio style={RADIO_STYLE} value="0">{t('manualWheel')}</Radio>
                <Radio style={RADIO_STYLE} value="1">
                  {t('scheduled')}
                </Radio>
              </Group>
            )
          }
        </FormItem>
        <FormItem
          {...tailFormItemLayout}
        >
          <Button type="primary" htmlType="submit">
            {t('next')}
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}

RuleInfo.propTypes = {
  formData: shape({
    seedCount: string
  }),
  onClick: func.isRequired,
  form: shape({
    getFieldDecorator: func,
    validateFieldsAndScroll: func
  }).isRequired,
  t: func.isRequired
};

RuleInfo.defaultProps = {
  formData: {
    seedCount: ''
  }
};

export default withTranslation()(Form.create()(RuleInfo));
