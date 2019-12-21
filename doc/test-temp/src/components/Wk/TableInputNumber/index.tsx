import React, { Fragment, Component } from 'react';
import { InputNumber } from 'antd';


/**
 * 父亲窗口放回的函数
 * ture表示成功，false表示要返回原始数值
 */
interface IRollbackValue {
  (success:boolean): void;
}

/**
 * 离开cell焦点的接口
 * itemKey：主键
 * value：当前value
 * callback:父亲窗口放回的函数
 */
export interface IHandleCellOnBlur {
  (
    itemKey: number, // 主键的值
    fieldName:string, // 要更新的字段名称
    value: number | string | undefined, // 要更新的属性
    rollbackValue: IRollbackValue, // 回调函数
  ): void;
}

/**
 * 输入内容
 */
interface TableInputNumberProps {
  value: number|undefined; // 默认值
  itemKey: number; // 主键的值
  fieldName:string; // 要更新的字段名称
  handleCellOnBlur: IHandleCellOnBlur; // 父组件要处理的回调函数
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  onChange?:any;
}

/**
 * 双向绑定input的state
 */
interface pageState {
  value?: number|undefined;
  oldValue?: number|undefined; // 如果数值校验出现错误，用这个来回滚
}


export class TableInputNumber extends Component<TableInputNumberProps, pageState> {
  constructor(props: Readonly<TableInputNumberProps>) {
    super(props);
    const { value } = this.props;
    this.state = {
      value,
      oldValue: value,
    }
  }

  /**
   * 调用了这个属性，修改了不能及时刷新的情况
   * 这个控件不是太完美，尽量不用
   */
  componentWillReceiveProps() {
    const { value } = this.props;
    if (value !== this.state.value) {
      this.state = {
        value,
        oldValue: value,
      }
    }
  }

  rollbackValue = (success:boolean) => {
    console.log('被外层调用，返回上一个数值')
    const { oldValue, value } = this.state;
    if (success) {
      this.setState({
        oldValue: value,
      })
    }else {
      this.setState({
        value: oldValue,
      })
    }
  }

  /**
   * 处理焦点离开事件
   * @param e
   */
  handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { itemKey, handleCellOnBlur, fieldName, value } = this.props;
    // 如果输入的为空，那么就不变
    if (!e.target.value) {
      this.setState({
        value,
      })
      return;
    }
    // 如果值没有变更，就不处理
    if (Number(e.target.value) === this.state.oldValue) {
      return
    }
    if (handleCellOnBlur) {
      handleCellOnBlur(itemKey, fieldName, e.target.value, this.rollbackValue)
    }
  }

  /**
   * 绑定当前输入框的onChange事件
   * 将最新的数值输入到state中，并且将事件反向绑定到父亲组件中（这个在form中会用到）
   * @param currentValue
   */
  handleOnChange=(currentValue:number|undefined) => {
    this.setState({
      value: currentValue,
    })
    const { onChange, value } = this.props
    if (onChange) {
      onChange(currentValue, value)
    }
  }


  render() {
    const { min, max, step, precision } = this.props
    return (
      <Fragment>
        <InputNumber
          value={this.state.value}
          onBlur={e => this.handleOnBlur(e)}
          onChange={this.handleOnChange}
          min={min && min}
          max={max && max}
          step={step && step}
          precision={precision && precision}
          parser={displayValue => (displayValue ? displayValue.replace(/[^0-9]/ig, '') : '')}
        />
      </Fragment>
    );
  }
}
