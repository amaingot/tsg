import classNames from 'classnames';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import NavPillsStyle from 'styles/NavPillsStyle';
import { Color } from 'styles/Theme';

interface NavPillsProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  active?: number;
  tabs: Array<{
    tabButton: string;
    tabIcon: React.ComponentType<SvgIconProps>;
    tabContent: React.ReactNode;
  }>;
  color?: Color;
  direction: string;
  horizontal: {
    tabsGrid: object;
    contentGrid: object;
  };
  alignCenter: boolean;
}

interface NavPillsState {
  active: number;
}

class NavPills extends React.Component<NavPillsProps, NavPillsState> {
  constructor(props: NavPillsProps) {
    super(props);
    this.state = {
      active: props.active || 0,
    };
  }

  public handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    if (typeof value === 'number') {
      this.setState({ active: value });
    }
  };

  public handleChangeIndex = (index: number) => {
    this.setState({ active: index });
  };

  public render() {
    const { classes, tabs, direction, color, horizontal, alignCenter } = this.props;
    const flexContainerClasses = classNames({
      [classes.flexContainer]: true,
      [classes.horizontalDisplay]: horizontal !== undefined,
    });

    const tabButtons = (
      <Tabs
        classes={{
          root: classes.root,
          fixed: classes.fixed,
          flexContainer: flexContainerClasses,
          indicator: classes.displayNone,
        }}
        value={this.state.active}
        onChange={this.handleChange}
        centered={alignCenter}
      >
        {tabs.map((prop, key) => {
          let icon;
          if (prop.tabIcon !== undefined) {
            icon = <prop.tabIcon className={classes.tabIcon} />;
          }
          const pillsClasses = classNames({
            [classes.pills]: true,
            [classes.horizontalPills]: horizontal !== undefined,
            [classes.pillsWithIcons]: prop.tabIcon !== undefined,
          });
          return (
            <Tab
              label={prop.tabButton}
              key={key}
              icon={icon}
              classes={{
                root: pillsClasses,
                labelContainer: classes.labelContainer,
                label: classes.label,
                selected: classes[color || 'primary'],
              }}
            />
          );
        })}
      </Tabs>
    );

    const tabContent = (
      <div className={classes.contentWrapper}>
        <SwipeableViews
          axis={direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.active}
          onChangeIndex={this.handleChangeIndex}
        >
          {tabs.map((prop, key) => {
            return (
              <div className={classes.tabContent} key={key}>
                {prop.tabContent}
              </div>
            );
          })}
        </SwipeableViews>
      </div>
    );

    return horizontal !== undefined ? (
      <GridContainer>
        <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
        <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
      </GridContainer>
    ) : (
      <div>
        {tabButtons}
        {tabContent}
      </div>
    );
  }
}

export default withStyles(NavPillsStyle)(NavPills);
