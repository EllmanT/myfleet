import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  useTheme,
} from "@mui/material";
import { Add, LocalShipping } from "@mui/icons-material";
import { useState } from "react";
import DateProvider from "component/deliverer/DateProvider";
import Header from "component/deliverer/Header";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const steps = ["Order Details", "Company Info", "Preview"];
const contractors = [
  {
    contractor: "Private",
  },
  {
    contractor: "Besthule",
  },
  {
    contractor: "PicknPay",
  },
];
const drivers = [
  {
    driver: "Tapiwa Muranda",
  },
  {
    driver: "Takunda Muranda",
  },
  {
    driver: "Paul Suspense",
  },
];
const vehicles = [
  {
    vehicle: "Daf AFE 4881",
  },
  {
    vehicle: "Iveco Eurocargo AAV 4331",
  },
];

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];

const AddOrderPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { customer } = useSelector((state) => state.customer);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [disable, setDisable] = useState(false);
  //the customer info
  const [pageCustomer, setPageCustomer] = useState("");
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

  //getting the address for the customer

  //the preview
  const distance = mileageIn - mileageOut;
  const cost = distance * 1.65;

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
      pageCustomer !== "" &&
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
                      <Box display={"flex"} flexDirection={"column"}>
                        <Box display={"flex"}>
                          <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">
                              Contractor
                            </InputLabel>
                            <Select
                              labelId="simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              value={contractorId}
                              onChange={(e) => setContractorId(e.target.value)}
                              autoWidth
                              label="Contractor"
                            >
                              {contractors.map((option) => (
                                <MenuItem
                                  key={option.contractor}
                                  value={option.contractor}
                                >
                                  {option.contractor}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <DateProvider
                              title={"Order Date"}
                              date={orderDate}
                              onChange={(e) => setOrderDate(e)}
                              disabled={false}
                            />
                          </FormControl>
                        </Box>
                        <Box display="flex">
                          <FormControl sx={{ m: 1, maxWidth: 250 }}>
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={top100Films}
                              
                              sx={{ width: 250 }}
                              renderInput={(params) => (
                                <TextField {...params} label="From" />
                              )}
                            />
                          </FormControl>
                          <FormControl sx={{ m: 1, maxWidth: 80 }}>
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
                            >
                              <Add sx={{ mr: "10px" }} />
                              New
                            </Button>
                          </FormControl>
                        </Box>
                    
                        <Box display="flex">
                          <FormControl sx={{ m: 1, maxWidth: 250 }}>
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={top100Films}
                              sx={{ width: 250 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Customer" />
                              )}
                            />
                          </FormControl>
                          <FormControl sx={{ m: 1, maxWidth: 80 }}>
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
                            >
                              <Add sx={{ mr: "10px" }} />
                              New
                            </Button>
                          </FormControl>
                        </Box>
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
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
                              <MenuItem
                                key={option.driver}
                                value={option.driver}
                              >
                                {option.driver}
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
                              <MenuItem
                                key={option.vehicle}
                                value={option.vehicle}
                              >
                                {option.vehicle}
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
                        disabled={activeStep === 0 || disable === true}
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
                      {activeStep !== 2 && (
                        <Button
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
                          Next
                        </Button>
                      )}

                      {activeStep === 2 && (
                        <Button
                          type={"submit"}
                          disabled={disable}
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
                          Add Contractor
                        </Button>
                      )}
                    </Box>
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddOrderPage;
