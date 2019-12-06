# 开始使用

https://pro.ant.design/docs/getting-started-cn



# 1. 搭建环境



## 1.1 安装tyarn

如果网络状况不佳，可以使用 [tyarn](https://www.npmjs.com/package/tyarn) 进行加速。

```shell
npm install yarn tyarn -g
```

在执行`tyarn`的时候，可能出现提示脚本不能执行，请右键点击开始菜单，在弹出管理员powerShell中输入：

```shell
set-ExecutionPolicy RemoteSigned  
```



## 1.2 初始化代码

```shell
# 选择 ant-design-pro
tyarn create umi
# 这一步执行后，需要安装995M的插件，建议下载后，本地打个zip包，备份一下，下次不用重新操作了。
tyarn install
tyarn start 
```

启动完成后会自动打开浏览器访问 [http://localhost:8000](http://localhost:8000/)，你看到下面的页面就代表成功了。

下面是标准的页面：

```shell
├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.ts            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json
```



## 1.3 下载代码看看

如果速度缓慢，可以尝试升级 umi 版本到最新，并在 config.ts 设置 block.defaultGitUrl 为 'https://gitee.com/ant-design/pro-blocks'。







# 2. 开发



## 2.1 开发计划

假设要开发一个下面的后台系统，编写店铺管理下的：`等级列表`与`等级编辑`。

![alt](imgs/antdpro-equ.png)





## 2.2 生成页面

可以利用工具生成页面，或者你从其他相应模块中复制一个页面。或者你自己写一个全新的页面。

### 2.2.1 目录规划

三级模块就不再往下细分了。不然目录太多  

```shell
├── pages
│   ├── shop                       #一级模块
│   │   ├── shopOverall            #二级模块
│   │   │   ├── shopList           店铺一览
│   │   │   ├── applyOpen          申请开店 
│   │   │   ├── applyRenew         申请续费 
│   │   │   ├── applyCategory      申请类目
│   │   ├── shopLevel            
│   │   │   ├── levelList          店铺等级一览
│   │   │   ├── editLevel          编辑店铺等级
```



### 2.2.2 生成页面

这里使用UMI工具生成页面



#### ① 生成等级列表页

> 选择查询表格

![alt](imgs/antdpro-umi-page1-01.png)



> 输入路径与文件名

路径：/shop/shopLevel

文件夹：/shop/shopLevel/levelList

![alt](imgs/antdpro-umi-page1-02.png)



#### ② 生成等级编辑页

选择模板`基础表单页面`

路径：/shop/shopLevel/editLevel

文件夹：/shop/shopLevel/editLevel



### 2.2.3 修改菜单

追加下面的菜单，其中店铺等级做为第三级菜单不显示`hideChildrenInMenu`

```tsx
            {
              path: '/shop',
              icon: 'crown',
              name: 'shop',
              routes: [
                {
                  name: 'shopoverall',
                  path: '/shop/shopoverall/',
                  component: './shop/shopOverall/shopList',
                },
                {
                  name: 'shoplevel',
                  path: '/shop/shoplevel',
                  component: './shop/shopLevel/levelList',
                  hideChildrenInMenu: true,
                  routes: [
                    {
                      name: 'editlevel',
                      path: '/shop/shoplevel/editlevel',
                      component: './shop/shopLevel/editLevel',
                    },
                  ],
                },
              ],
            },
```

> 由于菜单启动了多语言，所以要修改 menu.ts

```typescript
export default {
  .....................  
  'menu.shop': '店铺管理',
  'menu.shop.shopoverall': '店铺总览',
  'menu.shop.shoplevel': '店铺等级',
  'menu.shop.shoplevel.editlevel': '编辑店铺等级',
}    
```



> 显示出基本的菜单

![alt](imgs/antdpro-umi-page1-03.png)



## 2.3 撰写等级一览

①②③④⑤⑥⑦⑧

### 2.3.1 代码分析

下面是生成的目录，红色框的区域是列表页的内容。

![alt](imgs/antdpro-first-list-dir.png)



看这个代码也是有技巧的，需要按照顺序来看：

| 名称       | 说明               | 备注                                                         |
| ---------- | ------------------ | ------------------------------------------------------------ |
| [data.d.ts](test-temp/src/pages/shop/shopLevel/levelList/data.d.ts)  | ts数据类型的定义。 | 定义了每行、分页、表格数据、以及表格查询的数据类型           |
| [_mock.ts](test-temp/src/pages/shop/shopLevel/levelList/_mock.ts)  | 模拟测试数据       | 定义了一个数组，模拟了数据源。定义了一个查询函数与一个提交函数 |
| [service.ts](test-temp/src/pages/shop/shopLevel/levelList/service.ts) | service层          | 定义了添加、删除、修改、查询4个函数。                        |
| [model.ts](test-temp/src/pages/shop/shopLevel/levelList/model.ts)   | model层            | 定义了Model框架，定义了实现方式。哈哈引入了ts后，增加了很多代码。 |
| [index.tsx](test-temp/src/pages/shop/shopLevel/levelList/index.tsx)  | 展示层             | 包含了页面中的代码                                           |
| [style.less](test-temp/src/pages/shop/shopLevel/levelList/style.less) | 样式文件           |                                                              |
| [components](test-temp/src/pages/shop/shopLevel/levelList/components) | 组件目录           | table组件与增加和删除组件窗口。                              |

是否引入typescript一直有疑问，原先写js时，刚觉很奔放，突然加了这么多代码与约束，刚开始接收不了，只能先适应适应了。





## 2.4 撰写等级编辑

