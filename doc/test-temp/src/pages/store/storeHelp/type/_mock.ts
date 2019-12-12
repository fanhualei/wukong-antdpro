import { Request, Response } from 'express';
import { HelpTypeItem } from './data.d';

const helpTypeListDataSource: HelpTypeItem[] = [];

for (let i = 1; i < 15; i += 1) {
  const typeName:string = `帮助类型-${i}`;
  helpTypeListDataSource.push({
    typeId: i,
    typeName,
    typeSort: 0,
    helpCode: '',
    helpShow: 1,
    pageShow: 1,
  });
}

function queryHelptypeById(req: Request, res: Response) {
  const typeId:number = Number(req.query.typeId)
  const result:HelpTypeItem = helpTypeListDataSource.filter(item => item.typeId === typeId)[0]
  setTimeout(() => res.json(result), 1000);
}

function updateHelpType(req: Request, res: Response) {
  const newItem:HelpTypeItem = <HelpTypeItem>req.body;
  const dataSource = helpTypeListDataSource;
  if (!newItem.typeId || newItem.typeId === 0) {
    let maxSgId:number = 0;
    dataSource.forEach(v => {
      if (v.typeId > maxSgId) {
        maxSgId = v.typeId;
      }
    });
    newItem.typeId = maxSgId + 1;
    dataSource.push(newItem);
  } else {
    for (let i:number = 0; i < dataSource.length; i += 1) {
      if (dataSource[i].typeId === newItem.typeId) {
        dataSource[i] = newItem;
        break;
      }
    }
  }
  if (newItem.typeId === 3) {
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
  return res.json(newItem.typeId);
}



function queryHelpType(req: Request, res: Response) {
  const dataSource = helpTypeListDataSource;
  const result = {
    list: dataSource,
  };
  return res.json(result);
}

function deleteHelpType(req: Request, res: Response) {
  const { typeId, typeIds } = req.body;
  let dataSource = helpTypeListDataSource;
  if (typeId) {
    dataSource = dataSource.filter(item => typeId !== item.typeId);
  } else {
    const array = typeIds.split(',')
    dataSource = dataSource.filter(item => array.indexOf(item.typeId) === -1);
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
  'GET /api/shop/help/queryHelptypeById': queryHelptypeById,
  'GET /api/shop/help/queryHelpType': queryHelpType,
  'POST /api/shop/help/deleteHelpType': deleteHelpType,
  'POST /api/shop/help/updateHelpType': updateHelpType,
};
