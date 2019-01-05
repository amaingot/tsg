import { StyleRules } from '@material-ui/core/styles';

import { title } from 'styles/jss/material-kit-react';

const productStyle: StyleRules<string> = {
  section: {
    padding: '70px 0',
    textAlign: 'center',
  },
  title: {
    ...title,
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
  },
  description: {
    color: '#999',
  },
};

export default productStyle;
