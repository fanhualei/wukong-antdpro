import { Request, Response } from 'express';
import { parse } from 'url';
import { StoreGradeItem, StoreGradeListParams } from './data.d';

// mock tableListDataSource
let tableListDataSource: StoreGradeItem[] = [];

for (let i = 1; i < 85; i += 1) {
  let sgName:string = `店铺${i + 1}`;
  if (i === 3) {
    sgName = '修改这个会模拟错误';
  }
  tableListDataSource.push({
    sgId: i,
    sgName,
    sgGoodsLimit: 10 + i,
    sgAlbumLimit: 10 + i,
    sgSpaceLimit: 10 + i,
    sgTemplateNumber: 10 + i,
    sgPrice: 1000 + i,
    sgSort: i + 1,
  });
}

/**
 * 通过ID得到一个等级
 * @param req
 * @param res
 */
function queryStoreGradeById(req: Request, res: Response) {
  const sgId:number = Number(req.query.sgId)
  const result:StoreGradeItem = tableListDataSource.filter(item => item.sgId === sgId)[0]
  setTimeout(() => res.json(result), 1000);
}

/**
 * 保存等级
 * @param req
 * @param res
 */
function updateStoreGrade(req: Request, res: Response) {
  const newItem:StoreGradeItem = <StoreGradeItem>req.body;
  if (!newItem.sgId || newItem.sgId === 0) {
    let maxSgId:number = 0;
    tableListDataSource.forEach(v => {
      if (v.sgId > maxSgId) {
        maxSgId = v.sgId;
      }
    });
    newItem.sgId = maxSgId + 1;
    tableListDataSource.push(newItem);
  } else {
    for (let i:number = 0; i < tableListDataSource.length; i += 1) {
        if (tableListDataSource[i].sgId === newItem.sgId) {
          tableListDataSource[i] = newItem;
          break;
        }
    }
  }
  if (newItem.sgId === 3) {
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
  return res.json(1);
}

/**
 * 查询等级列表
 * @param req
 * @param res
 * @param u
 */
function getStoreGrade(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as StoreGradeListParams;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }


  if (params.sgName) {
    dataSource = dataSource.filter(data => data.sgName.indexOf(params.sgName) > -1);
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

/**
 * 删除等级
 * @param req
 * @param res
 */
function deleteStoreGrade(req: Request, res: Response) {
  const { sgId } = req.body;
  tableListDataSource = tableListDataSource.filter(item => sgId !== item.sgId);
  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };
  return res.json(result);
}


export default {
  'GET /api/shop/getStoreGrade': getStoreGrade,
  'GET /api/shop/queryStoreGradeById': queryStoreGradeById,
  'POST /api/shop/deleteStoreGrade': deleteStoreGrade,
  'POST /api/shop/updateStoreGrade': updateStoreGrade,
};
