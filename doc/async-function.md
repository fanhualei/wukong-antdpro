# 异步操作

异步操作最让人迷惑，所以单独做为一章节说明。



# 1. async function返回异步函数

[async function 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)



## 1.1 应用场景

在antdPro中的service，会用到异步函数。是通过`async`来定义的。

```js
import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(params: TableListParams) {
  return request('/api/rule', {
    params,
  });
}

export async function removeRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}
```



## 1.2 语法说明

`**async function**` 用来定义一个返回 [`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 对象的异步函数。

异步函数是指通过事件循环异步执行的函数，它会通过一个隐式的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 返回其结果。如果你在代码中使用了异步函数，就会发现它的语法和结构会更像是标准的同步函数。



你还可以使用 异步函数表达式 来定义异步函数。

```js
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: 'resolved'
}
asyncCall();

```



# 2.  function*返回生成器函数

[function*参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)

返回一个**生成器函数**

## 2.1 应用场景

在antdPro中的model，会用到*函数 ， 例如下面的

```js
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
```



## 2.2 语法说明

function* 这种声明方式(function关键字后跟一个星号）会定义一个**生成器函数** (generator function)，它返回一个  Generator  对象。

**生成器函数**在执行时能暂停，后面又能从暂停处继续执行。

当在生成器函数中显式 `return `时，会导致生成器立即变为完成状态，即调用 `next()` 方法返回的对象的 `done `为 `true`。如果 `return `后面跟了一个值，那么这个值会作为**当前**调用 `next()` 方法返回的 value 值。

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



## 2.3 示例

语法

```
function* name([param[, param[, ... param]]]) { statements }
```

- `name`

  函数名

- `param`

  要传递给函数的一个参数的名称，一个函数最多可以有255个参数。

- `statements`

  普通JS语句。



### 2.3.1 接收参数

```js
function* idMaker(){
    var index = arguments[0] || 0;
    while(true)
        yield index++;
}

var gen = idMaker(5);
console.log(gen.next().value); // 5
console.log(gen.next().value); // 6
```



### 2.3.2 yield*示例

yield会等函数执行完毕后，执行下异步操作

```js
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);// 移交执行权
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```



### 2.3.3 传递参数

```js
function *createIterator() {
    let first = yield 1;
    let second = yield first + 2; // 4 + 2 
                                  // first =4 是next(4)将参数赋给上一条的
    yield second + 3;             // 5 + 3
}

let iterator = createIterator();

console.log(iterator.next());    // "{ value: 1, done: false }"
console.log(iterator.next(4));   // "{ value: 6, done: false }"
console.log(iterator.next(5));   // "{ value: 8, done: false }"
console.log(iterator.next());    // "{ value: undefined, done: true }"
```



### 2.3.4 显式返回

```js
function* yieldAndReturn() {
  yield "Y";
  return "R";//显式返回处，可以观察到 done 也立即变为了 true
  yield "unreachable";// 不会被执行了
}

var gen = yieldAndReturn()
console.log(gen.next()); // { value: "Y", done: false }
console.log(gen.next()); // { value: "R", done: true }
console.log(gen.next()); // { value: undefined, done: true }
```



### 2.3.5 不能当构造器

生成器函数不能当构造器使用

```js
function* f() {}
var obj = new f; // throws "TypeError: f is not a constructor"
```



# 3 yield 暂停和恢复生成器函数

`yield`关键字使生成器函数执行暂停，`yield`关键字后面的表达式的值返回给生成器的调用者。它可以被认为是一个基于生成器的版本的`return`关键字。

`yield`关键字实际返回一个`IteratorResult`对象，它有两个属性，`value`和`done`。`value`属性是对`yield`表达式求值的结果，而`done`是`false`，表示生成器函数尚未完全完成。

一旦遇到 `yield` 表达式，生成器的代码将被暂停运行，直到生成器的 `next()` 方法被调用。每次调用生成器的`next()`方法时，生成器都会恢复执行，直到达到以下某个值：



## 3.1 示例

以下代码是一个生成器函数的声明。

```js
function* countAppleSales () {
  var saleList = [3, 7, 5];
  for (var i = 0; i < saleList.length; i++) {
    yield saleList[i];
  }
}
```

一旦生成器函数已定义，可以通过构造一个迭代器来使用它。

```js
var appleStore = countAppleSales(); // Generator { }
console.log(appleStore.next()); // { value: 3, done: false }
console.log(appleStore.next()); // { value: 7, done: false }
console.log(appleStore.next()); // { value: 5, done: false }
console.log(appleStore.next()); // { value: undefined, done: true }
```

