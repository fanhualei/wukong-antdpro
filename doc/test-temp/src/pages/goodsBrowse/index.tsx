import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Action, Dispatch } from 'redux';
import { connect } from 'dva';
import { Card } from 'antd';
import { GoodsBrowseListStateType } from './model';
import { PageHelp } from '@/components/Wk';
import DataTable from './dataTable';
import styles from './style.less';
import EditGoodsBrowse from './edit'
import { GoodsBrowseItem, GoodsBrowseListParams } from '@/services/goodsBrowse.d';
import { defaultGoodsBrowseItem } from '@/services/goodsBrowseService';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SearchForm from './searchForm';

interface PageProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'GoodsBrowseList/fetch'
      | 'GoodsBrowseList/deleteOne'
      | 'GoodsBrowseList/deleteMany'
      | 'GoodsBrowseList/update'
      >
    >;
  loading: boolean;
  GoodsBrowseList: GoodsBrowseListStateType;
}

interface PageState {
  formValues?: { [key: string]: string };
  modalVisible: boolean;
  currentItem: GoodsBrowseItem;
}

const defaultGoodsBrowse: GoodsBrowseItem = {
  ...defaultGoodsBrowseItem,
}

@connect(
  ({
     GoodsBrowseList,
     loading,
   }: {
    GoodsBrowseList: GoodsBrowseListStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    GoodsBrowseList,
    loading: loading.models.GoodsBrowseList,
  }),
)


class GoodsBrowseListPage extends Component <PageProps, PageState> {
  state: PageState = {
    modalVisible: false,
    currentItem: {
      ...defaultGoodsBrowse,
    },
  }

  // 两个变量，保存from与table的查询参数
  refreshParam ={
    pageFromParams: {},
    pageTableParams: {},
  }

  /**
   * 第一次加载
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'GoodsBrowseList/fetch',
    });
  }

  /**
   * 刷新列表框
   */
  refreshData=() => {
    const { dispatch } = this.props;
    const { pageFromParams, pageTableParams } = this.refreshParam;
    const params: Partial<GoodsBrowseListParams> = {
      ...pageFromParams,
      ...pageTableParams,
    }
    dispatch({
      type: 'GoodsBrowseList/fetch',
      payload: params,
    });
  }

  /**
   * 回调函数-Table-刷新数据
   * @param params
   */
  handleTableRefresh=(params:Partial<GoodsBrowseListParams>) => {
    this.refreshParam.pageTableParams = params;
    this.refreshData();
  }

  /**
   * 获得检索条件
   * @param values
   */
  handleFormSearch = (values:{}) => {
    this.refreshParam.pageFromParams = values;
    this.refreshData();
  };

  /**
   * 回调函数-Table-删除一条记录
   * @param id
   */
  handleTableDelOne=(memberId:number) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'GoodsBrowseList/deleteOne',
      payload: { memberId },
      callback: this.callbackChangeDb,
    });
  }

  /**
   * 回调函数-Table-删除多条记录
   * @param ids
   */
  handleTableDelMany=(memberIds:string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'GoodsBrowseList/deleteMany',
      payload: { memberIds },
      callback: this.callbackChangeDb,
    });
  }

  /**
   * 刷线数据
   * @param resultNum
   * @param message
   */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  callbackChangeDb=(resultNum:number, errorMessage?:{}) => {
    if (resultNum && resultNum > 0) {
      this.refreshData();
    }
  }

  /**
   * 回调函数-Table-跳转到编辑框
   * @param id
   */
  handleTableGoEditPage=(id:number) => {
    let itemToSave:GoodsBrowseItem;
    if (id > 0) {
      const { GoodsBrowseList } = this.props
      const { list } = GoodsBrowseList;
      // eslint-disable-next-line prefer-destructuring
      itemToSave = list.filter(item => item.memberId === id)[0];
    } else {
      itemToSave = { ...defaultGoodsBrowse };
    }

    this.setState({
      modalVisible: true,
      currentItem: { ...itemToSave },
    })
  }

  handleFromEdit=(clickClose:boolean, values?:Partial<GoodsBrowseItem>, callbackFromEdit?:any) => {
    // 点击关闭按钮
    if (clickClose || clickClose === undefined) {
      this.setState({
        modalVisible: false,
      })
      return;
    }
    const newValues = {
      ...values,
    }
    const { dispatch } = this.props;
    // 保存信息
    dispatch({
      type: 'GoodsBrowseList/update',
      payload: newValues,
      callback: (resultNum:number, errorMessage?:{}) => {
        if (resultNum > 0) {
          this.setState({
            modalVisible: false,
          })
          this.refreshData();
        }
        if (callbackFromEdit) {
          callbackFromEdit(resultNum, errorMessage)
        }
      },
    });
  }


  render() {
    const { GoodsBrowseList } = this.props
    const { modalVisible, currentItem } = this.state
    const goodsBrowseList = GoodsBrowseList.list
    // console.log(goodsBrowseList)
    return (
      <PageHeaderWrapper>
        <EditGoodsBrowse modalVisible={modalVisible}
                      currentItem={currentItem}
                      handleFromEdit={this.handleFromEdit}
        />

        <PageHelp>系统初始化的类型不能删除<br/>帮助类型排序显示规则为排序小的在前，新增的在前</PageHelp>

        <div className={styles.tableList}>
          <Card bordered={false}>
            <SearchForm handleFormSearch={this.handleFormSearch}/>
            <DataTable goodsBrowseList={goodsBrowseList}
                       loading={false}
                       handleTableRefresh={this.handleTableRefresh}
                       handleTableDelOne={this.handleTableDelOne}
                       handleTableDelMany={this.handleTableDelMany}
                       handleTableGoEditPage={this.handleTableGoEditPage}
                       pagination={GoodsBrowseList.pagination}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    )
  }
}
export default GoodsBrowseListPage;
