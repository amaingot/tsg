import { StyleRules } from '@material-ui/core/styles';

// ##############################
// // // Heading component styles
// #############################

const headingStyle: StyleRules<string> = {
  heading: {
    marginBottom: '30px',
  },
  rightTextAlign: {
    textAlign: 'right',
  },
  leftTextAlign: {
    textAlign: 'left',
  },
  centerTextAlign: {
    textAlign: 'center',
  },
  title: {
    marginTop: '10px',
    color: '#3C4858',
    textDecoration: 'none',
  },
  category: {
    margin: '0 0 10px',
  },
};

export default headingStyle;
