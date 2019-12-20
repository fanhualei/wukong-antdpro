import request from '@/utils/request';
import { HelpTypeItem } from './data.d';


export async function queryHelpTypeById(typeId: number) {
  return request(`/api/shop/help/queryHelpTypeById?typeId=${typeId}`);
}

export async function queryHelpType() {
  return request('/api/shop/help/queryHelpType');
}


export async function deleteOneHelpType(params: {typeId:number}) {
  return request('/api/shop/help/deleteOneHelpType', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteManyHelpType(params: {typeIds:string}) {
  return request('/api/shop/help/deleteManyHelpType', {
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
