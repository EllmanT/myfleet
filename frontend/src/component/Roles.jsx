import { InputLabel, Menu, MenuItem, Select } from "@mui/material";

const roles = [
  {
    value: "SuperAdmin",
  },
  {
    value: "Admin",
  },
  {
    value: "Deliverer",
  },
  {
    value: "Contractor",
  },
];
export default function Roles({ name, onChange }) {
  return (
    <>
      <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>

      <Select
        labelId="simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        color="info"
        value={name}
        onChange={onChange}
        autoWidth
        label="Role"
      >
        {roles.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
