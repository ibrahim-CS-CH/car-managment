import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FC } from "react";
import { useController, UseControllerProps } from "react-hook-form";

const CustomTextField: FC<CustomTextFieldProps> = ({
  controllerProps,
  textFieldProps,
  transformIn,
  transformOut,
  focuesd = false,
}) => {
  const {
    field,
    fieldState: { isTouched, error },
  } = useController(controllerProps);

  return (
    <TextField
      {...field}
      focused={focuesd}
      onChange={(e) => {
        const value = e.target.value;

        field.onChange(
          transformOut
            ? transformOut(value)
            : textFieldProps.type === "number"
            ? +value
            : value
        );
      }}
      onKeyDown={(evt) => {
        if (textFieldProps.type === "number") {
          ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault();
        }
      }}
      value={transformIn ? transformIn(field.value) : field.value}
      error={isTouched && error !== undefined}
      helperText={error?.message}
      {...textFieldProps}
    />
  );
};

interface CustomTextFieldProps {
  controllerProps: UseControllerProps;
  textFieldProps: TextFieldProps;
  transformIn?: (value: any) => any;
  transformOut?: (value: any) => any;
  focuesd?: boolean;
}

export default CustomTextField;
