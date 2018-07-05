import React, { Component } from 'react';
import Layout from 'antd/lib/layout';

export default class PageFooter extends Component {
  render() {
    return (
      <Layout.Footer style={{ textAlign: 'center' }}>
        TennisShopGuru ©2018 Created by Alex Maingot <a href="admin/">Admin</a>
      </Layout.Footer>
    );
  }
}
