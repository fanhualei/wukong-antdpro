import React, { Component } from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import styles from './style.less';
import { HelpTypeItem } from '../type/data.d'

const FormItem = Form.Item;
const { Option } = Select;


interface handleFormSearchType{
  (values:{}):void
}

export interface PageProps extends FormComponentProps{
  helpTypeList:HelpTypeItem[];
  handleFormSearch:handleFormSearchType;
}


class SearchForm extends Component<PageProps> {
  /**
   * 重置查询条件，并重新查询
   */
  handleFormReset = () => {
    const { form, handleFormSearch } = this.props;
    form.resetFields();
    handleFormSearch({})
  };

  /**
   * 点击查询按钮
   * @param e
   */
  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, handleFormSearch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      handleFormSearch(values)
    });
  };

  /**
   * 得到一个下拉框数组
   * @param list 下拉框内容
   * @param id   编号
   * @param name 名称
   */
  getOptions = (list: HelpTypeItem[], id: string, name: string) => {
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

  render() {
    const { form, helpTypeList } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.tableListForm}>
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="帮助标题">
                {getFieldDecorator('helpTitle')(<Input placeholder="请输入" allowClear />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="帮助类型">
                {getFieldDecorator('typeId')(
                  <Select placeholder="请选择" allowClear>
                    {this.getOptions(helpTypeList, 'typeId', 'typeName')}
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
              </span>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create<PageProps>()(SearchForm);
