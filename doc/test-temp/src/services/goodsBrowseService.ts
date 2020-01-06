import request from '@/utils/request';
import { GoodsBrowseListParams, GoodsBrowseItem } from './goodsBrowse.d';

export const defaultGoodsBrowseItem: GoodsBrowseItem = {
  goodsId: 0, // 商品ID
  memberId: 0, // 会员ID
  browsetime: new Date(), // 浏览时间
  gcId: 0, // 商品分类
  gcId1: 0, // 商品一级分类
  gcId2: 0, // 商品二级分类
  gcId3: 0, // 商品三级分类
};

export async function queryGoodsBrowseById(memberId: number) {
  return request(
    `/api/shop/goodsBrowse/queryGoodsBrowseById?memberId=${memberId}`,
  );
}

export async function queryGoodsBrowse(params: GoodsBrowseListParams) {
  return request('/api/shop/goodsBrowse/queryGoodsBrowse', {
    params,
  });
}

export async function deleteOneGoodsBrowse(params: { memberId: number }) {
  return request('/api/shop/goodsBrowse/deleteOneGoodsBrowse', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteManyGoodsBrowse(params: { memberIds: string }) {
  return request('/api/shop/goodsBrowse/deleteManyGoodsBrowse', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateGoodsBrowse(params: Partial<GoodsBrowseItem>) {
  return request('/api/shop/goodsBrowse/updateGoodsBrowse', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
