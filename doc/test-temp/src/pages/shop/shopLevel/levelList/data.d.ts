
/**
 * 店铺等级
 * 今后下面的代码应该从数据库中自动得到
 * 1：自动添加备注
 * 2：自动添加类型与默认值
 * 3：自动添加？,?号表示可选属性 其他表示必选属性
 * 4：只读属性 => " readonly " 对象的字段只在创建的时候赋值
 */
export interface TableListItem {
  sgId: number;// 索引 ID
  sgName:string;// 等级名称
  sgGoodsLimit:number;// 允许发布的商品数量
  sgAlbumLimit:number;// 允许上传图片数量
  sgSpaceLimit:number;// 上传空间大小，单位 MB
  sgTemplateNumber:number;// 选择店铺模板套数
  sgTemplate?:string| null | undefined;// 模板内容
  sgPrice:number;// 开店费用(元/年)
  sgDescription?:string| null | undefined;// 申请说明
  sgFunction?:string| null | undefined;// 附加功能
  sgSort:number;// 级别，数目越大级别越 高
}

/**
 * TableListPagination与TableListData不用改，今后通用
 */
export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

/**
 * 查询条件。
 */
export interface TableListParams {
  // 这些跟业务有关系
  sgName: string;
  // 下面三个不用改，今后通用
  sorter: string;
  pageSize: number;
  currentPage: number;
}
