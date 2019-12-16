import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryHelp, deleteManyHelp, deleteOneHelp, updateHelp } from './service';

import { HelpItem, Pagination } from './data.d';

export interface StateType {
  list: HelpItem[];
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

const Model: ModelType = {
  namespace: 'HelpList',
  state: {
    list: [],
    pagination: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryHelp, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *deleteOne({ payload, callback }, { call, put }) {
      const response = yield call(deleteOneHelp, payload);
      if (callback) callback(response);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *deleteMany({ payload, callback }, { call, put }) {
      const response = yield call(deleteManyHelp, payload);
      if (callback) callback(response);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateHelp, payload);
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

export default Model;
