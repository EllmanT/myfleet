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
import { Group, GroupAdd } from "@mui/icons-material";
import GoodsTypes from "component/deliverer/GoodsType";
import FlexBetween from "component/deliverer/FlexBetween";
import Header from "component/deliverer/Header";
import DateProvider from "component/deliverer/DateProvider";

const steps = ["General Details", "Rates", "Preview"];


const contractors = [
  {
    value: "Private",
  },
  {
    value: "Besthule",
  },
  {
    value: "PicknPay",
  },
];
const drivers = [
  {
    value: "Tapiwa Muranda",
  },
  {
    value: "Takunda Muranda",
  },
  {
    value: "Paul Suspense",
  },
];
const vehicles = [
  {
    value: "Daf AFE 4881",
  },
  {
    value: "Iveco Eurocargo AAV 4331",
  },
];

const VehiclesPage = () => {
  const theme = useTheme();

  const [open, setOpen] = useState("");
  const [open2, setOpen2] = useState("");
  const [open3, setOpen3] = useState("");


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

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    if (
      customer !== "" &&
      from !== "" &&
      customer !== "" &&
      contractorId !== "" &&
      orderDate !== null
    ) {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  //the steps

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClickOpen3 = () => {
    setOpen3(true);
  };


  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      setOpen2(false);
      setOpen3(false);


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

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Group sx={{ mr: "10px" }} />
            255
          </Button>
        </Box>

        <Box>
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
            <GroupAdd sx={{ mr: "10px" }} />
            Add
          </Button>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleClickOpen2}
          >
            <GroupAdd sx={{ mr: "10px" }} />
            Add2
          </Button>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleClickOpen3}
          >
            <GroupAdd sx={{ mr: "10px" }} />
            Add3
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
              Customer
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
                    label="Name"
                    color="info"
                  />
                </FormControl>
                <Box display={"flex"}>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      City
                    </InputLabel>
                    <Select
                      labelId="simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      autoWidth
                      label="City"
                    ></Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                      required
                      variant="outlined"
                      type="text"
                      label="Phone Number"
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
                    Add Customer
                  </Button>
                </Box>
              </Box>
            </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog disableEscapeKeyDown open={open2} onClose={handleClose}>
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
              Driver
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
                    label="Name"
                    color="info"
                  />
                </FormControl>
                <Box display={"flex"}>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      City
                    </InputLabel>
                    <Select
                      labelId="simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      autoWidth
                      label="City"
                    ></Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                      labelId="demo-simple-select-autowidth-label"
                      required
                      variant="outlined"
                      type="text"
                      color="info"
                      label="Phone Number"
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
                <Box display={"flex"}>
                  <FormControl sx={{ m: 1, maxWidth: 100 }}>
                    <TextField
                      required
                      label="licence"
                      variant="outlined"
                      type="file"
                      color="info"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, maxWidth: 100 }}>
                    <TextField
                      required
                      label="id"
                      variant="outlined"
                      type="file"
                      color="info"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Contractor
                    </InputLabel>
                    <Select
                      labelId="simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      autoWidth
                      label="Contractor"
                    ></Select>
                  </FormControl>
                </Box>

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
                    Add Customer
                  </Button>
                </Box>
              </Box>
            </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog disableEscapeKeyDown open={open3} onClose={handleClose}>
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
              Contractor
            </Button>
          </DialogTitle>
          <DialogContent>
          <form>
          <Box sx={{ width: "100%" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherent" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 1, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                      <Box
                    sx={{ mt: "0.5rem" }}
                    display="flex"
                    maxWidth={"400px"}
                    margin={"auto"}
                    flexDirection="column"
                    alignItems={"center"}
                    justifyContent={"center"}
                  
                  >
                    {activeStep === 0 && (
                      <Box display={"flex"} flexDirection={"column"}>
                     
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                          <TextField
                            required
                            variant="outlined"
                            type="text"
                            label="Company Name"
                            color="info"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                          />
                        </FormControl>
                        <Box display={"flex"}>
                          <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">
                              City
                            </InputLabel>
                            <Select
                              labelId="simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              value={contractorId}
                              onChange={(e) => setContractorId(e.target.value)}
                              autoWidth
                              label="City"
                            >
                              {contractors.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.value}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl sx={{ m: 1, minWidth: 250 }}>
                          <TextField
                            required
                            variant="outlined"
                            type="text"
                            label="Address"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                            color="info"
                          />
                        </FormControl>


                         
                        </Box>
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <GoodsTypes selected={goodsType} onChange={setGoodsType} />
        </div>

                        </FormControl>
                       
                      </Box>
                    )}

                    {activeStep === 1 && (
                      <Box display={"flex"} flexDirection={"column"}>
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Driver
                          </InputLabel>
                          <Select
                            labelId="simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={driverId}
                            onChange={(e) => setDriverId(e.target.value)}
                            autoWidth
                            label="Driver"
                          >
                            {drivers.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Vehicle
                          </InputLabel>
                          <Select
                            labelId="simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={vehicleId}
                            onChange={(e) => setVehicleId(e.target.value)}
                            autoWidth
                            label="Driver"
                          >
                            {vehicles.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <Box display={"flex"}>
                          <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <TextField
                              variant="outlined"
                              type="text"
                              label="Mileage Out"
                              color="info"
                              value={mileageOut}
                              onChange={(e) => setMileageOut(e.target.value)}
                            />
                          </FormControl>
                          <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <TextField
                              variant="outlined"
                              type="text"
                              label="Mileage In"
                              color="info"
                              value={mileageIn}
                              onChange={(e) => setMileageIn(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                      </Box>
                    )}
                    {activeStep === 2 && (


                      <Box display={"flex"} flexDirection={"column"}>
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                          <TextField
                            variant="outlined"
                            type="text"
                            label="From"
                            color="info"
                            value={from}
                            disabled
                          />
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                          <TextField
                            variant="outlined"
                            type="text"
                            label="Customer"
                            value={customer}
                            color="info"
                            disabled
                          />
                        </FormControl>

                        <Box display={"flex"}>
                        

                          <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <TextField
                              variant="outlined"
                              type="text"
                              label="Vehicle "
                              color="info"
                              value={vehicleId}
                              disabled
                            />
                          </FormControl>
                          <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <DateProvider
                              title={"Order Date"}
                              date={orderDate}
                              disabled={true}
                            />
                          </FormControl>
                        </Box>
                        <Box display={"flex"}>
                          <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <TextField
                              disabled
                              variant="outlined"
                              type="text"
                              label="Distance"
                              color="info"
                              value={distance}
                            />
                          </FormControl>
                          <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <TextField
                              disabled
                              variant="outlined"
                              type="text"
                              label="Cost"
                              color="info"
                              value={cost}
                            />
                          </FormControl>
                        </Box>
                      </Box>
                    )}
                    <Box display={"flex"}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
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
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
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
                        Next
                      </Button>
                    </Box>
                  
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
        </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
   {/**This is where the content goes */}
   <Box>

   </Box>
    </Box>
  );
};

export default VehiclesPage;
