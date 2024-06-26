import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Bybit from "./Components/Dashboard/BybitSocket"
import Ticker from "./Components/Dashboard/Tickers"
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import RegisterSuccess from "./Components/Register/RegisterSuccess";
import RegisterDetail from "./Components/Register/RegisterDetail";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Market from "./Components/Market/Market";
import KYCForm from "./Components/KYCForm/KYCForm";
import KYCJForm from "./Components/KYCForm/KYCJForm";
import Changepassword from "./Components/Changepassword/Change";
//import Spot from "./Components/Spot/Spot";
import Spot from "./Components/SpotNew/Spot";
import Tokenalert from "./Components/Tools&Tokens/tokenalert"
import Advance from "./Components/AdvanceNew/Advance";
//import Advance from "./Components/Advance/Advance";
import Basic from "./Components/Basic/Basic";
import TokenVerify from "./Components/tokenVerify/tokenverify";
import WalletPage from "./Components/Wallet/Wallet";
import Deposit from './Components/Deposit/Deposit';
import TwoFA from "./Components/TwoFactorAuth/TwoFactorAuth";
import Profile from "./Components/Profile/Profile";
import PrivateRoute from "./Components/privateRoute";
import WalletPrivateRoute from "./Components/walletValidation";
import Constant from "./Constansts";
import Analytics from "./Components/Analytics/analytics"
import Referrals from "./Components/Referrals/Referrals";
import CopyTrade from "./Components/CopyTrade/CopyTrade";
import TraderDetails from "./Components/TraderDetails/TraderDetails";
import Wallethistory from "./Components/Wallethistory/wallethistory";
import Subscribe from "./Components/Subscribe/subscribe";
import SpotPrivate from "./Components/privateRoutes/spotprivate";
import KycRoute from "./Components/kycRoute"
import Settings from "./Components/Settings/Settings";
import Accounts from "./Components/Accounts/Myaccount";
import Support from "./Components/Support/Support";
import SupportMain from "./Components/Support/SupportMain";
import Subscription from "./Components/Subscriptions/Subscription";
import Page404 from "./Components/Page404";
import ComingSoon from "./Components/ComingSoon";
import Statergy from "./Components/Statergy/StatergyDetails"
import KycPrivateRoute from "./KycRoute";
import BotTrade from "./Components/Bot_trade/Subscription";
import SettingPage from "./Components/SettingPage/Subscription";
import ExchangeAccount from "./Components/ExchangeAccount/ExchangeAccount";
import Mysubscription from "./Components/Mysubscription/Mysubscription";
import AnalyticsNew from "./Components/AnalyticsNew/AnalyticsNew";
import Chart from './Components/Chart/Chart'
import WalletDeposit from "./Components/Wallet/WalletDeposit";
import WithdrawWallet from "./Components/Wallet/WithdrawWallet";
import TradeViewMain from "./Components/TradeView/TradeViewMain";
import Transfer from "./Components/Wallet/Transfer";
import DashboardChart from "./Components/Dashboard/DashboardChart";
import CandleStick from "./Components/CandleStick";
import Landing from "./Components/Landing";



function App() {
  const [sideBarShow, setSideBarShow] = useState(true);
  const [openSideBar, setOpenSideBar] = useState(true);



  return (
    <div className="App imperial-exchange-app-platform">
      <Router>
        <Routes>

          <Route
            index
            path={`${Constant.route}/candlechart`}
            element={
              <CandleStick />
            }
          />

          <Route
            index
            path={`${Constant.route}`}
            element={
              <Landing />
            }
          />

          <Route
            index
            path={`${Constant.route}/trade-view-chart`}
            element={
              <TradeViewMain
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />

          <Route
            index
            path={`${Constant.route}/dashboard`}
            element={
              <Dashboard
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />

          <Route
            index
            path={`${Constant.route}/trade-history`}
            element={
              <PrivateRoute>
                <Wallethistory
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />

          <Route
            index
            path={`${Constant.route}/bit`}
            element={
              <Ticker />
            }
          />

          <Route
            index
            path={`${Constant.route}/exchange-account`}
            element={
              <PrivateRoute>
                <ExchangeAccount
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />

          <Route
            index
            path={`${Constant.route}/analytics`}
            element={
              <PrivateRoute>
                <AnalyticsNew
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />

          <Route
            index
            path={`${Constant.route}/my-subscription`}
            element={
              <PrivateRoute>
                <Mysubscription
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />

          <Route
            index
            path={`${Constant.route}/account`}
            element={
              <PrivateRoute>
                <Accounts
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />



          <Route
            index
            path={`${Constant.route}/statergy-list/:id`}
            element={
              <PrivateRoute>
                <Statergy
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />

          <Route
            index
            path={`${Constant.route}/page-not-found-404`}
            element={
              <PrivateRoute>
                <Page404
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />

          {/* <Route
            index
            path={`${Constant.route}/analytics`}
            element={
              <PrivateRoute>
                <Analytics
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                />
              </PrivateRoute>
            }
          /> */}
          <Route
            index
            path={`${Constant.route}/bot_trade`}
            element={
              <PrivateRoute>
                <BotTrade
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />

          <Route
            index
            path={`${Constant.route}/coming-soon`}
            element={
              <PrivateRoute>
                <ComingSoon
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />

          {/* <Route
            index
            path={`${Constant.route}/settings`}
            element={
              <PrivateRoute>
                <SettingPage
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                />
              </PrivateRoute>
            }
          /> */}

          <Route
            index
            path={`${Constant.route}/support`}
            element={
              <PrivateRoute>
                <Support
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />

          <Route
            index
            path={`${Constant.route}/supportmain`}
            element={
              <PrivateRoute>
                <SupportMain
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />


          <Route
            path={`${Constant.route}/wallet`}
            element={

              // <WalletPrivateRoute>
              <PrivateRoute>
                <WalletPage
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
                {/* </WalletPrivateRoute> */}
              </PrivateRoute>

            }
          />
          <Route
            index
            path={`${Constant.route}/wallet-deposit`}
            element={
              <PrivateRoute>
                <WalletDeposit
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />
          <Route
            index
            path={`${Constant.route}/wallet-withdraw`}
            element={
              <PrivateRoute>
                <WithdrawWallet
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={`${Constant.route}/deposit`}
            element={

              <WalletPrivateRoute>
                <Deposit
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </WalletPrivateRoute>

            }
          />

          <Route
            index
            path={`${Constant.route}/profile-new`}
            element={
              <PrivateRoute>
                <Profile
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={`${Constant.route}/tokenpage/:token`}
            element={
              <TokenVerify
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />
          <Route path={`${Constant.route}/login`} element={<Login />} />
          <Route path={`${Constant.route}/register/:id?`} element={<Register />} />
          <Route path={`${Constant.route}/subscribe`}
            element={
              <Subscribe
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />
          <Route
            path={`${Constant.route}/register-success`}
            element={<RegisterSuccess />}
          />
          <Route
            path={`${Constant.route}/register-detail`}
            element={<RegisterDetail />}
          />
          <Route
            path={`${Constant.route}/forgot-password`}
            element={<ForgotPassword />}
          />
          <Route
            path={`${Constant.route}/reset-password`}
            element={<ResetPassword />}
          />
          <Route
            path={`${Constant.route}/copy-trade`}
            element={
              <PrivateRoute>
                {/* <SpotPrivate> */}
                <CopyTrade
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
                {/* </SpotPrivate> */}
              </PrivateRoute>
            }
          />
          <Route
            path={`${Constant.route}/market-overview`}
            element={
              <Market
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />


          <Route
            path={`${Constant.route}/kycj-verification`}
            element={
              <KycPrivateRoute>
                <KYCJForm
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </KycPrivateRoute>
            }
          />

          <Route
            path={`${Constant.route}/kyc-verification`}
            element={
              <KycPrivateRoute>
                <KYCForm
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </KycPrivateRoute>
            }
          />
          <Route
            path={`${Constant.route}/Subscription`}
            element={
              <PrivateRoute>
                <Subscription
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={`${Constant.route}/spot`}
            element={
              <SpotPrivate>
                <Spot
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </SpotPrivate>
            }
          />
          <Route
            path={`${Constant.route}/margin`}
            element={
              <SpotPrivate>
                <Advance
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </SpotPrivate>
            }
          />
          <Route
            path={`${Constant.route}/future`}
            element={
              <SpotPrivate>
                <Basic
                  sideBarShow={sideBarShow}
                  setSideBarShow={setSideBarShow}
                  openSideBar={openSideBar}
                  setOpenSideBar={setOpenSideBar}
                />
              </SpotPrivate>
            }
          />

          <Route
            path={`${Constant.route}/chart/:id`}
            element={
              // <SpotPrivate>
              <Chart
                sideBarShow={sideBarShow} dashboarde
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
              //  </SpotPrivate>
            }
          />

          <Route
            path={`${Constant.route}/dashboard/chart/:id`}
            element={
              // <SpotPrivate>
              <DashboardChart
                sideBarShow={sideBarShow} dashboarde
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
              //  </SpotPrivate>
            }
          />

          <Route
            path={`${Constant.route}/2FA`}
            element={
              <TwoFA
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />

          <Route
            path={`${Constant.route}/profile`}
            element={
              <Profile
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />

          <Route
            path={`${Constant.route}/changepassword`}
            element={
              <Changepassword
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />

          <Route
            path={`${Constant.route}/refferals`}
            element={
              <Referrals
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />

          <Route
            path={`${Constant.route}/trader-details/:id`}
            element={
              <TraderDetails
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />

          <Route
            path={`${Constant.route}/token_alert`}
            element={
              <Tokenalert
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />

          <Route
            path={`${Constant.route}/transfer`}
            element={
              <Transfer
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
