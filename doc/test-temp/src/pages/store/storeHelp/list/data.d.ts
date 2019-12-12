
export interface HelpItem {
  helpId: number; // 帮助ID
  helpSort?:number; // 排序
  helpTitle:string; // 标题
  helpInfo?:string; // 帮助内容
  helpUrl?:string; // 跳转链接
  updateTime:date; // 更新时间
  typeId:number; // 帮助类型
  pageShow?:number; // 页面类型:1为店铺,2为会员,默认为1
}

export interface Pagination {
  total: number;
  pageSize: number;
  current: number;
}

// export interface HelpListData {
//   list: HelpItem[];
//   pagination?: Partial<Pagination>;
// }


export interface HelpListParams {
  // 这些跟业务有关系
  helpTitle: string;
  typeId: number;
  // 下面三个不用改，今后通用
  sorter: string;
  pageSize: number;
  currentPage: number;
}

export interface HelpDelParams {
  helpIds: string;
  helpId: number;
}
