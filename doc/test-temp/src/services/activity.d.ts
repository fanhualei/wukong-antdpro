export interface ActivityItem {
    activityId: number; // id
activityTitle: string; // 标题
activityType?: number; // 活动类型 1:商品 2:团购
activityBanner: string; // 活动横幅大图片
activityStyle: string; // 活动页面模板样式标识码
activityDesc: string; // 描述
activityStartDate: datetime; // 开始时间
activityEndDate: datetime; // 结束时间
activitySort: number; // 排序
activityState: number; // 活动状态 0为关闭 1为开启

}

export interface Pagination {
    total: number;
    pageSize: number;
    current: number;
}

export interface ActivityListParams {
    // 这些跟业务有关系
    activityId: number;
activityTitle: string;
activityType: number;
activityBanner: string;
activityStyle: string;
activityDesc: string;
activityStartDate: datetime;
activityEndDate: datetime;
activitySort: number;
activityState: number;

    // 下面三个不用改，今后通用
    sorter: string;
    pageSize: number;
    currentPage: number;
}
