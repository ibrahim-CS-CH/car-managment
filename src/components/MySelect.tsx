import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

const MySelect = ({
  controllerProps,
  items,
  label,
  disabled = false,
  defaultValue,
}: {
  controllerProps: UseControllerProps<any>;
  items: { id: string; value: string }[];
  label: string;
  disabled?: boolean;
  defaultValue?: string;
}) => {
  const {
    field,
    fieldState: { error },
  } = useController(controllerProps);

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);
  return (
    <FormControl fullWidth size="small" disabled={disabled}>
      <InputLabel id="my-custom-select">{label}</InputLabel>
      <Select
        defaultValue={defaultValue}
        labelId="my-custom-select"
        id="my-custom-select"
        label={label}
        name={field.name}
        ref={field.ref}
        value={value}
        error={!!error}
        onChange={(e) => {
          setValue(e.target.value);
          field.onChange(e);
        }}>
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
      {error && error.message && (
        <FormHelperText>{error.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default MySelect;
