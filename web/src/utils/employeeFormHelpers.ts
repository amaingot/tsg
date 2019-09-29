import { FormFieldArray, FormValueMap } from '../utils/formHelpers';

export type EmployeeFormKey = 'lastName' | 'firstName' | 'email';
export const employeeFormFields: FormFieldArray<EmployeeFormKey> = [
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
    required: true,
  },
];

export const validateEmployeeFormFields = (
  values: FormValueMap<EmployeeFormKey>
): FormValueMap<EmployeeFormKey> => {
  const errors: FormValueMap<EmployeeFormKey> = {};

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

  return errors;
};
