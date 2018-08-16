import classNames from 'classnames';
import React from 'react';

import Button from '@material-ui/core/Button';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import PaginationStyle from 'styles/PaginationStyle';
import { Color } from 'styles/Theme';

interface PaginationProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  pages: Array<{
    active: boolean;
    disabled: boolean;
    text: 'PREV' | 'NEXT' | '...';
    onClick: () => any;
  }>;
  color?: Color;
}

const Pagination: React.SFC<PaginationProps> = props => {
  const { classes, pages, color } = props;
  return (
    <ul className={classes.pagination}>
      {pages.map((prop, key) => {
        const paginationLink = classNames({
          [classes.paginationLink]: true,
          [classes[color || 'primary']]: prop.active,
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

export default withStyles(PaginationStyle)(Pagination);
