import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style';
import * as React from 'react';

export default class PageFooter extends React.Component {
  public render() {
    return (
      <Layout.Footer style={{ textAlign: 'center' }}>
        TennisShopGuru ©2018 Created by Alex Maingot blah <a href="admin/">Admin</a>
      </Layout.Footer>
    );
  }
}
