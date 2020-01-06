import { Form, Input, Modal, Alert } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { Component } from 'react';
import { GoodsBrowseItem } from '@/services/goodsBrowse.d';

const FormItem = Form.Item;

interface EditGoodsBrowseProps extends FormComponentProps {
  modalVisible: boolean;
  currentItem: GoodsBrowseItem;
  handleFromEdit: (clickClose: boolean, values?: {}, callback?: any) => void;
}
interface PageState {
  isError: boolean;
}

class EditGoodsBrowse extends Component<EditGoodsBrowseProps, PageState> {
  constructor(props: Readonly<EditGoodsBrowseProps>) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  /**
   * 保存后的回调函数
   * @param resultNum
   * @param errorMessage
   */
  callbackFromEdit = (resultNum: number, errorMessage?: {}) => {
    if (resultNum <= 0) {
      console.log(errorMessage);
      this.setState({
        isError: true,
      });
    } else {
      this.setState({
        isError: false,
      });
    }
  };

  /**
   * 点击确定按钮
   */
  okHandle = () => {
    const { form, handleFromEdit, currentItem } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleFromEdit(
        false,
        { ...currentItem, ...fieldsValue },
        this.callbackFromEdit,
      );
    });
  };

  /**
   * 根据id得到页面的title,新增或者编辑
   */
  getTitle = (id: number): string => {
    let title: string = '编辑帮助类型';
    if (!id && id === 0) {
      title = '新增帮助类型';
    }
    return title;
  };

  handleClose = () => {
    const { handleFromEdit } = this.props;
    handleFromEdit(true);
    this.setState({
      isError: false,
    });
  };

  /**
   * 显示错误信息
   */
  showError() {
    const { isError } = this.state;
    if (isError) {
      return (
        <Alert
          message="保存错误，请联系管理员"
          type="error"
          style={{ marginBottom: 16 }}
          closable
        />
      );
    }
    return '';
  }

  render() {
    const { form, modalVisible, currentItem } = this.props;
    return (
      <Modal
        title={this.getTitle(currentItem.memberId)}
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={this.handleClose}
        destroyOnClose
      >
        {this.showError()}

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="goodsId"
        >
          {form.getFieldDecorator('goodsId', {
            initialValue: currentItem.goodsId,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="memberId"
        >
          {form.getFieldDecorator('memberId', {
            initialValue: currentItem.memberId,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="browsetime"
        >
          {form.getFieldDecorator('browsetime', {
            initialValue: currentItem.browsetime,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="gcId">
          {form.getFieldDecorator('gcId', {
            initialValue: currentItem.gcId,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="gcId1"
        >
          {form.getFieldDecorator('gcId1', {
            initialValue: currentItem.gcId1,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="gcId2"
        >
          {form.getFieldDecorator('gcId2', {
            initialValue: currentItem.gcId2,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="gcId3"
        >
          {form.getFieldDecorator('gcId3', {
            initialValue: currentItem.gcId3,
          })(<Input placeholder="请输入" />)}
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create<EditGoodsBrowseProps>()(EditGoodsBrowse);
