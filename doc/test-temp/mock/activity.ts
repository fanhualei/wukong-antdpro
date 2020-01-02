import { Request, Response } from 'express';
import { parse } from 'url';
import { ActivityItem, ActivityListParams } from '../src/services/activity.d';
import { isInNumberArray } from '@/utils/Wk/tools'

let activityListDataSource: ActivityItem[] = [];

for (let i = 1; i < 30; i += 1) {
  activityListDataSource.push({
    activityId: 0,
    activityTitle: `activityTitle-${i}`,
    activityType: 0,
    activityBanner: `activityBanner-${i}`,
    activityStyle: `activityStyle-${i}`,
    activityDesc: `activityDesc-${i}`,
    activityStartDate: new Date(),
    activityEndDate: new Date(),
    activitySort: 255,
    activityState: 1,

  });
  activityListDataSource[i - 1].activityId = i;
}

function queryActivityById(req: Request, res: Response) {
  const activityId:number = Number(req.query.activityId)
  const result:ActivityItem = activityListDataSource.filter(
    item => item.activityId === activityId)[0];
  setTimeout(() => res.json(result), 1000);
}

function updateActivity(req: Request, res: Response) {
  const newItem:ActivityItem = <ActivityItem>req.body;
  if (!newItem.activityId || newItem.activityId === 0) {
    let maxSgId:number = 0;
    activityListDataSource.forEach(v => {
      if (v.activityId > maxSgId) {
        maxSgId = v.activityId;
      }
    });
    newItem.activityId = maxSgId + 1;
    activityListDataSource.push(newItem);
  } else {
    if (newItem.activityId === 3) {
      return res.status(500).json({
        status: 500,
        error: 'Bad Request',
        message: '参数无效',
        code: 30101,
        path: '/result/exception',
        exception: 'com.wukong.core.exceptions.BusinessException',
        errors: {
          name: '长度需要在6和50之间',
          email: '不是一个合法的电子邮件地址',
        },
        timestamp: '2018-05-31T09:41:16.461+0000',
      });
    }
    for (let i:number = 0; i < activityListDataSource.length; i += 1) {
      if (activityListDataSource[i].activityId === newItem.activityId) {
        activityListDataSource[i] = {
          ...activityListDataSource[i],
          ...newItem,
        };
        break;
      }
    }
  }
  return res.json(newItem.activityId);
}


function queryActivity(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  let dataSource = activityListDataSource.concat();
  const params = (parse(url, true).query as unknown) as ActivityListParams;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  const whereKeyArr = ['activityId', 'activityTitle', 'activityType', 'activityBanner', 'activityStyle', 'activityDesc', 'activityStartDate', 'activityEndDate', 'activitySort', 'activityState'];
  const paramsKeyArr = Object.keys(params);
  for (let i = 0; i < paramsKeyArr.length; i += 1) {
    const key = paramsKeyArr[i];
    if (whereKeyArr.indexOf(key) !== -1) {
      dataSource = dataSource
        .filter(data => data[key].indexOf(params[key]) > -1);
    }
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(`${params.currentPage}`, 10) || 1,
    },
  };
  return res.json(result);
}


function deleteOneActivity(req: Request, res: Response) {
  const { activityId } = req.body;
  activityListDataSource = activityListDataSource.filter(item => activityId !== item.activityId);
  return res.json(1);
}

function deleteManyActivity(req: Request, res: Response) {
  const { activityIds } = req.body;
  activityListDataSource = activityListDataSource.filter(
    item => !isInNumberArray(activityIds, item.activityId));
  return res.json(1);
}


export default {
  'GET /api/shop/activity/queryActivityById': queryActivityById,
  'GET /api/shop/activity/queryActivity': queryActivity,
  'POST /api/shop/activity/deleteOneActivity': deleteOneActivity,
  'POST /api/shop/activity/deleteManyActivity': deleteManyActivity,
  'POST /api/shop/activity/updateActivity': updateActivity,
};
