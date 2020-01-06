import { Request, Response } from 'express';
import { parse } from 'url';
import {
  GoodsBrowseItem,
  GoodsBrowseListParams,
} from '../src/services/goodsBrowse.d';
import { isInNumberArray } from '../src/utils/Wk/tools';

let goodsBrowseListDataSource: GoodsBrowseItem[] = [];

for (let i = 1; i < 30; i += 1) {
  goodsBrowseListDataSource.push({
    goodsId: 0,
    memberId: 0,
    browsetime: new Date(),
    gcId: 0,
    gcId1: 0,
    gcId2: 0,
    gcId3: 0,
  });
  goodsBrowseListDataSource[i - 1].memberId = i;
}

function queryGoodsBrowseById(req: Request, res: Response) {
  const memberId: number = Number(req.query.memberId);
  const result: GoodsBrowseItem = goodsBrowseListDataSource.filter(
    item => item.memberId === memberId,
  )[0];
  setTimeout(() => res.json(result), 1000);
}

function updateGoodsBrowse(req: Request, res: Response) {
  const newItem: GoodsBrowseItem = <GoodsBrowseItem>req.body;
  if (!newItem.memberId || newItem.memberId === 0) {
    let maxSgId: number = 0;
    goodsBrowseListDataSource.forEach(v => {
      if (v.memberId > maxSgId) {
        maxSgId = v.memberId;
      }
    });
    newItem.memberId = maxSgId + 1;
    goodsBrowseListDataSource.push(newItem);
  } else {
    if (newItem.memberId === 3) {
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
    for (let i: number = 0; i < goodsBrowseListDataSource.length; i += 1) {
      if (goodsBrowseListDataSource[i].memberId === newItem.memberId) {
        goodsBrowseListDataSource[i] = {
          ...goodsBrowseListDataSource[i],
          ...newItem,
        };
        break;
      }
    }
  }
  return res.json(newItem.memberId);
}

function queryGoodsBrowse(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  let dataSource = goodsBrowseListDataSource.concat();
  const params = (parse(url, true).query as unknown) as GoodsBrowseListParams;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  const whereKeyArr = [
    'goodsId',
    'memberId',
    'browsetime',
    'gcId',
    'gcId1',
    'gcId2',
    'gcId3',
  ];

  const paramsKeyArr = Object.keys(params);
  // console.log(params)
  for (let i = 0; i < paramsKeyArr.length; i += 1) {
    const key = paramsKeyArr[i];
    if (whereKeyArr.indexOf(key) !== -1) {
      dataSource = dataSource.filter((data: any) => {
        if (typeof data[key] === 'number') {
          if (typeof params[key] === 'string' && params[key] === '') {
            return true;
          }
          return data[key] === Number(params[key]);
        }
        if (typeof data[key] === 'string') {
          return data[key].indexOf(params[key]) > -1;
        }
        return false;
      });
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

function deleteOneGoodsBrowse(req: Request, res: Response) {
  const { memberId } = req.body;
  goodsBrowseListDataSource = goodsBrowseListDataSource.filter(
    item => memberId !== item.memberId,
  );
  return res.json(1);
}

function deleteManyGoodsBrowse(req: Request, res: Response) {
  const { memberIds } = req.body;
  goodsBrowseListDataSource = goodsBrowseListDataSource.filter(
    item => !isInNumberArray(memberIds, item.memberId),
  );
  return res.json(1);
}

export default {
  'GET /api/shop/goodsBrowse/queryGoodsBrowseById': queryGoodsBrowseById,
  'GET /api/shop/goodsBrowse/queryGoodsBrowse': queryGoodsBrowse,
  'POST /api/shop/goodsBrowse/deleteOneGoodsBrowse': deleteOneGoodsBrowse,
  'POST /api/shop/goodsBrowse/deleteManyGoodsBrowse': deleteManyGoodsBrowse,
  'POST /api/shop/goodsBrowse/updateGoodsBrowse': updateGoodsBrowse,
};
