import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

import C11_04_01 from './C11_04_01';
import C11_04_02 from './C11_04_02';

class C11_04 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Router>
                <div>
                    二级菜单： 
                    <Link to={`/C11_04/01?bid=123`}>新闻</Link>  &nbsp;&nbsp;&nbsp;
                    <Link to={`/C11_04/02?bid=222`}>产品</Link>
                    <hr/>
                    <Route path="/C11_04/01" component={C11_04_01}/>
                    <Route path="/C11_04/02" component={C11_04_02}/>

                </div>
            </Router>
        );
    }
}

export default C11_04;