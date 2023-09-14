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

const DeliverersPage = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  const [open, setOpen] = useState("");
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [goodsType, setGoodsType] = useState([]);
  const [vehiclesType, setVehiclesType] = useState([]);
  const [deliveryType, expressLarge] = useState([]);

  const [city, setCity] = useState("");



  //the steps
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [select, setSelect] = useState(false);
  const [select1, setSelect1] = useState(false);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [select4, setSelect4] = useState(false);

  const [selected] = useState("")

  function vehicleTypes (e){
    const {checked,name}=e.target;
    if(checked){
      onChange([...selected,name]);
    } else{
      onChange([...selected.filter(selectedName=>selectedName!==name)]);
    }
  }


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
      if (
       
        expressLarge !== ""
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
    if (activeStep === 2) {
    }
  };
  console.log(goodsType);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    newForm.append("companyName", companyName);
    newForm.append("address", address);
    newForm.append("city", city);
    newForm.append("goodsType", goodsType);
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
            <form onSubmit={handleSubmit}>
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
                        padding={"0rem 5rem" }
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
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                disabled
                                variant="standard"
                                type="text"
                                label="Only select what applies to your company!"
                                color="info"
                              />
                              <TextField
                                disabled
                                variant="standard"
                                type="text"
                                label="What type of vehicles do you have?"
                                color="info"
                              />
                            </FormControl>

                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                type="button"
                                  variant="outlined"
                                  color={select ? "info" : "inherit"}
                                  label= "small"
                                  size="small"
                                  onClick={(e) => setSelect(!select)}
                                  sx={{
                                    border: "solid 0.2rem",
                                  }}
                                >
                                  Small <br />
                                  (0-5T)
                              </TextField>
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Button
                                  variant="outlined"
                                  color={select1 ? "info" : "inherit"}
                                  size="small"
                                  onClick={(e) => setSelect1(!select1)}
                                  sx={{
                                    border: "solid 0.2rem",
                                  }}
                                >
                                  Medium
                                  <br />
                                  (5-10T)
                                </Button>
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Button
                                  variant="outlined"
                                  color={select2 ? "info" : "inherit"}
                                  size="small"
                                  onClick={(e) => setSelect2(!select2)}
                                  sx={{
                                    border: "solid 0.2rem",
                                  }}
                                >
                                  Large <br />
                                  (10T+)
                                </Button>
                              </FormControl>
                            </Box>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                                disabled
                                variant="standard"
                                type="text"
                                label="Where can you deliver to?"
                                color="info"
                              />
                            </FormControl>

                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color={select3 ? "info" : "inherit"}
                                  onClick={(e) => setSelect3(!select3)}
                                  sx={{
                                    border: "solid 0.2rem",
                                  }}
                                >
                                  Local <br />
                                  (inside the City)
                                </Button>
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Button
                                size="small"
                                  variant="outlined"
                                  color={select4 ? "info" : "inherit"}
                                  onClick={(e) => setSelect4(!select4)}
                                  sx={{
                                    border: "solid 0.2rem",
                                  }}
                                >
                                  Express <br /> (Outside the city)
                                </Button>
                              </FormControl>
                            </Box>
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

                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                              size="small"
                                disabled
                                variant="standard"
                                type="text"
                                label="What type of vehicles do you have?"
                                color="info"
                              />
                            </FormControl>

                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                               
                                  <Button
                                  
                                    disabled
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                      border: "solid 0.2rem",
                                      ":disabled": {
                                        color: select ? theme.palette.primary[100] : "",
                                        backgroundColor: select ?  theme.palette.primary[900]: ""
                                      },
                                    }}
                                  >
                                    Small
                                   
                                  
                                  </Button>
                               
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                              <Button
                                    disabled
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                      border: "solid 0.2rem",
                                      ":disabled": {
                                        color: select1 ? theme.palette.primary[100] : "",
                                        backgroundColor: select1 ?  theme.palette.primary[900]: ""
                                      },
                                    }}
                                  >
                                    Medium
                                   
                                  
                                  </Button>
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                              <Button
                                    disabled
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                      border: "solid 0.2rem",
                                      ":disabled": {
                                        color: select2 ? theme.palette.primary[100] : "",
                                        backgroundColor: select2 ?  theme.palette.primary[900]: ""
                                      },
                                    }}
                                  >
                                    Large
                                   
                                  
                                  </Button>
                              </FormControl>
                            </Box>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <TextField
                              size="small"
                                disabled
                                variant="standard"
                                type="text"
                                label="Where can you deliver to?"
                                color="info"
                              />
                            </FormControl>

                            <Box display={"flex"}>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                              <Button
                                    disabled
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                      border: "solid 0.2rem",
                                      ":disabled": {
                                        color: select3 ? theme.palette.primary[100] : "",
                                        backgroundColor: select3 ?  theme.palette.primary[900]: ""
                                      },
                                    }}
                                  >
                                    Local
                                   
                                  
                                  </Button>
                              </FormControl>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                              <Button
                                    disabled
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                      border: "solid 0.2rem",
                                      ":disabled": {
                                        color: select4 ? theme.palette.primary[100] : "",
                                        backgroundColor: select4 ?  theme.palette.primary[900]: ""
                                      },
                                    }}
                                  >
                                    Express
                                   
                                  
                                  </Button>
                              </FormControl>
                            </Box>
                          </Box>
                        )}
                  
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
          <DialogActions
                        sx={{  
                      justifyContent:"center"
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
