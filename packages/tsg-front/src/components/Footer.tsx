import classNames from 'classnames';
import React from 'react';

import { List, withStyles, WithStyles } from '@material-ui/core';
// import Favorite from '@material-ui/icons/Favorite';

import FooterStyle from 'styles/FooterStyle';

interface FooterProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  whiteFont?: boolean;
}

const Footer: React.SFC<FooterProps> = props => {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  // const aClasses = classNames({
  //   [classes.a]: true,
  //   [classes.footerWhiteFont]: whiteFont,
  // });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {/* <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.creative-tim.com/presentation"
                className={classes.block}
                target="_blank"
              >
                About us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://blog.creative-tim.com/" className={classes.block} target="_blank">
                Blog
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.creative-tim.com/license"
                className={classes.block}
                target="_blank"
              >
                Licenses
              </a>
            </ListItem> */}
          </List>
        </div>
        <div className={classes.right}>&copy; {new Date().getFullYear()} Tennis Shop Guru</div>
      </div>
    </footer>
  );
};

export default withStyles(FooterStyle)(Footer);
