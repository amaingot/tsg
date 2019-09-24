import * as React from 'react';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import { CustomerForm } from 'src/components/CustomForm';
import Modal from 'src/components/Modal';
import createDialogStyles from 'src/utils/createDialogStyles';
import { CustomerFieldKey, validateCustomerFormFields } from 'src/utils/customerFormHelpers';
import { FormState, FormValueMap } from 'src/utils/formHelpers';

export interface Props extends WithStyles<typeof createDialogStyles> {
  submit: (values: FormValueMap<CustomerFieldKey>) => void;
  loading: boolean;
  initialValues?: FormValueMap<CustomerFieldKey>;
}

export interface State extends FormState<CustomerFieldKey> {
  open: boolean;
}

class CustomerModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      values: props.initialValues || {},
      errors: {},
    };
  }

  public open = () => this.setState({ open: true });

  public close = () => this.setState({ values: {}, errors: {}, open: false });

  public handleChange = (key: CustomerFieldKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      values: {
        ...this.state.values,
        [key]: e.currentTarget.value === '' ? undefined : e.currentTarget.value,
      },
    });
  };

  public submit = () => {
    const errors: FormValueMap<CustomerFieldKey> = validateCustomerFormFields(this.state.values);
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.values);
      this.close();
    } else {
      this.setState({ errors });
    }
  };

  public renderActions() {
    const { classes, initialValues } = this.props;

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
          {!!initialValues ? 'Update' : 'Create'}
        </Button>
      </>
    );
  }

  public render() {
    const { loading, classes, initialValues } = this.props;
    return (
      <>
        <Fab color="primary" aria-label="Add" onClick={this.open} className={classes.fab}>
          {!!initialValues ? <EditIcon /> : <AddIcon />}
        </Fab>
        <Modal
          open={this.state.open}
          title={!!initialValues ? 'Update customer' : 'Create new customer'}
          close={this.close}
          actions={this.renderActions()}
        >
          <CustomerForm
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

export default withStyles(createDialogStyles)(CustomerModal);
