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
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Add,
  Close,
  Group,
  GroupAdd,
  Groups2Outlined,
} from "@mui/icons-material";
import FlexBetween from "component/deliverer/FlexBetween";
import Header from "component/deliverer/Header";
import Cities from "component/Cities";

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

const DriversPage = () => {
  const theme = useTheme();

  


  const [open, setOpen] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [contractorId, setContractorId] = useState("");
  const [address, setAddress] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Drivers" subtitle="See all your drivers." />
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
            <Groups2Outlined sx={{ mr: "10px" }} />4
          </Button>
        </Box>
        <Box>
          <Button
            onClick={handleClickOpen}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ":hover":{
                backgroundColor: theme.palette.secondary[100],
              }
            }}
          >
            <Add sx={{ mr: "10px" }} />
            Add
          </Button>
        </Box>
      </FlexBetween>

      {/**Dialog to add the drivers start */}

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
              Driver
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
            <form>
              <Box
                sx={{ mt: "0.5rem" }}
                display="flex"
                maxWidth={"400px"}
                margin={"auto"}
                flexDirection="column"
                alignItems={"center"}
                justifyContent={"center"}
              >
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
                  <Box display={"flex"}>
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                      <Cities
                        name={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                      <TextField
                        labelId="demo-simple-select-autowidth-label"
                        required
                        variant="outlined"
                        type="number"
                        color="info"
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                      Add Driver
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
      {/**Dialog to add the drivers ends */}

      {/**This is where the content starts */}
      <Box></Box>
      {/**This is where the content ends */}
    </Box>
  );
};

export default DriversPage;
