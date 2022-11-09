import React, { useEffect, useRef, useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";

import avatar from "../../assets/header/Avatar_3.png";
import user_icon from "../../assets/header/contacts_64px.png";
import { useDispatch, useSelector } from "react-redux";
import Rotate from "react-reveal/Rotate";
// import user_icon from "../../";
import { DeleteTime, removeWallet } from "../../store/reducers/UserActions";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//import { header } from 'react-bootstrap';
import { Link, useNavigate } from "@reach/router";
import useOnclickOutside from "react-cool-onclickoutside";
import auth from "../../core/auth";
import { navigate } from "@reach/router";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import Logo from "../../assets/images/gamreeLogo.png";
import TxtLogo from "../../assets/images/logo_new.png";

import { LogoutUser, saveUserData } from "../../store/reducers/UserActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Profile from "../pages/Profile";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import LinearProgress from "@mui/material/LinearProgress";
import ApiLink from "../pages/ApiLink";
import {useWeb3React} from "@web3-react/core";
import {useInactiveListener} from "../../hooks/useEagerConnect";
import { useLocation} from "react-router-dom";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active" : "non-active",
      };
    }}
  />
);

const Header = function ({ className }) {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);

  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const [shownot, btn_icon_not] = useState(false);

  const state = useSelector((state) => state.user);
  const wallet_info = useSelector((state) => state.user.wallet_info);
  const loginTime = useSelector((state) => state.user.loginTime);

  const {active, account} = useWeb3React();





  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };

  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });
  const closePop = () => {
    btn_icon_pop(false);
  };
  const closeNot = () => {
    btn_icon_not(false);
  };
  const refpop = useOnclickOutside(() => {
    closePop();
  });
  const refpopnot = useOnclickOutside(() => {
    closeNot();
  });

  const handleLogout = () => {
    auth.clearAppStorage();
    dispatch(LogoutUser());
    dispatch(removeWallet());
    dispatch(DeleteTime());
    navigate("/signIn");
  };
  let timer;
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [timerId, setTimerId] = useState(false);
  const renderCount = useRef(1);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  useEffect(() => {
    const autoLogout = () => {
      if (document.visibilityState === "hidden") {
        // set timer to log user out
        if (state.user) {
          /*const id = window.setTimeout(() => {
            dispatch(LogoutUser());
            setIsLoggedOut(true);
            // alert("open");
            dispatch(removeWallet());
            dispatch(DeleteTime());

            navigate("/signIn");
            setOpen(true);
          }, 5 * 60 * 1000);
          setTimerId(id);*/
        }
      } else {
        // clear existing timer
        window.clearTimeout(timerId);
      }
    };

    // document.addEventListener("visibilitychange", autoLogout);

    // return () => document.removeEventListener("visibilitychange", autoLogout);
  }, [timerId]);

  const [progress, setProgress] = useState(100);
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    avatar: "",
  });

  useEffect(() => {
    if (state.user) {
      async function fetchProfile() {
        fetch(`${ApiLink}/myAccount/${state.user.email}`)
          .then((res) => res.json())
          .then((data) => {
            dispatch(saveUserData(data.profileData.avatar));
            setUserData(data.profileData);
          });
      }
      fetchProfile();
    }
  }, [state.user]);

  if(window.location.pathname === '/dashboard') return <></>

  return (
    <header className={`navbar white ${className}`} id="myHeader">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your Session Has been Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Login Again to Contiue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to="/">
                <div style={{ display: "flex" }}>
                  {/*<img
                    id="img_logo"
                    style={{
                      display: "flex",
                    }}
                    src={TxtLogo}
                    className="img-fluid d-block"
                    alt="#"
                  />*/}
                </div>
              </NavLink>
            </div>
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {state.user ? (
                <></>
              ) : (
                <>
                  <div className="mainside">
                    <div className="connect-wal" style={{ marginTop: "25px" }}>
                      <NavLink to="/signIn">Sign In</NavLink>
                    </div>
                  </div>
                </>
              )}

              {showmenu && (
                <Rotate top right>
                  <div className="menu">
                    <Link to="/">
                      <div className="navbar-item">
                        <div ref={ref}>
                          <div
                            className="dropdown-custom btn"
                            onClick={handleBtnClick}
                          >
                            Home
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="navbar-item">
                      <div ref={ref2}>
                        <div
                          className="dropdown-custom dropdown-toggle btn"
                          onClick={handleBtnClick2}
                        >
                          Events
                        </div>
                        {openMenu2 && (
                          <div className="item-dropdown">
                            <div className="dropdown" onClick={closeMenu2}>
                              <NavLink to="/party">Party</NavLink>
                              <NavLink to="/business-meeting">
                                Business Meetings
                              </NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="navbar-item">
                      <div ref={ref1}>
                        <div
                          className="dropdown-custom dropdown-toggle btn"
                          onClick={handleBtnClick1}
                        >
                          Play to Earn
                        </div>
                        {openMenu1 && (
                          <div className="item-dropdown">
                            <div className="dropdown" onClick={closeMenu1}>
                              <NavLink
                                to="/"
                                onClick={() => btn_icon(!showmenu)}
                              >
                                Explore
                              </NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {!wallet_info && state.user ? (
                      <div className="navbar-item">
                        <div className="dropdown-custom btn">
                          <div className="mobile-btn">
                            <NavLink to="/wallet"> {active ? 'Connected' : 'Connect Wallet' } </NavLink>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {!state.user ? (
                      <>
                        {/* <div className="navbar-item">
                        <div className="dropdown-custom btn">
                          <div className="mobile-btn">
                            <NavLink to="/signIn">Sign In</NavLink>
                          </div>
                        </div>
                      </div> */}

                        <div className="navbar-item">
                          <div className="dropdown-custom btn">
                            <div className="mobile-btn">
                              <NavLink to="/signUp">Sign Up</NavLink>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="navbar-item">
                        <div className="dropdown-custom btn">
                          <PopupState
                            variant="popover"
                            popupId="demo-popup-menu"
                          >
                            {(popupState) => (
                              <React.Fragment>
                                <button
                                  className={"btn-main "}
                                  style={{
                                    color: "black",
                                    borderRadius: "6px",
                                    margin: "0px",
                                    width: "100%",
                                  }}
                                  variant="contained"
                                  {...bindTrigger(popupState)}
                                >
                                  User
                                </button>{" "}
                                <Menu {...bindMenu(popupState)}>
                                  <MenuItem
                                    onClick={() => {
                                      popupState.close();
                                      navigate("/myProfile");
                                    }}
                                  >
                                    <div className="d-flex">
                                      <img
                                        src={
                                          userData.avatar == ""
                                            ? "https://res.cloudinary.com/dot-pic/image/upload/v1659617513/Avatar_3_zaxygb.png"
                                            : userData.avatar
                                        }
                                        style={{
                                          width: "50px",
                                          borderRadius: "10px",
                                        }}
                                        alt="avatar"
                                      ></img>
                                      <span
                                        style={{
                                          marginLeft: "10px",
                                          marginTop: "15px",
                                          color: "Highlight",
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                          verticalAlign: "bottom",
                                        }}
                                      >
                                        {state.user.userName}
                                      </span>
                                    </div>
                                  </MenuItem>

                                  <MenuItem disabled>
                                    {" "}
                                    Login at : {loginTime}
                                  </MenuItem>
                                  <MenuItem
                                      onClick={() => {
                                        popupState.close();
                                        navigate("/landmap");
                                      }}
                                  >
                                    {" "}
                                    Map
                                  </MenuItem>
                                  <MenuItem
                                      onClick={() => {
                                        popupState.close();
                                        navigate("/dashboard");
                                      }}
                                  >
                                    {" "}
                                    Dashboard
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      popupState.close();
                                      navigate("/editProfile");
                                    }}
                                  >
                                    {" "}
                                    Edit Profile
                                  </MenuItem>
                                  <MenuItem onClick={handleLogout}>
                                    Logout
                                  </MenuItem>
                                </Menu>
                              </React.Fragment>
                            )}
                          </PopupState>
                        </div>
                      </div>
                    )}
                  </div>
                </Rotate>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <Link to="/" ref={ref}>
                    <div
                      className="dropdown-custom  btn"
                      onMouseEnter={handleBtnClick}
                      onMouseLeave={closeMenu}
                    >
                      Home
                    </div>
                  </Link>
                </div>

                <div className="navbar-item">
                  <div ref={ref1}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick1}
                      onMouseLeave={closeMenu1}
                    >
                      Events
                      <span className="lines"></span>
                      {openMenu1 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu1}>
                            <NavLink to="/party">Party</NavLink>
                            <NavLink to="/business-meeting">
                              Business Meetings
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="navbar-item">
                  {/* <NavLink to="/activity"> */}
                  <NavLink to="/landmap">
                    Play to Earn
                    <span className="lines"></span>
                  </NavLink>
                </div>
                {!wallet_info && state.user ? (
                  <div className="navbar-item">
                    <div className="mainside">
                      <div className="connect-wal">
                        <NavLink to="/wallet">{active ? 'Connected' : 'Connect Wallet' }</NavLink>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {!state.user ? (
                  <>
                    <div className="navbar-item">
                      <div className="mainside">
                        <div className="connect-wal">
                          <NavLink to="/signIn">Sign In</NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="navbar-item">
                      <div className="mainside">
                        <div className="connect-wal">
                          <NavLink to="/signUp">Sign Up</NavLink>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="navbar-item">
                    <div className="mainside">
                      <div className="connect-wal">
                        <PopupState variant="popover" popupId="demo-popup-menu">
                          {(popupState) => (
                            <React.Fragment>
                              <span
                                className={"mx-1"}
                                style={{
                                  color: "black",
                                  borderRadius: "6px",
                                  marginTop: "-5px",
                                }}
                                variant="contained"
                                {...bindTrigger(popupState)}
                              >
                                <img
                                  width={"50px"}
                                  src={user_icon}
                                  alt="user icon"
                                  id="user_icon"
                                  style={{
                                    marginTop: "-12px",
                                  }}
                                ></img>
                              </span>{" "}
                              <Menu {...bindMenu(popupState)}>
                                <MenuItem
                                  onClick={() => {
                                    popupState.close();
                                    navigate("/myProfile");
                                  }}
                                >
                                  <div className="d-flex">
                                    <img
                                      src={
                                        userData.avatar == ""
                                          ? "https://res.cloudinary.com/dot-pic/image/upload/v1659617513/Avatar_3_zaxygb.png"
                                          : userData.avatar
                                      }
                                      style={{
                                        width: "50px",
                                        borderRadius: "10px",
                                      }}
                                      alt="avatar"
                                    ></img>
                                    <span
                                      style={{
                                        marginLeft: "10px",
                                        marginTop: "15px",
                                        color: "Highlight",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        verticalAlign: "bottom",
                                      }}
                                    >
                                      {state.user.userName}
                                    </span>
                                  </div>
                                </MenuItem>

                                <MenuItem disabled>
                                  Login at :{loginTime}
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                      popupState.close();
                                      navigate("/landmap");
                                    }}
                                >
                                  {" "}
                                  Map
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                      popupState.close();
                                      navigate("/dashboard");
                                    }}
                                >
                                  {" "}
                                  Dashboard
                                </MenuItem>

                                <MenuItem
                                  onClick={() => {
                                    popupState.close();
                                    navigate("/editProfile");
                                  }}
                                >
                                  {" "}
                                  Edit Profile
                                </MenuItem>
                                {wallet_info && (
                                  <MenuItem>{wallet_info.accounts[0]}</MenuItem>
                                )}

                                <MenuItem onClick={handleLogout}>
                                  Logout
                                </MenuItem>
                              </Menu>
                            </React.Fragment>
                          )}
                        </PopupState>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Breakpoint>
          </BreakpointProvider>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
      {/* <div style={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          style={{ color: "black" }}
          value={progress}
        />
      </div> */}
    </header>
  );
};
export default Header;
