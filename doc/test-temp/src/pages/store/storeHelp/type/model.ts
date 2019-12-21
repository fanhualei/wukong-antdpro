import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryHelpType,
  deleteManyHelpType,
  deleteOneHelpType,
  updateHelpType } from './service';

import { HelpTypeItem, Pagination } from './data.d';

export interface StateType {
  list: HelpTypeItem[];
  pagination?: Partial<Pagination>;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    deleteOne: Effect;
    deleteMany: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const ListModel: ModelType = {
  namespace: 'HelpTypeList',
  state: {
      list: [],
      pagination: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryHelpType, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *deleteMany({ payload, callback }, { call, put }) {
      const response = yield call(deleteManyHelpType, payload);
      if (callback) callback(response);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *deleteOne({ payload, callback }, { call, put }) {
      const response = yield call(deleteOneHelpType, payload);
      if (callback) callback(response);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *update({ payload, callback }, { call, put }) {
      // console.log(payload)
      const response = yield call(updateHelpType, payload);
      if (response.status && response.status !== 200) {
        if (callback) callback(0, { ...response });
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
