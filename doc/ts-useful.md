# antdPro常用语法

汇总了antdpro中常用的typeScript的语法。



> 从一个对象中获得属性

# 1. 变量相关



## 1.1 变量定义



> 定义基础变量

?号表示可选属性 其他表示必选属性

" readonly " 对象的字段只在创建的时候赋值

| 表示可选类型

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



> 定义一个变量



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



# 2. 函数定义





# 3. 常用函数





## getValue

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






# 4. 常用组件



## Table

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





