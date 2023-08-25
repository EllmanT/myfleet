import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  Menu as MenuIcon,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import {
    ArrowDropDownCircleOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "state";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "5px 5px 10px #ccc ",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box alignItems={"center"} display={"flex"} borderRadius={"9px"}>
          <FlexBetween display={"flex"} color={theme.palette.secondary[200]}>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
            <FlexBetween>
              <InputBase placeholder="Search" />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          </FlexBetween>

          <FlexBetween gap={"1.5rem"}>
            <IconButton onClick={()=>dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>

            <Button
            onClick={handleClick}
           sx={{
            justifyContent:"space-between",
            alignItems:"center",

           }}
            >
              <Box />
              <Box display={"flex"} gap ="1.5rem">
                <Typography
                  fontWeight={"bold"}
                  fontSize={"0.9rem"}
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  Tapiwa Muranda
                </Typography>
                <Typography
                  fontSize={"0.8rem"}
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  Admin
                </Typography>
              </Box>
              <ArrowDropDownCircleOutlined 
               sx={{ color: theme.palette.secondary[200], fontSize:"25px" }}
               

              />


            </Button>
          </FlexBetween>
          <Menu 
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          anchorPosition={{vertical: "center", horizontal:"bottom"}}
          >
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
