

/**
 * 经常在table控件中使用，当一列做了筛选工作时，使用这个得到一个字符串
 * 例如：'open,run'
 * @param obj
 */
export const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


interface getOptionNameType{
  <T>(itmes:T[],
      idField:string,
      idValue:number,
      valueField:string,
      ):string;
}

/**
 * 给一个Id得到这个Id对应的名称
 * @param items
 * @param idField
 * @param idValue
 * @param valueField
 */
export const getOptionName:getOptionNameType = function<T>(items:T[],
                                                           idField:string,
                                                           idValue:number,
                                                           valueField:string,
                                                           ):string {
  const len:number = items ? items.length : 0;
  for (let j:number = 0; j < len; j += 1) {
    const item:T = items[j];
    if (item[idField] === idValue) {
      return item[valueField]
    }
  }
  return 'no define';
}

/**
 * 返回一个minx与max之间的函数
 * @param min
 * @param max
 */
export const getRandomNumber
  = (min:number, max:number):number => Math.floor(Math.random() * (max - min) + min)

/**
 * 查询是否在一个数组中，
 * @param values 将一个字符串转换成数组进行判断
 * @param id 要对比的id
 */
export const isInNumberArray = (values:string, id:number):boolean => {
  if (values) {
    const array = values.split(',');
    const len = array.length;
    for (let i = 0; i < len; i += 1) {
      if (id === Number(array[i])){
        return true;
      }
    }
  }
  return false;
}
