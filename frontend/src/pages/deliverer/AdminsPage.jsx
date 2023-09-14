import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
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
import { Add, Close, GroupAdd, SecurityOutlined } from "@mui/icons-material";
import FlexBetween from "component/deliverer/FlexBetween";
import Header from "component/deliverer/Header";
import Cities from "component/Cities";
import Roles from "component/Roles";
import { toast } from "react-hot-toast";
import { server } from "server";
import axios from "axios";

const steps = ["General Info", "Access", "Preview"];

const AdminsPage = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  const [open, setOpen] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [companyId] = useState("");
  //the steps
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [disable, setDisable] = useState(false);

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
      if (companyId !== "" && city !== "" && address !== "") {
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
      if (email !== "" && password == "" && check !== "") {
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

    const config = { Headers: { "Content-type": "multipart/form-data" } };

    const newForm = new FormData();
    newForm.append("companyName", companyId);
    newForm.append("address", address);
    newForm.append("city", city);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("role", role);
    newForm.append("companyId", companyId);
    newForm.append("phoneNumber", phoneNumber);

    setDisable(true);

    if (password === check) {
      await axios
        .post(`${server}/user/create-user`, newForm, config)
        .then((res) => {
          toast.success(res.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setCheck("");
          setPhoneNumber("");
          setRole("");
          setCity("");
          setAddress("");
          setDisable(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setDisable(false);
        });
    } else {
      toast.error("Passwords do not match");
      setDisable(false);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Admins" subtitle="See all your admins." />
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
          >
            <SecurityOutlined sx={{ mr: "10px" }} />4
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
            <Add sx={{ mr: "10px" }} />
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
              Admin
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
                                label="Name"
                                color="info"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                required
                                variant="outlined"
                                type="text"
                                label="Email Address"
                                color="info"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                required
                                variant="outlined"
                                type="text"
                                label="Company Id"
                                color="info"
                                value={companyId}
                                disabled
                              />
                            </FormControl>
                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <Roles
                                  name={role}
                                  onChange={(e) => setRole(e.target.value)}
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <TextField
                                  required
                                  variant="outlined"
                                  type="text"
                                  label="Phone Number"
                                  color="info"
                                  value={phoneNumber}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                />
                              </FormControl>
                            </Box>
                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <Cities
                                  name={city}
                                  onChange={(e) => setCity(e.target.value)}
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <TextField
                                  required
                                  variant="outlined"
                                  type="text"
                                  label="Home Address"
                                  color="info"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </FormControl>
                            </Box>
                          </Box>
                        )}

                        {activeStep === 1 && (
                          <Box display={"flex"} flexDirection={"column"}>
                            <TextField
                              required
                              color={
                                check === password && password !== ""
                                  ? "success"
                                  : "info"
                              }
                              variant="outlined"
                              type="password"
                              label="Password"
                              margin="normal"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                              required
                              color={
                                check !== "" && check === password
                                  ? "success"
                                  : "error"
                              }
                              variant="outlined"
                              type="password"
                              label="Reenter Password"
                              margin="normal"
                              value={check}
                              onChange={(e) => setCheck(e.target.value)}
                            />
                          </Box>
                        )}
                        {activeStep === 2 && (
                          <Box display={"flex"} flexDirection={"column"}>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                disabled
                                variant="outlined"
                                type="text"
                                label="Name"
                                color="info"
                                value={name}
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                disabled
                                variant="outlined"
                                type="text"
                                label="Name"
                                color="info"
                                value={email}
                              />
                            </FormControl>
                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <Roles
                                  disabled={true}
                                  name={role}
                                  onChange={(e) => setRole(e.target.value)}
                                />
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <TextField
                                  disabled
                                  variant="outlined"
                                  type="text"
                                  label="Phone Number"
                                  color="info"
                                  value={phoneNumber}
                                />
                              </FormControl>
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
                {activeStep === 2 ? <>Add Admin</> : <>Next</>}
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

export default AdminsPage;
