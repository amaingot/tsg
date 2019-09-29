import * as React from 'react';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { EmployeeForm } from '../components/CustomForm';
import Modal from '../components/Modal';
import useDialogStyles from '../utils/useDialogStyles';
import { EmployeeFormKey, validateEmployeeFormFields } from '../utils/employeeFormHelpers';
import { FormState, FormValueMap } from '../utils/formHelpers';

export interface Props {
  submit: (variables: any) => void;
  loading: boolean;
}

export interface State extends FormState<EmployeeFormKey> {
  open: boolean;
}

class CreateEmployeeDialog extends React.Component<Props, State> {
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

  public handleChange = (key: EmployeeFormKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      values: {
        ...this.state.values,
        [key]: e.currentTarget.value === '' ? undefined : e.currentTarget.value,
      },
    });
  };

  public submit = () => {
    const errors: FormValueMap<EmployeeFormKey> = validateEmployeeFormFields(this.state.values);

    if (Object.keys(errors).length === 0 && this.state.values.email) {
      this.props.submit({ input: { ...this.state.values, owner: this.state.values.email } });
      this.close();
    } else {
      this.setState({ errors });
    }
  };
  public renderActions() {
    const classes = useDialogStyles();

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  public render() {
    const { loading } = this.props;
    const classes = useDialogStyles();

    return (
      <React.Fragment>
        <Fab color="primary" aria-label="Add" onClick={this.open} className={classes.fab}>
          <AddIcon />
        </Fab>
        <Modal
          open={this.state.open}
          title="Create new customer"
          close={this.close}
          actions={this.renderActions()}
        >
          <EmployeeForm
            handleChange={this.handleChange}
            values={this.state.values}
            errors={this.state.errors}
            loading={loading}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default CreateEmployeeDialog;
