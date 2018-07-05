import React, { Component } from 'react';
import styled from 'styled-components';
import { Menu, Layout } from 'antd';

import TopLogo from '../static/topLeftLogo.png';
import Link from './Link';

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
        <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
          <Menu.Item key="1">
            <Link to="/" label="Home" />
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about" label="About" />
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}
