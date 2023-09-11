import { InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const cities = [
  {
    value: "Mutare",
  },
  {
    value: "Harare",
  },
  {
    value: "Bulawayo",
  },
  {
    value: "Rusape",
  },
  {
    value: "Chinhoyi",
  },
  {
    value: "Gweru",
  },
  {
    value: "Kadoma",
  },
  {
    value: "Chegutu",
  },
  {
    value: "Victoria Falls",
  },
  {
    value: "Masvingo",
  },
  {
    value: "Hwange",
  },
  {
    value: "Marondera",
  },
  {
    value: "Chipinge",
  },
  {
    value: "Chimanimani",
  },
  {
    value: "Nyanga",
  },
  {
    value: "Kariba",
  },
  {
    value: "BeitBridge",
  },
  {
    value: "Chirundu",
  },
];

export default function Cities({ name, onChange }) {
  return (
    <>
      <InputLabel id="demo-simple-select-autowidth-label">Cities</InputLabel>
      <Select
        color="info"
        labelId="simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={name}
        onChange={onChange}
        autoWidth
        label="City"
      >
        {cities.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
