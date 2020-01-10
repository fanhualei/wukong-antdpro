import { Form, Input, Modal, Alert } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { Component } from 'react';
import { ActivityItem } from '@/services/activity.d';

const FormItem = Form.Item;

interface EditActivityProps extends FormComponentProps {
  modalVisible: boolean;
  currentItem: ActivityItem;
  handleFromEdit: (clickClose: boolean, values?: {}, callback?: any) => void;
}
interface PageState {
  isError: boolean;
}

class EditActivity extends Component<EditActivityProps, PageState> {
  constructor(props: Readonly<EditActivityProps>) {
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
        title={this.getTitle(currentItem.activityId)}
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={this.handleClose}
        destroyOnClose
      >
        {this.showError()}

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="activityTitle"
        >
          {form.getFieldDecorator('activityTitle', {
            initialValue: currentItem.activityTitle,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="activityType"
        >
          {form.getFieldDecorator('activityType', {
            initialValue: currentItem.activityType,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="activityBanner"
        >
          {form.getFieldDecorator('activityBanner', {
            initialValue: currentItem.activityBanner,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="activityStyle"
        >
          {form.getFieldDecorator('activityStyle', {
            initialValue: currentItem.activityStyle,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="activityDesc"
        >
          {form.getFieldDecorator('activityDesc', {
            initialValue: currentItem.activityDesc,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="activityStartDate"
        >
          {form.getFieldDecorator('activityStartDate', {
            initialValue: currentItem.activityStartDate,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="activityEndDate"
        >
          {form.getFieldDecorator('activityEndDate', {
            initialValue: currentItem.activityEndDate,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="activitySort"
        >
          {form.getFieldDecorator('activitySort', {
            initialValue: currentItem.activitySort,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="activityState"
        >
          {form.getFieldDecorator('activityState', {
            initialValue: currentItem.activityState,
          })(<Input placeholder="请输入" />)}
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create<EditActivityProps>()(EditActivity);
