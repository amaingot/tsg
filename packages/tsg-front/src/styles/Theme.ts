import styled, { css } from 'styled-components';

export const drawerWidth = 260;

export const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
};

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export const conatinerFluid = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
};

export const ContainerFluid = styled.div`
  padding-right: ${conatinerFluid.paddingRight};
  padding-left: ${conatinerFluid.paddingLeft};
  margin-right: ${conatinerFluid.marginRight};
  margin-left: ${conatinerFluid.marginLeft};
  width: ${conatinerFluid.width};
`;

const containerWidths = {
  sm: {
    s: 576,
    d: 540,
  },
  md: {
    s: 768,
    d: 720,
  },
  lg: {
    s: 922,
    d: 960,
  },
  xl: {
    s: 1200,
    d: 1140,
  },
};

export const container = {
  ...conatinerFluid,
  ['@media (min-width: ' + containerWidths.sm.s + 'px)']: {
    maxWidth: containerWidths.sm.d + 'px',
  },
  ['@media (min-width: ' + containerWidths.md.s + 'px)']: {
    maxWidth: containerWidths.md.d + 'px',
  },
  ['@media (min-width: ' + containerWidths.lg.s + 'px)']: {
    maxWidth: containerWidths.lg.d + 'px',
  },
  ['@media (min-width: ' + containerWidths.xl.s + 'px)']: {
    maxWidth: containerWidths.xl.d + 'px',
  },
};

export const Container = styled(ContainerFluid)`
  @media (min-width: ${containerWidths.sm.s}px) {
    max-width: ${containerWidths.sm.d}px;
  }
  @media (min-width: ${containerWidths.md.s}px) {
    max-width: ${containerWidths.md.d}px;
  }
  @media (min-width: ${containerWidths.lg.s}px) {
    max-width: ${containerWidths.lg.d}px;
  }
  @media (min-width: ${containerWidths.xl.s}px) {
    max-width: ${containerWidths.xl.d}px;
  }
`;

export const boxShadow = {
  boxShadow:
    '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
};

export const card = {
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  margin: '25px 0',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
  borderRadius: '3px',
  color: 'rgba(0, 0, 0, 0.87)',
  background: '#fff',
};

export const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 300,
  lineHeight: '1.5em',
};

export const DefaultFont = css`
  font-family: ${defaultFont.fontFamily};
  font-weight: ${defaultFont.fontWeight};
  line-height: ${defaultFont.lineHeight};
`;

export const primaryColor = '#9c27b0';
export const warningColor = '#ff9800';
export const dangerColor = '#f44336';
export const successColor = '#4caf50';
export const infoColor = '#00acc1';
export const roseColor = '#e91e63';
export const grayColor = '#999999';

export const Color = {
  primary: primaryColor,
  warning: warningColor,
  danger: dangerColor,
  success: successColor,
  info: infoColor,
  rose: roseColor,
  gray: grayColor,
};

export const primaryBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)',
};
export const infoBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(0, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 188, 212, 0.2)',
};
export const successBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)',
};
export const warningBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)',
};
export const dangerBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)',
};
export const roseBoxShadow = {
  boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)',
};

export const warningCardHeader = {
  color: '#fff',
  background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
  ...warningBoxShadow,
};
export const successCardHeader = {
  color: '#fff',
  background: 'linear-gradient(60deg, #66bb6a, #43a047)',
  ...successBoxShadow,
};
export const dangerCardHeader = {
  color: '#fff',
  background: 'linear-gradient(60deg, #ef5350, #e53935)',
  ...dangerBoxShadow,
};
export const infoCardHeader = {
  color: '#fff',
  background: 'linear-gradient(60deg, #26c6da, #00acc1)',
  ...infoBoxShadow,
};
export const primaryCardHeader = {
  color: '#fff',
  background: 'linear-gradient(60deg, #ab47bc, #8e24aa)',
  ...primaryBoxShadow,
};
export const roseCardHeader = {
  color: '#fff',
  background: 'linear-gradient(60deg, #ec407a, #d81b60)',
  ...roseBoxShadow,
};
export const cardActions = {
  margin: '0 20px 10px',
  paddingTop: '10px',
  borderTop: '1px solid #eeeeee',
  height: 'auto',
  ...defaultFont,
};

export const cardHeader = {
  margin: '-30px 15px 0',
  borderRadius: '3px',
  padding: '15px',
};

export const defaultBoxShadow = {
  border: '0',
  borderRadius: '3px',
  boxShadow:
    '0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  padding: '10px 0',
  transition: 'all 150ms ease 0s',
};

export const title = {
  color: '#3C4858',
  margin: '1.75rem 0 0.875rem',
  textDecoration: 'none',
  fontWeight: 700,
  fontFamily: `"Roboto Slab", "Times New Roman", serif`,
};

export const TitleStyles = css`
  color: ${title.color};
  margin: ${title.margin};
  text-decoration: ${title.textDecoration};
  font-weight: ${title.fontWeight};
  font-family: ${title.fontFamily};
`;

export const cardTitle = {
  ...title,
  marginTop: '.625rem',
};

export const CardTitleStyles = css`
  ${TitleStyles}
  margin-top: ${cardTitle.marginTop};
`;

export const cardLink = {
  '& + $cardLink': {
    marginLeft: '1.25rem',
  },
};

export const cardSubtitle = {
  marginBottom: '0',
  marginTop: '-.375rem',
};

export type Color =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'rose'
  | 'white'
  | 'facebook'
  | 'twitter'
  | 'google'
  | 'github'
  | 'transparent';

export type Size = 'sm' | 'lg';
