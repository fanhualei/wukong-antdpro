import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  InputNumber,
  Checkbox, Result,
} from 'antd';
import React, {Component, Fragment} from 'react';
import { Helmet } from 'react-helmet';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import {GridContent, PageHeaderWrapper} from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import { StateType } from './model';

const FormItem = Form.Item;
const { TextArea } = Input;

interface EditLevelProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
  sgId: number;
  shopLevelEdit: StateType;
  location: {
    query: {
      sgId: number;
    };
  };
}

class EditLevel extends Component<EditLevelProps> {
  /**
   * 第一次加载
   */
  componentDidMount() {
    const { dispatch, location } = this.props;
    const sgId:number = location.query && location.query.sgId
    if (Number(sgId) !== 0) {
      dispatch({
        type: 'shopLevelEdit/queryShopLevelById',
        payload: { sgId },
      });
    } else {
      dispatch({
        type: 'shopLevelEdit/initState',
      });
    }
  }

  handleSubmit = (e: React.FormEvent) => {
    // 得到currentItem,也就是最原始的数据,这里有只取到主键与更新的字段。
    const { dispatch, form, shopLevelEdit: { currentItem } } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      values.sgFunction = values.sgFunction.join(',');
      const payload = {
        ...currentItem,
        ...values,
      }
      if (!err) {
        dispatch({
          type: 'shopLevelEdit/updateShopLevel',
          payload,
        });
      }
    });
  };

  getTitle():string{
    const { shopLevelEdit: { currentItem } } = this.props;
    let title:string = '编辑店铺等级';
    if (currentItem.sgId && currentItem.sgId === 0) {
      title = '新增店铺等级';
    }
    return title;
  }

  renderTitle() {
    return (
      <Helmet>
        <title>{this.getTitle()}</title>
        <meta name="description" content={this.getTitle()}/>
      </Helmet>
    )
  }

  renderForm() {
    const { submitting, shopLevelEdit: { currentItem } } = this.props;
    console.log(currentItem);
    const {
      form: { getFieldDecorator },
    } = this.props;
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
      <>
        {this.renderTitle()}
        <PageHeaderWrapper title={this.getTitle()} backIcon={<Icon type="arrow-left" />} onBack={() => window.history.back()} >
          <Card bordered={false}>
            <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>

              <FormItem {...formItemLayout} label="等级名称" >
                {getFieldDecorator('sgName', {
                  initialValue: currentItem.sgName,
                  rules: [
                    {
                      required: true,
                      message: '等级名称必须输入',
                    },
                  ],
                })(<Input placeholder="请输入等级名称" />)}
              </FormItem>

              <FormItem {...formItemLayout} label="可发布商品数">
                {getFieldDecorator('sgGoodsLimit', { initialValue: currentItem.sgGoodsLimit })(
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
                {getFieldDecorator('sgAlbumLimit', { initialValue: currentItem.sgAlbumLimit })(
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
                {getFieldDecorator('sgSort', { initialValue: currentItem.sgSort })(
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
                {getFieldDecorator('sgPrice', { initialValue: currentItem.sgPrice })(
                  <InputNumber
                    style={{ width: 110 }}
                    min={0}
                    max={900000}
                    precision={0}
                    step={100}
                    formatter={value => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => (value ? value.replace(/￥\s?|(,*)/g, '') : '')}
                  />,
                )}
                <span className={styles.inputHelp}>元/年，在会员开通或升级店铺时将显示在前台</span>
              </FormItem>
              <FormItem {...formItemLayout} label="可用附加功能">
                {getFieldDecorator('sgFunction', { initialValue: currentItem.sgFunction ? currentItem.sgFunction.split(',') : [] })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Checkbox value="A">编辑器多媒体功能</Checkbox>
                    <Checkbox value="C">媒体功能</Checkbox>
                  </Checkbox.Group>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="申请说明">
                {getFieldDecorator('sgDescription')(
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
                  提交
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={() => window.history.back()}>
                  取消并返回
                </Button>
              </FormItem>
            </Form>
          </Card>
        </PageHeaderWrapper>
      </>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderResult() {
    // const { editResult } = this.props.shopLevelEdit;
    const extra = (
      <Fragment>
        <Button type="primary" onClick={() => window.history.back()}>
          返回列表
        </Button>
      </Fragment>
    );
    return (
      <>
        {this.renderTitle()}
        <GridContent>
          <Card bordered={false}>
            <Result
              status="success"
              title="保存成功"
              subTitle="你提交的信息已经保存成功"
              extra={extra}
              style={{ marginBottom: 16 }}
            >
            </Result>
          </Card>
        </GridContent>
      </>
    )
  }

  render() {
    const { editResult } = this.props.shopLevelEdit;
    if (editResult && editResult.isCommit) {
      return this.renderResult();
    }
    return this.renderForm();
  }
}

export default Form.create<EditLevelProps>()(
  connect(
    ({
       shopLevelEdit,
       loading,
    }: {
      shopLevelEdit: StateType;
      loading: {
        models: {
          [key: string]: boolean;
        };
      };
    }) => ({
      shopLevelEdit,
      loading: loading.models.shopLevelEdit,
  }))(EditLevel),
);
