import request from '@/utils/request';
import { ActivityListParams, ActivityItem } from './activity.d';

export const defaultActivityItem: ActivityItem = {
  activityId: 0, // id
  activityTitle: '', // 标题
  activityType: 0, // 活动类型 1:商品 2:团购
  activityBanner: '', // 活动横幅大图片
  activityStyle: '', // 活动页面模板样式标识码
  activityDesc: '', // 描述
  activityStartDate: new Date(), // 开始时间
  activityEndDate: new Date(), // 结束时间
  activitySort: 255, // 排序
  activityState: 1, // 活动状态 0为关闭 1为开启
};

export async function queryActivityById(activityId: number) {
  return request(
    `/api/shop/activity/queryActivityById?activityId=${activityId}`,
  );
}

export async function queryActivity(params: ActivityListParams) {
  return request('/api/shop/activity/queryActivity', {
    params,
  });
}

export async function deleteOneActivity(params: { activityId: number }) {
  return request('/api/shop/activity/deleteOneActivity', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteManyActivity(params: { activityIds: string }) {
  return request('/api/shop/activity/deleteManyActivity', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateActivity(params: Partial<ActivityItem>) {
  return request('/api/shop/activity/updateActivity', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
