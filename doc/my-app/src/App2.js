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

const routes = [

  {
    path: "/",
    exact:true,
    component: C02_01
  },

  {
    path: "/C02_01",
    component: C02_01
  },
  {
    path: "/C02_02",
    component: C02_02
  },

  {
    path: "/C02_03",
    component: C02_03
  },

  {
    path: "/C03_01",
    component: C03_01
  },
  
  {
    path: "/C04",
    component: C04
  },
  
  {
    path: "/C04_set",
    component: C04_set
  },  

  {
    path: "/C07_03",
    component: C07_03
  },

  {
    path: "/C11_02",
    component: C11_02,
    exact:true,
    routes:[
      {
        path: "/C11_02/01",
        component: C11_02_01,
        
      },
      {
        path: "/C11_02/02",
        component: C11_02_02
      }
    ]
  },

  {
    path: "/C11_03",
    component: C11_03
  }


];

function RouteWithSubRoutes(route) {
  console.log(route.exact)
  if(route.exact){
    return (
      <Route exact
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }else{
    return (
      <Route 
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }        
}


function App2() {
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
          


        </div>
        <div className="context">
          <Switch></Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          
        </div>
      </div>
    </Router>
  );
}

export default App2;
