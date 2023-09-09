import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Close, Group, GroupAdd, LocalShipping, PhotoSizeSelectActual } from "@mui/icons-material";
import GoodsTypes from "component/deliverer/GoodsType";
import FlexBetween from "component/deliverer/FlexBetween";
import Header from "component/deliverer/Header";
import DateProvider from "component/deliverer/DateProvider";


const sizes= [
  {
    value:"Small (<=5T)",
  },
  {
    value:"Medium (<=10T)",
  },
  {
    value:"Horse (>=10T)"


  }
]

const VehiclesPage = () => {
  const theme = useTheme();

  const [open, setOpen] = useState("");



  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");


  //the steps
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  //the customer info
  const [customer, setCustomer] = useState("");
  const [from, setFrom] = useState("");
  const [address, setAddress] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [contractorId, setContractorId] = useState("");
  const [orderDate, setOrderDate] = useState(null);

  //the company info
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [mileageOut, setMileageOut] = useState("");
  const [mileageIn, setMileageIn] = useState("");

  //the preview
  const distance = mileageIn - mileageOut;
  const cost = distance * 1.65;

//start of add Contractor
  //for the goods type add contractor
  const [goodsType, setGoodsType] = useState([]);


  //end of add contractor

  //start of add Order

  //end of add Order

  //start of add driver

  //end of add drover








  //the steps

  const handleClickOpen = () => {
    setOpen(true);
  };




  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    

    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
<Header title="Vehicles" subtitle="See all your vehicles." />
<Box >

  <Button
    sx={{
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.background.alt,
      fontSize: "14px",
      fontWeight: "bold",
      padding: "10px 20px",
    }}
  >
    <LocalShipping sx={{ mr: "10px" }} />
    4
  </Button>
</Box>
<Box >

  <Button
    sx={{
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.background.alt,
      fontSize: "14px",
      fontWeight: "bold",
      padding: "10px 20px",
    }}
    onClick={handleClickOpen}
  >
    <Add sx={{ mr: "10px" }} />
    Add
  </Button>
</Box>

</FlexBetween>

<div>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle variant="h3" sx={{ m: "0rem 6rem" }}>
            <Button
              disabled
              variant="outlined"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                padding: "10px 20px",
                ":disabled": {
                  color: theme.palette.primary[100],
                },
              }}
            >
              <GroupAdd sx={{ mr: "10px", fontSize: "25px" }} />
              Vehicle
            </Button>
            <Button variant="outlined" color="info" sx={{ml: "30px"}} onClick={handleClose}>
              <Close sx={{fontSize:"25px"}}/>
            </Button>
          </DialogTitle>
          <DialogContent>
            <form>
              <Box display={"flex"} flexDirection={"column"}>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <TextField
                    required
                    variant="outlined"
                    type="text"
                    label="Make"
                    color="info"
                  />
                </FormControl>
                <Box display={"flex"}>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Size
                    </InputLabel>
                    <Select
                      labelId="simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      autoWidth
                      label="Size"
                    > 
                     {sizes.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.value}
                                    </MenuItem>
                                  ))}

                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                      required
                      variant="outlined"
                      type="text"
                      label="Reg Number"
                      color="info"
                    />
                  </FormControl>
                </Box>

                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <TextField
                    required
                    variant="outlined"
                    type="text"
                    label="Address"
                    color="info"
                  />
                </FormControl>

                <Box display={"flex"} sx={{ m: "1rem 3rem " }}>
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    size="large"
                    sx={{
                      color: theme.palette.secondary[300],

                      margin: "1rem",
                      border: "solid 1px",
                      ":hover": {
                        backgroundColor: theme.palette.secondary[800],
                      },
                      ":disabled": {
                        backgroundColor: theme.palette.secondary[800],
                      },
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    fontWeight="bold"
                    sx={{
                      color: theme.palette.secondary[100],
                      backgroundColor: theme.palette.secondary[300],
                      margin: "1rem  ",
                      border: "solid 0.5px",
                      ":hover": {
                        backgroundColor: theme.palette.secondary[300],
                      },
                      ":disabled": {
                        backgroundColor: theme.palette.secondary[300],
                      },
                    }}
                  >
                    Add Vehicle
                  </Button>
                </Box>
              </Box>
            </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>

{/**Content starts here */}

{/**Content ends here */}

</Box>
  );
};

export default VehiclesPage;
