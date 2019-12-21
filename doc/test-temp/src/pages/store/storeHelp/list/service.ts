import request from '@/utils/request';
import { HelpListParams, HelpItem } from './data.d';


export const defaultHelpItem:HelpItem = {
  helpId: 0, // 帮助ID
  helpSort: 0, // 排序
  helpTitle: '', // 标题
  updateTime: new Date(), // 更新时间
  typeId: undefined, // 帮助类型
  pageShow: 1, // 页面类型:1为店铺,2为会员,默认为1
}

export async function queryHelpById(helpId: number) {
  return request(`/api/shop/help/queryHelpById?helpId=${helpId}`);
}


export async function queryHelp(params: HelpListParams) {
  return request('/api/shop/help/queryHelp', {
    params,
  });
}


export async function deleteOneHelp(params: {helpId:number}) {
  return request('/api/shop/help/deleteOneHelp', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteManyHelp(params: {helpIds:string}) {
  return request('/api/shop/help/deleteManyHelp', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updateHelp(params: Partial<HelpItem>) {
  return request('/api/shop/help/updateHelp', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
