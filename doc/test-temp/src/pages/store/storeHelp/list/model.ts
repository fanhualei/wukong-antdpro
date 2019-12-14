import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryHelp, deleteManyHelp, deleteOneHelp } from './service';

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
    *deleteOne({ payload, callback }, { call, put }) {
      const response = yield call(deleteOneHelp, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *deleteMany({ payload, callback }, { call, put }) {
      const response = yield call(deleteManyHelp, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
