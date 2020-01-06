import { Request, Response } from 'express';
import { HelpTypeItem } from './data.d';
import { isInNumberArray } from '../../../../utils/Wk/tools';

let helpTypeListDataSource: HelpTypeItem[] = [];

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

  console.log(newItem.typeId)
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
  console.log(`------------${newItem.typeId}`)
  if (!newItem.typeId || newItem.typeId === 0) {
    let maxId:number = 0;
    helpTypeListDataSource.forEach(v => {
      if (v.typeId > maxId) {
        maxId = v.typeId;
      }
    });
    newItem.typeId = maxId + 1;
    helpTypeListDataSource.push(newItem);
  } else {
    for (let i:number = 0; i < helpTypeListDataSource.length; i += 1) {
      if (helpTypeListDataSource[i].typeId === newItem.typeId) {
        helpTypeListDataSource[i] = {
          ...helpTypeListDataSource[i],
          ...newItem,
        };
        break;
      }
    }
  }

  return res.json(newItem.typeId);
}

/**
 * 查询帮助类型
 * @param req
 * @param res
 */
function queryHelpType(req: Request, res: Response) {
  let dataSource = helpTypeListDataSource.concat();
  dataSource = dataSource.sort((prev, next) => prev.typeSort - next.typeSort);
  const result = {
    list: dataSource,
  };
  return res.json(result);
}


function deleteOneHelpType(req: Request, res: Response) {
  const { typeId } = req.body;
  helpTypeListDataSource = helpTypeListDataSource.filter(item => typeId !== item.typeId);
  return res.json(1);
}

function deleteManyHelpType(req: Request, res: Response) {
  const { typeIds } = req.body;
  helpTypeListDataSource = helpTypeListDataSource.filter(
    item => !isInNumberArray(typeIds, item.typeId),
  );
  return res.json(1);
}

export default {
  'GET /api/shop/help/queryHelptypeById': queryHelptypeById,
  'GET /api/shop/help/queryHelpType': queryHelpType,
  'POST /api/shop/help/deleteOneHelpType': deleteOneHelpType,
  'POST /api/shop/help/deleteManyHelpType': deleteManyHelpType,
  'POST /api/shop/help/updateHelpType': updateHelpType,
};
