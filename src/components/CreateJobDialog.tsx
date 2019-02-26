import * as React from 'react';

import Fab from '@material-ui/core/Fab';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';

import CreateJobForm from 'src/components/CreateJobForm';
import Modal from 'src/components/Modal';
import { CreateJobInput, CreateJobMutationVariables } from 'src/graphql/types';

const styles: StyleRulesCallback = theme => ({
  button: {
    position: 'absolute',
    right: `${theme.spacing.unit * 3}px`,
    marginTop: `-${theme.spacing.unit * 6}px`,
  },
});

export interface Props extends WithStyles<typeof styles> {
  submit: (variables: CreateJobMutationVariables) => void;
  loading: boolean;
}

export interface State {
  open: boolean;
}

class CreateJobDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  public open = () => this.setState({ open: true });

  public close = () => this.setState({ open: false });

  public submit = (input: CreateJobInput) => {
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
        <Modal open={this.state.open} title="Create new string job" close={this.close}>
          <CreateJobForm submit={this.submit} loading={loading} />
        </Modal>
      </>
    );
  }
}

export default withStyles(styles)(CreateJobDialog);
