import { FormFieldArray, FormValueMap } from '../utils/formHelpers';

export type CustomerFieldKey =
  | 'lastName'
  | 'firstName'
  | 'email'
  | 'address'
  | 'address2'
  | 'city'
  | 'state'
  | 'zip'
  | 'homePhone'
  | 'cellPhone'
  | 'workPhone';

export const customerFormFields: FormFieldArray<CustomerFieldKey> = [
  {
    label: 'Last Name',
    key: 'lastName',
    required: true,
  },
  {
    label: 'First Name',
    key: 'firstName',
    required: true,
  },
  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Address',
    key: 'address',
  },
  {
    label: 'Address 2',
    key: 'address2',
  },
  {
    label: 'City',
    key: 'city',
  },
  {
    label: 'State',
    key: 'state',
  },
  {
    label: 'Zip',
    key: 'zip',
  },
  {
    label: 'Home Phone',
    key: 'homePhone',
  },
  {
    label: 'Cell Phone',
    key: 'cellPhone',
  },
  {
    label: 'Work Phone',
    key: 'workPhone',
  },
];

export const validateCustomerFormFields = (
  values: FormValueMap<CustomerFieldKey>
): FormValueMap<CustomerFieldKey> => {
  const errors: FormValueMap<CustomerFieldKey> = {};

  if (
    values.email &&
    values.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ===
      null
  ) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.firstName) {
    errors.firstName = 'You must enter your first name.';
  }

  if (!values.lastName) {
    errors.lastName = 'You must enter your last name.';
  }

  if (values.homePhone && values.homePhone.match(/^\+?[1-9]\d{10,14}$/) === null) {
    errors.homePhone = 'You must enter your phone number. Example: +15557770000';
  }

  if (values.cellPhone && values.cellPhone.match(/^\+?[1-9]\d{10,14}$/) === null) {
    errors.cellPhone = 'You must enter your phone number. Example: +15557770000';
  }

  if (values.workPhone && values.workPhone.match(/^\+?[1-9]\d{10,14}$/) === null) {
    errors.workPhone = 'You must enter your phone number. Example: +15557770000';
  }

  return errors;
};
