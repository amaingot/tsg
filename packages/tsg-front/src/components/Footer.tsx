import cx from 'classnames';
import React from 'react';

// @material-ui/core components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import withStyles from '@material-ui/core/styles/withStyles';

import footerStyle from 'styles/jss/components/footerStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  fluid?: boolean;
  white?: boolean;
}

const Footer: React.SFC<Props> = ({ ...props }) => {
  const { classes, fluid, white } = props;
  const container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  });
  const anchor =
    classes.a +
    cx({
      [' ' + classes.whiteColor]: white,
    });
  const block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white,
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={block}>
                Company
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={block}>
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={block}>
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getFullYear()}{' '}
          <a href="https://www.creative-tim.com" className={anchor}>
            Creative Tim
          </a>
          , made with love for a better web
        </p>
      </div>
    </footer>
  );
};

export default withStyles(footerStyle)(Footer);
