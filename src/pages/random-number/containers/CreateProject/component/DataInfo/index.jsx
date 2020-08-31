import React from 'react';
import { shape, func, string } from 'prop-types';
import {
  Form,
  Input,
  Button,
  Upload
} from 'antd';
import { withTranslation } from 'react-i18next';
import './index.less';

const FormItem = Form.Item;

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

function DataInfo({
  form,
  onClick,
  formData,
  t
}) {
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  // Verify that it is a pure number
  const vaildNumber = (rules, value, callback) => {
    const reg = /^\d{1,}$/;

    if (!reg.test(value)) {
      callback(t('pleaseInputNum'));
    }

    callback();
  };

  // handle Submit this form
  const handleSubmit = e => {
    e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }

      onClick(values);
    });
  };

  return (
    <div className={`${classPreix}`}>
      <Form
        {...formItemLayout}
        onSubmit={handleSubmit}
      >
        <FormItem
          label={t('wheelSeedNumber')}
        >
          {
            getFieldDecorator('seedCount', {
              initialValue: formData.seedCount,
              rules: [
                {
                  required: true,
                  message: t('pleaseInputSeed')
                },
                {
                  validator: vaildNumber
                }
              ]
            })(<Input />)
          }
        </FormItem>
        <FormItem
          label={t('dataImport')}
        >
          {
            getFieldDecorator('uploadFile', {
            })(
              <Upload>
                <Button>{t('upload')}</Button>
              </Upload>
            )
          }
          <a href="/homepage">{t('templateDown')}</a>
        </FormItem>
        <FormItem
          label={t('resultIndexName')}
        >
          {
            getFieldDecorator('resIndicatorName', {
              rules: [
                {
                  required: true,
                  message: t('pleaseInputResultIndexName')
                }
              ]
            })(<Input />)
          }
        </FormItem>
        <FormItem
          label={t('numOfResult')}
        >
          {
            getFieldDecorator('resultCount', {
              rules: [
                {
                  required: true,
                  message: t('pleaseInputResultIndexNumber')
                },
                {
                  validator: vaildNumber
                }
              ]
            })(<Input />)
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

DataInfo.propTypes = {
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

DataInfo.defaultProps = {
  formData: {
    seedCount: ''
  }
};

export default withTranslation()(Form.create()(DataInfo));
