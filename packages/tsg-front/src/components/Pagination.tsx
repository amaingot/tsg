import cx from 'classnames';
import React from 'react';

// @material-ui/core components
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import paginationStyle from 'styles/jss/components/paginationStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  pages: Array<{
    active: boolean;
    disabled: boolean;
    text: number | 'PREV' | 'NEXT' | '...';
    onClick: React.MouseEventHandler;
  }>;
  color: 'primary' | 'info' | 'success' | 'warning' | 'danger';
}

const Pagination: React.SFC<Props> = ({ ...props }) => {
  const { classes, pages, color } = props;

  return (
    <ul className={classes.pagination}>
      {pages.map((prop, key) => {
        const paginationLink = cx({
          [classes.paginationLink]: true,
          [classes[color]]: prop.active,
          [classes.disabled]: prop.disabled,
        });
        return (
          <li className={classes.paginationItem} key={key}>
            {prop.onClick !== undefined ? (
              <Button onClick={prop.onClick} className={paginationLink}>
                {prop.text}
              </Button>
            ) : (
              <Button
                // onClick={() => console.log("you've clicked " + prop.text)}
                className={paginationLink}
              >
                {prop.text}
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

Pagination.defaultProps = {
  color: 'primary',
};

export default withStyles(paginationStyle)(Pagination);
