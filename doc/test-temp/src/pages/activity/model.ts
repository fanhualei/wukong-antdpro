import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  queryActivity,
  deleteManyActivity,
  deleteOneActivity,
  updateActivity,
} from '@/services/activityService';

import { ActivityItem, Pagination } from '@/services/activity.d';

export interface ActivityListStateType {
  list: ActivityItem[];
  pagination?: Partial<Pagination>;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ActivityListStateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ActivityListStateType;
  effects: {
    fetch: Effect;
    deleteOne: Effect;
    deleteMany: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<ActivityListStateType>;
  };
}

const ListModel: ModelType = {
  namespace: 'ActivityList',
  state: {
    list: [],
    pagination: {},
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryActivity, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    * deleteMany({ payload, callback }, { call, put }) {
      const response = yield call(deleteManyActivity, payload);
      if (callback) callback(response);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    * deleteOne({ payload, callback }, { call, put }) {
      const response = yield call(deleteOneActivity, payload);
      if (callback) callback(response);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    * update({ payload, callback }, { call, put }) {
      const response = yield call(updateActivity, payload);
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
