import { Router, Location, Redirect } from "@reach/router";
import React, {useEffect, useState} from "react";
import { createGlobalStyle } from "styled-components";
import BusinessMeeting from "./components/components/gameree/business-meeting";
import Party from "./components/components/gameree/party";
import WalletCustom from "./components/components/walletGrey";
import Header from "./components/menu/header";
import Createpage from "./components/pages/createOptions";
import Home from "./components/pages/gameReeHome";
import { ParallaxProvider } from "react-scroll-parallax";
import OldMap from "./components/components/mapbox/OldMap";
import SignIn from "./components/pages/auth/SignIn";
import SignUp from "./components/pages/auth/SignUp";
import Terms from "./components/pages/termsAndCondition/Terms";
import Condition from "./components/pages/termsAndCondition/Condition";
import ForgotPassword from "./components/pages/auth/ForgotPassword";
import ResetVerification from "./components/pages/reserVerification";
import { gapi } from "gapi-script";
import GoogleClientId from "./GoogleClientId";
import SignInAdmin from "./components/pages/auth/SignInAdmin";
import AdminHome from "./components/components/admin/AdminHome";
import ViewProfile from "./components/pages/ViewProfile";
import EditProfile from "./components/pages/EditProfile";
import {useEagerConnect, useInactiveListener} from "./hooks/useEagerConnect";
import Dashboard from "./components/components/dashboard/Dashboard";
import DashboardSidebar from "./components/components/dashboard/DashbaordSidebar";
import DashboardHeader from "./components/components/dashboard/DashboardHeader";
import NftSell from "./components/components/dashboard/NftSell";
import MyCollection from "./components/components/dashboard/MyCollection";
import MainCertifictePage from "./components/certificate/MainCertifictePage"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


/**
 *  Unimportant 
 * *
 
 import Createoption from './components/pages/createOptions';

*/

const GlobalStyles = createGlobalStyle`
:root {
  scroll-behavior: unset;
}
`;
export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};
const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id="routerhang">
        <div key={location.key}>
          <Router location={location}>{children}</Router>
        </div>
      </div>
    )}
  </Location>
);

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: GoogleClientId,
    plugin_name: "chat",
  });
});

function App() {
  const [message, setErrorMessage] = useState()
  useEagerConnect(setErrorMessage);
  useInactiveListener()

  return (
    <div className="wraper">
      <Header />
      <ToastContainer theme='colored' limit={3}/>
      <GlobalStyles />

      <ParallaxProvider>
        <PosedRouter>
          <ScrollTop path="/">
            <Home exact path="/">
              <Redirect to="/home" />
            </Home>

            <ResetVerification path="/resetLink" />
            <ForgotPassword path="/forgotPassword" />
            <Party path="/party" />
            <ViewProfile path="/myProfile" />
            <EditProfile path="/editProfile" />
            <OldMap path="/landmap"></OldMap>
            <WalletCustom path="/wallet" />
            <SignIn path="/signIn" />
            <AdminHome path="/adminHome" />
            <SignInAdmin path="/signInAdmin" />

            <Terms path="/terms" />
            <Condition path="/policy" />

            {/* <SignIn path= "/newSignIn" /> */}

            <SignUp path="signUp" />
            <BusinessMeeting path="/business-meeting" />
            <Dashboard path="/dashboard" header={<DashboardHeader/>} sidebar={<DashboardSidebar/>}/>
            <NftSell path="/nft-sell" header={<DashboardHeader/>} sidebar={<DashboardSidebar/>}/>
            <MyCollection path="/collection" header={<DashboardHeader/>} sidebar={<DashboardSidebar/>}/>
            <MainCertifictePage  path="mainCertificate" />

          </ScrollTop>
        </PosedRouter>
      </ParallaxProvider>
    </div>
  );
}

export default App;
