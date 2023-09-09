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

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
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
const ContractorsPage = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
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

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  console.log(open);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Contractors" subtitle="See all your contractors." />
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
              Contractor
            </Button>
            <Button onClick={handleClose} variant="outlined" color="info" sx={{ ml: "30px" }}>
              <Close  sx={{ fontSize: "25px" }} />
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
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
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
                                  onChange={(e) =>
                                    setContractorId(e.target.value)
                                  }
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
                            <FormControl sx={{ m: 1, maxWidth: 250 }}>
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
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                disabled
                                variant="standard"
                                type="text"
                                label="What do you pay for deliveries done locally(inside the city)?"
                                color="info"
                              />
                            </FormControl>

                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  label="vehicle <=5T"
                                  color="info"
                                  value={mileageOut}
                                  onChange={(e) =>
                                    setMileageOut(e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  label="Vehicle <=10T"
                                  color="info"
                                  value={mileageIn}
                                  onChange={(e) => setMileageIn(e.target.value)}
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  label="Horse"
                                  color="info"
                                  value={mileageIn}
                                  onChange={(e) => setMileageIn(e.target.value)}
                                />
                              </FormControl>
                            </Box>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                disabled
                                variant="standard"
                                type="text"
                                label="What do you pay for deliveries done express(outside the city)?"
                                color="info"
                              />
                            </FormControl>

                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  label="vehicle <=5T"
                                  color="info"
                                  value={mileageOut}
                                  onChange={(e) =>
                                    setMileageOut(e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  label="Vehicle <=10T"
                                  color="info"
                                  value={mileageIn}
                                  onChange={(e) => setMileageIn(e.target.value)}
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  label="Horse"
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
                                label="Company Name"
                                color="info"
                                value={from}
                                disabled
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, maxWidth: 250 }}>
                              <Box>
                                <GoodsTypes
                                  disabled
                                  selected={goodsType}
                                  onChange={setGoodsType}
                                />
                              </Box>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                disabled
                                variant="standard"
                                type="text"
                                label="What do you pay for deliveries done locally(inside the city)?"
                                color="info"
                              />
                            </FormControl>

                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  label="vehicle <=5T"
                                  color="info"
                                  disabled
                                  value={mileageOut}
                                  onChange={(e) =>
                                    setMileageOut(e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  label="Vehicle <=10T"
                                  color="info"
                                  disabled
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  label="Horse"
                                  color="info"
                                  disabled
                                />
                              </FormControl>
                            </Box>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                disabled
                                variant="standard"
                                type="text"
                                label="What do you pay for deliveries done express(outside the city)?"
                                color="info"
                              />
                            </FormControl>

                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  label="vehicle <=5T"
                                  color="info"
                                  disabled
                                  value={mileageOut}
                                  onChange={(e) =>
                                    setMileageOut(e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  label="Vehicle <=10T"
                                  color="info"
                                  disabled
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <TextField
                                  variant="outlined"
                                  type="text"
                                  disabled
                                  label="Horse"
                                  color="info"
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
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
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
      {/**Add contractor dialogue ends
       *
       */}

      {/**Where the info goes */}
      <Box></Box>
            {/**Where the info ends */}

    </Box>
  );
};

export default ContractorsPage;
