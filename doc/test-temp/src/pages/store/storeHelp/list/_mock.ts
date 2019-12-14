import { Request, Response } from 'express';
import { parse } from 'url';
import { HelpItem, HelpListParams } from './data.d';
import { getRandomNumber } from '@/utils/Wk/tools'

const helpListDataSource: HelpItem[] = [];

for (let i = 1; i < 30; i += 1) {
  const helpTitle:string = `帮助文章-${i}`;
  helpListDataSource.push({
    helpId: i,
    helpSort: 0,
    helpTitle,
    helpInfo: '',
    updateTime: new Date(`2017-07-${Math.floor(i / 2) + 1} 8:10:10`),
    // updateTime: new Date(),
    pageShow: 1,
    typeId: getRandomNumber(1, 15),
  });
}


function queryHelpById(req: Request, res: Response) {
  const helpId:number = Number(req.query.helpId)
  const result:HelpItem = helpListDataSource.filter(item => item.helpId === helpId)[0]
  setTimeout(() => res.json(result), 1000);
}

function updateHelp(req: Request, res: Response) {
  const newItem:HelpItem = <HelpItem>req.body;
  const dataSource = helpListDataSource;
  if (!newItem.helpId || newItem.helpId === 0) {
    let maxSgId:number = 0;
    dataSource.forEach(v => {
      if (v.helpId > maxSgId) {
        maxSgId = v.helpId;
      }
    });
    newItem.helpId = maxSgId + 1;
    dataSource.push(newItem);
  } else {
    for (let i:number = 0; i < dataSource.length; i += 1) {
        if (dataSource[i].helpId === newItem.helpId) {
          dataSource[i] = newItem;
          break;
        }
    }
  }
  if (newItem.helpId === 3) {
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
  return res.json(newItem.helpId);
}


function queryHelp(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as HelpListParams;

  let dataSource = helpListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }


  if (params.helpTitle) {
    dataSource = dataSource.filter(data => data.helpTitle.indexOf(params.helpTitle) > -1);
  }

  if (params.typeId) {
    dataSource = dataSource.filter(data => data.typeId === Number(params.typeId));
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


function deleteHelp(req: Request, res: Response) {
  const { helpId, helpIds } = req.body;
  let dataSource = helpListDataSource;
  if (helpId) {
    dataSource = dataSource.filter(item => helpId !== item.helpId);
  } else {
    const array = helpIds.split(',')
    dataSource = dataSource.filter(item => array.indexOf(item.helpId) === -1);
  }
  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
    },
  };
  return res.json(result);
}


export default {
  'GET /api/shop/help/queryHelpById': queryHelpById,
  'GET /api/shop/help/queryHelp': queryHelp,
  'POST /api/shop/help/deleteHelp': deleteHelp,
  'POST /api/shop/help/updateHelp': updateHelp,
};
