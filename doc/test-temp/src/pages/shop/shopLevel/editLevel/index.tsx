import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  InputNumber,
  Checkbox,
} from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';


import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;

interface EditLevelProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class EditLevel extends Component<EditLevelProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'shopLevelAndeditLevel/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    console.log(this.props)

    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    console.log(getFieldValue)
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    // @ts-ignore
    return (
      <PageHeaderWrapper title="新增店铺等级" backIcon={<Icon type="arrow-left" />} onBack={() => window.history.back()} >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>

            <FormItem {...formItemLayout} label="等级名称" >
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '等级名称必须输入',
                },
              ],
            })(<Input placeholder="请输入等级名称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="可发布商品数">
            {getFieldDecorator('weight1', { initialValue: 100 })(
              <InputNumber
                style={{ width: 110 }}
                min={0}
                max={10000}
                precision={0}
              />,
            )}
            <span className={styles.inputHelp}>0表示没有限制</span>
          </FormItem>

            <FormItem {...formItemLayout} label="可上传图片数">
              {getFieldDecorator('weight2', { initialValue: 500 })(
                <InputNumber
                  style={{ width: 110 }}
                  min={0}
                  max={10000}
                  precision={0}
                />,
              )}
              <span className={styles.inputHelp}>0表示没有限制</span>
            </FormItem>
            <FormItem {...formItemLayout} label="级别">
              {getFieldDecorator('weight3', { initialValue: 0 })(
                <InputNumber
                  style={{ width: 110 }}
                  min={0}
                  max={100}
                  precision={0}
                />,
              )}
              <span className={styles.inputHelp}>数值越大表明级别越高</span>
            </FormItem>
            <FormItem {...formItemLayout} label="收费标准">
              {getFieldDecorator('weight4', { initialValue: 0 })(
                <InputNumber
                  style={{ width: 110 }}
                  min={0}
                  max={900000}
                  precision={0}
                  formatter={value => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => (value ? value.replace(/￥\s?|(,*)/g, '') : '')}
                />,
              )}
              <span className={styles.inputHelp}>元/年，在会员开通或升级店铺时将显示在前台</span>
            </FormItem>
            <FormItem {...formItemLayout} label="可用附加功能">
              {getFieldDecorator('weight5', { initialValue: ['A', 'B'] })(
                <Checkbox.Group style={{ width: '100%' }}>
                      <Checkbox value="A">编辑器多媒体功能</Checkbox>
                </Checkbox.Group>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="申请说明">
              {getFieldDecorator('goal')(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="用户选择“普通店铺”，可以立即开通。"
                  rows={4}
                />,
              )}
              <span className={styles.inputHelp}>申请说明，在会员开通或升级店铺时将显示在前台</span>
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="shoplevelandeditlevel.form.submit" />
              </Button>
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="shoplevelandeditlevel.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<EditLevelProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['shopLevelAndeditLevel/submitRegularForm'],
  }))(EditLevel),
);
