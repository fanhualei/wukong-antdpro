import React from 'react';
import { Collapse } from 'antd';
import styles from './index.less';

const { Panel } = Collapse;

export interface PageHelpProps {
  header:string;
  children?: React.ReactNode;
}

export function PageHelp(props:PageHelpProps) {
  const { header, children } = props;
  return (
    <span>
        <Collapse defaultActiveKey={['1']} className={styles.customCollapse}>
          <Panel header={header} key="1">
            {children}
          </Panel>
        </Collapse>
      </span>
  );
}

// 默认 Props
PageHelp.defaultProps = {
  header: '操作说明',
};
