# TypeScript 语法说明

https://ts.xcatliu.com/    详细的入门教程



# 1 基本概念



| 名称       | 说明                         |
| ---------- | ---------------------------- |
| ES6        | 是JavaScript语言的下一代标准 |
| JavaScript | 是ES6的实现，简称js          |
| TypeScript | 是js的超级，会将代码编译成js |
|            |                              |
|            |                              |



浏览器是不会解析ts代码的，需要通过打包工具，转成js的代码。





# 2 数据类型



| 名称                | 说明                                                     |
| ------------------- | -------------------------------------------------------- |
| 布尔类型（boolean） | var flag:boolean=true;                                   |
| 数字类型（number）  | var num:number=123;                                      |
| 字符串类型(string)  | var str:string='this is ts';                             |
| 数组类型（array）   | var arr:number[]=[11,22,33];                             |
| 元组类型（tuple）   | let arr:[number,string]=[123,'this is ts']; 指定多个类型 |
| 枚举类型（enum）    | enum Flag {success=1,error=2};                           |
| 任意类型（any）     | 常被用到获得html元素                                     |
| null                |                                                          |
| undefined           | var num=number\|undefined 未定义类型                     |
| void类型            | 一般用在方法没有返回值 void                              |
| never类型           | 代表从不会出现的数值，包含null和undefined                |





# 3 函数



> 基本用法

```typescript
 //函数声明法
function run():string{
    return 'run';
 }

//匿名函数
var fun2=function():number{
    return 'run';
 }

//ts中定义方法传参
function getInfo(name:string,age:number):string{
    return `${name} --- ${age}`;
}
    
//没有返回值的方法

function run():void{
    console.log('run')
}
run();

```



> 高级用法

```typescript
//可选参数 ?  可选参数必须配置到参数的最后面
function getInfo(name:string,age?:number):string{
		if(age){
			return `${name} --- ${age}`;
		}else{

			return `${name} ---年龄保密`;
		}
}

// 默认参数，要写在后边
function getInfo(name:string,age:number=20):string{
			if(age){

				return `${name} --- ${age}`;
			}else{

				return `${name} ---年龄保密`;
			}
}


//可变参数
function sum(a:number,b:number,...result:number[]):number{
	var sum=a+b;
	for(var i=0;i<result.length;i++){

		sum+=result[i];  
	}
	return sum;
}
alert(sum(1,2,3,4,5,6)) ;



//函数重载 ，不常用
function getInfo(name:string):string;
function getInfo(name:string,age:number):string;
function getInfo(name:any,age?:any):any{
	if(age){

		return '我叫：'+name+'我的年龄是'+age;
	}else{

		return '我叫：'+name;
	}
}
```



> 更高级用法

```typescript
//箭头函数  es6  ,
//箭头函数里面的this指向上下文
setTimeout(function(){
     alert('run')
},1000)

//简化了函数的书写
setTimeout(()=>{

	alert('run')
},1000)
```



# 4 类



## ① 定义

 ```typescript
//和java的一样

class Person{

	name:string;   //属性  前面省略了public关键词

	constructor(n:string){  //构造函数   实例化类的时候触发的方法
		this.name=n;
	}

	run():void{

		alert(this.name);
	}

}
var p=new Person('张三');

p.run()


 ```





## ② 继承  

* 关键字：extends、 super
* 子类会自动得到父类的函数与变量。如果子类定义了相同的，会重载父类的。



```typescript
class Person{
	name:string;
	constructor(name:string){
		this.name=name;
	}

	run():string{
		return `${this.name}在运动`
	}
}
var p=new Person('王五');
alert(p.run())


//继承类
class Web extends Person{
	constructor(name:string){
		super(name);  /*初始化父类的构造函数*/
	}
}


var w=new Web('李四');
alert(w.run());
```



## ③ 修饰符



    public :公有          在当前类里面、 子类  、类外面都可以访问
    protected：保护类型    在当前类里面、子类里面可以访问 ，在类外部没法访问
    private ：私有         在当前类里面可以访问，子类、类外部都没法访问




## ④ 静态方法



使用`static`定义静态方法与属性



```typescript
class Per{
 public name:string;
 public age:number=20;
 //静态属性

 static sex="男";
 constructor(name:string) {
		 this.name=name;
 }
 run(){  /*实例方法*/

	 alert(`${this.name}在运动`)
 }
 work(){

	 alert(`${this.name}在工作`)
 }
 static print(){  /*静态方法  里面没法直接调用类里面的属性*/

	 alert('print方法'+Per.sex);
 }
}

Per.print();

alert(Per.sex);
```



## ⑤ 多态

多态:父类定义一个方法不去实现，让继承它的子类去实现  每一个子类有不同的表现 

多态属于继承

```typescript
class Animal {
	name:string;
	constructor(name:string) {
		this.name=name;
	}
	eat(){   //继承它的子类去实现 ，每一个子类的表现不一样
		console.log('吃的方法')
	}
}

class Dog extends Animal{
	constructor(name:string){
		super(name)
	}
	eat(){
		return this.name+'吃粮食'
	}
}


class Cat extends Animal{
	constructor(name:string){
		super(name)
	}
	eat(){

		return this.name+'吃老鼠'
	}
}
```



## ⑥ 抽象方法

抽象类：它是提供其他类继承的基类，不能直接被实例化。

用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。

abstract抽象方法只能放在抽象类里面

```typescript
//标准:
abstract class Animal{
    public name:string;
    constructor(name:string){
        this.name=name;
    }
    abstract eat():any;  //抽象方法不包含具体实现并且必须在派生类中实现。
    run(){
        console.log('其他方法可以不实现')
    }
}

class Dog extends Animal{
    //抽象类的子类必须实现抽象类里面的抽象方法
    constructor(name:any){
        super(name)
    }
    eat(){
        console.log(this.name+'吃粮食')
    }
}
var d=new Dog('小花花');
d.eat();

class Cat extends Animal{
    //抽象类的子类必须实现抽象类里面的抽象方法
    constructor(name:any){
        super(name)
    }
    run(){
    }
    eat(){
        console.log(this.name+'吃老鼠')
    }
}

var c=new Cat('小花猫');
c.eat();
```





# 5 接口



## ① 约束属性对象



```typescript
//就是传入对象的约束    属性接口
interface FullName{
	firstName:string;   //注意;结束
 	secondName:string;
}

function printName(name:FullName){
	// 必须传入对象  firstName  secondName ,如果要选填，可以在定义时secondName ？:string;
	console.log(name.firstName+'--'+name.secondName);
}


// printName('1213');  //错误

/*传入的参数必须包含 firstName  secondName*/
var obj={   
 age:20,
 firstName:'张',
 secondName:'三'
};
printName(obj)
```





```typescript

interface Config{
    type:string;
    url:string;
    data?:string;
    dataType:string;
}

//原生js封装的ajax 
function ajax(config:Config){
   var xhr=new XMLHttpRequest();
   xhr.open(config.type,config.url,true);
   xhr.send(config.data);
   xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            console.log('chengong');
            if(config.dataType=='json'){
                console.log(JSON.parse(xhr.responseText));
            }else{
                console.log(xhr.responseText)
            }

        }
   }
}


ajax({
    type:'get',
    data:'name=zhangsan',
    url:'http://a.itying.com/api/productlist', //api
    dataType:'json'
})
```



## ② 约束函数



```typescript
interface encrypt{
   (key:string,value:string):string
}


var mad5:encrypt=function(key:string,value:string):string{
    return key+value;
}
console.log(md5('test','value'));
```



## ③ 数组约束

不常用

```typescript
interface UserArr{
	[index:number]:string
}
var arr:UserArr=['aaa','bbb'];
console.log(arr[0]);
var arr1:UserArr=[123,'bbb'];  /*错误*/
console.log(arr1[0]);
```



## ④ 类约束

和抽象类有点相似

```typescript
interface Animal{
	name:string;
	eat(str:string):void;
}
class Dog implements Animal{
	name:string;
	constructor(name:string){
		this.name=name;
	}
	eat(){
		console.log(this.name+'吃粮食')
	}
}

var d=new Dog('小黑');
d.eat();

class Cat implements Animal{
	name:string;
	constructor(name:string){
		this.name=name;
	}
	eat(food:string){
		console.log(this.name+'吃'+food);
	}
}

var c=new Cat('小花');
c.eat('老鼠');

```





## ⑤ 接口的继承



```typescript
interface Animal{
 eat():void;
}

interface Person extends Animal{
 	work():void;
}

class Web implements Person{
     public name:string;
     constructor(name:string){
         this.name=name;
     }
     eat(){
         console.log(this.name+'喜欢吃馒头')
     }
     work(){
         console.log(this.name+'写代码');
     }
}

var w=new Web('小李');
w.eat();
```





# 6 泛型



## ① 类的泛型

支持可变类型<T>

```typescript
function getData<T>(value:T):T{
	return value;
}
getData<number>(123);
getData<string>('1214231');
getData<number>('2112');       /*错误的写法*/  
```



> 得到最小值的例子

通过类的泛型来实现

泛型类：比如有个最小堆算法，需要同时支持返回数字和字符串

```typescript
class MinClas<T>{

    public list:T[]=[];

    add(value:T):void{

        this.list.push(value);
    }

    min():T{        
        var minNum=this.list[0];
        for(var i=0;i<this.list.length;i++){
            if(minNum>this.list[i]){
                minNum=this.list[i];
            }
        }
        return minNum;
    }
}

var m1=new MinClas<number>();   /*实例化类 并且制定了类的T代表的类型是number*/
m1.add(11);
m1.add(3);
m1.add(2);
alert(m1.min())


var m2=new MinClas<string>();   /*实例化类 并且制定了类的T代表的类型是string*/

m2.add('c');
m2.add('a');
m2.add('v');
alert(m2.min())

```



## ② 接口的泛型



> 定义在接口内部

```typescript
interface ConfigFn{
   <T>(value:T):T;
}

var getData:ConfigFn=function<T>(value:T):T{
   return value;
}

getData<string>('张三');

getData<string>(1243);  //错误
```



> 定义在接口头部

```typescript
interface ConfigFn<T>{
	(value:T):T;
}

function getData<T>(value:T):T{
	return value;
}

var myGetData:ConfigFn<string>=getData;     

myGetData('20');  /*正确*/

// myGetData(20)  //错误

```



# 7 模块化



## ① 概念



我们可以把一些公共的功能单独抽离成一个文件作为一个模块。
模块里面的变量 函数 类等默认是私有的，如果我们要在外部访问模块里面的数据（变量、函数、类），
我们需要通过export暴露模块里面的数据（变量、函数、类...）。
暴露后我们通过 import 引入模块就可以使用模块里面暴露的数据（变量、函数、类...）。



    1、export 导出声明  
    2、export 导出语句
    3、export default
    4、import导入模块


## ② 暴露







> 单独暴露变量与方法

```typescript
export var dbUrl='xxxxxx';

export function getData():any[]{
    console.log('获取数据库的数据111');
    return [
        {
            title:'121312'
        },
        {
            title:'121312'
        }
    ]
}


export function save(){

    console.log('保存数据成功');
}
```



> 整体暴露

在最后一行，选择性的暴露相关函数

```typescript
 var dbUrl='xxxxxx';

 function getData():any[]{
    console.log('获取数据库的数据111');
    return [
        {
            title:'121312'
        },
        {
            title:'121312'
        }
    ]
}

 function save(){
    console.log('保存数据成功');
}

export {dbUrl,getData,save}
```





> 只能暴露一个

```typescript
//这里只能暴露一个方法，上面那个可以暴露多个方法
export default getData
```



引入的时候不用使用{}了，看下面的。

```typescript
import getData  from './modules/db';
```



## ③ 引入

引入的时候不用使用{}了，看下面的。

```typescript
import { getData,save } from './modules/db';

//如果导出的类使用的是export default
import getData  from './modules/db';
```





# 8 命名空间

> 命名空间:

在代码量较大的情况下，为了避免各种变量命名相冲突，可将相似功能的函数、类、接口等放置到命名空间内。

同Java的包、.Net的命名空间一样，TypeScript的命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象。

命名空间内的对象通过export关键字对外暴露。



> 命名空间和模块的区别：

命名空间：内部模块，主要用于组织代码，避免命名冲突。

模    块：ts的外部模块的简称，侧重代码的复用，一个模块里可能会有多个命名空间。



下面的例子代码

```typescript
namespace A{
    interface Animal {
        name: string;
        eat(): void;
    }
    export class Dog implements Animal {
        name: string;
        constructor(theName: string) {
            this.name = theName;
        }

        eat() {
            console.log(`${this.name} 在吃狗粮。`);
        }
    }

    export class Cat implements Animal {
        name: string;
        constructor(theName: string) {
            this.name = theName;
        }

        eat() {
            console.log(`${this.name} 吃猫粮。`);
        }
    }   

}




namespace B{
    interface Animal {
        name: string;
        eat(): void;
    }
    export class Dog implements Animal {
        name: string;
        constructor(theName: string) {
            this.name = theName;
        }

        eat() {
            console.log(`${this.name} 在吃狗粮。`);
        }
    }

    export class Cat implements Animal {
        name: string;
        constructor(theName: string) {
            this.name = theName;
        }

        eat() {
            console.log(`${this.name} 在吃猫粮。`);
        }
    }   

}


var c=new B.Cat('小花');

c.eat();

```



> 可以把命名空间导出

```typescript
export namespace A{
    
// 在外部引用
    
import {A}  from './modules/db';   
```



# 9 装饰器

为了扩展原有的类、方法、属性、参数，可以给他们装修装修。

通俗的讲装饰器就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。

* 常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器

* 装饰器的写法：普通装饰器（无法传参） 、 装饰器工厂（可传参）

* 装饰器是过去几年中js最大的成就之一，已是Es7的标准特性之一



## 9.1 类装饰器



### ① 普通装饰器（无法传参）

```typescript
function logClass(target:any){
	console.log(target);
	// target 就是要装饰的类
	target.prototype.apiUrl='动态扩展的属性';
	target.prototype.run=function(){
		console.log('我是一个run方法');
	}
}

@logClass
class HttpClient{
	constructor(){
	}
	getData(){

	}
}
var http:any=new HttpClient();
console.log(http.apiUrl);
http.run();
```



### ② 装饰器工厂(可传参）



```typescript
function logClass(params:string){
	return function(target:any){
		console.log(target);
		console.log(params);
		target.prototype.apiUrl=params;
	}
}

@logClass('http://www.itying.com/api')
class HttpClient{
	constructor(){
	}

	getData(){

	}
}

var http:any=new HttpClient();
console.log(http.apiUrl);
```





### ③ 替换已有的函数与属性

可以重载要装饰类里面的属性与防范

```typescript
function logClass(target:any){
	console.log(target);
	return class extends target{
		apiUrl:any='我是修改后的数据';
		getData(){
			this.apiUrl=this.apiUrl+'----';
			console.log(this.apiUrl);
		}
	}
}

@logClass
class HttpClient{
	public apiUrl:string | undefined;
	constructor(){
		this.apiUrl='我是构造函数里面的apiUrl';
	}
	getData(){
		console.log(this.apiUrl);
	}
}

var http=new HttpClient();
http.getData();
```



## 9.2 属性装饰器

属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：

1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。

2、成员的名字。



下面的例子修改了url属性

```typescript
//属性装饰器
function logProperty(params:any){
	return function(target:any,attr:any){
		console.log(target);
		console.log(attr);
		target[attr]=params;
	}
}

class HttpClient{
	@logProperty('http://itying.com')
	public url:any |undefined;
	constructor(){
	}
	getData(){
		console.log(this.url);
	}
}
var http=new HttpClient();
http.getData();
```





## 9.3 方法装饰器

它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。

方法装饰会在运行时传入下列3个参数：

1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。

2、成员的名字。

3、成员的属性描述符。



### ① 新增属性和方法



```typescript
function get(params:any){
	return function(target:any,methodName:any,desc:any){
		console.log(target);
		console.log(methodName);
		console.log(desc);
		target.apiUrl='xxxx';
		target.run=function(){
			console.log('run');
		}
	}
}

class HttpClient{  
	public url:any |undefined;
	constructor(){
	}
	@get('http://www.itying,com')
	getData(){
		console.log(this.url);
	}
}

var http:any=new HttpClient();
console.log(http.apiUrl);
http.run();
```



### ② 修改原有函数

可以将一个没有参数的方法修改成有方法。



```typescript
function get(params:any){
	return function(target:any,methodName:any,desc:any){
		console.log(target);
		console.log(methodName);
		console.log(desc.value);       
		
		//修改装饰器的方法  把装饰器方法里面传入的所有参数改为string类型
		//1、保存当前的方法
		var oMethod=desc.value;
		desc.value=function(...args:any[]){                
			args=args.map((value)=>{
				return String(value);
			})
			oMethod.apply(this,args);
		}
	}
}

class HttpClient{  
	public url:any |undefined;
	constructor(){
	}
	@get('http://www.itying,com')
	getData(...args:any[]){
		console.log(args);
		console.log('我是getData里面的方法');
	}
}

var http=new HttpClient();
http.getData(123,'xxx');
```





## 9.4 方法参数装饰器

这个用的很少

参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据 ，传入下列3个参数：

1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。

2、方法的名字。

3、参数在函数参数列表中的索引。



```typescript
function logParams(params:any){
    return function(target:any,methodName:any,paramsIndex:any){
        console.log(params);
        console.log(target);
        console.log(methodName);
        console.log(paramsIndex);
        target.apiUrl=params;
    }   
}

class HttpClient{  
     public url:any |undefined;
     constructor(){}           
     getData(@logParams('xxxxx') uuid:any){               
                console.log(uuid);
     }
 }

var http:any = new HttpClient();
http.getData(123456);
console.log( http.apiUrl);
```





## 9.5 执行顺序

属性》方法》方法参数》类

如果有多个同样的装饰器，它会先执行后面的

从下到上。



①②③④⑤⑥⑦⑧