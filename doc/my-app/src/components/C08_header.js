import React, { Component } from 'react';
import PropTypes from 'prop-types';

class C08_header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            titleMsg:''
         };
    }

    changeParentState=()=>{
        this.props.parent.setState({
            bodyMsg:"修改父组件底层数据-不推荐使用"
        })
    }

    //留给父组件调用的函数
    addTitleMsg=(titleMsg)=>{
        this.setState({
            titleMsg:titleMsg
        })
    }

    render() {
        return (
            <div>
                <h2>面包屑：{this.props.title}</h2> 
                <div>{this.state.titleMsg}</div>
                <button onClick={this.props.changeBodyMsg.bind(this,"调用父组件函数")}>调用父组件函数</button>
                <button onClick={this.props.parent.changeBodyMsg.bind(this,"调用父组件实例")}>调用父组件实例</button>
                <button onClick={this.changeParentState}>修改父组件底层数据</button>
                <hr/>
            </div>
        );
    }
}

C08_header.defaultProps={
    title:'缺省值'
}

C08_header.propTypes={

    title:PropTypes.string,
   
}

export default C08_header;