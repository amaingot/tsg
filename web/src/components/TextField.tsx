import React from "react";
import MUITextField, { TextFieldProps } from "@material-ui/core/TextField";

import PhoneTextMask, { phoneNumberIsValid } from "../components/PhoneTextMask";
import emailIsValid from "../utils/emailIsValid";

interface Props {
  hide?: boolean;
}

type CombinedProps = Props & TextFieldProps;

const TextField: React.FC<CombinedProps> = props => {
  const {
    id,
    name = props.id,
    variant = "outlined",
    fullWidth = true,
    type,
    InputProps = {},
    value = "",
    error = false,
    hide = false,
    ...others
  } = props;

  if (hide === true) {
    return <></>;
  }

  const isPhone = props.type === "tel";
  const isEmail = props.type === "email";

  const updatedInputProps = isPhone
    ? ({
        ...InputProps,
        inputComponent: PhoneTextMask
      } as any)
    : InputProps;

  let updatedError = error;

  if (isPhone) {
    updatedError =
      updatedError || (typeof value === "string" && !phoneNumberIsValid(value));
  } else if (isEmail) {
    updatedError =
      updatedError || (typeof value === "string" && !emailIsValid(value));
  }

  return (
    <MUITextField
      id={id}
      name={name}
      variant={variant as any}
      error={updatedError}
      fullWidth={fullWidth}
      type={type}
      InputProps={updatedInputProps}
      {...others}
    />
  );
};

export default TextField;
