import React from "react";
import MaskedInput from "react-text-mask";

interface Props {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const PhoneTextMask: React.FC<Props> = props => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
};

export const PhoneMaskInitialValue = "(   )   -    ";

export default PhoneTextMask;
