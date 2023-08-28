import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "server";

const DelRegisterPage = () => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState("");
  const navigate = useNavigate()

  const config = {Headers: {"Content-type" :"multipart/form-data"}}
  const newForm = new FormData()

  newForm.append("name", name)
  newForm.append("email", email)
  newForm.append("password", password)
  newForm.append("check", check)



  const handleSubmit = async(e) => {
    e.preventDefault();

    await axios.post(`${server}/user/create-user`, newForm, config,).then((res)=>{
      
    })

  };

  const toLoginPage=()=>{
    navigate("/del-login")
  }

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
        <Box    display="flex"
      maxWidth={"350px"}
      margin={"auto"}
      flexDirection="column"
      alignItems={"center"}
      justifyContent={"center"}
     
>
        <Typography variant="h2" fontWeight={"bold"}>myFleet</Typography>


        </Box>
        <Box display={"flex"} flexDirection={"column"}>
          <TextField
            variant="outlined"
            type="text"
            label="Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            type="password"
            label="Reenter Password"
            margin="normal"
            value={check}
            onChange={(e) => setCheck(e.currentTarget)}
          />

          <Button
            type="submit"
            margin="normal"
            variant="contained"
            sx={{
              color: theme.palette.secondary[200],
              marginTop: "1rem",
              border: "solid 1px",
            }}
          >
            Register
          </Button>
          <Button
            onClick={toLoginPage}
            variant="outlined"
            border="solid 20px"
            borderColor="#000"
            sx={{
              color: theme.palette.secondary[100],
              marginTop: "1rem",
              border: "solid 1px",
            }}
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default DelRegisterPage;
