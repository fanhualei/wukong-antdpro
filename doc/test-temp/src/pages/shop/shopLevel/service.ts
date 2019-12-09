import request from '@/utils/request';
import { ShopLevelListParams, ShopLevelItem } from './data.d';

export async function queryShopLevel(params: ShopLevelListParams) {
  return request('/api/shop/getShopLevel', {
    params,
  });
}

export async function queryShopLevelById(sgId: number) {
  return request(`/api/shop/queryShopLevelById?sgId=${sgId}`);
}


export async function deleteShopLevel(params: ShopLevelListParams) {
  return request('/api/shop/deleteShopLevel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateShopLevel(params: ShopLevelItem) {
  return request('/api/shop/updateShopLevel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
