import { Button, Card, Result } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';


const extra = (
  <Fragment>
    <Button type="primary">
      <FormattedMessage id="resultandresultsuccess.success.btn-return" defaultMessage="Back to list" />
    </Button>
  </Fragment>
);

export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="success"
        title={formatMessage({ id: 'resultandresultsuccess.success.title' })}
        subTitle={formatMessage({ id: 'resultandresultsuccess.success.description' })}
        extra={extra}
        style={{ marginBottom: 16 }}
      >
      </Result>
    </Card>
  </GridContent>
);
