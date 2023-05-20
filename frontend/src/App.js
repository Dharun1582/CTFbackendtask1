import "./App.css";
import "./fonts.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useState, createContext, useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles } from "./themes";
// import Navbar from "./components/Navbar"
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Detailpage from "./pages/Detailpage/Detailpage"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ConfirmOTP from "./pages/ConfirmOTP/ConfirmOTP";
const StyledApp = styled.div``;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <div className="App">
          <Router>
            {/* <Navbar /> */}
            <AllRoutes />
          </Router>
        </div>
      </StyledApp>
    </ThemeProvider>
  );
}

const AllRoutes = () => {
  return (
    <Routes>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/detailpage" element={<Detailpage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/confirmOTP" element={<ConfirmOTP />} />

      
    </Routes>
  );
};

export default App;
