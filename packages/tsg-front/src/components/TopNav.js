import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';

import TopLogo from '../static/topLeftLogo.png';

const MenuLogo = styled.img`
  width: 120px;
  margin: 6px 24px 6px 0;
  float: left;
`;

export default class TopNav extends Component {
  render() {
    return (
      <Layout.Header>
        <MenuLogo src={TopLogo} />
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}
