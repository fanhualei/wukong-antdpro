import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryShopLevel(params: TableListParams) {
  return request('/api/shop/shopLevel', {
    params,
  });
}

export async function removeShopLevel(params: TableListParams) {
  return request('/api/shop/shopLevel', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addShopLevel(params: TableListParams) {
  return request('/api/shop/shopLevel', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateShopLevel(params: TableListParams) {
  return request('/api/shop/shopLevel', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
