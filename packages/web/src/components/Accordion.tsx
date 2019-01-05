import React from 'react';

// @material-ui/core components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import ExpandMore from '@material-ui/icons/ExpandMore';

import accordionStyle from 'styles/jss/components/accordionStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  active: number;
  collapses: Array<{
    title: string;
    content: React.ReactNode;
  }>;
}

interface State {
  active: number;
}

class Accordion extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: props.active,
    };
  }

  public static defaultProps = {
    active: -1,
  };

  public handleChange = (panel: number) => (e: React.ChangeEvent<any>, expanded: boolean) => {
    this.setState({
      active: expanded ? panel : -1,
    });
  };

  public render() {
    const { classes, collapses } = this.props;
    return (
      <div className={classes['root']}>
        {collapses.map((prop, key) => {
          return (
            <ExpansionPanel
              expanded={this.state.active === key}
              onChange={this.handleChange(key)}
              key={key}
              classes={{
                root: classes['expansionPanel'],
                expanded: classes['expansionPanelExpanded'],
              }}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                classes={{
                  root: classes['expansionPanelSummary'],
                  expanded: classes['expansionPanelSummaryExpaned'],
                  content: classes['expansionPanelSummaryContent'],
                  expandIcon: classes['expansionPanelSummaryExpandIcon'],
                }}
              >
                <h4 className={classes['title']}>{prop.title}</h4>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes['expansionPanelDetails']}>
                {prop.content}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

export default withStyles(accordionStyle)(Accordion);
