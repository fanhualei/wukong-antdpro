import React, { Component } from 'react';
import Header from './C08_header'
class C08_home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bodyMsg:'',
            childMsg:''
         };
    }

    //预备给子组件调用的函数
    changeBodyMsg=(msg)=>{
        this.setState({
            bodyMsg:msg
        })
    }

    // 调用子组件函数
    runHeaderFun=()=>{
        this.refs.header.addTitleMsg("从父窗口追加的数据");
    }

    render() {
        return (
            <div>
               <Header ref='header'  title='首页' parent={this} changeBodyMsg={this.changeBodyMsg}  />
               <div>
                 body内容:{this.state.bodyMsg}    
               </div>
                 
               <div>
                   <br></br>
                   <button onClick={this.runHeaderFun}  >调用子组件函数</button>
               </div>

            </div>
        );
    }
}

export default C08_home;