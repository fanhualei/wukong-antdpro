import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryHelp, deleteHelp } from './service';

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
    remove: Effect;
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
      console.log('-----------------------para-----------------')
      const response = yield call(queryHelp, payload);
      console.log(response)
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(deleteHelp, payload);
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
