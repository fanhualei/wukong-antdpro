import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  InputNumber,
  Result,
  Alert,
  Spin, Row, Col,
} from 'antd';
import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';
import styles from './style.less';
import { StateType as editStateType } from './model';
// 下面这行代码，为了得到下拉框帮助类型
import { StateType as HelpTypeListStateType } from '../../type/model';
import { SelectPro } from '@/components/Wk'
import { HelpTypeItem } from '@/pages/store/storeHelp/type/data';

import 'braft-editor/dist/index.css';

const FormItem = Form.Item;


/**
 * 定义了页面props的数据结构
 */
interface EditHelpProps extends FormComponentProps {
  // 定义了数据加载的状态
  loading: boolean;
  // 定义了提交数据加载的状态
  submitting: boolean;
  // 定义了分发的函数
  dispatch: Dispatch<any>;
  // 从model类中得到的类型
  HelpEdit: editStateType;
  HelpTypeList:HelpTypeListStateType;
  // 从url中需要得到的类型
  location: {
    query: {
      helpId: number;
    };
  };
}

class EditHelp extends Component<EditHelpProps> {
  /**
   * 第一次加载
   */
  componentDidMount() {
    const { dispatch, location } = this.props;
    const helpId:number = location.query && Number(location.query.helpId)
    dispatch({
      type: 'HelpEdit/queryHelpById',
      payload: { helpId },
      callback: this.queryHelpCallback,
    });
  }

  /**
   * 点击返回按钮
   */
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'HelpEdit/cleanCommitState',
    });
  }

  /**
   * 点击提交按钮的事件
   * @param e
   */
  // eslint-disable-next-line react/sort-comp
  handleSubmit = (e: React.FormEvent) => {
    // 得到currentItem,也就是最原始的数据,这里有只取到主键与更新的字段。
    const { dispatch, form, HelpEdit: { currentItem } } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const helpInfo = values.content.toRAW();
      const payload = {
        ...currentItem,
        ...values,
        helpInfo,
      }
      if (!err) {
        dispatch({
          type: 'HelpEdit/updateHelp',
          payload,
        });
      }
    });
  };

  /**
   * 根据id得到页面的title,新增或者编辑
   */
  getTitle():string {
    const { HelpEdit: { currentItem } } = this.props;
    let title:string = '编辑帮助内容';
    if (currentItem.helpId && currentItem.helpId === 0) {
      title = '新增帮助内容';
    }
    return title;
  }

  /**
   * 回调函数，给编辑框写入数据
   */
  queryHelpCallback =() => {
    const {
      form: { setFieldsValue }, HelpEdit: { currentItem } } = this.props;
    if (currentItem && currentItem.helpInfo) {
      const content = BraftEditor.createEditorState(currentItem.helpInfo);
      setFieldsValue({
        content,
      })
    }
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
    const { submitting, HelpEdit: { currentItem }, HelpTypeList } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Spin spinning={this.props.loading}>
        {this.renderTitle()}
        <PageHeaderWrapper title={this.getTitle()} backIcon={<Icon type="arrow-left" />} onBack={() => window.history.back()} >
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <GridContent>
              <Row gutter={24}>
                <Col lg={17} md={24}>
                  <Card bordered={false}>
                    <FormItem>
                      {getFieldDecorator('content', {
                        validateTrigger: 'onBlur',
                        rules: [{
                          validator: (_, value, callback) => {
                            if (value.isEmpty()) {
                              callback('请输入正文内容')
                            } else {
                              callback()
                            }
                          },
                        }],
                      })(
                        <BraftEditor
                          className={styles.myEditor}
                          placeholder="请输入正文内容"
                        />,
                       )}
                     </FormItem>
                  </Card>
                </Col>
                <Col lg={7} md={24}>
                  <Card bordered={false}>
                      <FormItem label="帮助标题" >
                        {getFieldDecorator('helpTitle', {
                          initialValue: currentItem.helpTitle,
                          rules: [
                            {
                              required: true,
                              message: '帮助标题必须输入',
                            },
                          ],
                        })(<Input placeholder="请输入帮助标题" />)}
                      </FormItem>

                      <FormItem label="帮助类型" >
                        {getFieldDecorator('typeId', {
                          initialValue: currentItem.typeId,
                          rules: [
                            {
                              required: true,
                              message: '帮助类型必须输入',
                            },
                          ],
                        })(
                          <SelectPro<HelpTypeItem> nameField="typeName" dataSource={HelpTypeList.list} idField="typeId"/>,
                        )}
                      </FormItem>


                      <FormItem label="排序" extra="数字范围为0~255，数字越小越靠前">
                        {getFieldDecorator('helpSort', { initialValue: currentItem.helpSort })(
                          <InputNumber
                            style={{ width: 110 }}
                            min={0}
                            max={100}
                            precision={0}
                          />,
                        )}
                      </FormItem>

                      <FormItem label="链接地址" extra="填写后点击标题将直接跳转至链接地址 链接格式请以http://开头">
                        {getFieldDecorator('helpUrl', {
                          initialValue: currentItem.helpUrl,
                          rules: [
                            {
                              type: 'url',
                              message: '输入的链接地址不符合URL规范',
                            },
                          ],
                        })(<Input placeholder="填写后点击标题将直接跳转至链接地址" />)}
                      </FormItem>
                      <FormItem style={{ marginTop: 32 }}>
                        <Button type="primary" htmlType="submit" loading={submitting}>
                          提交
                        </Button>
                        <Button style={{ marginLeft: 8 }}
                                onClick={() => window.history.back()}
                                disabled={submitting}>
                          取消并返回
                        </Button>
                      </FormItem>
                  </Card>
                </Col>
              </Row>
            </GridContent>
          </Form>
        </PageHeaderWrapper>
      </Spin>
    );
  }

  /**
   * 显示提交结果
   */
  renderResult() {
    const { editResult } = this.props.HelpEdit;
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
    const { editResult } = this.props.HelpEdit;
    // console.log(this.props)
    if (editResult && editResult.isCommit) {
      return this.renderResult();
    }
    return this.renderForm();
  }
}

/**
 * 加载form与connect,其中 loading 与 submitting 的状态
 * 分别从 queryHelpById 与updateHelp得到。
 */
export default Form.create<EditHelpProps>()(
  connect(
    ({
       HelpEdit,
       loading,
       HelpTypeList,
    }: {
      HelpEdit: editStateType;
      loading: {
          effects: {
            [key: string]: boolean;
          };
      };
      HelpTypeList:HelpTypeListStateType;
    }) => ({
      HelpEdit,
      HelpTypeList,
      loading: loading.effects['HelpEdit/queryHelpById'],
      submitting: loading.effects['HelpEdit/updateHelp'],
  }))(EditHelp),
);
