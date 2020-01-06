import React, { Component, Fragment } from 'react';
import { Table, Button, Divider, Alert, Popconfirm } from 'antd';
import { ColumnProps, TableProps, TableRowSelection } from 'antd/es/table';
import {
  GoodsBrowseItem,
  Pagination,
  GoodsBrowseListParams,
} from '@/services/goodsBrowse.d';

import { getValue } from '@/utils/Wk/tools';
import styles from './style.less';

export interface PageProps {
  goodsBrowseList: GoodsBrowseItem[];
  pagination?: Partial<Pagination>;
  loading: boolean;

  handleTableRefresh?: (params: Partial<GoodsBrowseListParams>) => void;
  handleTableDelOne?: (id: number) => void;
  handleTableDelMany?: (ids: string) => void;
  handleTableGoEditPage?: (id: number) => void;
}

/**
 * 其实只用selectedRowKeys，就可以了，selectedRowKeys负责显示那些被选中的。
 * 但是为了今后，如果用户想看到底选中了那些数据，可以通过selectedRows来查看。
 */
interface PageState {
  selectedRowKeys: string[] | number[];
  selectedRows: GoodsBrowseItem[];
}

class DataTable extends Component<PageProps> {
  state: PageState = {
    selectedRowKeys: [],
    selectedRows: [],
  };

  /**
   * 得到列的属性定义
   * @param goodsBrowseList
   */
  getColumns = () => {
    const columns: ColumnProps<GoodsBrowseItem>[] = [
      {
        title: 'goodsId',
        dataIndex: 'goodsId',
      },

      {
        title: 'memberId',
        dataIndex: 'memberId',
      },

      {
        title: 'browsetime',
        dataIndex: 'browsetime',
      },

      {
        title: 'gcId',
        dataIndex: 'gcId',
      },

      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.goEditPage(record.memberId)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm
              title="是否要删除此记录？"
              onConfirm={() => this.delOne(record.memberId)}
            >
              <a>删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ];
    return columns;
  };

  /**
   * 跳转到编辑页面
   * @param id
   */
  goEditPage = (id: number = 0) => {
    const { handleTableGoEditPage } = this.props;
    if (handleTableGoEditPage) {
      handleTableGoEditPage(id);
    }
  };

  /**
   * 删除一个记录
   * @param id
   */
  delOne = (id: number) => {
    const { handleTableDelOne } = this.props;
    if (handleTableDelOne) {
      handleTableDelOne(id);
    }
  };

  /**
   * 删除多个记录
   */
  delMany = () => {
    const { handleTableDelMany } = this.props;
    const { selectedRowKeys } = this.state;
    if (handleTableDelMany) {
      handleTableDelMany(selectedRowKeys.join(','));
    }
    this.cleanSelectedKeys();
  };

  /**
   * 点击行选择框的事件
   * @param selectedRowKeys
   * @param selectedRows
   */
  handleRowSelectChange: TableRowSelection<GoodsBrowseItem>['onChange'] = (
    selectedRowKeys,
    selectedRows: GoodsBrowseItem[],
  ) => {
    this.setState({
      selectedRows,
      selectedRowKeys,
    });
  };

  /**
   * 点击表格分页、排序、筛选的属性
   * @param pagination
   * @param filtersArg
   * @param sorter
   * @param rest
   */
  handleTableChange: TableProps<GoodsBrowseItem>['onChange'] = (
    pagination,
    filtersArg,
    sorter,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...rest
  ) => {
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<GoodsBrowseListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    const { handleTableRefresh } = this.props;
    if (handleTableRefresh) {
      handleTableRefresh(params);
    }
  };

  /**
   * 清除选中标记
   */
  cleanSelectedKeys = () => {
    if (this.handleRowSelectChange) {
      this.handleRowSelectChange([], []);
    }
  };

  /**
   * 选中状态提示框
   */
  renderSimpleForm() {
    const { selectedRows } = this.state;
    return (
      <div className={styles.tableAlert}>
        <Alert
          message={
            <Fragment>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRows.length}</a>{' '}
              项&nbsp;&nbsp;
              <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                清空
              </a>
            </Fragment>
          }
          type="info"
          showIcon
        />
      </div>
    );
  }

  /**
   * 刷新页面主程序
   */
  render() {
    const { loading, pagination, goodsBrowseList } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection: TableRowSelection<GoodsBrowseItem> = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };
    // console.log(goodsBrowseList)

    const paginationProps = pagination
      ? {
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: number) => `共有 ${total} 记录`,
          ...pagination,
        }
      : false;

    return (
      <>
        <div className={styles.tableListOperator}>
          <Button icon="plus" type="primary" onClick={() => this.goEditPage()}>
            新建
          </Button>
          {selectedRowKeys.length > 0 && (
            <span>
              <Popconfirm
                title="是否要批量删除选中的记录？"
                onConfirm={() => this.delMany()}
              >
                <Button>批量删除</Button>
              </Popconfirm>
            </span>
          )}
        </div>
        {this.renderSimpleForm()}
        <Table
          rowKey="memberId"
          rowSelection={rowSelection}
          loading={loading}
          dataSource={goodsBrowseList}
          columns={this.getColumns()}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </>
    );
  }
}

export default DataTable;
