import { Input, InputProps } from "./ui/input";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import React, { forwardRef } from "react";

export const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<InputProps>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$"
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
        decimalScale={2}
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";
