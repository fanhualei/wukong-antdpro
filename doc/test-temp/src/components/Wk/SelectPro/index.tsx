import React, { Fragment } from 'react';
import { Select } from 'antd';

const { Option } = Select

/**
 * value 与 onChange 是为了form来做的。这个控件建议在from检索框中用
 * https://ant.design/components/form-cn/#components-form-demo-customized-form-controls
 */
export interface SelectProProps<T> {
  dataSource:T[];
  idField:string;
  nameField:string;
  placeholder?:string;
  value?:number|string;
  onChange?:any;
}

export function SelectPro<T>(props:SelectProProps<T>) {
  /**
   * 生成Options的函数
   * @param list
   * @param id
   * @param name
   */
  const getOptions = (list: T[], id: string, name: string) => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item[id]} value={item[id]}>
        {item[name]}
      </Option>
    ));
  };


  const { placeholder, dataSource, idField, nameField, value, onChange} = props;

  /**
   * 得到当前选中的值，并且把这个传送给父亲onChange事件
   * @param currentValue
   */
  const handleCurrencyChange = (currentValue:number|string) => {
    console.log(currentValue)
    if (onChange) {
      onChange(currentValue, value)
    }
  }

  return (
    <Fragment>
      <Select placeholder={placeholder} onChange={handleCurrencyChange} value={value}>
        {getOptions(dataSource, idField, nameField)}
      </Select>
    </Fragment>
  );
}
// 默认 Props
SelectPro.defaultProps = {
  placeholder: '请输入',
};
