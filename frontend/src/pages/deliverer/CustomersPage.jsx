import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Close, Group, GroupAdd } from "@mui/icons-material";
import FlexBetween from "component/deliverer/FlexBetween";
import Header from "component/deliverer/Header";
import Cities from "component/Cities";
import { toast } from "react-hot-toast";
import axios from "axios";
import { server } from "server";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "redux/actions/customer";

const CustomersPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { success, error } = useSelector((state) => state.customer);

  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState("");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Customer added successfully");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleSubmit = async (e) => {
    setDisable(true);
    e.preventDefault();

    const newForm = new FormData();

    newForm.append("name", name);
    newForm.append("city", city);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("address", address);
    if (name !== "" && address !== "") {
      dispatch(createCustomer(newForm));
    } else {
      toast.error("Name or address missing");
      setDisable(false);
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
        <Header title="Customers" subtitle="See all your customers." />

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
              ":hover": {
                backgroundColor: theme.palette.secondary[100],
              },
            }}
            onClick={handleClickOpen}
          >
            <GroupAdd sx={{ mr: "10px" }} />
            Add
          </Button>
        </Box>
      </FlexBetween>
      {/**This is where the add customer dialogue starts */}
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
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                        label="Phone Number"
                        color="info"
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
                      Add Customer
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
      {/**This is where the add customer dialogue ends */}

      {/**This is where the content goes */}
      <Box></Box>
      {/**This is where the content ends */}
    </Box>
  );
};

export default CustomersPage;
