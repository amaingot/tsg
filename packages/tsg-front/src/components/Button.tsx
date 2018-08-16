import React from 'react';
import styled from 'styled-components';

import MuiButton, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { Color, Size } from 'styles/Theme';

const StyledButton = styled<MuiButtonProps>(MuiButton)`
  && {
    min-height: auto;
    min-width: auto;
    background-color: ${Color.gray};
    color: #ffffff;
    box-shadow: 0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2),
      0 1px 5px 0 rgba(153, 153, 153, 0.12);
    border: none;
    border-radius: 3px;
    position: relative;
    padding: 12px 30px;
    margin: 0.3125rem 1px;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0;
    will-change: box-shadow, transform;
    transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1),
      background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;

    &:hover,
    &:focus {
      color: #ffffff;
      background-color: ${Color.gray};
      box-shadow: 0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
        0 8px 10px -5px rgba(153, 153, 153, 0.2);
    }

    & .fab,
    & .fas,
    & .far,
    & .fal {
      position: relative;
      display: inline-block;
      top: 0;
      font-size: 1.1rem;
      margin-right: 4px;
      vertical-align: middle;
    }
    & svg {
      position: relative;
      display: inline-block;
      top: 0;
      width: 18px;
      height: 18px;
      margin-right: 4px;
      vertical-align: middle;
    }

    &.justIcon {
      & .fab,
      & .fas,
      & .far,
      & .fal {
        margin-right: 0px;
        position: absolute;
        width: 100%;
        transform: none;
        left: 0px;
        top: 0px;
        height: 100%;
        line-height: 41px;
        font-size: 20px;
      }
    }
    &.fullWidth {
      width: 100%;
    }
    &.primary {
      background-color: ${Color.primary};
      box-shadow: 0 2px 2px 0 rgba(156, 39, 176, 0.14), 0 3px 1px -2px rgba(156, 39, 176, 0.2),
        0 1px 5px 0 rgba(156, 39, 176, 0.12);
      &:hover,
      &:focus {
        background-color: ${Color.primary};
        box-shadow: 0 14px 26px -12px rgba(156, 39, 176, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
          0 8px 10px -5px rgba(156, 39, 176, 0.2);
      }
    }
    &.info {
      background-color: ${Color.info};
      box-shadow: 0 2px 2px 0 rgba(0, 188, 212, 0.14), 0 3px 1px -2px rgba(0, 188, 212, 0.2),
        0 1px 5px 0 rgba(0, 188, 212, 0.12);
      &:hover,
      &:focus {
        background-color: ${Color.info};
        box-shadow: 0 14px 26px -12px rgba(0, 188, 212, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
          0 8px 10px -5px rgba(0, 188, 212, 0.2);
      }
    }
    &.success {
      background-color: ${Color.success};
      box-shadow: 0 2px 2px 0 rgba(76, 175, 80, 0.14), 0 3px 1px -2px rgba(76, 175, 80, 0.2),
        0 1px 5px 0 rgba(76, 175, 80, 0.12);
      &:hover,
      &:focus {
        background-color: ${Color.success};
        box-shadow: 0 14px 26px -12px rgba(76, 175, 80, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
          0 8px 10px -5px rgba(76, 175, 80, 0.2);
      }
    }
    &.warning {
      background-color: ${Color.warning};
      box-shadow: 0 2px 2px 0 rgba(255, 152, 0, 0.14), 0 3px 1px -2px rgba(255, 152, 0, 0.2),
        0 1px 5px 0 rgba(255, 152, 0, 0.12);
      &:hover,
      &:focus {
        background-color: ${Color.warning};
        box-shadow: 0 14px 26px -12px rgba(255, 152, 0, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
          0 8px 10px -5px rgba(255, 152, 0, 0.2);
      }
    }
    &.danger {
      background-color: ${Color.danger};
      box-shadow: 0 2px 2px 0 rgba(244, 67, 54, 0.14), 0 3px 1px -2px rgba(244, 67, 54, 0.2),
        0 1px 5px 0 rgba(244, 67, 54, 0.12);
      &:hover,
      &:focus {
        background-color: ${Color.danger};
        box-shadow: 0 14px 26px -12px rgba(244, 67, 54, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
          0 8px 10px -5px rgba(244, 67, 54, 0.2);
      }
    }
    &.rose {
      background-color: ${Color.rose};
      box-shadow: 0 2px 2px 0 rgba(233, 30, 99, 0.14), 0 3px 1px -2px rgba(233, 30, 99, 0.2),
        0 1px 5px 0 rgba(233, 30, 99, 0.12);
      &:hover,
      &:focus {
        background-color: ${Color.rose};
        box-shadow: 0 14px 26px -12px rgba(233, 30, 99, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
          0 8px 10px -5px rgba(233, 30, 99, 0.2);
      }
    }
    &.inherit {
      background-color: inherit;
    }
    &.white {
      &,
      &:focus,
      &:hover,
      &:visited {
        background-color: #ffffff;
        color: ${Color.gray};
      }
    }
    &.twitter {
      background-color: #55acee;
      color: #fff;
      box-shadow: 0 2px 2px 0 rgba(85, 172, 238, 0.14), 0 3px 1px -2px rgba(85, 172, 238, 0.2),
        0 1px 5px 0 rgba(85, 172, 238, 0.12);
      &:hover,
      &:focus,
      &:visited {
        background-color: #55acee;
        color: #fff;
        box-shadow: 0 14px 26px -12px rgba(85, 172, 238, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
          0 8px 10px -5px rgba(85, 172, 238, 0.2);
      }
    }
    &.facebook {
      background-color: #3b5998;
      color: #fff;
      box-shadow: 0 2px 2px 0 rgba(59, 89, 152, 0.14), 0 3px 1px -2px rgba(59, 89, 152, 0.2),
        0 1px 5px 0 rgba(59, 89, 152, 0.12);
      &:hover,
      &:focus {
        background-color: #3b5998;
        color: #fff;
        box-shadow: 0 14px 26px -12px rgba(59, 89, 152, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
          0 8px 10px -5px rgba(59, 89, 152, 0.2);
      }
    }
    &.google {
      background-color: #dd4b39;
      color: #fff;
      box-shadow: 0 2px 2px 0 rgba(221, 75, 57, 0.14), 0 3px 1px -2px rgba(221, 75, 57, 0.2),
        0 1px 5px 0 rgba(221, 75, 57, 0.12);
      &:hover,
      &:focus {
        background-color: #dd4b39;
        color: #fff;
        box-shadow: 0 14px 26px -12px rgba(221, 75, 57, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
          0 8px 10px -5px rgba(221, 75, 57, 0.2);
      }
    }
    &.github {
      background-color: #333333;
      color: #fff;
      box-shadow: 0 2px 2px 0 rgba(51, 51, 51, 0.14), 0 3px 1px -2px rgba(51, 51, 51, 0.2),
        0 1px 5px 0 rgba(51, 51, 51, 0.12);
      &:hover,
      &:focus {
        background-color: #333333;
        color: #fff;
        box-shadow: 0 14px 26px -12px rgba(51, 51, 51, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
          0 8px 10px -5px rgba(51, 51, 51, 0.2);
      }
    }
    &.simple {
      &,
      &:focus,
      &:hover,
      &:visited {
        color: #ffffff;
        background: transparent;
        box-shadow: none;
      }
      &.primary {
        &,
        &:focus,
        &:hover,
        &:visited {
          color: ${Color.primary};
        }
      }
      &.info {
        &,
        &:focus,
        &:hover,
        &:visited {
          color: ${Color.info};
        }
      }
      &.success {
        &,
        &:focus,
        &:hover,
        &:visited {
          color: ${Color.success};
        }
      }
      &.warning {
        &,
        &:focus,
        &:hover,
        &:visited {
          color: ${Color.warning};
        }
      }
      &.rose {
        &,
        &:focus,
        &:hover,
        &:visited {
          color: ${Color.rose};
        }
      }
      &.danger {
        &,
        &:focus,
        &:hover,
        &:visited {
          color: ${Color.danger};
        }
      }
      &.twitter {
        &,
        &:focus,
        &:hover,
        &:visited {
          color: #55acee;
        }
      }
      &.facebook {
        &,
        &:focus,
        &:hover,
        &:visited {
          color: #3b5998;
        }
      }
      &.google {
        &,
        &:focus,
        &:hover,
        &:visited {
          color: #dd4b39;
        }
      }
      &.github {
        &,
        &:focus,
        &:hover,
        &:visited {
          color: #333333;
        }
      }
    }
    &.transparent {
      &,
      &:focus,
      &:hover,
      &:visited {
        color: inherit;
        background: transparent;
        box-shadow: none;
      }
    }
    &.disabled {
      opacity: 0.65;
      pointer-events: none;
    }
    &.lg {
      padding: 1.125rem 2.25rem;
      font-size: 0.875rem;
      line-height: 1.333333;
      border-radius: 0.2rem;
    }
    &.sm {
      padding: 0.40625rem 1.25rem;
      font-size: 0.6875rem;
      line-height: 1.5;
      border-radius: 0.2rem;
    }
    &.round {
      border-radius: 30px;
    }
    &.block {
      width: 100% !important;
    }
    &.link {
      &,
      &:hover,
      &:focus {
        background-color: transparent;
        color: #999999;
        box-shadow: none;
      }
    }
    &.justIcon {
      padding-left: 12px;
      padding-right: 12px;
      font-size: 20px;
      height: 41px;
      min-width: 41px;
      width: 41px;
      & .fab,
      & .fas,
      & .far,
      & .fal,
      & svg {
        margin-right: 0px;
      }
      &.lg {
        height: 57px;
        min-width: 57px;
        width: 57px;
        line-height: 56px;
        & .fab,
        & .fas,
        & .far,
        & .fal {
          font-size: 32px;
          line-height: 56px;
        }
        & svg {
          width: 32px;
          height: 32px;
        }
      }
      &.sm {
        height: 30px;
        min-width: 30px;
        width: 30px;
        & .fab,
        & .fas,
        & .far,
        & .fal {
          font-size: 17px;
          line-height: 29px;
        }
        & svg {
          width: 17px;
          height: 17px;
        }
      }
    }
  }
`;

export interface ButtonProps extends MuiButtonProps {
  className?: string;
  buttonColor?: Color | 'transparent' | 'inherit';
  buttonSize?: Size;
  simple?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  href?: string;
}

const Button: React.SFC<ButtonProps> = props => {
  const {
    children,
    buttonColor,
    buttonSize,
    simple,
    round,
    fullWidth,
    disabled,
    block,
    link,
    justIcon,
    innerRef,
    className,
    ...rest
  } = props;
  const classes = [];

  if (className) {
    classes.push(className);
  }
  if (buttonColor) {
    classes.push(buttonColor);
  }
  if (buttonSize) {
    classes.push(buttonSize);
  }
  if (simple) {
    classes.push('simple');
  }
  if (round) {
    classes.push('round');
  }
  if (fullWidth) {
    classes.push('fullWidth');
  }
  if (disabled) {
    classes.push('disabled');
  }
  if (block) {
    classes.push('block');
  }
  if (link) {
    classes.push('link');
  }
  if (justIcon) {
    classes.push('justIcon');
  }

  return (
    <StyledButton className={classes.join(' ')} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
