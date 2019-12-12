import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import router from 'umi/router';

import styles from './style.less';

interface StoreHelpListProps {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
}

@connect()
class StoreHelpList extends Component<StoreHelpListProps> {
  handleTabChange = (key: string) => {
    const { match } = this.props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'list':
        router.push(`${url}/list`);
        break;
      case 'type':
        router.push(`${url}/type`);
        break;
      default:
        break;
    }
  };

  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'list';
  };

  render() {
    const tabList = [
      {
        key: 'list',
        tab: '帮助内容',
      },
      {
        key: 'type',
        tab: '帮助类型',
      },
    ];

    const { children } = this.props;

    return (
      <PageHeaderWrapper
        tabList={tabList}
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
        className={styles.customHeaderTitle}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default StoreHelpList;
