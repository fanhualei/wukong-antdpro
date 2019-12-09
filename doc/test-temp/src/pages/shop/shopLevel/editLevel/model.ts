import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ShopLevelItem } from '../data.d';
import { queryShopLevelById, updateShopLevel } from '../service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface EditResultType {
  isCommit?:boolean;
  isSuccess?:boolean;
  errMessage?:string;
}


export interface StateType {
  editResult?:EditResultType;
  currentItem:ShopLevelItem;
}


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
const defaultEditResult:EditResultType = {
  isCommit: false,
  isSuccess: true,
  errMessage: '',
}


export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    queryShopLevelById: Effect;
    updateShopLevel: Effect;
    initState: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}


// @ts-ignore
const Model: ModelType = {
  namespace: 'shopLevelEdit',

  state: {
    currentItem: defaultShopLevelItem,
    editResult: defaultEditResult,
  },

  effects: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *initState({ payload }, { call, put }) {
      const newState:StateType = {
        currentItem: defaultShopLevelItem,
        editResult: defaultEditResult,
      }
      yield put({
        type: 'save',
        payload: newState,
      });
    },
    *queryShopLevelById({ payload }, { call, put }) {
      const response = yield call(queryShopLevelById, payload.sgId);
      const newState:StateType = {
        currentItem: response,
        editResult: defaultEditResult,
      }
      yield put({
        type: 'save',
        payload: newState,
      });
    },
    *updateShopLevel({ payload }, { call, put }) {
      const response = yield call(updateShopLevel, payload);
      console.log(response)
      const editResult:EditResultType = {
        isCommit: true,
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
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default Model;
