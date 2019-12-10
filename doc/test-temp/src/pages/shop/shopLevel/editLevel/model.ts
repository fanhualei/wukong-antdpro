import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ShopLevelItem } from '../data.d';
import { queryShopLevelById, updateShopLevel } from '../service';

/**
 * 这个好像是通用的，那个model都有
 */
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

/**
 * 定义了编辑界面返回的数据结构
 */
export interface EditResultType {
  // 是否点击了提交按钮
  isCommit?:boolean;
  // 是否保存成功
  isSuccess?:boolean;
  // 服务器返回的错误信息
  errMessage?:string;
}

/**
 * 定义了编辑页面的state结构
 */
export interface StateType {
  // 点击提交按钮后的状态
  editResult?:EditResultType;
  // 从数据库检索出来的数据结构
  currentItem:ShopLevelItem;
}

/**
 * 默认的数据结构
 */
const defaultShopLevelItem:ShopLevelItem = {
  sgId: 0,
  sgName: '',
  sgGoodsLimit: 100,
  sgAlbumLimit: 100,
  sgSpaceLimit: 100,
  sgTemplateNumber: 5,
  sgPrice: 1000,
  sgSort: 0,
}

/**
 * 默认的状态值
 */
const defaultEditResult:EditResultType = {
  isCommit: false,
  isSuccess: true,
  errMessage: '',
}

/**
 * 定义了model的数据结构
 */
export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    queryShopLevelById: Effect;
    updateShopLevel: Effect;
    cleanCommitState: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

/**
 * model的实现
 */
const Model: ModelType = {
  namespace: 'shopLevelEdit',

  state: {
    currentItem: defaultShopLevelItem,
    editResult: defaultEditResult,
  },

  effects: {

    /**
     * 每次点击返回列表页面时，要清空当前的缓存
     * @param payload
     * @param call
     * @param put
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *cleanCommitState({ payload }, { call, put }) {
      const newState:StateType = {
        currentItem: { ...defaultShopLevelItem },
        editResult: { ...defaultEditResult },
      }
      yield put({
        type: 'save',
        payload: newState,
      });
    },
    /**
     * 从数据库查询函数，如果sgId===0，那么就给一个默认值。
     * @param payload
     * @param call
     * @param put
     */
    *queryShopLevelById({ payload }, { call, put }) {
      let newState:StateType;
      if (payload.sgId === 0) {
        newState = {
          currentItem: { ...defaultShopLevelItem },
          editResult: { ...defaultEditResult },
        }
      } else {
        const response = yield call(queryShopLevelById, payload.sgId);
        newState = {
          currentItem: response,
          editResult: { ...defaultEditResult },
        }
      }
      yield put({
        type: 'save',
        payload: newState,
      });
    },
    /**
     * 保存数据，如果是sgId===0 那么服务器端自动判断，并且执行insert命令。
     * @param payload
     * @param call
     * @param put
     */
    *updateShopLevel({ payload }, { call, put }) {
      const response = yield call(updateShopLevel, payload);
      let editResult:EditResultType = {
        ...defaultEditResult,
        isCommit: true,
      };
      if (response.status && response.status !== 200) {
        // 这里也可以使用：.json() ，但是要在界面中进行特殊处理
        const err:any = yield response.clone().text();
        editResult = {
          isCommit: true,
          isSuccess: false,
          errMessage: err,
        }
      }
      yield put({
        type: 'save',
        payload: {
          editResult,
        },
      });
    },
  },


  reducers: {
    /**
     * 用来更新state
     */
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default Model;
