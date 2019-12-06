# 新建项目-antd



# 1. 安装和初始化

使用 `create-react-app` 一步步地创建一个 TypeScript 项目，并引入 antd。

https://ant.design/docs/react/use-in-typescript-cn



## 1.1 安装Python(可跳过)

就算安装python后，还需要安装vs，这个工作量就大了，没有必要非这个劲。

在初始化react项目时，会使用到一个组件[node-gyp](https://github.com/nodejs/node-gyp)，这个组件会提示使用python，并提示支持的版本是3.7，所以，需要下载一个python3.7。

下载[python3.7.5](https://www.python.org/ftp/python/3.7.5/python-3.7.5-amd64.exe)

###  Terminal need node-pty module

Umi UI 未安装或编译成功 [node-pty](https://www.npmjs.com/package/node-pty) 模块，解决方案如下：

#### Windows

> Windows 用户确保已安装 [Windows SDK](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk) 并且 [Node.js](https://nodejs.org/en/download/) 版本在 10.x 以上。

- 请以管理员身份在 PowerShell 执行 `npm install --global --production windows-build-tools`。
- 重装 umi 依赖



## 1.2 创建react项目



```shell
# 下面命令要执行2分钟，360监控会弹出提示，点击不阻止。同时会报错，发现python不存在，执行第一步
yarn create react-app antd-demo-ts --typescript

cd antd-demo-ts
yarn start
```



此时浏览器会访问 http://localhost:3000/ ，看到 `Welcome to React` 的界面就算成功了。



## 1.3 引入 antd

```shell
yarn add antd
```





## 1.4 配置按需引入

我们现在已经把组件成功运行起来了，但是在实际开发过程中还有很多问题，例如上面的例子实际上加载了全部的 antd 组件的样式（对前端性能是个隐患）。

①②③④⑤⑥⑦⑧

### ① 安装组件

```
yarn add react-app-rewired customize-cra	
yarn add babel-plugin-import
```



### ② 修改package.json

```json
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```



### ③ 追加config-overrides.js

```tsx
  // src/App.tsx
  import React, { Component } from 'react';
  import { Button } from 'antd';
  import './App.css';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <Button type="primary">Button</Button>
        </div>
      );
    }
  }

  export default App;
```



### ④ 修改app.tsx

```tsx
  // src/App.tsx
  import React, { Component } from 'react';
  import { Button } from 'antd';
  import './App.css';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <Button type="primary">Button</Button>
        </div>
      );
    }
  }

  export default App;
```



## 1.5 自定义主题



### ① 安装组件

```
yarn add  less less-loader
```





### ② 修改 `config-overrides.js`

```js
- const { override, fixBabelImports } = require('customize-cra');
+ const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
-   style: 'css',
+   style: true,
  }),
+ addLessLoader({
+   javascriptEnabled: true,
+   modifyVars: { '@primary-color': '#1DA57A' },
+ }),
);
```



③ 启动服务

可以看到一个绿色的按钮

```
yarn start
```

