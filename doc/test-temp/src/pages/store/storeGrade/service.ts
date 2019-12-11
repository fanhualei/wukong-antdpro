import request from '@/utils/request';
import { StoreGradeListParams, StoreGradeItem } from './data.d';

export async function queryStoreGrade(params: StoreGradeListParams) {
  return request('/api/shop/getStoreGrade', {
    params,
  });
}

export async function queryStoreGradeById(sgId: number) {
  return request(`/api/shop/queryStoreGradeById?sgId=${sgId}`);
}


export async function deleteStoreGrade(params: StoreGradeListParams) {
  return request('/api/shop/deleteStoreGrade', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateStoreGrade(params: StoreGradeItem) {
  return request('/api/shop/updateStoreGrade', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
