import React, { useEffect, useState } from "react";
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
  CircleOutlined,
  Close,
  FileUpload,
  Group,
  GroupAdd,
  Groups2Outlined,
} from "@mui/icons-material";
import FlexBetween from "component/deliverer/FlexBetween";
import Header from "component/deliverer/Header";
import Cities from "component/Cities";
import { MuiFileInput } from "mui-file-input";
import { useDispatch, useSelector } from "react-redux";
import { createDriver } from "redux/actions/driver";
import { toast } from "react-hot-toast";

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
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, success } = useSelector((state) => state.driver);

  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [id, setId] = useState(null);
  const [license, setLicense] = useState(null);
  const [address, setAddress] = useState("");
  const [idNumber, setIdNumber] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (success) {
      toast.success("Driver added successfully");

      setOpen(false);
    }
  }, [dispatch, error, success]);

  const handleIdInputChange = (e) => {
    const file = e.target.files[0];
    setId(file);
  };

  const handleLicenseInputChange = (e) => {
    const file = e.target.files[0];
    setLicense(file);
  };

  const handleClickOpen = () => {
    setName("");
    setAddress("");
    setPhoneNumber("");
    setCity("");
    setId("");
    setLicense("");
    setAddress("");
    setIdNumber("");
    setOpen(true);
    setDisable(false);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleSubmit = (e) => {
    setDisable(true);
    e.preventDefault();

    const newForm = new FormData();

    newForm.append("name", name);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("city", city);
    newForm.append("address", address);
    newForm.append("idNumber", idNumber);
    newForm.append("id", id);
    newForm.append("license", license);
    newForm.append("companyId", user.companyId);

    if (
      name !== "" &&
      phoneNumber !== "" &&
      city !== "" &&
      address !== "" &&
      idNumber !== "" &&
      id !== null &&
      license !== null
    ) {
      dispatch(createDriver(newForm));
    } else {
      toast.error("fill in all fields");
      setDisable(false);
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
              ":hover": {
                backgroundColor: theme.palette.secondary[100],
              },
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
            <form onSubmit={handleSubmit}>
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
                        type="tel"
                        color="info"
                        label="Phone Number"
                        inputProps={{ minLength: 10, maxLength: 13 }}
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
                  <FormControl sx={{ m: 1, minWidth: 250 }}>
                    <TextField
                      required
                      variant="outlined"
                      type="text"
                      label="ID Number"
                      color="info"
                      inputProps={{ maxLength: 13 }}
                      value={idNumber}
                      onChange={(e) =>
                        setIdNumber(
                          e.target.value.replace(/ /g, "").toUpperCase()
                        )
                      }
                    />
                  </FormControl>

                  <FormControl sx={{ m: 1, maxWidth: 250 }}>
                    <Box>
                      <span>Driver's Licence</span>
                      <input
                        type="file"
                        name="id"
                        id="file-input"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleLicenseInputChange}
                        className="sr-only"
                      />
                    </Box>
                  </FormControl>
                  <FormControl sx={{ m: 1, maxWidth: 250 }}>
                    <Box>
                      <span>Drivers ID</span>
                      <input
                        type="file"
                        name="id"
                        id="file-input"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleIdInputChange}
                        className="sr-only"
                      />
                    </Box>
                  </FormControl>

                  <Box display={"flex"} sx={{ m: "1rem 3rem " }}>
                    <Button
                      disabled={disable}
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
                      disabled={disable}
                      type="submit"
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
