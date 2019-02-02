// nodejs library that concatenates classes
import classNames from 'classnames';
import * as React from 'react';
// nodejs library to set properties for components

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

// core components
import Card from 'src/components/Card';
import CardBody from 'src/components/CardBody';
import CardHeader from 'src/components/CardHeader';

import customTabsStyle from 'src/styles/jss/components/customTabsStyle';
import { CommonProps } from 'src/utils/commonProps';

interface Props extends CommonProps {
  headerColor?: 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose';
  title?: string;
  tabs?: Array<{
    tabName: string;
    tabIcon?: React.ComponentType<any>;
    tabContent: React.ReactNode;
  }>;
  plainTabs?: boolean;
}

interface State {
  value: number;
}

class CustomTabs extends React.Component<Props, State> {
  public state = {
    value: 0,
  };

  public handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    this.setState({ value });
  };

  public render() {
    const { classes, headerColor, plainTabs, tabs, title } = this.props;
    const cardTitle = classNames({
      [classes.cardTitle]: true,
    });
    return (
      <Card plain={plainTabs}>
        <CardHeader color={headerColor} plain={plainTabs}>
          {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.displayNone,
            }}
          >
            {tabs &&
              tabs.map((prop, key) => {
                let icon = {};
                if (prop.tabIcon) {
                  icon = {
                    icon: <prop.tabIcon />,
                  };
                }
                return (
                  <Tab
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
          </Tabs>
        </CardHeader>
        <CardBody>
          {tabs &&
            tabs.map((prop, key) => {
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

export default withStyles(customTabsStyle)(CustomTabs);
