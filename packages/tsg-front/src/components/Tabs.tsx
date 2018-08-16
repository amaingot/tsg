import classNames from 'classnames';
import React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';

import Card from 'components/Card';
import CardBody from 'components/CardBody';
import CardHeader from 'components/CardHeader';

import { SvgIconProps } from '@material-ui/core/SvgIcon';
import TabsStyle from 'styles/TabsStyle';
import { Color } from 'styles/Theme';

interface TabsProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  headerColor?: Color;
  title?: string;
  tabs: Array<{
    tabName: string;
    tabIcon: React.ComponentType<SvgIconProps>;
    tabContent: React.ReactNode;
  }>;
  rtlActive?: boolean;
  plainTabs?: boolean;
}

interface TabsState {
  value: number;
}

class Tabs extends React.Component<TabsProps, TabsState> {
  public state = {
    value: 0,
  };

  public handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    this.setState({ value });
  };

  public render() {
    const { classes, headerColor, plainTabs, tabs, title, rtlActive } = this.props;
    const cardTitle = classNames({
      [classes.cardTitle]: true,
      [classes.cardTitleRTL]: rtlActive,
    });
    return (
      <Card plain={plainTabs}>
        <CardHeader color={headerColor} plain={plainTabs}>
          {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
          <MuiTabs
            value={this.state.value}
            onChange={this.handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.displayNone,
            }}
          >
            {tabs.map((prop, key) => {
              let icon = {};
              if (prop.tabIcon) {
                icon = {
                  icon: <prop.tabIcon />,
                };
              }
              return (
                <MuiTab
                  classes={{
                    root: classes.tabRootButton,
                    labelContainer: classes.tabLabelContainer,
                    label: classes.tabLabel,
                    selected: classes.tabSelected,
                    wrapper: classes.tabWrapper,
                  }}
                  key={key}
                  label={prop.tabName}
                  {...icon}
                />
              );
            })}
          </MuiTabs>
        </CardHeader>
        <CardBody>
          {tabs.map((prop, key) => {
            if (key === this.state.value) {
              return <div key={key}>{prop.tabContent}</div>;
            }
            return null;
          })}
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(TabsStyle)(Tabs);
