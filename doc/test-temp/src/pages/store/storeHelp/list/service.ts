import request from '@/utils/request';
import { HelpListParams, HelpItem, HelpDelParams } from './data.d';

export async function queryHelpById(helpId: number) {
  return request(`/api/shop/help/queryHelpById?helpId=${helpId}`);
}


export async function queryHelp(params: HelpListParams) {
  return request('/api/shop/help/queryHelp', {
    params,
  });
}


export async function deleteHelp(params: HelpDelParams) {
  return request('/api/shop/help/deleteHelp', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updateHelp(params: HelpItem) {
  return request('/api/shop/help/updateHelp', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

