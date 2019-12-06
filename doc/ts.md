# TypeScript 入门



通过本节可以了解，如何搭建一个最基本的ts环境，以及如何使用vscode开编写代码





# 1 基本概念



| 名称       | 说明                         |
| ---------- | ---------------------------- |
| ES6        | 是JavaScript语言的下一代标准 |
| JavaScript | 是ES6的实现，简称js          |
| TypeScript | 是js的超级，会将代码编译成js |
|            |                              |
|            |                              |



浏览器是不会解析ts代码的，需要通过打包工具，转成js的代码。







`win`+`r` = 打开`windows cmd`窗口



# 2 基本环境搭建





## ① 前提条件

安装`nodejs`

安装 `typescript`

```
npm install -g typescript
```



## ② 撰写ts文件

例如`a.ts`

```typescript
console.log('hello ts');
```



## ③ 执行ts文件

通过`node` 执行`ts`



```
node a.ts
```



## ④ 将ts转成js

```
tsc a.ts
```



## ⑤ 建立html

html中只能使用js

```html
<!DOCTYPE html> 
<html> 
<head> 
<meta charset="utf-8"> 
<title>Learning TypeScript</title>
</head> 
<body> 
    <script src="a.js"></script>
</body> 
</html>
```



打开这个html后，通过调试查看页面输出。

这里应该了解如何通过浏览器来调试Js





# 3 tsc高级指南



## ① 初始化



```powershell
# 使用下面的命令生成tsconfig.json
tsc --init 
```

然后可以修改这个文件。

## ② 配置

配置ts源文件目录，以及js输出目录

```json
{
    "outDir": "./dist",                     
    "rootDir": "./src",                     
}
```



## ③ 编译

执行`tsc`会自动编译

```shell
tsc 
```



## ④ 自动编译

用watch来动态检测ts文件的改变并自动编译

```shell
tsc -w
```





# 3 vscode环境

①②③④⑤⑥⑦⑧



## ① vscode中打开空目录

理解vscode就是一个文本编辑工具

## ② 建立ts文件

例如`a.ts`

```typescript
console.log('hello ts');
```



## ③ 初始化环境文件

在`vscode`中`terminal`执行下面命令

```
tsc --init 
```



## ④ 启动自动编译

在`vscode`的菜单

```

Terminal>Run Task...>tsc:watch --tsconfig.json
```

实际上运行的是`tsc -w`命令



## ⑤ 快速生成html代码

在vscode中，建立一个html页面，然后输入`!`+`tab` ，就可以自动生成html代码。