export type FullFormValues<FormKey extends string> = Record<FormKey, string>;
export type FormValueMap<FormKey extends string> = Partial<FullFormValues<FormKey>>;

export interface FormRecord<FormKey extends string> {
  label: string;
  key: FormKey;
  type?: string;
  required?: boolean;
}

export type FormFieldArray<FormKey extends string> = Array<FormRecord<FormKey>>;

export interface FormState<FormKey extends string> {
  values: FormValueMap<FormKey>;
  errors: FormValueMap<FormKey>;
}
