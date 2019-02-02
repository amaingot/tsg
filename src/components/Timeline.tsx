import cx from 'classnames';
import * as React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import Badge from 'src/components/Badge';

import timelineStyle from 'src/styles/jss/components/timelineStyle';
import { CommonProps } from 'src/utils/commonProps';

interface Props extends CommonProps {
  stories: Array<{
    inverted: string;
    badgeColor: string;
    badgeIcon: React.SFC<any>;
    title: string;
    titleColor?:
      | 'primary'
      | 'warning'
      | 'danger'
      | 'success'
      | 'info'
      | 'rose'
      | 'gray'
      | undefined;
    body?: React.ReactNode;
    footerTitle?: React.ReactNode;
    footer?: React.ReactNode;
  }>;
  simple?: boolean;
}

const Timeline: React.SFC<Props> = ({ ...props }) => {
  const { classes, stories, simple } = props;
  const timelineClass =
    classes.timeline +
    ' ' +
    cx({
      [classes.timelineSimple]: simple,
    });
  return (
    <ul className={timelineClass}>
      {stories.map((prop, key) => {
        const panelClasses =
          classes.timelinePanel +
          ' ' +
          cx({
            [classes.timelinePanelInverted]: prop.inverted,
            [classes.timelineSimplePanel]: simple,
          });
        const timelineBadgeClasses =
          classes.timelineBadge +
          ' ' +
          classes[prop.badgeColor] +
          ' ' +
          cx({
            [classes.timelineSimpleBadge]: simple,
          });
        return (
          <li className={classes.item} key={key}>
            {prop.badgeIcon ? (
              <div className={timelineBadgeClasses}>
                <prop.badgeIcon className={classes.badgeIcon} />
              </div>
            ) : null}
            <div className={panelClasses}>
              {prop.title ? (
                <div className={classes.timelineHeading}>
                  <Badge color={prop.titleColor}>{prop.title}</Badge>
                </div>
              ) : null}
              <div className={classes.timelineBody}>{prop.body}</div>
              {prop.footerTitle ? (
                <h6 className={classes.footerTitle}>{prop.footerTitle}</h6>
              ) : null}
              {prop.footer ? <hr className={classes.footerLine} /> : null}
              {prop.footer ? <div className={classes.timelineFooter}>{prop.footer}</div> : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default withStyles(timelineStyle)(Timeline);
