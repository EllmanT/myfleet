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
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import {
  CalendarMonth,
  ChevronLeftOutlined,
  HomeOutlined,
  Money,
} from "@mui/icons-material";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Orders",
    icon: <CalendarMonth />,
  },
  {
    text: "Payments",
    icon: <Money />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
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
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[300],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "1.5px",
              width: drawerWidth,
            },
          }}
        >
          {/**Part 1 */}
          <Box width={"100%"}>
            <Box m="1rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box alignItems={"center"} gap="1.5rem" display={"flex"}>
                  <Typography variant="h3" fontWeight={"bold"}>
                    myFleet
                  </Typography>
                </Box>

                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} m="1.5rem 2rem 0rem 3rem">
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/del-${lcText}`);
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
                              : theme.palette.secondary[100],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/**Part 2 */}
          <Box width={"100%"} bottom={"0rem"}>
            <Divider/>
           <FlexBetween display={"flex"} gap={"1.5rem"} m="1.5rem 2rem 0rem 2rem">
            <Box component={"img"}
            alt="profile-img"
            height={"32px"}
            width={"32px"}
            borderRadius={"50%"}
            sx={{objectFit:"cover"}}
            />
            <Box>
              <Typography fontWeight={"bold"} fontSize={"0.9rem"} sx={{color:theme.palette.secondary[100]}}>
                Tapiwa Muranda
              </Typography>
              <Typography fontSize={"0.8rem"} sx={{color:theme.palette.secondary[200]}}>
                Admin
              </Typography>
            </Box>
           </FlexBetween>


          </Box>
        </Drawer>
      )}
    </div>
  );
};

export default Sidebar;
