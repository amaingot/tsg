import React from 'react';
import styled from 'styled-components';

import { Color } from 'styles/Theme';

const StyledBadge = styled.span`
  margin-right: 3px;
  border-radius: 12px;
  padding: 5px 12px;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  display: inline-block;

  .primary {
    background-color: ${Color.primary};
  }
  .warning {
    background-color: ${Color.warning};
  }
  .danger {
    background-color: ${Color.danger};
  }
  .success {
    background-color: ${Color.success};
  }
  .info {
    background-color: ${Color.info};
  }
  .rose {
    background-color: ${Color.rose};
  }
  .gray {
    background-color: #6c757d;
  }
`;

interface BadgeProps {
  color?: Color;
  children?: React.ReactNode;
}

const Badge: React.SFC<BadgeProps> = props => {
  const { color, children } = props;
  return <StyledBadge className={color || 'gray'}>{children}</StyledBadge>;
};

export default Badge;
