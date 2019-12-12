import request from '@/utils/request';
import { HelpListParams, HelpItem, HelpTypeItem, HelpDelParams, HelpTypeDelParams } from './data';

export async function queryHelpById(helpId: number) {
  return request(`/api/shop/help/queryHelpById?helpId=${helpId}`);
}

export async function queryHelpTypeById(helpTypeId: number) {
  return request(`/api/shop/help/queryHelpTypeById?helpTypeId=${helpTypeId}`);
}
export async function queryHelp(params: HelpListParams) {
  return request('/api/shop/help/queryHelp', {
    params,
  });
}
export async function queryHelpType() {
  return request('/api/shop/help/queryHelpType');
}

export async function deleteHelp(params: HelpDelParams) {
  return request('/api/shop/help/deleteHelp', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function deleteHelpType(params: HelpTypeDelParams) {
  return request('/api/shop/help/deleteHelpType', {
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

export async function updateHelpType(params: HelpTypeItem) {
  return request('/api/shop/help/updateHelpType', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
