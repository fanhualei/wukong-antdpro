import React from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

import './App.css';

import C02_01 from './components/C02_01';
import C02_02 from './components/C02_02';
import C02_03 from './components/C02_03';
import C03_01 from './components/C03_01';
import C04 from './components/C04';
import C04_set from './components/C04_set';
import C07_03 from './components/C07_03';
import C11_02 from './components/C11_02';
import C11_02_01 from './components/C11_02_01';
import C11_02_02 from './components/C11_02_02';
import C11_03 from './components/C11_03';
import C11_04 from './components/C11_04';
import C11_04_01 from './components/C11_04_01';
import C11_04_02 from './components/C11_04_02';

import C13_01 from './components/C13_01';
import C55 from './components/C55';

function App() {
  return (

    <Router>
      <div className='proot'>
        <div className='menu'>
          <li><Link to="/">第一个页面</Link></li>
          <li><Link to="/C02_02">带参数的组件</Link></li>
          <li><Link to="/C02_03">如何引用CSS、IMG与内部函数</Link></li>
          <li><Link to="/C03_01">class组件的写法</Link></li>
          <li><Link to="/C04">得到state的三种方法</Link></li>
          <li><Link to="/C04_set">改变状态有三种方法</Link></li>
          <li><Link to="/C07_03">TodoList</Link></li>
          <li><Link to="/C11_02">路由传值的两种方法</Link></li>
          <li><Link to="/C11_03">通过Redirect进行跳转</Link></li>
          <li><Link to="/C11_04">嵌套路由</Link></li>
          <li><Link to="/C13_01">antDesign</Link></li>
          <li><Link to="/C55">Todo list Redux实现</Link></li>
          


        </div>
        <div className="context">
       
          <Route exact path="/">
            <C02_01/>
          </Route>
          <Route path="/C02_02">
            <C02_02 name="小王" title="产品经理" />
          </Route>
          <Route path="/C02_03">
            <C02_03/>
          </Route>

          <Route path="/C03_01">
            <C03_01/>
          </Route>
          <Route path="/C04">
            <C04/>
          </Route>
          <Route path="/C04_set">
            <C04_set/>
          </Route>
          <Route path="/C07_03">
            <C07_03/>
          </Route>
          <Route path="/C11_02">
            <C11_02/>
          </Route>

          <Route path="/C11_02_01/:aid" component={C11_02_01}/>
          <Route path="/C11_02_02" component={C11_02_02}/>

          <Route path="/C11_03" component={C11_03}/>
          <Switch>
          <Route path="/C11_04" component={C11_04}/>

          </Switch>
          <Route path="/C13_01" component={C13_01}/>
          <Route path="/C55" component={C55}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
