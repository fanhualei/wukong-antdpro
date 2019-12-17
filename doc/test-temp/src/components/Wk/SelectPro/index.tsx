import React, { Fragment } from 'react';
import { Select } from 'antd';
import { queryItemById } from '@/utils/Wk/tools'

const { Option } = Select

/**
 * value 与 onChange 是为了form来做的。这个控件建议在from检索框中用
 * https://ant.design/components/form-cn/#components-form-demo-customized-form-controls
 */
export interface SelectProProps<T> {
  dataSource:T[]; // 下拉框的数据源
  idField:string; // id的字段名
  nameField:string; // name的字段名
  placeholder?:string; // 没有选中时的默认值
  value?:number|string; // 初始化value 为form表单使用
  onChange?:any; // onChange事件 为form表单使用
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


  const { placeholder, dataSource, idField, nameField, value, onChange } = props;

  /**
   * 得到当前选中的值，并且把这个传送给父亲onChange事件
   * @param currentValue
   */
  const handleCurrencyChange = (currentValue:number|string) => {
    if (onChange) {
      onChange(currentValue, value)
    }
  }
  // initValue是提前判断一下，传入的数值，是否包含在这个数组中。
  let initValue:number|undefined|string = value;
  if (value && value.constructor === Number) {
    if (undefined === queryItemById(dataSource, idField, Number(value))) {
      initValue = undefined;
    }
  }
  return (
    <Fragment>
      <Select placeholder={placeholder} onChange={handleCurrencyChange} value={initValue}>
        {getOptions(dataSource, idField, nameField)}
      </Select>
    </Fragment>
  );
}
// 默认 Props
SelectPro.defaultProps = {
  placeholder: '请输入',
};
