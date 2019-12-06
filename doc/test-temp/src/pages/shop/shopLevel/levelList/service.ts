import request from '@/utils/request';
import { ShopLevelListParams } from './data.d';

export async function queryShopLevel(params: ShopLevelListParams) {
  return request('/api/shop/shopLevel', {
    params,
  });
}

export async function removeShopLevel(params: ShopLevelListParams) {
  return request('/api/shop/shopLevel', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addShopLevel(params: ShopLevelListParams) {
  return request('/api/shop/shopLevel', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateShopLevel(params: ShopLevelListParams) {
  return request('/api/shop/shopLevel', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
