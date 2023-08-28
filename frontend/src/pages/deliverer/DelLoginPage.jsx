import React from 'react'

const DelLoginPage = () => {
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
  )
}

export default DelLoginPage