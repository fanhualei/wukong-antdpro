import { Request, Response } from 'express';
import { parse } from 'url';
import { ShopLevelItem, ShopLevelListParams } from './data.d';

// mock tableListDataSource
let tableListDataSource: ShopLevelItem[] = [];

for (let i = 1; i < 85; i += 1) {
  tableListDataSource.push({
    sgId: i,
    sgName: `店铺${i + 1}`,
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
function queryShopLevelById(req: Request, res: Response) {
  const sgId:number = Number(req.query.sgId)
  const result:ShopLevelItem = tableListDataSource.filter(item => item.sgId === sgId)[0]
  return res.json(result);
}

/**
 * 保存等级
 * @param req
 * @param res
 */
function updateShopLevel(req: Request, res: Response) {
  const newItem:ShopLevelItem = <ShopLevelItem>req.body;
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
  return res.json(1);
}

/**
 * 查询等级列表
 * @param req
 * @param res
 * @param u
 */
function getShopLevel(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as ShopLevelListParams;

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
function deleteShopLevel(req: Request, res: Response) {
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
  'GET /api/shop/getShopLevel': getShopLevel,
  'GET /api/shop/queryShopLevelById': queryShopLevelById,
  'POST /api/shop/deleteShopLevel': deleteShopLevel,
  'POST /api/shop/updateShopLevel': updateShopLevel,
};
