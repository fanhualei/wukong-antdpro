import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  queryGoodsBrowse,
  deleteManyGoodsBrowse,
  deleteOneGoodsBrowse,
  updateGoodsBrowse,
} from '@/services/goodsBrowseService';

import { GoodsBrowseItem, Pagination } from '@/services/goodsBrowse.d';

export interface GoodsBrowseListStateType {
  list: GoodsBrowseItem[];
  pagination?: Partial<Pagination>;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: GoodsBrowseListStateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: GoodsBrowseListStateType;
  effects: {
    fetch: Effect;
    deleteOne: Effect;
    deleteMany: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<GoodsBrowseListStateType>;
  };
}

const ListModel: ModelType = {
  namespace: 'GoodsBrowseList',
  state: {
    list: [],
    pagination: {},
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryGoodsBrowse, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    * deleteMany({ payload, callback }, { call, put }) {
      const response = yield call(deleteManyGoodsBrowse, payload);
      if (callback) callback(response);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    * deleteOne({ payload, callback }, { call, put }) {
      const response = yield call(deleteOneGoodsBrowse, payload);
      if (callback) callback(response);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    * update({ payload, callback }, { call, put }) {
      const response = yield call(updateGoodsBrowse, payload);
      if (response.status && response.status !== 200) {
        if (callback) callback(0, { ...response });
        return;
      }
      if (callback) callback(response);
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

export default ListModel;
