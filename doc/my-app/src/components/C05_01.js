import React, { Component } from 'react';

class C05_01 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    fun1=(event)=>{
        //设置dom的属性
        event.target.style.background='red';
        //获取dom的属性
        alert(event.target.getAttribute('aid'))
    }

    inputChange=(e)=>{
        console.log(e.target.value);
        this.setState({
            username:e.target.value
        })
    }

    getInput=()=>{
        alert(this.state.username);
    }


    render() {
        return (
            <div>
              <h1>获取组件值-方法1</h1>
              <button aid='ddddd'  onClick={this.fun1}>通过Dom方法</button>
              <br/>
              <input onChange={this.inputChange}/> <button onClick={this.getInput}>获取input的值</button> 
            </div>
        );
    }
}

export default C05_01;