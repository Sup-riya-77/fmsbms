import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import UpdateUserEntity from "./forms/UpdateUserEntity";
import UserEntityManagement from "./forms/UserEntityManagement";
import AccountHolderManagement from "./forms/AccountHolderManagement";
import MobileServiceManagement from "./forms/MobileServiceManagement";
import BillManagement from "./forms/BillManagement";
import PaymentManagement from "./forms/PaymentManagement";
import UpdateFamilyMember from "./forms/UpdateFamilyMember";
import UpdateMobileService from "./forms/UpdateMobileService";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";

import EventBus from "./common/EventBus";



const App = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showCustomerSupport, setShowCustomerSupport] = useState(false);
  const [showAccountHolder, setShowAccountHolder] = useState(false);
  const [showUser,setShowUser] = useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowAdmin(user.role.includes("ROLE_ADMIN"));
      setCurrentUser(user);
      setShowCustomerSupport(user.role.includes("ROLE_CUSTOMER_SUPPORT"));
      setCurrentUser(user);
      setShowAccountHolder(user.role.includes("ROLE_ACCOUNT_HOLDER"));
      setCurrentUser(user);
      setShowUser(user.role.includes("ROLE_USER"));
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdmin(false);
    setShowCustomerSupport(false);
    setShowUser(false);
    setShowAccountHolder(false);
    setCurrentUser(undefined);

    

  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Family Mobile Service Billing Management Service
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showAdmin && (
            <li className="nav-item">
              <Link to={"/userentitymanagement"} className="nav-link">
                User Entity Board
              </Link>
            </li>
          )}

          {showAccountHolder&& (
            <li className="nav-item">
              <Link to={"/accountholdermanagement"} className="nav-link">
                 Family Member Board
              </Link>
            </li>
          )}
           {showAccountHolder&& (
            <li className="nav-item">
              <Link to={"/mobileservicemanagement"} className="nav-link">
                Mobile Service Board
              </Link>
            </li>
          )}
           {showAccountHolder&& (
            <li className="nav-item">
              <Link to={"/paymentmanagement"} className="nav-link">
                Payment Board
              </Link>
            </li>
          )}
          {showCustomerSupport&& (
            <li className="nav-item">
              <Link to={"/billmanagement"} className="nav-link">
                Bill Board
              </Link>
            </li>
          )}

          
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/userentitymanagement" element={<UserEntityManagement/>} />
          <Route path="/update-userrole/:id" element={<UpdateUserEntity/>} />
          <Route path="/accountholdermanagement" element={<AccountHolderManagement/>} />
          <Route path="/paymentmanagement" element={<PaymentManagement/>} />
          <Route path="/mobileservicemanagement" element={<MobileServiceManagement/>} />
          <Route path="/billmanagement" element={<BillManagement/>} />
          <Route path="/update-family-member/:memeberId" element={<UpdateFamilyMember/>} />
          <Route path="/update-mobile-service/:serviceId" element={<UpdateMobileService/>} />
          
        </Routes>
      </div>

    </div>
  );
};

export default App;
