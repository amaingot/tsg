import * as React from 'react';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { JobForm } from '../components/CustomForm';
import Modal from '../components/Modal';
import useDialogStyles from '../utils/useDialogStyles';
import { FormState, FormValueMap } from '../utils/formHelpers';
import { JobFieldKey, validateJobFormFields } from '../utils/jobFormHelpers';

export interface Props {
  submit: (variables: any) => void;
  loading: boolean;
}

export interface State extends FormState<JobFieldKey> {
  open: boolean;
}

class CreateJobDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      values: {},
      errors: {},
    };
  }

  public open = () => this.setState({ open: true });

  public close = () => this.setState({ values: {}, errors: {}, open: false });

  public handleChange = (key: JobFieldKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      values: {
        ...this.state.values,
        [key]: e.currentTarget.value === '' ? undefined : e.currentTarget.value,
      },
    });
  };

  public submit = () => {
    const errors: FormValueMap<JobFieldKey> = validateJobFormFields(this.state.values);

    if (Object.keys(errors).length === 0) {
      this.props.submit({ input: this.state.values });
      this.close();
    } else {
      this.setState({ errors });
    }
  };

  public renderActions() {
    const classes = useDialogStyles();

    return (
      <>
        <Button onClick={this.close} variant="contained" className={classes.button}>
          Cancel
        </Button>
        <Button
          onClick={this.submit}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Create
        </Button>
      </>
    );
  }

  public render() {
    const { loading } = this.props;
    const classes = useDialogStyles();

    return (
      <>
        <Fab color="primary" aria-label="Add" onClick={this.open} className={classes.fab}>
          <AddIcon />
        </Fab>
        <Modal
          open={this.state.open}
          title="Create new string job"
          close={this.close}
          actions={this.renderActions()}
        >
          <JobForm
            handleChange={this.handleChange}
            values={this.state.values}
            errors={this.state.errors}
            loading={loading}
          />
        </Modal>
      </>
    );
  }
}

export default CreateJobDialog;
