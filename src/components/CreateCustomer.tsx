import * as React from 'react';

import Fab from '@material-ui/core/Fab';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';

import CreateCustomerForm from 'src/components/CreateCustomerForm';
import Modal from 'src/components/Modal';
import { CreateCustomerInput, CreateCustomerMutationVariables } from 'src/graphql/types';

const styles: StyleRulesCallback = theme => ({
  button: {
    position: 'absolute',
    right: `${theme.spacing.unit * 3}px`,
    marginTop: `-${theme.spacing.unit * 6}px`,
  },
});

export interface Props extends WithStyles<typeof styles> {
  submit: (variables: CreateCustomerMutationVariables) => void;
  loading: boolean;
}

export interface State {
  open: boolean;
}

class CreateCustomer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  public open = () => this.setState({ open: true });

  public close = () => this.setState({ open: false });

  public submit = (input: CreateCustomerInput) => {
    this.props.submit({ input });
    this.close();
  };

  public render() {
    const { loading, classes } = this.props;
    return (
      <>
        <Fab
          color="primary"
          aria-label="Add"
          onClick={this.open}
          disabled={loading}
          className={classes.button}
        >
          <AddIcon />
        </Fab>
        <Modal open={this.state.open} title="Create new customer" close={this.close}>
          <CreateCustomerForm submit={this.submit} loading={false} />
        </Modal>
      </>
    );
  }
}

export default withStyles(styles)(CreateCustomer);
