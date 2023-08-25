import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarMonth,
  ChevronLeft,
  ChevronLeftOutlined,
  HomeOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Orders",
    icon: <CalendarMonth />,
  },
];

const Sidebar = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  drawerWidth,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          anchor="left"
          variant="persistent"
          sx={{
            width: drawerWidth,
            "& .MuiDrawerPaper": {
              color: theme.palette.secondary[100],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween
                alignItems="center"
                display={"flex"}
                color={theme.palette.secondary[200]}
              >
                <Box gap={"1.5rem"}>
                  <Typography fontWeight="bold" variant="h4">
                    myFleet
                  </Typography>
                </Box>
                {isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return <Typography key={text}>{text}</Typography>;
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/del-${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ fontWeight: active === lcText ? "bold" : "" }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Box position="relative" width="100%">
              <Divider />
              <FlexBetween
                display={"flex"}
                gap="0.5rem"
                p="1rem 1rem 0rem 1rem"
              >
                <Box
                  component="img"
                  alt="profile-img"
                  height="35px"
                  width="35px"
                  borderRadius={"50%"}
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign={"left"}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"0.9rem"}
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    Tapiwa Muranda
                  </Typography>
                  <Typography
                    fontSize={"0.8rem"}
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    Admin
                  </Typography>
                </Box>
                <IconButton>
                  <SettingsOutlined
                    sx={{
                      color: theme.palette.secondary[100],
                      fontSize: "25px",
                    }}
                  />
                </IconButton>
              </FlexBetween>
            </Box>
          </Box>
        </Drawer>
      )}
    </div>
  );
};

export default Sidebar;
