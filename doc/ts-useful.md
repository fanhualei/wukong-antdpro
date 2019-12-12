# antdPro常用语法

汇总了antdpro中常用的typeScript的语法。

[TOC]







从一个对象中获得属性

# 1. 变量相关



## 1.1 变量定义



### ① 可选、取值限制、只读 `?` `|` `readonly `

如何定义一个变量在集合中的限制。

* `?`
  * 号表示可选属性 其他表示必选属性

* `readonly ` 
  * 对象的字段只在创建的时候赋值

* `|` 
  * 表示可选类型

```typescript
export interface ShopLevelItem {
  sgId: number;// 索引 ID
  sgName:string;// 等级名称
  sgGoodsLimit:number;// 允许发布的商品数量
  sgAlbumLimit:number;// 允许上传图片数量
  sgSpaceLimit:number;// 上传空间大小，单位 MB
  sgTemplateNumber:number;// 选择店铺模板套数
  sgTemplate?:string| null | undefined;// 模板内容
  sgPrice:number;// 开店费用(元/年)
  sgDescription?:string| null | undefined;// 申请说明
  sgFunction?:string| null | undefined;// 附加功能
  sgSort:number;// 级别，数目越大级别越 高
}
```





### ② 取值限制应用例子



> 限制Action的取值。

```typescript
interface PageProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'shopLevelList/add'
      | 'shopLevelList/fetch'
      | 'shopLevelList/remove'
      | 'shopLevelList/update'
      >
    >;
  loading: boolean;
  shopLevelList: StateType;
}
```

上面定义的Action被使用时，通过`|`分割出只能用的字符，

```typescript
export interface Action<T = any> {
  type: T
}
export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T
}
```





> 限制其中的Key只能取自某个对象列表

在列表检索框，定义一个结构，这个结构中，以字段名为key，每个key对应一个数组，可以使用这个数组进行筛选。

[具体代码见ListBasicList](test-temp/src/pages/ListTableList/index.tsx)

```typescript
filtersArg: Record<keyof TableListItem, string[]>
/**
 * Construct a type with a set of properties K of type T
 */    
type Record<K extends keyof any, T> = {
    [P in K]: T;
};    
```



### ③ 高级类型Pick, Record

详细内容看下面的文档，这里只列出主要例子。

[typescript进阶篇之高级类型与条件类型(Readonly, Partial, Pick, Record)](https://blog.csdn.net/weixin_30278237/article/details/98291588)

> Record 循环选

```typescript
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

type person6 = Record<'name' | 'age', string>
// person6 === {name: string; age: string}
```



```typescript
interface Person {
    name: string;
    age?: number;
}
```



> Partial 是可选的类型

```typescript
    const params: Partial<ShopLevelListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };
```



> Pick 选一个

```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
type person5 = Pick<Person, "name">;
// person5 === {name: string}
```











①②③④⑤⑥⑦⑧

## 1.2 变量赋值



> 定义常量并赋值

定了两个常量：data 与 loading。

将this.props下的子属性赋值给定义的常量，其中data是从this.props.shopLevelList.data得到。

```typescript
    const {
      shopLevelList: { data },
      loading,
    } = this.props;
```



> 判断是否为空，并赋值

定义了一个变量：paginationProps

如果data.pagination存在，那么就取相关的内容赋值，如果不存在就返回false。

这里使用了一个三目运算符。

```typescript
    const paginationProps = data.pagination
      ? {
        showSizeChanger: true,
        showQuickJumper: true,
        ...data.pagination,
        showTotal: (total: number) => `共有 ${total} 记录`,
      }
      : false;
```



## 1.3 类型判断与转换

```typescript
# 类型判断 与转换
const sgId:number = Number(req.query.sgId) //这个是OK的。
const sgId:number = <number>(req.query.sgId) //这个是错误的。
console.log(typeof sgId)
```



## 1.4 访问变量

### ① 动态key获取值	

js根据动态key获取得到某对象中相应的属性值得两个方法

1,obj[key]  

2.eval('obj.'+key)   

```js
var obj = {x:1,y:2,z:3};
var a = [],i=0;
for(i in o){
console.log(i);
a.push(i);
console.log(obj[i]);//遍历对象属性值的方法 1 2 3
console.log(eval('obj.'+key));//遍历对象属性值的方法 1 2 3

```





### ② 遍历key或value

Object.key



# 2. 函数定义











# 3. 常用函数





## 3.1 系统函数



### 3.1.1 map、filter与reduce

```typescript
# 下面是antdpro常见的例子
const filters = Object.keys(filtersArg).reduce((obj, key) => {
    const newObj = { ...obj };
    newObj[key] = getValue(filtersArg[key]);
    return newObj;
}, {});

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
```



> map 

是用来循环一个数组，并把每次循环的值取出来。



> reduce



是用来循环一个数组，把一个值取出来，并放入到一个函数中计算。然后把下一个值取出来与上个函数的结果进行计算。

```
reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值。
arr.reduce(callback,[initialValue])

* callback （执行数组中每个值的函数，包含四个参数）
    previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
    currentValue （数组中当前被处理的元素）
    index （当前元素在数组中的索引）
    array （调用 reduce 的数组）
initialValue （作为第一次调用 callback 的第一个参数。）
```

```js
//例子
var items = [10, 120, 1000];
// our reducer function
var reducer = function add(sumSoFar, item) { return sumSoFar + item; };
// do the job
var total = items.reduce(reducer, 0);
console.log(total); // 1130

//--------------使用reduce做的----------------------------
var total items.reduce((previousValue,currentValue)=>previousValue+currentValue,0)

```



### 3.1.2 concat 连接

连接多个数组的函数



### 3.1.3 parseInt 解析

```
其实parseInt有两个参数，第二个参数可选，第二个参数就是指定进制；

ie8 下 parseInt()会把'0'开头的数字以8进制来解析，而大于7开头的数字时候才会用10进制。

故使用parseInt()函数的时候，最好指定进制参数；

即 parseInt('520', 10);
```



### 3.1.4 数学函数

```js
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
```

Math.floor : 下四舍五入 1.6 =1

Math.ceil：向上四舍五入 5.1=6

Math.random()：随机数，方法可返回介于 0 ~ 1 之间的一个随机数







## 3.2 antdpro函数





### 3.2.1 getValue

遍历一个集合，并且把这个集合中的值用`,`来拼接出来。

```typescript
const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
```

```typescript
filtersArg: Record<keyof ShopLevelItem, string[]>,
    
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
```



> 说明

```js
// Object.keys(person) 是为了得到这个对象的key ,可以根据这个key来循环出对象来。
let person = {name:"张三",age:25,address:"深圳",getName:function(){}}
Object.keys(person) // ["name", "age", "address","getName"]
```



## 3.3 异步函数



### 3.3.1 概要

在处理复杂的异步请求的时候，很容易让逻辑混乱，陷入嵌套陷阱，所以 Ant Design Pro 的底层基础框架 [dva](https://github.com/dvajs/dva) 使用 `effect` 的方式来管理同步化异步请求：

```js
effects: {
  *fetch({ payload }, { call, put }) {
    yield put({
      type: 'changeLoading',
      payload: true,
    });
    // 异步请求 1
    const response = yield call(queryFakeList, payload);
    yield put({
      type: 'save',
      payload: response,
    });
    // 异步请求 2
    const response2 = yield call(queryFakeList2, payload);
    yield put({
      type: 'save2',
      payload: response2,
    });
    yield put({
      type: 'changeLoading',
      payload: false,
    });
  },
},
```

在service中使用到了`async`

```js
import request from '@/utils/request';

export async function queryFakeList() {
  return request('/api/fanhl/user');
}

export async function queryFakeList2() {
  return request('/api/fanhl/getNotice');
}
```



通过 [generator](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/function*) 和 [yield](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/yield) 使得异步调用的逻辑处理跟同步一样，更多可参看 [dva async logic](https://github.com/dvajs/dva/blob/master/docs/GettingStarted.md#async-logic)。



### 3.3.2 基本语法

#### ①  function*

`function*` 这种声明方式(`function`关键字后跟一个星号）会定义一个**生成器函数 (***generator function***)**，它返回一个  [`Generator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)  对象。

```js
#语法
function* name([param[, param[, ... param]]]) { statements }
```

- `name`

  函数名

- `param`

  要传递给函数的一个参数的名称，一个函数最多可以有255个参数。

- `statements`

  普通JS语句。

  ```js
  function *gen(){
      yield 10;
      x=yield 'foo';
      yield x;
  }
  
  var gen_obj=gen();
  console.log(gen_obj.next());// 执行 yield 10，返回 10
  console.log(gen_obj.next());// 执行 yield 'foo'，返回 'foo'
  console.log(gen_obj.next(100));// 将 100 赋给上一条 yield 'foo' 的左值，即执行 x=100，返回 100
  console.log(gen_obj.next());// 执行完毕，value 为 undefined，done 为 true
  ```

  








# 4. 常用组件



## 4.1 Table

* showTotal 用来显示总记录数
* rowKey 指定key，不然浏览器console报错。



```typescript
// 优化了分页，显示总记录数、可跳转、可变分页。
const paginationProps = data.pagination
? {
    showSizeChanger: true,
    showQuickJumper: true,
    ...data.pagination,
    showTotal: (total: number) => `共有 ${total} 记录`,
}
: false;

<Table
    rowKey="sgId"
    loading={loading}
    dataSource={data.list}
    pagination={paginationProps}
    columns={this.columns}
    onChange={this.handleStandardTableChange}
/>
```



## 4.2 Checkbox.Group



### ① 赋值与得到数值

例如数据库里面存储的是：'A,B' ，表示选中的内容，需要把这个转换成数组。

```typescript
<FormItem {...formItemLayout} label="可用附加功能">
  {getFieldDecorator('sgFunction', { initialValue: 'A,B'.split(',') })(
    <Checkbox.Group style={{ width: '100%' }}>
          <Checkbox value="A">编辑器多媒体功能</Checkbox>
          <Checkbox value="C">媒体功能</Checkbox>
    </Checkbox.Group>,
  )}
</FormItem>
```

提交后的代码需要转成：

```typescript
const s:string = values.sgFunction.join(',');
```



### ③ 多个check的显示

如果>3个，那么就3个一行。

```typescript
<FormItem {...formItemLayout} label="可用附加功能">
  {getFieldDecorator('weight5', { initialValue: ['A', 'B'] })(
    <Checkbox.Group style={{ width: '100%' }}>
      <Row>
        <Col span={8}>
          <Checkbox value="A">编辑器多媒体功能</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="A">编辑器多媒体功能</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="A">编辑器多媒体功能</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="A">编辑器多媒体功能</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>,
  )}
</FormItem>
```

< 3 个就不用添加 Row与Col了

```typescript
<FormItem {...formItemLayout} label="可用附加功能">
  {getFieldDecorator('weight5', { initialValue: ['A', 'B'] })(
    <Checkbox.Group style={{ width: '100%' }}>
          <Checkbox value="A">编辑器多媒体功能</Checkbox>
    </Checkbox.Group>,
  )}
</FormItem>
```





## 4.3 数值框

### ① 只能输入整数



设定数值精度(**推荐这种方法**)

```typescript
<FormItem {...formItemLayout} label="可发布商品数">
  {getFieldDecorator('weight1', { initialValue: 100 })(
    <InputNumber
      min={0}
      max={1000}
      step={0}
      precision={0}
    />,
  )}
  <span className={styles.inputHelp}>0表示没有限制</span>
</FormItem>
```



或者通过`parser`过滤掉非数字类型的字符串

```typescript
<FormItem {...formItemLayout} label="可发布商品数">
  {getFieldDecorator('weight1', { initialValue: 100 })(
    <InputNumber
      min={0}
      max={1000}
      step={0}
      parser={displayValue => (displayValue ? displayValue.replace(/[^0-9]/ig, '') : '')}
    />,
  )}
  <span className={styles.inputHelp}>0表示没有限制</span>
</FormItem>
```



### ② 输入人民币分割

使用了`formatter`与`parser`

```typescript
<FormItem {...formItemLayout} label="收费标准">
  {getFieldDecorator('weight4', { initialValue: 0 })(
    <InputNumber
      style={{ width: 110 }}
      min={0}
      max={900000}
      precision={0}
      formatter={value => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => (value ? value.replace(/￥\s?|(,*)/g, '') : '')}
    />,
  )}
  <span className={styles.inputHelp}>元/年，在会员开通或升级店铺时将显示在前台</span>
</FormItem>
```



# 5. Dva框架

[官方网址](https://dvajs.com/guide/introduce-class.html#数据流图)

![alt](imgs/dva.png)



## 5.1 核心概念

- State：一个对象，保存整个应用状态
- View：React 组件构成的视图层
- Action：一个对象，描述事件
- connect 方法：一个函数，绑定 State 到 View
- dispatch 方法：一个函数，发送 Action 到 State

### State 和 View

State 是储存数据的地方，收到 Action 以后，会更新数据。

View 就是 React 组件构成的 UI 层，从 State 取数据后，渲染成 HTML 代码。只要 State 有变化，View 就会自动更新。

### Action

Action 是用来描述 UI 层事件的一个对象。

```js
{
  type: 'click-submit-button',
  payload: this.form.data
}
```

### connect 方法

connect 是一个函数，绑定 State 到 View。

```js
import { connect } from 'dva';

function mapStateToProps(state) {
  return { todos: state.todos };
}
connect(mapStateToProps)(App);
```

connect 方法返回的也是一个 React 组件，通常称为容器组件。因为它是原始 UI 组件的容器，即在外面包了一层 State。

connect 方法传入的第一个参数是 mapStateToProps 函数，mapStateToProps 函数会返回一个对象，用于建立 State 到 Props 的映射关系。

### dispatch 方法

dispatch 是一个函数方法，用来将 Action 发送给 State。

```js
dispatch({
  type: 'click-submit-button',
  payload: this.form.data
})
```

dispatch 方法从哪里来？被 connect 的 Component 会自动在 props 中拥有 dispatch 方法。

