import { AddTask, DownloadOutlined } from "@mui/icons-material";
import { Box, Button, useTheme } from "@mui/material";
import FlexBetween from "component/deliverer/FlexBetween";
import Header from "component/deliverer/Header";
import React from "react";
import { useNavigate } from "react-router-dom";

const DashOrdersPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const addOrder = () => {
    navigate("/add-order");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Overview" />
        <Box>
          <Button
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
            <DownloadOutlined sx={{ mr: "10px" }} />
            Reports
          </Button>
        </Box>
        <Box>
          <Button
            onClick={addOrder}
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
            <AddTask sx={{ mr: "10px" }} />
            add
          </Button>
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default DashOrdersPage;
