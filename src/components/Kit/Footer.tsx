import classNames from 'classnames';
import * as React from 'react';

import { List, ListItem, withStyles } from '@material-ui/core';

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

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="https://about.me/alexmaingot/" className={classes.block} target="_blank">
                Alex Maingot
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>&copy; {new Date().getFullYear()} Tennis Shop Guru</div>
      </div>
    </footer>
  );
};

export default withStyles(footerStyle)(Footer);
