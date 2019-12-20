export interface HelpTypeItem {
  typeId: number; // 帮助ID
  typeName:string; // 类型名称
  typeSort:number // 排序
  helpCode?:string // 调用编号(auto的可删除)
  helpShow?:number // 是否显示,0为否,1为是,默认为1
  pageShow?:number; // 页面类型:1为店铺,2为会员,默认为1
}

export interface Pagination {
  total: number;
  pageSize: number;
  current: number;
}

/**
 * 如果没有查询，那么这个就用不上
 */
export interface HelpTypeListParams {
  typeId: number;
  // 下面三个不用改，今后通用
  sorter: string;
  pageSize: number;
  currentPage: number;
}
