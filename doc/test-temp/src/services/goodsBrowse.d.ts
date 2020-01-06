export interface GoodsBrowseItem {
  goodsId: number; // 商品ID
  memberId: number; // 会员ID
  browsetime: datetime; // 浏览时间
  gcId: number; // 商品分类
  gcId1: number; // 商品一级分类
  gcId2: number; // 商品二级分类
  gcId3: number; // 商品三级分类
}

export interface Pagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface GoodsBrowseListParams {
  // 这些跟业务有关系
  goodsId: number;
  memberId: number;
  browsetime: datetime;
  gcId: number;
  gcId1: number;
  gcId2: number;
  gcId3: number;

  // 下面三个不用改，今后通用
  sorter: string;
  pageSize: number;
  currentPage: number;
}
