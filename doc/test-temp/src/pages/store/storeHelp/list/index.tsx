import React, { Component, Fragment } from 'react';
import { Card } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Action, Dispatch } from 'redux';
import { PageHelp } from '@/components/Wk/PageHelp';
import { StateType as HelpListStateType } from './model';
import { StateType as HelpTypeListStateType } from '../type/model';
import SearchForm from './searchForm'

import { connect } from 'dva';
import styles from './style.less';

interface PageProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'HelpTypeList/fetch'
      | 'HelpList/fetch'
      | 'HelpList/remove'
      >
    >;
  loading: boolean;
  HelpList: HelpListStateType;
  HelpTypeList: HelpTypeListStateType;
}

interface PageState {
  formValues: { [key: string]: string };
}

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


  render() {
    console.log('++++++++++++++++++++++')
    console.log(this.props)

    const { HelpTypeList: { list } } = this.props
    return (
      <Fragment>
        <PageHelp>帮助内容排序显示规则为排序小的在前，新增内容的在前</PageHelp>

        <div className={styles.tableList}>
          <Card bordered={false} >
            <SearchForm helpTypes={list}/>
          </Card>
        </div>
      </Fragment>
    )
  }
}
export default StoreHelpList;
