import {
  Form,
  Input,
  Modal,
} from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { Component } from 'react';

const FormItem = Form.Item;

interface EditActivityProps extends FormComponentProps {
  modalVisible: boolean;
  currentItem: {title:string};
  handleFromEdit: (clickClose:boolean) => void;
}


class EditActivity extends Component<EditActivityProps> {


  okHandle = () => {
    const { handleFromEdit } = this.props;
    handleFromEdit(true);
  };


  handleClose=() => {
    const { handleFromEdit } = this.props;
    handleFromEdit(true);
  }


  render() {
    const { form, modalVisible, currentItem } = this.props;
    console.log(currentItem)
    return (
      <Modal
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={this.handleClose}
        destroyOnClose
      >
        {currentItem.title}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型名称">
          {form.getFieldDecorator('title', {
            initialValue: currentItem.title,
          })(<Input placeholder="请输入"/>)}
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create<EditActivityProps>()(EditActivity);
