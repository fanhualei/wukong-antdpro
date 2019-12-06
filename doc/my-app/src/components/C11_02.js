import React, { Component } from 'react';
import { Link } from "react-router-dom";
class C11_02 extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            list:[

                {
                    aid:'1',
                    title:'我是新闻1111'
                },
                {
                    aid:'2',
                    title:'我是新闻222'
                },
                {
                    aid:'3',
                    title:'我是新闻333'
                },
                {
                    aid:'4',
                    title:'我是新闻4444'
                }
            ]
         };
    }
    render() {
        return (
            <div>
                <h1>通过Url传值</h1>
                {
                    this.state.list.map((value,key)=>{
                        return(
                            <li key={key}>
                                <Link to={`/C11_02_01/${value.aid}`}>{value.title}</Link>
                            </li>
                        )
                    })
                }

                <h1>通过?传值</h1>
                {
                    this.state.list.map((value,key)=>{
                        return(
                            <li key={key}>
                                <Link to={`/C11_02_02?aid=${value.aid}&bid=123`}>{value.title}</Link>
                            </li>
                        )
                    })
                }
            </div>
        );
    }
}

export default C11_02;