import {
  Button,
  Card,
  Col,
  Table,
  Divider,
  Form,
  Input,
  Row,
  Popconfirm,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult, ColumnProps } from 'antd/es/table';
import { connect } from 'dva';
import { StateType } from './model';
import { StoreGradeItem, Pagination, StoreGradeListParams } from '../data.d';

import styles from './style.less';
import { router, Link } from 'umi';

const FormItem = Form.Item;

interface PageProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'StoreGradeList/fetch'
      | 'StoreGradeList/remove'
      >
    >;
  loading: boolean;
  StoreGradeList: StateType;
}

interface PageState {
  formValues: { [key: string]: string };
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
     StoreGradeList,
     loading,
   }: {
    StoreGradeList: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    StoreGradeList,
    loading: loading.models.StoreGradeList,
  }),
)
class StoreGradeListPage extends Component<PageProps, PageState> {
  state: PageState = {
    formValues: {},
  };

  columns: ColumnProps<StoreGradeItem>[] = [
    {
      title: '级别',
      dataIndex: 'sgSort',
    },
    {
      title: '等级名称',
      dataIndex: 'sgName',
    },
    {
      title: '可发布商品数',
      dataIndex: 'sgGoodsLimit',
      sorter: true,
      align: 'right',
    },
    {
      title: '可上传图片数',
      dataIndex: 'sgAlbumLimit',
      sorter: true,
      align: 'right',
    },
    {
      title: '可选模板套数',
      dataIndex: 'sgTemplateNumber',
      sorter: true,
      align: 'right',
    },
    {
      title: '收费标准',
      dataIndex: 'sgPrice',
      sorter: true,
      align: 'right',
      render: (val: string) => `${val} 元/年`,
    },
    {
      title: '操作',
      render: (text: any, record: any) => {
        const goUrl = `/store/storeGrade/edit?sgId=${record.sgId}`
        return (
        <Fragment>
          <Link to={goUrl}>编辑</Link>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除此记录？" onConfirm={() => this.remove(record.sgId)}>
            <a>删除</a>
          </Popconfirm>
        </Fragment>
      )
      },
    },
  ];

  /**
   * 第一次加载
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'StoreGradeList/fetch',
    });
  }

  remove=(sgId: number) => {
    console.log(sgId)
    const { dispatch } = this.props;
    dispatch({
      type: 'StoreGradeList/remove',
      payload: {
        sgId,
      },
    });
  }


  /**
   * 表格事件被触发：例如 点击表头排序，点击表头筛选，点击分页控件，变更每页的数量
   {
     currentPage: 1
     pageSize: 10
     sgName: "1"
     sorter: "sgTemplateNumber_ascend"
     updatedAt: undefined
   }
   * @param pagination 当前分页信息
   * @param filtersArg 过滤信息的参数,可以在表头做筛选，这里用不上。
   * @param sorter     排序
   */
  handleStandardTableChange = (
    pagination: Partial<Pagination>,
    filtersArg: Record<keyof StoreGradeItem, string[]>,
    sorter: SorterResult<StoreGradeItem>,
  ) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params: Partial<StoreGradeListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };
    // 每次只能按一个字段排序
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'StoreGradeList/fetch',
      payload: params,
    });
  };

  /**
   * 重置查询条件，并重新查询
   */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'StoreGradeList/fetch',
      payload: {},
    });
  };

  /**
   * 条件检索
   * @param e
   */
  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'StoreGradeList/fetch',
        payload: values,
      });
    });
  };

  addNew=() => {
    router.push('/store/storeGrade/edit?sgId=0');
  };

  /**
   * 检索窗口的html
   */
  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="等级名称">
              {getFieldDecorator('sgName')(<Input placeholder="请输入" />)}
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
    );
  }

  render() {
    // 从props中得到数据以及当前检索状态
    const {
      StoreGradeList: { data },
      loading,
    } = this.props;

    // 优化了分页，显示总记录数、可跳转、可变分页。
    const paginationProps = data.pagination
      ? {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number) => `共有 ${total} 记录`,
        ...data.pagination,
      }
      : false;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/* 查询表格 */}
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            {/* 新建按钮 */}
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.addNew}>
                新建
              </Button>
            </div>
            {/* 表格控件 */}
            <Table
              rowKey="sgId"
              loading={loading}
              dataSource={data.list}
              pagination={paginationProps}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<PageProps>()(StoreGradeListPage);
