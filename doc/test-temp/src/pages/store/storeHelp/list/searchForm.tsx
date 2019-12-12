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
// import { HelpTypeItem } from '../type/data.d'

const FormItem = Form.Item;
const { Option } = Select;

export interface PageProps extends FormComponentProps{
  header?:string;
  children?: React.ReactNode;
  helpTypes:[];
}


class SearchForm extends Component<PageProps> {
  /**
   * 重置查询条件，并重新查询
   */
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      console.log(values)
    });
  };

  getTypeOption = (list:[], id:string, name:string) => {
    // const { helpTypes } = this.props;
    // const list = helpTypes;
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
    const { form, helpTypes } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.tableListForm}>
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="帮助标题">
                {getFieldDecorator('helpTitle')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="帮助类型">
                {getFieldDecorator('typeId')(
                  <Select placeholder="请选择" >
                    {this.getTypeOption(helpTypes, 'typeId', 'typeName')}
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
