import React from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

import { Layout, Menu, Icon } from 'antd';

import C02_01 from './components/C02_01';
import C03_01 from './components/C03_01';
import C04 from './components/C04';

const { Header, Sider, Content } = Layout;

class App3 extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span><Link to="/" >home</Link></span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span><Link to="/C03_01">C03_01</Link></span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span><Link to="/C04">C04</Link></span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            
              <Route exact path="/">
                <C02_01/>
              </Route>
              <Route path="/C03_01">
                <C03_01/>
              </Route>
              <Route path="/C04">
                <C04/>
              </Route>

            
          </Content>
        </Layout>
      </Layout>
      </Router>
    );
  }
}

export default App3;