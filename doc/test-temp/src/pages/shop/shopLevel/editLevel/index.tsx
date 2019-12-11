import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  InputNumber,
  Checkbox, Result,
  Alert,
  Spin,
} from 'antd';
import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import { StateType as editStateType } from './model';
// 下面这行代码，是为了测试一个页面可以关联多个model
import { StateType as listStateType } from '../levelList/model';

const FormItem = Form.Item;
const { TextArea } = Input;


/**
 * 定义了页面props的数据结构
 */
interface EditLevelProps extends FormComponentProps {
  // 定义了数据加载的状态
  loading: boolean;
  // 定义了提交数据加载的状态
  submitting: boolean;
  // 定义了分发的函数
  dispatch: Dispatch<any>;
  // 从model类中得到的类型
  shopLevelEdit: editStateType;
  shopLevelList:listStateType;
  // 从url中需要得到的类型
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
    const sgId:number = location.query && Number(location.query.sgId)
    dispatch({
      type: 'shopLevelEdit/queryShopLevelById',
      payload: { sgId },
    });
  }

  /**
   * 点击返回按钮
   */
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'shopLevelEdit/cleanCommitState',
    });
  }


  /**
   * 点击提交按钮的事件
   * @param e
   */
  // eslint-disable-next-line react/sort-comp
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

  /**
   * 根据id得到页面的title,新增或者编辑
   */
  getTitle():string {
    const { shopLevelEdit: { currentItem } } = this.props;
    let title:string = '编辑店铺等级';
    if (currentItem.sgId && currentItem.sgId === 0) {
      title = '新增店铺等级';
    }
    return title;
  }

  /**
   * 显示页面title
   */
  renderTitle() {
    return (
      <Helmet>
        <title>{this.getTitle()}</title>
        <meta name="description" content={this.getTitle()}/>
      </Helmet>
    )
  }

  /**
   * 显示form输入框
   */
  renderForm() {
    const { submitting, shopLevelEdit: { currentItem } } = this.props;
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
      <Spin spinning={this.props.loading}>
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
                <Button style={{ marginLeft: 8 }}
                        onClick={() => window.history.back()}
                        disabled={submitting}>
                  取消并返回
                </Button>
              </FormItem>
            </Form>
          </Card>
        </PageHeaderWrapper>
      </Spin>
    );
  }

  /**
   * 显示提交结果
   */
  renderResult() {
    const { editResult } = this.props.shopLevelEdit;
    // 返回按钮
    const extra = (
      <Fragment>
        <Button type="primary" onClick={() => window.history.back()}>
          返回列表
        </Button>
      </Fragment>
    );
    // 成功页面的显示信息
    const subTitleOk = (
      <Fragment>
        您提交的信息已经保存成功
      </Fragment>
    );
    // 错误页面的显示信息
    const subTitleError = (
      <Fragment>
        <div style={{ marginBottom: 24 }}>您提交的信息保存失败</div>
        <Alert
          message=""
          description={editResult?.errMessage}
          type="error"
          closable
          className={styles.customText}
        />
      </Fragment>
    );

    return (
      <>
        {this.renderTitle()}
        <GridContent>
          <Card bordered={false}>
            <Result
              status= {editResult?.isSuccess ? 'success' : 'error' }
              title= {editResult?.isSuccess ? '保存成功' : '保存失败' }
              subTitle= {editResult?.isSuccess ? subTitleOk : subTitleError }
              extra={extra}
              style={{ marginBottom: 16 }}
            >
            </Result>
          </Card>
        </GridContent>
      </>
    )
  }

  /**
   * 整个页面的显示逻辑
   */
  render() {
    const { editResult } = this.props.shopLevelEdit;
    console.log(this.props)
    if (editResult && editResult.isCommit) {
      return this.renderResult();
    }
    return this.renderForm();
  }
}

/**
 * 加载form与connect,其中 loading 与 submitting 的状态
 * 分别从 queryShopLevelById 与updateShopLevel得到。
 */
export default Form.create<EditLevelProps>()(
  connect(
    ({
       shopLevelEdit,
       loading,
       shopLevelList,
    }: {
      shopLevelEdit: editStateType;
      loading: {
          effects: {
            [key: string]: boolean;
          };
      };
      shopLevelList:listStateType;
    }) => ({
      shopLevelEdit,
      shopLevelList,
      loading: loading.effects['shopLevelEdit/queryShopLevelById'],
      submitting: loading.effects['shopLevelEdit/updateShopLevel'],
  }))(EditLevel),
);
