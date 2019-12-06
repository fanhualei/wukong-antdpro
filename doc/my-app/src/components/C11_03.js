import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

class C11_03 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    login=(e)=>{
        e.preventDefault();
        let username=this.refs.username.value
        if(username==='123'){
            this.setState({
                loginFlag:true
            })
        }
    }

    render() {

        if(this.state.loginFlag){
            return <Redirect to={{ pathname: "/" }} />;
        }    

        return (
            <div>
                <h1>演示通过Redirect进行跳转</h1>
                <form onSubmit={this.login}>
                    username:<input ref='username'/> 用户名为123，就进行跳转 <br/><br/>
                    password:<input ref='password'/> <br/><br/>
                    <input type='submit' value="登录" />
                </form>
            </div>
        );
    }
}

export default C11_03;