import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MenuItem, TextField, TextareaAutosize, useTheme } from "@mui/material";
import { Add, LocalShipping } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import DateProvider from "components/DateProvider";

const steps = ["Order Details", "Company Info", "Preview"];

const AddOrder = () => {
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  //the customer info
  const [customer, setCustomer] = useState("");
  const [from, setFrom] = useState("");
  const [description, setDescription] = useState("");
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
  const [cost, setCost] = useState("");
  const [distance, setDistance] = useState("");

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

  const handleDateChange = (e) => {
    const orderDate = new Date(e.target.value);
    //minEndDate is not used
    //const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setOrderDate(orderDate);
    //THis lines causes a bug where the isoString is not a function
    //document.getElementById("end-date").min = minEndDate.toISOString.slice(0,10);
  };

  return (
    <>
      <Box m="0.1rem 5rem">
        <Box
          display="flex"
          margin={"auto"}
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          {" "}
          <Header title="Add Order" />
        </Box>

        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
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
                  padding={"20px 20px 20px 20px"}
                  margin={"auto"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"20px"}
                  border="solid 1px"
                  borderColor={"#cca752"}
                  boxShadow={"1px 1px 2px #cca752"}
                >
                  {activeStep === 0 && (
                    <Box display={"flex"} gap={"1rem"} flexDirection={"column"}>
                      <Box display={"flex"} gap="0.5rem">
                        <TextField
                          required
                          select
                          label="Contractor"
                          defaultValue="Private"
                          variant="outlined"
                        >
                          {contractors.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                        <DateProvider
                          title={"Order Date"}
                          date={orderDate}
                          onChange={handleDateChange}
                        />
                      </Box>
                      <TextField
                        required
                        variant="outlined"
                        type="text"
                        label="From"
                        color="info"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                      />
                      <TextField
                        required
                        variant="outlined"
                        type="text"
                        label="Customer"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        color="info"
                      />

                      <TextareaAutosize
                        required
                        placeholder="Order details"
                        disabled={false}
                        minRows={5}
                        size="lg"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Box>
                  )}

                  {activeStep === 1 && (
                    <Box display={"flex"} gap={"1rem"} flexDirection={"column"}>
                      <TextField
                        select
                        label="Driver"
                        defaultValue="Takunda Muranda"
                        variant="outlined"
                        value={driverId}
                        onChange={(e) => setDriverId(e.target.value)}
                      >
                        {drivers.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        select
                        label="Vehicle"
                        defaultValue="Iveco Eurocargo AAV 4331"
                        variant="outlined"
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                      >
                        {vehicles.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                      <Box display={"flex"} gap="0.5rem">
                        <TextField
                          variant="outlined"
                          type="text"
                          label="Mileage Out"
                          color="info"
                          value={mileageOut}
                          onChange={(e) => setMileageOut(e.target.value)}
                        />
                        <TextField
                          variant="outlined"
                          type="text"
                          label="Mileage In"
                          color="info"
                          value={mileageIn}
                          onChange={(e) => setMileageIn(e.target.value)}
                        />
                      </Box>
                    </Box>
                  )}
                  {activeStep === 2 && (
                    <Box display={"flex"} gap={"1rem"} flexDirection={"column"}>
                      <TextField
                        disabled
                        variant="outlined"
                        type="text"
                        label="From"
                        color="info"
                        value={from}
                      />
                      <TextField
                        disabled
                        variant="outlined"
                        type="text"
                        label="Customer"
                        color="info"
                        value={customer}
                      />

                      <Box display={"flex"} gap="0.5rem">
                        <TextField
                          select
                          label="Driver"
                          defaultValue="Takunda Muranda"
                          variant="outlined"
                          value={driverId}
                          disabled
                        >
                          {drivers.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          select
                          label="Vehicle"
                          defaultValue="Iveco Eurocargo AAV 4331"
                          variant="outlined"
                          value={vehicleId}
                          disabled
                        >
                          {vehicles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                      <Box display={"flex"} gap="0.5rem">
                        <TextField
                          disabled
                          variant="outlined"
                          type="text"
                          label="Distance"
                          color="info"
                          value={distance}
                        />
                        <TextField
                          disabled
                          variant="outlined"
                          type="text"
                          label="Cost"
                          color="info"
                          value={cost}
                        />
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
      </Box>
    </>
  );
};

export default AddOrder;
