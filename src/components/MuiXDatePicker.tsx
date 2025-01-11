import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { forwardRef } from "react";

const MuiXDatePicker = forwardRef<
  HTMLDivElement,
  DatePickerProps<Dayjs, false>
>((props, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker {...props} ref={ref} />
    </LocalizationProvider>
  );
});

MuiXDatePicker.displayName = "MuiXDatePicker";

export default MuiXDatePicker;
