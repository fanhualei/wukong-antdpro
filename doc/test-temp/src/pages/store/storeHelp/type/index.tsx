import React, { Component, Fragment } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Action, Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, message } from 'antd';
import { StateType as HelpTypeListStateType } from '@/pages/store/storeHelp/type/model';
import { IHandleCellOnBlur, PageHelp } from '@/components/Wk';
import DataTable from './dataTable';
import styles from './style.less';
import EditHelpType from './edit'
import { HelpTypeItem } from '@/pages/store/storeHelp/type/data';

interface PageProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'HelpTypeList/fetch'
      | 'HelpTypeList/deleteOne'
      | 'HelpTypeList/deleteMany'
      | 'HelpTypeList/update'
      >
    >;
  loading: boolean;
  HelpTypeList: HelpTypeListStateType;
}

interface PageState {
  formValues?: { [key: string]: string };
  modalVisible: boolean;
  currentItem: HelpTypeItem;
}

const defaultHelpType: HelpTypeItem = {
  typeId: 0, // 帮助ID
  typeName: '', // 类型名称
  typeSort: 0, // 排序
  helpCode: 'auto', // 调用编号(auto的可删除)
  helpShow: 1, // 是否显示,0为否,1为是,默认为1
  pageShow: 1, // 页面类型:1为店铺,2为会员,默认为1
}

@connect(
  ({
     HelpTypeList,
     loading,
   }: {
    HelpTypeList: HelpTypeListStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    HelpTypeList,
    loading: loading.models.HelpTypeList,
  }),
)


class StoreHelpTypeList extends Component <PageProps, PageState> {
  state: PageState = {
    modalVisible: false,
    currentItem: {
      ...defaultHelpType,
    },
  }

  /**
   * 第一次加载
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'HelpTypeList/fetch',
    });
  }

  /**
   * 刷新列表框
   */
  refreshData=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'HelpTypeList/fetch',
    });
  }

  /**
   * 回调函数-Table-刷新数据
   * @param params
   */
  handleTableRefresh=() => {
    this.refreshData();
  }

  /**
   * 回调函数-Table-删除一条记录
   * @param id
   */
  handleTableDelOne=(typeId:number) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'HelpTypeList/deleteOne',
      payload: { typeId },
      callback: this.callbackChangeDb,
    });
  }

  /**
   * 回调函数-Table-删除多条记录
   * @param ids
   */
  handleTableDelMany=(typeIds:string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'HelpTypeList/deleteMany',
      payload: { typeIds },
      callback: this.callbackChangeDb,
    });
  }

  /**
   * 根基单元格的变更，更改数据库
   * @param itemKey
   * @param fieldName
   * @param value
   * @param rollbackValue
   */
  handleTableCellChange:IHandleCellOnBlur=(itemKey,
                                           fieldName,
                                           value,
                                           rollbackValue,
  ) => {
    const data: any = {
      typeId: itemKey,
    }
    data[fieldName] = value;
    const { dispatch } = this.props;
    dispatch({
      type: 'HelpTypeList/update',
      payload: data,
      callback: (resultNum:number, errorMessage?:{}) => {
        if (!resultNum || resultNum <= 0) {
          rollbackValue(false);
          message.error('修改数据错误，数据回滚', 3)
        } else {
          rollbackValue(true);
        }
        this.callbackChangeDb(resultNum, errorMessage)
      },
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
    let itemToSave:HelpTypeItem;
    if (id > 0) {
      const { HelpTypeList } = this.props
      const { list } = HelpTypeList;
      // eslint-disable-next-line prefer-destructuring
      itemToSave = list.filter(item => item.typeId === id)[0];
    } else {
      itemToSave = { ...defaultHelpType };
    }
    this.setState({
      currentItem: { ...itemToSave },
      modalVisible: true,
    })
  }

  handleFromEdit=(clickClose:boolean, values?:Partial<HelpTypeItem>, callbackFromEdit?:any) => {
    // 点击关闭按钮
    if (clickClose || clickClose === undefined) {
      this.setState({
        modalVisible: false,
      })
      return;
    }
    console.log(clickClose)

    // 将boolean类型转换成整型
    const helpShow:number = (values && values.helpShow) ? 1 : 0;
    const newValues = {
      ...values,
      helpShow,
    }
    const { dispatch } = this.props;
    // 保存信息
    dispatch({
      type: 'HelpTypeList/update',
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
    const { HelpTypeList } = this.props
    const { modalVisible, currentItem } = this.state
    const helpTypeList = HelpTypeList.list
    // console.log(helpTypeList)
    return (
      <Fragment>
        <EditHelpType modalVisible={modalVisible}
                      currentItem={currentItem}
                      handleFromEdit={this.handleFromEdit}
        />
        <PageHelp>系统初始化的类型不能删除<br/>帮助类型排序显示规则为排序小的在前，新增的在前</PageHelp>
        <div className={styles.tableList}>
          <Card bordered={false} >
            <DataTable helpTypeList={helpTypeList}
                       loading={false}
                       handleTableRefresh={this.handleTableRefresh}
                       handleTableDelOne={this.handleTableDelOne}
                       handleTableDelMany={this.handleTableDelMany}
                       handleTableGoEditPage={this.handleTableGoEditPage}
                       handleTableCellChange={this.handleTableCellChange}
            />
          </Card>
        </div>
      </Fragment>
    )
  }
}
export default StoreHelpTypeList;
