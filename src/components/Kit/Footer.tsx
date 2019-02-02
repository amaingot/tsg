import classNames from 'classnames';
import * as React from 'react';

import { List, ListItem, withStyles } from '@material-ui/core';

import Favorite from '@material-ui/icons/Favorite';

import footerStyle from 'src/styles/jss/components/kit/footerStyle';
import { CommonProps } from 'src/utils/commonProps';

interface Props extends CommonProps {
  whiteFont?: boolean;
}

const Footer: React.SFC<Props> = (props: Props) => {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="https://www.creative-tim.com/" className={classes.block} target="_blank">
                Creative Tim
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
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
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {new Date().getFullYear()} , made with <Favorite className={classes.icon} /> by{' '}
          <a href="https://www.creative-tim.com" className={aClasses} target="_blank">
            Creative Tim
          </a>{' '}
          for a better web.
        </div>
      </div>
    </footer>
  );
};

export default withStyles(footerStyle)(Footer);
