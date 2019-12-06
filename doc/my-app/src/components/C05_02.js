import React, { Component } from 'react';

class C05_02 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    fun1=()=>{
        //设置dom的属性
        let but1=this.refs.but1
        but1.style.background='red';
        //获取dom的属性
        alert(but1.getAttribute('aid'))
    }

    inputChange=()=>{
        
        this.setState({
            username:this.refs.input1.value
        })
    }

    getInput=()=>{
        alert(this.state.username);
    }


    render() {
        return (
            <div>
              <h1>获取组件值-方法2</h1>
              <button  ref='but1' aid='ddddd'  onClick={this.fun1}>通过ref方法</button>
              <br/>
              <input  ref='input1'  onChange={this.inputChange}/> <button onClick={this.getInput}>获取input的值</button> 
            </div>
        );
    }
}

export default C05_02;