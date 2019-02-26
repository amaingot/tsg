import * as React from 'react';

import Fab from '@material-ui/core/Fab';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';

import CreateEmployeeForm from 'src/components/CreateEmployeeForm';
import Modal from 'src/components/Modal';
import { CreateEmployeeInput, CreateEmployeeMutationVariables } from 'src/graphql/types';

const styles: StyleRulesCallback = theme => ({
  button: {
    position: 'absolute',
    right: `${theme.spacing.unit * 3}px`,
    marginTop: `-${theme.spacing.unit * 6}px`,
  },
});

export interface Props extends WithStyles<typeof styles> {
  submit: (variables: CreateEmployeeMutationVariables) => void;
  loading: boolean;
}

export interface State {
  open: boolean;
}

class CreateEmployeeDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  public open = () => this.setState({ open: true });

  public close = () => this.setState({ open: false });

  public submit = (input: CreateEmployeeInput) => {
    this.props.submit({ input });
    this.close();
  };

  public render() {
    const { loading, classes } = this.props;
    return (
      <>
        <Fab color="primary" aria-label="Add" onClick={this.open} className={classes.button}>
          <AddIcon />
        </Fab>
        <Modal open={this.state.open} title="Create new customer" close={this.close}>
          <CreateEmployeeForm submit={this.submit} loading={loading} />
        </Modal>
      </>
    );
  }
}

export default withStyles(styles)(CreateEmployeeDialog);
