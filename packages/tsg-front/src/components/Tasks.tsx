import React from 'react';

// @material-ui/core components
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import Edit from '@material-ui/icons/Edit';

import tasksStyle from 'styles/jss/components/tasksStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  tasksIndexes: number[];
  checkedIndexes: number[];
  tasks: React.ReactNode[];
}

interface State {
  checked: number[];
}

class Tasks extends React.Component<Props, State> {
  public state = {
    checked: this.props.checkedIndexes,
  };
  public handleToggle = (value: number) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };
  public render() {
    const { classes, tasksIndexes, tasks } = this.props;
    return (
      <Table className={classes.table}>
        <TableBody>
          {tasksIndexes.map(value => (
            <TableRow key={value} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
                <Checkbox
                  checked={this.state.checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  onClick={this.handleToggle(value)}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.checkRoot,
                  }}
                />
              </TableCell>
              <TableCell className={classes.tableCell}>{tasks[value]}</TableCell>
              <TableCell className={classes.tableActions}>
                <Tooltip
                  id="tooltip-top"
                  title="Edit Task"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton aria-label="Edit" className={classes.tableActionButton}>
                    <Edit className={classes.tableActionButtonIcon + ' ' + classes.edit} />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top-start"
                  title="Remove"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton aria-label="Close" className={classes.tableActionButton}>
                    <Close className={classes.tableActionButtonIcon + ' ' + classes.close} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(tasksStyle)(Tasks);