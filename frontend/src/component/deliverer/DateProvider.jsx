import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateProvider({ title, date }) {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={title}
        value={date ? date.toISOString().slice(0, 10) : ""}
        
      />
    </LocalizationProvider>
  );
}
