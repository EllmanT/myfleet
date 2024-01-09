import {
  AddTask,
  Analytics,
  AnalyticsOutlined,
  DownloadOutlined,
  Email,
  Groups,
  MonetizationOn,
  ReceiptLongOutlined,
  TrendingDownOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "component/deliverer/BreakdownChart";
import ExpensesPopup from "component/deliverer/ExpensePopup";
import ExpensePopup from "component/deliverer/ExpensePopup";
import FlexBetween from "component/deliverer/FlexBetween";
import Header from "component/deliverer/Header";
import OverviewChart from "component/deliverer/OverviewChart";
import StatBox from "component/deliverer/Statbox";
import VehSingleLineChart from "component/deliverer/charts/VehSingleLineChart";
import VehicleBreakdownChart from "component/deliverer/charts/VehicleBreakdownChart";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllContractorsPage } from "redux/actions/contractor";
import { getLatestJobsPage, getLatestJobsVehicle } from "redux/actions/job";
import { getAllOverallStatsDeliverer } from "redux/actions/overallStats";
import { getAllVehiclesPage } from "redux/actions/vehicle";
import { getVehicleStats } from "redux/actions/vehicleStats";

const DashVehiclePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { vehicleId } = useParams();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { vehicleStats, isVehicleStatsLoading } = useSelector(
    (state) => state.vehicleStats
  );
  const { latestJobsVehicle, latestJobsVehLoading } = useSelector(
    (state) => state.jobs
  );
  const { vehiclesPage } = useSelector((state) => state.vehicles);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sorta, setSorta] = useState({});
  const [sort, setSort] = useState({});
  const [searcha, setSearcha] = useState("");
  const [jobSearch, setJobSearch] = useState("");
  const [contractor, setContractor] = useState("");

  useEffect(() => {
    dispatch(getVehicleStats(vehicleId));
    dispatch(getAllContractorsPage());
    dispatch(getLatestJobsVehicle(vehicleId));
    dispatch(getAllVehiclesPage());
  }, [dispatch, vehicleId]);

  const vehicle = vehiclesPage && vehiclesPage.find((v) => v._id === vehicleId);
  console.log(vehicle);
  console.log(vehicleStats);

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("jobs");
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddButtonn, setIsAddButtonn] = useState(false);
  const [isEditButtonn, setIsEditButtonn] = useState(false);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  let highestRevenue = 0;
  let topContractorRevenue = "";
  let topContractorJobs = "";
  let mostJobs = 0;

  if (
    !isVehicleStatsLoading &&
    vehicleStats &&
    vehicleStats.jobsByContractor &&
    vehicleStats.revenueByContractor
  ) {
    const jobsByContractor = vehicleStats.jobsByContractor;
    const revenueByContractor = vehicleStats.revenueByContractor;
    //getting the contractor that gives most jobs
    for (const contractorId in jobsByContractor) {
      if (jobsByContractor.hasOwnProperty(contractorId)) {
        const job = jobsByContractor[contractorId];

        if (job > mostJobs) {
          mostJobs = job;
          topContractorJobs = contractorId;
        }
      }
    }
    //getting the contractor that gives most revenue
    for (const contractorId in revenueByContractor) {
      if (revenueByContractor.hasOwnProperty(contractorId)) {
        const revenue = revenueByContractor[contractorId];

        if (revenue > highestRevenue) {
          highestRevenue = revenue;
          topContractorRevenue = contractorId;
        }
      }
    }
  }

  //getting the %increase in sales for the
  let percentage = "";
  let latestMonth = "";
  let secondLatestMonth = "";
  let isPercentage = false;
  let latestMonthJobs = 0;
  let lastMonth = "";
  let lastMonthExpenses = 0;
  let lastMonthDistance = 0;
  let lastMonthJobs = 0;

  if (vehicleStats && vehicleStats.monthlyData) {
    let numberofMonths = 0;
    let findSecondLatestMonth = 0;
    let secondLatestMonthJobs = 0;
    let findThirdLatestMonth = 0;
    let thirdLatestMonth = "";
    let thirdLatestMonthJobs = 0;
    let findLatestMonth = 0;
    let findLastMonth = 0;
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    }); // Get month name

    const jobsMonthlyData = vehicleStats && vehicleStats.monthlyData;
    findLatestMonth = jobsMonthlyData.length - 1;
    findLastMonth = jobsMonthlyData.length - 2;
    latestMonth = jobsMonthlyData[findLatestMonth].month;
    const latestMonthData = jobsMonthlyData.find(
      (job) => job.month === latestMonth
    );
    latestMonthJobs = latestMonthData.totalJobs;

    //getting the data for the last month
    if (jobsMonthlyData.length > 1) {
      lastMonth = jobsMonthlyData[findLastMonth].month;
      const lastMonthData = jobsMonthlyData.find(
        (job) => job.month === lastMonth
      );
      lastMonthJobs = lastMonthData.totalJobs;
      lastMonthDistance = lastMonthData.totalMileage;
      lastMonthExpenses = lastMonthData.totalExpenses;

      console.log(latestMonthJobs);
    }

    //we are using this logic because we are saying
    //lets assume that there are 3 months.
    //the last month indicates to us that information for month 2 has been completed assumption
    numberofMonths = jobsMonthlyData.length;

    if (numberofMonths >= 3) {
      isPercentage = true;
    } else {
      isPercentage = false;
    }

    if (isPercentage === true) {
      findSecondLatestMonth = findLatestMonth - 1;
      secondLatestMonth = jobsMonthlyData[findSecondLatestMonth].month;
      const secondLatestMonthData = jobsMonthlyData.find(
        (job) => job.month === secondLatestMonth
      );
      secondLatestMonthJobs = secondLatestMonthData.totalJobs;

      findThirdLatestMonth = findLatestMonth - 2;
      thirdLatestMonth = jobsMonthlyData[findThirdLatestMonth].month;
      const thirdLatestMonthData = jobsMonthlyData.find(
        (job) => job.month === thirdLatestMonth
      );
      thirdLatestMonthJobs = thirdLatestMonthData.totalJobs;

      const change = secondLatestMonthJobs - thirdLatestMonthJobs;
      percentage = (change / thirdLatestMonthJobs) * 100;

      console.log(change);

      if (percentage > 0) {
        percentage = "+" + percentage;
      } else {
        percentage = "-" + percentage;
      }
    }
  }

  const addExpense = () => {
    setOpen(true);
    setIsAddButtonn(true);
    setIsEditButtonn(false);
  };
  const addJob = () => {
    navigate("/add-job");
  };

  //getting the total number of contractors

  const columns = [
    {
      field: "from",
      headerName: "From",
      flex: 2,
      valueGetter: (params) => params.row.from.name,
    },
    {
      field: "customer",
      headerName: "To",
      flex: 2,
      valueGetter: (params) => params.row.customer.name,
    },

    {
      field: "cost",
      headerName: "cost",
      flex: 0.5,
      sortable: false,
      //renderCell: (params) => params.value.length,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      flex: 2,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
  ];
  const addOrder = () => {
    navigate("/add-job");
  };

  const handleAnalytics = (vehicleId) => {
    console.log(vehicleId);
    navigate(`/vehicle-analytics/${vehicleId}`);
  };

  const handleReports = (vehiclId) => {
    navigate(`/reports-vehicle/${vehicleId}`);
  };
  console.log(vehicleStats);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title={vehicle && vehicle.regNumber} />
        <Box>
          <Button
            variant="outlined"
            color="info"
            sx={{
              m: "1rem",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ":hover": {
                //  backgroundColor: theme.palette.secondary[100],
              },
            }}
            onClick={() => handleAnalytics(vehicleId)}
          >
            <AnalyticsOutlined sx={{ mr: "10px" }} />
            Analytics
          </Button>
          <Button
            variant="outlined"
            color="info"
            sx={{
              m: "1rem",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ":hover": {
                // backgroundColor: theme.palette.secondary[100],
              },
            }}
            onClick={() => handleReports(vehicleId)}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Reports
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => addExpense()}
            variant="outlined"
            color="error"
            sx={{
              m: "1rem",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ":hover": {
                // backgroundColor: theme.palette.secondary[100],
              },
            }}
          >
            <TrendingDownOutlined sx={{ mr: "10px" }} />+ expense
          </Button>
          <Button
            onClick={() => addJob()}
            variant="outlined"
            color="success"
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ":hover": {
                // backgroundColor: theme.palette.secondary[300],
              },
            }}
          >
            <TrendingUpOutlined sx={{ mr: "10px" }} />+ job
          </Button>
        </Box>
      </FlexBetween>
      {open && (
        <ExpensesPopup
          open={true}
          handleClose={handleClose}
          isAddButton={isAddButtonn}
          isEditButton={isEditButtonn}
          vehicleId={vehicleId}
          driverId={null}
          isEmployeeExpense={false}
          isVehicleExpense={true}
        />
      )}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Jobs"
          value={vehicleStats && vehicleStats.yearlyJobs}
          increase={!isPercentage ? latestMonth : secondLatestMonth}
          description={
            !isPercentage ? `${latestMonthJobs} jobs` : `${percentage}%`
          }
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          x
        />
        <StatBox
          title="Tot Income"
          value={vehicleStats && `$ ${vehicleStats.yearlyRevenue}`}
          increase={topContractorRevenue && topContractorRevenue}
          description={topContractorRevenue && `$${highestRevenue}`}
          icon={
            <MonetizationOn
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Box display={"flex"}>
            <Typography variant="h5" fontWeight={"bold"}>
              All Jobs Info
            </Typography>
            <FormControl sx={{ ml: "18rem" }}>
              <Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                color="info"
                size="small"
                defaultValue="jobs"
                inputProps={{ "aria-label": "Select an option" }}
              >
                <MenuItem value="mileage">Mileage</MenuItem>
                <MenuItem value="jobs">Jobs</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {vehicleStats !== null && (
            <>
              <VehSingleLineChart
                view={selectedOption}
                vehicleId={vehicleId}
                isDashboard={true}
              />
            </>
          )}
        </Box>
        <StatBox
          title="Total Expenses"
          value={vehicleStats && `$ ${vehicleStats.yearlyExpenses}`}
          increase={`last month`}
          description={`$${lastMonthExpenses}`}
          icon={
            <TrendingDownOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Total Distance"
          value={vehicleStats && `${vehicleStats.yearlyMileage} `}
          increase={`last month`}
          description={`${lastMonthDistance}`}
          icon={
            <TrendingDownOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}

        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" fontWeight="bold">
            Jobs By Contractor
          </Typography>
          <VehicleBreakdownChart vehicleId={vehicleId} isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of all time jobs by contractor
          </Typography>
        </Box>

        <Box
          p="1.5rem"
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          alignItems="center"
          display="flex"
          flexDirection="column"
          sx={{
            "& .MuiDataGrid-root": {
              border: "solid , 3rem",
              //borderWidth:"10px",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              //borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              // borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <Typography fontWeight="bold">Latest Jobs</Typography>
          <DataGrid
            loading={latestJobsVehLoading || !latestJobsVehicle}
            getRowId={(row) => row._id}
            rows={(latestJobsVehicle && latestJobsVehicle) || []}
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DashVehiclePage;
