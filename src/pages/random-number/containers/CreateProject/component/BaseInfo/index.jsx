import React, {} from 'react';
import { shape, func, string } from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  Form,
  Input,
  Button,
} from 'antd';
import './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const classPriex = 'base-info';
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

function BaseInfo({
  form,
  onClick,
  formData,
  t
}) {
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  const handeleSubmit = e => {
    e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }

      onClick(values);
    });
  };

  return (
    <div className={`${classPriex}`}>
      <Form
        {...formItemLayout}
        onSubmit={handeleSubmit}
      >
        <FormItem
          label={t('wheelTheme')}
        >
          {
            getFieldDecorator('lottleTitle', {
              initialValue: formData.lottleTitle,
              rules: [
                {
                  required: true,
                  message: t('pleaseInputTheme')
                }
              ]
            })(<Input
              maxLength={60}
            />)
          }
        </FormItem>
        <FormItem
          label={t('wheelDesc')}
        >
          {
            getFieldDecorator('desc', {
              initialValue: formData.desc,
            })(<TextArea rows={4} maxLength={600} />)
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

BaseInfo.propTypes = {
  form: shape({
    getFieldDecorator: func,
    validateFieldsAndScroll: func
  }).isRequired,
  formData: shape({
    lottleTitle: string,
    desc: string
  }),
  onClick: func.isRequired,
  t: func.isRequired
};

BaseInfo.defaultProps = {
  formData: {
    lottleTitle: '',
    desc: ''
  }
};

export default withTranslation()(Form.create()(BaseInfo));
