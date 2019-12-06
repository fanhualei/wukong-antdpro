import React from 'react';

class C04_set extends React.Component {
    constructor(props) {
        super(props);   //固定写法
        this.state = {
            msg: '我是一个home组件',
            name:'小王',
            age: '23'
        }

        //构造函数注册
        this.fun2= this.fun2.bind(this);
    }

    //箭头函数
    fun1=()=>{
        this.setState({
            msg:'new massage'
        })
    }

    fun2(){
        this.setState({
            name:'new name'
        })
    }

    fun3(){
        this.setState({
            age:'new age'
        })
    }

    fun4(arg1){
        this.setState({
            age:arg1
        })
    }

    render() {
        return (
            <div>
                <h1>改变状态有三种方法</h1>
              名称：{this.state.msg} <br/>
              年龄：{this.state.age} <br/>
              信息：{this.state.name} <br/>
              <div>
                <button onClick={this.fun1}> 第一种方法 </button>
                <button onClick={this.fun2}> 第二种方法 </button>
                {/* 绑定this */}
                <button onClick={this.fun3.bind(this)}> 第三种方法 </button>
                <button onClick={this.fun4.bind(this,"8888888")}> 传递参数方法 </button>
              </div>  

            </div>
        );
    }
}


export default C04_set;