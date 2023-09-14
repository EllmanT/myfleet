import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  MenuItem,
  OutlinedInput,
  Select,
  InputLabel,
  FormControl,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  TextField,
  Stepper,
  StepButton,
  Step,
} from "@mui/material";
import {
  AddBusiness,
  AddToQueue,
  Business,
  Close,
  GroupAdd,
} from "@mui/icons-material";
import FlexBetween from "component/deliverer/FlexBetween";
import Header from "component/deliverer/Header";
import GoodsTypes from "component/deliverer/GoodsType";
import Cities from "component/Cities";
import { useDispatch } from "react-redux";
import VehicleTypes from "component/deliverer/VehicleTypes";
import DeliveryTypes from "component/deliverer/DeliveryTypes";
import { createDeliverer } from "redux/actions/deliverer";


const steps = ["General Details", "Rates", "Preview"];

const DeliverersPage = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  const [open, setOpen] = useState("");
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [goodsType, setGoodsType] = useState([]);
  const [vehiclesType, setVehiclesType] = useState([]);
  const [deliveryType, setDeliveryType] = useState([]);

  const [city, setCity] = useState("");

  //the steps
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [selected] = useState("");

  //function to populate the array

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
    if (activeStep === 0) {
      if (
        companyName !== "" &&
        city !== "" &&
        address !== "" &&
        goodsType.length !== 0
      ) {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
      } else {
        const newCompleted = completed;
        newCompleted[activeStep] = false;
        setCompleted(newCompleted);
      }
    }

    if (activeStep === 1) {
      if (vehiclesType.length !== 0 && deliveryType !== 0) {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
      } else {
        const newCompleted = completed;
        newCompleted[activeStep] = false;
        setCompleted(newCompleted);
      }
    }
  };
  console.log(goodsType);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  //the steps

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = new FormData();

    newForm.append("companyName", companyName);
    newForm.append("address", address);
    newForm.append("city", city);
    newForm.append("goodsType", goodsType);
    newForm.append("vehiclesType", vehiclesType);
    newForm.append("goodsType", deliveryType);
    dispatch(createDeliverer(newForm));
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Deliverers" subtitle="See all your deliverers." />
        <Box>
          <Button
            disabled
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "16px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleClickOpen}
          >
            <Business sx={{ mr: "10px" }} />4
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
              ":hover": {
                backgroundColor: theme.palette.secondary[100],
              },
            }}
            onClick={handleClickOpen}
          >
            <AddBusiness sx={{ mr: "10px" }} />
            Add
          </Button>
        </Box>
      </FlexBetween>
      {/**Add contractor dialogue start */}
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
              Deliverer
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="info"
              sx={{ ml: "30px" }}
            >
              <Close sx={{ fontSize: "25px" }} />
            </Button>
          </DialogTitle>
          <DialogContent>
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
                    <form onSubmit={handleSubmit}>
                      <Box
                        sx={{ mt: "0.5rem" }}
                        display="flex"
                        maxWidth={"400px"}
                        margin={"auto"}
                        padding={"0rem 5rem"}
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
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                              />
                            </FormControl>
                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 180 }}>
                                <Cities
                                  name={city}
                                  onChange={(e) => setCity(e.target.value)}
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 250 }}>
                                <TextField
                                  required
                                  variant="outlined"
                                  type="text"
                                  label="Address"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  color="info"
                                />
                              </FormControl>
                            </Box>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                disabled
                                variant="standard"
                                type="text"
                                label="Select the type of goods that you manufacture/sell?"
                                color="info"
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <Box>
                                <GoodsTypes
                                  selected={goodsType}
                                  onChange={setGoodsType}
                                />
                              </Box>
                            </FormControl>
                          </Box>
                        )}

                        {activeStep === 1 && (
                          <Box display={"flex"} flexDirection={"column"}>
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                              <TextField
                                disabled
                                variant="standard"
                                type="text"
                                label="What type of vehicles do you have?"
                                color="info"
                              />
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <Box>
                                <VehicleTypes
                                  selected={vehiclesType}
                                  onChange={setVehiclesType}
                                />
                              </Box>
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                disabled
                                variant="standard"
                                type="text"
                                label="Where can you deliver to?"
                                color="info"
                              />
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <Box>
                                <DeliveryTypes
                                  selected={deliveryType}
                                  onChange={setDeliveryType}
                                />
                              </Box>
                            </FormControl>
                          </Box>
                        )}
                        {activeStep === 2 && (
                          <Box display={"flex"} flexDirection={"column"}>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                size="small"
                                variant="outlined"
                                type="text"
                                label="Company Name"
                                color="info"
                                value={companyName}
                                disabled
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <Box>
                                <GoodsTypes
                                  disabled={true}
                                  selected={goodsType}
                                  onChange={setGoodsType}
                                />
                              </Box>
                            </FormControl>
                            <Box display={"flex"}>
                              <Box display={"flex"} flexDirection={"column"}>
                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                  <TextField
                                    size="small"
                                    disabled
                                    variant="standard"
                                    type="text"
                                    label="What  vehicles do you have?"
                                    color="info"
                                  />
                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                  <Box>
                                    <VehicleTypes
                                      disabled={true}
                                      selected={vehiclesType}
                                      onChange={setVehiclesType}
                                    />
                                  </Box>
                                </FormControl>
                              </Box>
                              <Box display={"flex"} flexDirection={"column"}>
                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                  <TextField
                                    size="small"
                                    disabled
                                    variant="standard"
                                    type="text"
                                    label="Where can you deliver?"
                                    color="info"
                                  />
                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                  <Box>
                                    <DeliveryTypes
                                      disabled={true}
                                      selected={deliveryType}
                                      onChange={deliveryType}
                                    />
                                  </Box>
                                </FormControl>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </form>
                  </React.Fragment>
                )}
              </div>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
            }}
          >
            <Box display={"flex"}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
                size="large"
                sx={{
                  color: theme.palette.secondary[300],

                  margin: "0.5rem",
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
                type={activeStep === 2 ? "submit" : "button"}
                onClick={handleNext}
                variant="contained"
                fontWeight="bold"
                sx={{
                  color: theme.palette.secondary[100],
                  backgroundColor: theme.palette.secondary[300],
                  margin: "0.5rem  ",
                  border: "solid 0.5px",
                  ":hover": {
                    backgroundColor: theme.palette.secondary[300],
                  },
                  ":disabled": {
                    backgroundColor: theme.palette.secondary[300],
                  },
                }}
              >
                {activeStep === 2 ? <>Add Contractor</> : <>Next</>}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </div>
      {/**Add contractor dialogue ends
       *
       */}

      {/**Where the info goes */}
      <Box></Box>
      {/**Where the info ends */}
    </Box>
  );
};

export default DeliverersPage;
