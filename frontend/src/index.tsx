import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Menu from "./components/Menu";
import {
  blue,
  grey,
} from "@mui/material/colors";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./pages/profile";
import Discovery from "./pages/discovery";
import BarbershopServices from "./pages/barbershop-services";
import { BarberSelect } from "./pages/barbershop-schedule/barber-select";
import { ScheduleDate } from "./pages/barbershop-schedule/schedule-date";
import { Me } from "./pages/profile/me";
import { Default } from "./pages/Default";
import { IsLogged } from "./Services/AuthService";
import { Unauthenticated } from "./components/Unauthenticated";
import { ServiceSummary } from "./pages/service-summary";
import { Favorites } from "./pages/profile/favorites";
import { Schedules } from "./pages/profile/schedules";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: blue,
    text: {
      primary: grey[50],
      secondary: grey[50],
    },
    secondary: {
      main: grey[50]
    },
  },
});

root.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />

    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Default/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/discovery" element={<Discovery />} />        
        <Route path="/barbershop-services" element={<BarbershopServices />} />
        <Route path="/barber-select" element={IsLogged() ? <BarberSelect /> : <Unauthenticated/>} />
        <Route path="/schedule-date" element={IsLogged() ? <ScheduleDate /> : <Unauthenticated/>} />
        <Route path="/service-summary" element={IsLogged() ? <ServiceSummary /> : <Unauthenticated/>} />
        <Route path="/profile/me" element={IsLogged() ? <Me /> : <Unauthenticated/>} />
        <Route path="/favorites" element={IsLogged() ? <Favorites /> : <Unauthenticated/>} />
        <Route path="/schedules" element={IsLogged() ? <Schedules /> : <Unauthenticated/>} />
      </Routes>
    </Router>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
