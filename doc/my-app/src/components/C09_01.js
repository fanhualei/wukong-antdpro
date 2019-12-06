import React, { Component } from 'react';

import fetchJsonp from 'fetch-jsonp';

class C09_01 extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            list:[]
         };
    }

    getDate=()=>{
        var api="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20";
        fetchJsonp(api)
        .then(function(response) {
            return response.json()
        }).then((json)=> {
            console.log(json);
            this.setState({
                list:json.result
            })
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })       
    }

    render() {
        return (
            <div>
                <h2>演示如何从服务器获得信息</h2>
                <button onClick={this.getDate} >获取数据</button> <hr/>
                {
                    this.state.list.map((value,key)=>{
                        return(
                            <li key={key}>{value.title}</li>
                        )
                    })
                }
            </div>
        );
    }
}

export default C09_01;