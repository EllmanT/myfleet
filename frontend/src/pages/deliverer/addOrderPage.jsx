import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, TextareaAutosize, useTheme } from "@mui/material";
import { Add, LocalShipping } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const steps = ["Order Details", "Company Info", "Preview"];

const AddOrder = () => {
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  //the customer info
  const [customers, setCustomer] = useState("");
  const [from, setFrom] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [contractorId, setContractorId] = useState("");
  const [orderDate, setOrderDate] = useState("");

  //the company info
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setVehicleId] = useState("");

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
      value: "Lammel",
    },
    {
      value: "Besthule",
    },
  ];

  return (
    <>
      <Box m="1.5rem 2.5rem">
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
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                  Step {activeStep + 1}
                </Typography>

                <Box
                  display="flex"
                  maxWidth={"350px"}
                  padding={"12px"}
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
                    <Box display={"flex"} gap={"0rem"} flexDirection={"column"}>
                      <Box display={"flex"} gap="0.2rem">
                        <TextField
                          variant="outlined"
                          type="text"
                          label="Contractor"
                          color="info"
                          margin="normal"
                        />
                        <TextField
                          variant="outlined"
                          type="text"
                          label="Date"
                          color="info"
                          margin="normal"
                        />
                      
                      </Box>
                      <TextField
                        variant="outlined"
                        type="text"
                        label="From"
                        color="info"
                        margin="normal"
                      />
                      <TextField
                        variant="outlined"
                        type="text"
                        label="Customer"
                        color="info"
                        margin="normal"
                      />

                      <TextareaAutosize
                        placeholder="Order details"
                        disabled={false}
                        minRows={5}
                        size="lg"
                        variant="outlined"
                        color={theme.palette.background.main}
                      />
                    </Box>
                  )}

                  {activeStep === 1 && (
                    <Box display={"flex"} flexDirection={"column"}>
                      <TextField
                        variant="outlined"
                        type="email"
                        label="Driver"
                        color="info"
                        margin="normal"
                      />
                      <TextField
                        variant="outlined"
                        type="password"
                        label="Password"
                        margin="normal"
                        color="info"
                      />
                    </Box>
                  )}
                  {activeStep === 2 && (
                    <Box display={"flex"} flexDirection={"column"}>
                      <TextField
                        variant="outlined"
                        type="email"
                        label="Brand"
                        color="info"
                        margin="normal"
                      />
                      <TextField
                        variant="outlined"
                        type="password"
                        label="Password"
                        margin="normal"
                        color="info"
                      />
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
