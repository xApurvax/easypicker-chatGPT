import Header from "./components/layout/Header";
import HeaderNew from "./components/layout/HeaderNew";
import NavbarNew from "./components/layout/NavbarNew";
import Tool from "./components/layout/Tool";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/LogIn";
import SignIn from "./components/auth/SignIn";
import toast, { Toaster } from 'react-hot-toast';
import Forgot from "./components/auth/Forgot";
import PasswordReset from "./components/auth/PasswordReset";
import PrivateRoute from "./utils/PrivateRoute";
import FooterNew from "./components/layout/FooterNew";
import SavedRecords from "./components/layout/SavedRecords";
import TransactionHistory from "./components/layout/TransactionHistory";

function App() {
  return (
    <div className="">
      <Toaster
        position="top-right"
        reverseOrder={false}
    />
    {/* <NavbarNew /> */}
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderNew ><Tool /></HeaderNew>} />
          {/* <Route element={<PrivateRoute />}>
              <Route path="/" element={<HeaderNew ><Tool /></HeaderNew>} exact /> 
          </Route> */}
          <Route path="/auth/login" element={<HeaderNew ><LogIn /></HeaderNew>}   />
          <Route path="/auth/register" element={<HeaderNew ><SignIn /></HeaderNew>}  />
          <Route path="/auth/forgot" element={<HeaderNew ><Forgot /></HeaderNew>}  />
          <Route path="/reset-password" element={<HeaderNew ><PasswordReset /></HeaderNew>}  />
          <Route path="/saved-results" element={<HeaderNew ><SavedRecords /></HeaderNew>}  />
          <Route path="/transaction-history" element={<HeaderNew ><TransactionHistory /></HeaderNew>}  />
        </Routes>
    </BrowserRouter>
    {/* <FooterNew /> */}
    </div>
  );
}

export default App;
