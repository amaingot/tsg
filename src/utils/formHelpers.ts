export type FormValues<FormKey extends string> = Record<FormKey, string>;
export type FormErrorMessages<FormKey extends string> = Partial<FormValues<FormKey>>;

export interface FormRecord<FormKey extends string> {
  label: string;
  key: FormKey;
  type?: string;
  required?: boolean;
}

export type FormFieldArray<FormKey extends string> = Array<FormRecord<FormKey>>;

export interface FormState<FormKey extends string> {
  values: FormErrorMessages<FormKey>;
  errors: FormErrorMessages<FormKey>;
}
