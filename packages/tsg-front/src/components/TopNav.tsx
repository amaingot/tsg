import * as React from 'react';
import styled from 'styled-components';

import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AuthState } from 'store/auth/types';
import { ApplicationState } from 'store/index';

import Link from 'components/Link';
import WhiteTextLogo from 'static/topLeftLogo.png';
import { logout } from 'store/auth/actions';

const MenuLogo = styled.img`
  width: 120px;
  margin: 6px 24px 6px 24px;
  float: left;
`;

const AccountItem = styled(Menu.Item)`
  && {
    float: right;
  }
`;

interface TopNavProps {
  auth: AuthState;
  isLoggedIn: boolean;
  logout: () => any;
}

class TopNav extends React.Component<TopNavProps> {
  private renderLoggedInButtons = () => {
    const accountLink = (
      <AccountItem key={0}>
        <Link to="/account" label="Account" />
      </AccountItem>
    );
    const logoutLink = <AccountItem key={1}>Logout</AccountItem>;
    return [accountLink, logoutLink];
  };

  private renderNotLoggedInButtons = () => {
    const buttons = [{ to: '/signup', label: 'Sign Up' }, { to: '/login', label: 'Login' }];

    return buttons.map(props => (
      <AccountItem key={props.to}>
        <Link to={props.to} label={props.label} />
      </AccountItem>
    ));
  };

  public render() {
    const { isLoggedIn } = this.props;
    return (
      <Menu mode="horizontal" theme="dark">
        <MenuLogo src={WhiteTextLogo} />

        <Menu.Item>
          <Link to="/" label="Home" />
        </Menu.Item>
        <Menu.Item>
          <Link to="/about" label="About" />
        </Menu.Item>
        <Menu.Item>
          <Link to="/plans" label="Plans" />
        </Menu.Item>

        {isLoggedIn ? this.renderLoggedInButtons() : this.renderNotLoggedInButtons()}
      </Menu>
    );
  }
}

const mapState2Props = (state: ApplicationState) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.jwt,
  };
};

const mapDispatch2Props = (dispatch: Dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(TopNav);