import React, { Component, Fragment } from 'react';
import { Card } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Action, Dispatch } from 'redux';
import { connect } from 'dva';
import { PageHelp } from '@/components/Wk/PageHelp';
import { StateType as HelpListStateType } from './model';
import { StateType as HelpTypeListStateType } from '../type/model';
import SearchForm from './searchForm'
import DataTable from './dataTable'

import styles from './style.less';
import { HelpListParams } from './data.d';

interface PageProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'HelpTypeList/fetch'
      | 'HelpList/fetch'
      | 'HelpList/deleteOne'
      | 'HelpList/deleteMany'
      >
    >;
  loading: boolean;
  HelpList: HelpListStateType;
  HelpTypeList: HelpTypeListStateType;
}

interface PageState {
  formValues: { [key: string]: string };
}


// 两个全局变量，保存from与table的查询参数
let pageFromParams:any = {};
let pageTableParams:any = {};

@connect(
  ({
     HelpList,
     HelpTypeList,
     loading,
   }: {
    HelpList: HelpListStateType;
    HelpTypeList: HelpTypeListStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    HelpList,
    HelpTypeList,
    loading: loading.models.HelpList,
  }),
)
class StoreHelpList extends Component<PageProps, PageState> {
  /**
   * 第一次加载
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'HelpTypeList/fetch',
    });
    dispatch({
      type: 'HelpList/fetch',
    });
  }

  refreshData=() => {
    const { dispatch } = this.props;
    const params: Partial<HelpListParams> = {
        ...pageFromParams,
        ...pageTableParams,
    }
    dispatch({
      type: 'HelpList/fetch',
      payload: params,
    });
  }

  /**
   * 获得检索条件
   * @param values
   */
  handleFormSearch = (values:{}) => {
    pageFromParams = values;
    this.refreshData();
  };

  /**
   * 回调函数-Table-刷新数据
   * @param params
   */
  handleTableRefresh=(params:Partial<HelpListParams>) => {
    pageTableParams = params;
    this.refreshData();
  }

  /**
   * 回调函数-Table-删除一条记录
   * @param id
   */
  handleTableDelOne=(helpId:number) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'HelpList/deleteOne',
      payload: { helpId },
      callback: this.callbackChangeDb,
    });
  }

  /**
   * 回调函数-Table-删除多条记录
   * @param ids
   */
  handleTableDelMany=(helpIds:string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'HelpList/deleteMany',
      payload: { helpIds },
      callback: this.callbackChangeDb,
    });
  }

  callbackChangeDb=(resultNum:number, message?:{}) => {
    console.log(resultNum)
    console.log(message)
    if (resultNum && resultNum > 0) {
      this.refreshData();
    }
  }

  /**
   * 回调函数-Table-跳转到编辑框
   * @param id
   */
  handleTableGoEditPage=(id:number) => {
    console.log(id)
  }


  render() {
    const { HelpTypeList, HelpList } = this.props
    const helpTypeList = HelpTypeList.list
    const helpList = HelpList.list
    const { pagination } = HelpList
    return (
      <Fragment>
        <PageHelp>帮助内容排序显示规则为排序小的在前，新增内容的在前</PageHelp>
        <div className={styles.tableList}>
          <Card bordered={false} >
            <SearchForm helpTypeList={helpTypeList} handleFormSearch={this.handleFormSearch}/>
            <DataTable helpTypeList={helpTypeList}
                       helpList={helpList}
                       loading={false}
                       pagination={pagination}
                       handleTableRefresh={this.handleTableRefresh}
                       handleTableDelOne={this.handleTableDelOne}
                       handleTableDelMany={this.handleTableDelMany}
                       handleTableGoEditPage={this.handleTableGoEditPage}
            />
          </Card>
        </div>
      </Fragment>
    )
  }
}
export default StoreHelpList;
