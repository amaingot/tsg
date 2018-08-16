import React from 'react';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import Tooltip from '@material-ui/core/Tooltip';
import Lock from '@material-ui/icons/Lock';

import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Button from 'components/Button';
import { breakpoints, DefaultFont } from 'styles/Theme';

const StyledList = styled(List)`
  && {
    ${DefaultFont};
    font-size: 14px;
    margin: 0;
    padding-left: 0;
    list-style: none;
    padding-top: 0;
    padding-bottom: 0;
    color: inherit;
  }
`;

const StyledNavLink = styled(Button)`
  && {
    color: inherit;
    position: relative;
    padding: 0.9375rem 1rem;
    font-weight: 400;
    font-size: 12px;
    text-transform: uppercase;
    border-radius: 3px;
    line-height: 20px;
    text-decoration: none;
    margin: 0 5px 0 0;
    display: inline-flex;
    &:hover,
    &:focus {
      color: inherit;
      background: rgba(200, 200, 200, 0.2);
    }
    @media (max-width: ${breakpoints.sm}px) {
      width: calc(100% - 30px);
      margin-left: 15px;
      margin-bottom: 8px;
      margin-top: 8px;
      text-align: left;
      & > span:first-child {
        justify-content: flex-start;
      }
    }
    &.active {
      color: inherit;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const StyledListItem = styled(ListItem)`
  && {
    float: left;
    color: inherit;
    position: relative;
    display: block;
    width: auto;
    margin: 0;
    padding: 0;

    @media (max-width: ${breakpoints.md}px) {
      width: 100%;
      &:after: {
        width: calc(100% - 30px);
        content: '';
        display: block;
        height: 1px;
        margin-left: 15px;
        background-color: #e5e5e5;
      }
    }
  }
`;

const StyledIcon = (element: React.ComponentType<SvgIconProps>) => styled(element)`
  && {
    width: 20px;
    height: 20px;
    margin-right: 3px;
  }
`;
const StyledLockIcon = StyledIcon(Lock);

// const StyledTooltip = styled(Tooltip)`
//   &&.tooltip {
//   }
// `;

// const StyledSocialIcon = styled.i`
//   position: relative;
//   font-size: 20px;
//   margin-right: 4px;
// `;

const HeaderLinks: React.SFC = props => {
  return (
    <StyledList>
      <StyledListItem>
        <StyledNavLink
          href="https://www.creative-tim.com/product/material-kit-react"
          buttonColor="transparent"
          target="_blank"
        >
          Pricing
        </StyledNavLink>
      </StyledListItem>
      <StyledListItem>
        <StyledNavLink
          href="https://www.creative-tim.com/product/material-kit-react"
          buttonColor="transparent"
          target="_blank"
        >
          <StyledLockIcon />
          Login
        </StyledNavLink>
      </StyledListItem>
      <StyledListItem>
        <StyledNavLink
          href="https://www.creative-tim.com/product/material-kit-react"
          buttonColor="success"
          target="_blank"
        >
          Get Started
        </StyledNavLink>
      </StyledListItem>
    </StyledList>
  );
};
export default HeaderLinks;
