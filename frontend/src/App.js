import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";

//getting the deliverer routes
import {
  DelRegisterPage,
  DelLoginPage,
  DelDashboardPage,
  DelVehiclesPage,
  DelDriversPage,
  DelCustomersPage,
  DelAdminsPage,
  DelContractorsPage,
  DelPaymentsPage,
  DelAllOrdersPage,
  DelDashOrdersPage,
  DelDashRevenuePage,
  DelAddOrderPage,
  DelDeliverersPage,
  ActivationPage,
} from "./route/delRoutes";

import ToasterProvider from "providers/ToastProvider";
import Store from "redux/store";
import { loadUser } from "redux/actions/user";

//getting the layouts
import DelLayout from "component/deliverer/DelLayout";
import DelProtectedRoutes from "route/delProtectedRoutes";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route element={<DelLayout />}>
              <Route
                path="/"
                element={<Navigate to="/del-dashboard" replace />}
              />
              <Route
                path="/del-vehicles"
                element={
                  <DelProtectedRoutes>
                    <DelVehiclesPage />
                  </DelProtectedRoutes>
                }
              />
              <Route
                path="/del-drivers"
                element={
                  <DelProtectedRoutes>
                    <DelDriversPage />
                  </DelProtectedRoutes>
                }
              />
              <Route
                path="/del-payments"
                element={
                  <DelProtectedRoutes>
                    <DelPaymentsPage />
                  </DelProtectedRoutes>
                }
              />
              <Route
                path="/del-admins"
                element={
                  <DelProtectedRoutes>
                    <DelAdminsPage />
                  </DelProtectedRoutes>
                }
              />
              <Route
                path="/del-contractors"
                element={
                  <DelProtectedRoutes>
                    <DelContractorsPage />
                  </DelProtectedRoutes>
                }
              />
              <Route
                path="/del-deliverers"
                element={
                  <DelProtectedRoutes>
                    <DelDeliverersPage />
                  </DelProtectedRoutes>
                }
              />
              <Route
                path="/del-customers"
                element={
                  <DelProtectedRoutes>
                    <DelCustomersPage />
                  </DelProtectedRoutes>
                }
              />
              <Route
                path="/del-dash-orders"
                element={
                  <DelProtectedRoutes>
                    <DelDashOrdersPage />
                  </DelProtectedRoutes>
                }
              />
              <Route
                path="/del-dash-revenue"
                element={
                  <DelProtectedRoutes>
                    <DelDashRevenuePage />
                  </DelProtectedRoutes>
                }
              />
              <Route
                path="/del-all-orders"
                element={
                  <DelProtectedRoutes>
                    <DelAllOrdersPage />
                  </DelProtectedRoutes>
                }
              />
              <Route
                path="/add-order"
                element={
                  <DelProtectedRoutes>
                    <DelAddOrderPage />
                  </DelProtectedRoutes>
                }
              />
              <Route
                path="/del-dashboard"
                element={
                  <DelProtectedRoutes>
                    <DelDashboardPage />
                  </DelProtectedRoutes>
                }
              />
            </Route>

            <Route path="/login" element={<DelLoginPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
          </Routes>
        </ThemeProvider>
        <ToasterProvider />
      </BrowserRouter>
    </div>
  );
};

export default App;
