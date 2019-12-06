import React from 'react';


class C04 extends React.Component {
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
        alert(this.state.name)
    }

    fun2(){
        alert(this.state.msg)
    }

    fun3(){
        alert(this.state.age)
    }

    render() {
        return (
            <div>
              名称：{this.state.msg} <br/>
              年龄：{this.state.age} <br/>
              信息：{this.state.msg} <br/>
              <div>
                <h1>得到state的三种方法</h1>  
                <button onClick={this.fun1}> 第一种方法 </button>
                <button onClick={this.fun2}> 第二种方法 </button>
                {/* 绑定this */}
                <button onClick={this.fun3.bind(this)}> 第二种方法 </button>
              </div>  

            </div>
        );
    }
}

export default C04;