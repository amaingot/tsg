import { FormFieldArray, FormValueMap } from './formHelpers';

export type JobFieldKey = 'name' | 'racket' | 'tension' | 'gauge' | 'stringName';

export const jobFormFields: FormFieldArray<JobFieldKey> = [
  {
    label: 'Job Name',
    key: 'name',
  },
  {
    label: 'Racket',
    key: 'racket',
    required: true,
  },
  {
    label: 'String',
    key: 'stringName',
    required: true,
  },
  {
    label: 'Gauge',
    key: 'gauge',
    required: true,
  },
  {
    label: 'Tension',
    key: 'tension',
    required: true,
  },
];

export const validateJobFormFields = (
  values: FormValueMap<JobFieldKey>
): FormValueMap<JobFieldKey> => {
  const errors: FormValueMap<JobFieldKey> = {};

  return errors;
};
