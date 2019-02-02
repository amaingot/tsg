import cx from 'classnames';
import * as React from 'react';

// @material-ui/core components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import withStyles from '@material-ui/core/styles/withStyles';

import footerStyle from 'src/styles/jss/components/footerStyle';
import { CommonProps } from 'src/utils/commonProps';
import CustomLink from 'src/utils/CustomLink';

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
              <CustomLink to="/" className={block}>
                Home
              </CustomLink>
            </ListItem>
            {' | '}
            <ListItem className={classes.inlineBlock}>
              <CustomLink to="/About" className={block}>
                About
              </CustomLink>
            </ListItem>
            {' | '}
            <ListItem className={classes.inlineBlock}>
              <CustomLink to="/contact" className={block}>
                Contact
              </CustomLink>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {new Date().getFullYear()}{' '}
          <a href="#" className={anchor}>
            Centre Court, Inc.
          </a>
        </p>
      </div>
    </footer>
  );
};

export default withStyles(footerStyle)(Footer);
