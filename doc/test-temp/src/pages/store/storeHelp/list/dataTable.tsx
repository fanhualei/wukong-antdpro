import React, { Component, Fragment } from 'react';
import {
  Table,
  Button, Divider, Alert, Popconfirm,
} from 'antd';
import { ColumnProps, TableProps, TableRowSelection } from 'antd/es/table';
import moment from 'moment';
import styles from './style.less';
import { HelpTypeItem } from '../type/data.d'
import { HelpItem, HelpListParams, Pagination } from './data.d';

import { getValue, getOptionName } from '@/utils/Wk/tools'


export interface PageProps {
  helpTypeList:HelpTypeItem[];
  helpList:HelpItem[];
  pagination?: Partial<Pagination>;
  loading:boolean;

  handleTableRefresh?: (params:Partial<HelpListParams>) => void;
  handleTableDelOne?: (id:number) => void;
  handleTableDelMany?: (ids:string) => void;
  handleTableGoEditPage?: (id:number) => void;
}


/**
 * 其实只用selectedRowKeys，就可以了，selectedRowKeys负责显示那些被选中的。
 * 但是为了今后，如果用户想看到底选中了那些数据，可以通过selectedRows来查看。
 */
interface PageState {
  selectedRowKeys: string[]|number[];
  selectedRows: HelpItem[];
}


class DataTable extends Component<PageProps> {
  state: PageState = {
    selectedRowKeys: [],
    selectedRows: [],
  };


  getColumns=(helpTypeList:HelpTypeItem[]) => {
    const columns: ColumnProps<HelpItem>[] = [
      {
        title: '排序',
        dataIndex: 'helpSort',
      },
      {
        title: '帮助名称',
        dataIndex: 'helpTitle',
      },
      {
        title: '帮助类型',
        dataIndex: 'typeId',
        // getOptionName
        render: (val: number) => <span>{getOptionName<HelpTypeItem>(helpTypeList,
          'typeId',
          val,
          'typeName')}</span>,
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.goEditPage(record.helpId)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => this.delOne(record.helpId)}>删除</a>
          </Fragment>
        ),
      },
    ];
    return columns;
  }

  goEditPage=(id:number = 0) => {
    const { handleTableGoEditPage } = this.props
    if (handleTableGoEditPage) {
      handleTableGoEditPage(id);
    }
  }

  delOne=(id:number) => {
    const { handleTableDelOne } = this.props
    if (handleTableDelOne) {
      handleTableDelOne(id);
    }
  }

  delMany=() => {
    const { handleTableDelMany } = this.props
    const { selectedRowKeys } = this.state
    if (handleTableDelMany) {
      handleTableDelMany(selectedRowKeys.join(','));
    }
    this.cleanSelectedKeys();
  }

  handleRowSelectChange: TableRowSelection<HelpItem>['onChange'] = (
    selectedRowKeys,
    selectedRows: HelpItem[],
  ) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    this.setState({
      selectedRows,
      selectedRowKeys,
    })
  };

  handleTableChange: TableProps<HelpItem>['onChange'] = (
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

    const params: Partial<HelpListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    console.log(params)
    const { handleTableRefresh } = this.props;
    if (handleTableRefresh) {
      handleTableRefresh(params)
    }
  };

  cleanSelectedKeys = () => {
    if (this.handleRowSelectChange) {
      this.handleRowSelectChange([], []);
    }
  };

  renderSimpleForm() {
    const { selectedRows } = this.state;
    return (
      <div className={styles.tableAlert}>
        <Alert
          message={
            <Fragment>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRows.length}</a> 项&nbsp;&nbsp;
              <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                清空
              </a>
            </Fragment>
          }
          type="info"
          showIcon
        />
      </div>
    )
  }

  render() {
    const { loading, helpList, pagination, helpTypeList } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection: TableRowSelection<HelpItem> = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };

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
              <Popconfirm title="是否要批量删除选中的记录？" onConfirm={() => this.delMany()}>
                  <Button>批量删除</Button>
              </Popconfirm>
            </span>
          )}
        </div>
        {this.renderSimpleForm()}
        <Table
          rowKey="helpId"
          rowSelection={rowSelection}
          loading={loading}
          dataSource={helpList}
          columns={this.getColumns(helpTypeList)}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </>
    )
  }
}

export default DataTable;
