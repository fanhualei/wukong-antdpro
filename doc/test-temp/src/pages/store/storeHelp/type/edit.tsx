import {
  Form,
  Input, InputNumber,
  message,
  Modal,
  Switch,
} from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { HelpTypeItem } from './data.d';

const FormItem = Form.Item;

interface EditHelpTypeProps extends FormComponentProps {
  modalVisible: boolean;
  currentItem: HelpTypeItem;
  handleFromEdit: (save:boolean, values?:{}, callback?:any) => void;
}
const EditHelpType: React.FC<EditHelpTypeProps> = props => {
  const { form, modalVisible, handleFromEdit, currentItem } = props;
  /**
   * 错误的回调函数
   * @param resultNum
   * @param errorMessage
   */
  const callback = (resultNum:number, errorMessage?:{}) => {
    console.log('---------------------------------------------------------')
    console.log(resultNum)
    if (!resultNum || resultNum <= 0) {
      message.error('修改数据错误，数据回滚', 3)
    } else {
      handleFromEdit(false);
    }
  }
  /**
   * 点击确定按钮
   */
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleFromEdit(true, { ...currentItem, ...fieldsValue }, callback);
    });
  };
  /**
   * 根据id得到页面的title,新增或者编辑
   */
  const getTitle = ():string => {
    let title:string = '编辑帮助类型';
    if (!currentItem.typeId && currentItem.typeId === 0) {
      title = '新增帮助类型';
    }
    return title;
  }
  return (
    <Modal
      destroyOnClose
      title={getTitle()}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleFromEdit(false)}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型名称">
        {form.getFieldDecorator('typeName', {
          initialValue: currentItem.typeName,
          rules: [{ required: true, message: '请输入至少五个字符！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否显示">
        {form.getFieldDecorator('helpShow', {
          valuePropName: 'checked',
          initialValue: currentItem.helpShow,
          })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序"
                extra="数字范围为0~255，数字越小越靠前">
        {form.getFieldDecorator('typeSort', { initialValue: currentItem.typeSort })(
          <InputNumber
            style={{ width: 110 }}
            min={0}
            max={100}
            precision={0}
          />,
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<EditHelpTypeProps>()(EditHelpType);
