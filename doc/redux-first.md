# Redux入门



简单了解以下，可以直接进入Dva，跳过这一章节。



# 1. React的问题



在React中会定义状态，并改变状态，但是在大型系统中，会遇到一些问题。

```js
    constructor(props) {
        super(props);   //固定写法
        this.state = {
            msg: '我是一个home组件',
        }
    }
```



* 修改 count 之后，使用 count 的地方不能收到通知 ？
* 没有约束的修改，会造成混乱。
* 怎么拦截修改动作，并做一些日志以及错误处理方法。




# 2. 快速开始

https://segmentfault.com/a/1190000015684895



## 2.1 安装组件

```
yarn add redux
yarn add react-redux

```



## 2.2 撰写代码 







# 3. 完全理解redux

[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

为什么做redux，以及怎么做？

redux 主要为了管理state。

```
1、首先要做一个存储机制，引入了createStore，传入一个参数，将state保存起来。
2、接着出现问题了，如果有多个用户想获得这个数值怎么办。
	2.1：做了一个订阅的机制。当某个状态被修改后，可以发布给其他人
3、接着又出现问题了，如果状态被其他人偷偷修改了怎么办？
	3.1：做了一个plan【reducer】,只有通过plan才能修改，里面做了type来处理。
4、接着又出现问题了，系统中又那么多的state，不能放入一个文件吧。
	4.1:引入了combineReducers，将这些reducer给合并成一个。
5、以上拆分不彻底，还要一个 state，一个 reducer 写一块。
6、在具体的开发过程，还有些切片形式的功能需要做，例如每个函数保存日志等功能，
7、如何优化中间件，让开发者更容易开发。
8、如何做退订
```



在下面的场景中，引入 Redux 是比较明智的：

- 你有着相当大量的、随时间变化的数据
- 你的 state 需要有一个单一可靠数据来源
- 你觉得把所有 state 放在最顶层组件中已经无法满足需要了

应用中所有的 state 都以一个对象树的形式储存在一个单一的 *store* 中。 惟一改变 state 的办法是触发 *action*，一个描述发生什么的对象。 为了描述 action 如何改变 state 树，你需要编写 *reducers*。

