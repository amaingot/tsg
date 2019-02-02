// nodejs library that concatenates classes
import classNames from 'classnames';
import * as React from 'react';
// nodejs library to set properties for components
import SwipeableViews from 'react-swipeable-views';

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles';
import Tab, { TabProps } from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

// core components
import GridContainer from 'src/components/GridContainer';
import GridItem from 'src/components/GridItem';

import navPillsStyle from 'src/styles/jss/components/navPillsStyle';
import { CommonProps } from 'src/utils/commonProps';

interface Props extends CommonProps {
  active?: number;
  tabs: Array<{
    tabButton: string;
    tabIcon: React.SFC<any>;
    tabContent: React.ReactNode;
  }>;
  color?: string; // 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'rose';
  horizontal?: {
    tabsGrid: object;
    contentGrid: object;
  };
  alignCenter?: boolean;
}

interface State {
  active?: number;
}

class NavPills extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: props.active,
    };
  }

  public static defaultProps = {
    active: 0,
    color: 'primary',
  };

  public handleChange = (event: React.ChangeEvent<{}>, active: any) => {
    this.setState({ active });
  };

  public handleChangeIndex = (index: number) => {
    this.setState({ active: index });
  };

  public render() {
    const { classes, tabs, color, horizontal, alignCenter } = this.props;
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
          const icon: Partial<TabProps> = {};
          if (prop.tabIcon) {
            icon.icon = <prop.tabIcon className={classes.tabIcon} />;
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
              {...icon}
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
        <SwipeableViews axis={'x'} index={this.state.active} onChangeIndex={this.handleChangeIndex}>
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

export default withStyles(navPillsStyle)(NavPills);
