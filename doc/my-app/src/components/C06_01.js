import React, { Component } from 'react';
class C06_01 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }


    //键盘事件
    inputKeyUp=(e)=>{
        if(e.keyCode==13){
            alert(e.target.value);
        }
    }
    inputonKeyDown=(e)=>{
        if(e.keyCode==13){
            alert(e.target.value);
        }
    }

    render() {
        return (
            <div>
                <h2>键盘事件-回车得到数值</h2>
                <input onKeyUp={this.inputKeyUp}/>
                <br /><br />
                <input onKeyDown={this.inputonKeyDown}/>
            </div>
        );
    }
}

export default C06_01;