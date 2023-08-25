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
} from "./route/delRoutes";
import DelLayout from "component/deliverer/DelLayout";
import ToasterProvider from "providers/ToastProvider";
import Store from "redux/store";
import { loadUser } from "redux/actions/user";

//getting the layouts

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

              <Route path="/del-dashboard" element={<DelDashboardPage />} />
            </Route>
            <Route path="/del-register" element={<DelRegisterPage />} />
            <Route path="/del-login" element={<DelLoginPage />} />
          </Routes>
        </ThemeProvider>
        <ToasterProvider />
      </BrowserRouter>
    </div>
  );
};

export default App;
