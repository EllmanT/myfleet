import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const VehicleTypes = ({ selected, onChange, disabled }) => {
  const [small, setSmall] = useState(false)
  function handleCBClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }

  return (
    <>
      <Box display={"flex"} gap={"1.5rem"}>
        <label className=" border p-4 flex rounded  items-center cursor-pointer">
          <input
            disabled={disabled}
            type="checkbox"
            checked={selected.includes("small")}
            name="small"
            onChange={handleCBClick}
          >

        
          </input>

          <span>Small <br/> (0- 5T)</span>
        </label>

        <label className=" border p-4 flex rounded gap-2 items-center cursor-pointer">
          <input
            disabled={disabled}
            type="checkbox"
            checked={selected.includes("medium")}
            name="medium"
            onChange={handleCBClick}
          />

          <span>Medium <br/>(5-10T)</span>
        </label>
        <label className=" border p-4 flex rounded gap-2 items-center cursor-pointer">
          <input
            disabled={disabled}
            type="checkbox"
            checked={selected.includes("horse")}
            name="horse"
            onChange={handleCBClick}
          />

          <span>Horse <br/>(10T+)</span>
        </label>
          
      
      </Box>
    </>
  );
};

export default VehicleTypes;
