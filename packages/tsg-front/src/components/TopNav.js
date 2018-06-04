import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

export default class TopNav extends Component {
  render() {
    return (
      <Layout.Header>
        {/* <div className="logo" /> */}
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">Link</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}
