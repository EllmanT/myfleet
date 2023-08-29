import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DelLoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toRegisterPage = () => {
    navigate("/del-register");
  };

  return (
    <Box
      display="flex"
      maxWidth={"350px"}
      padding={"12px"}
      margin={"auto"}
      flexDirection="column"
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"20px"}
      border="solid 2px"
      borderColor={"#d3d3d3"}
    >
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          maxWidth={"350px"}
          margin={"auto"}
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h2" fontWeight={"bold"}>
            myFleet
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            color="info"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            type="password"
            label="Password"
            margin="normal"
            color="info"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            margin="normal"
            variant="contained"
            fontWeight="bold"
            size="large"
            sx={{
              color: theme.palette.secondary[100],
              backgroundColor: theme.palette.secondary[300],
              margin: "1rem 1rem 0rem ",
              border: "solid 0.5px",
              ":hover": {
                backgroundColor: theme.palette.secondary[300],
              },
            }}
          >
            Login
          </Button>
          <Button
            onClick={toRegisterPage}
            variant="contained"
            size="large"
            sx={{
              color: theme.palette.secondary[300],

              margin: "1rem",
              border: "solid 1px",
              ":hover": {
                backgroundColor: theme.palette.secondary[800],
              },
            }}
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default DelLoginPage;
