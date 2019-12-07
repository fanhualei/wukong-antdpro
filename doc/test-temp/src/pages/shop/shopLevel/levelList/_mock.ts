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

function postShopLevel(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key !== item.sgId);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        sgId: i,
        sgName: `店铺${i}`,
        sgGoodsLimit: 10,
        sgAlbumLimit: 10,
        sgSpaceLimit: 10,
        sgTemplateNumber: 10,
        sgPrice: 1000,
        sgSort: 0,
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.sgId === key) {
          return { ...item, desc, name };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/shop/shopLevel': getShopLevel,
  'POST /api/shop/shopLevel': postShopLevel,
};
