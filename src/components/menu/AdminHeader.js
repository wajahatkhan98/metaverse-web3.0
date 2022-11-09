import React, { useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import { useDispatch, useSelector } from "react-redux";

//import { header } from 'react-bootstrap';
import { Link } from "@reach/router";
import useOnclickOutside from "react-cool-onclickoutside";
import auth from "../../core/auth";
import { navigate } from "@reach/router";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import Logo from "../../assets/images/gamreeLogo.png";
import assets from "../../assets/dash/Assets.png";
import collection from "../../assets/dash/Collection.png";
import treasure from "../../assets/dash/Treasure.png";

import message from "../../assets/dash/Message.png";
import building from "../../assets/dash/Prop.png";
import profile from "../../assets/dash/Man.png";
import new_logo from "../../assets/dash/new_logo.png";

import { LogoutUser } from "../../store/reducers/UserActions";

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

/*
 
fade in transition
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

*/
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

const AdminHeader = function ({ className }) {
  const dispatch = useDispatch();
  const [openMenu0, setOpenMenu0] = React.useState(false);

  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [openMenu4, setOpenMenu4] = React.useState(false);

  // const [openMenu3, setOpenMenu3] = React.useState(false);
  const handleBtnClick0 = () => {
    setOpenMenu0(!openMenu);
  };

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
  const handleBtnClick4 = () => {
    setOpenMenu3(!openMenu4);
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

  const closeMenu0 = () => {
    setOpenMenu0(false);
  };

  const closeMenu4 = () => {
    setOpenMenu3(false);
  };

  const ref0 = useOnclickOutside(() => {
    closeMenu();
  });

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
  const ref4 = useOnclickOutside(() => {
    closeMenu4();
  });

  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const [shownot, btn_icon_not] = useState(false);
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
    navigate("/");
  };
  const state = useSelector((state) => state.user);
  const wallet_info = useSelector((state) => state.user.wallet_info);

  return (
    <header className={`navbar white ${className}`} id="myHeader">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to="/">
                <div style={{ display: "flex" }}>
                  <img
                    style={{ height: 50, display: "flex" }}
                    src={new_logo}
                    className="img-fluid d-block"
                    alt="#"
                  />
                  <Reveal
                    className="onStep"
                    keyframes={fadeInUp}
                    delay={300}
                    duration={600}
                    triggerOnce
                  >
                    {/* <div
                      style={{
                        fontSize: "2rem",
                        paddingLeft: "5px",
                        marginBottom: 0,
                        color: "#6d53c2",
                      }}
                    >
                      GameRee
                    </div> */}
                  </Reveal>
                </div>
              </NavLink>
            </div>
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
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
                      <NavLink
                        to={"/landmap"}
                        className="dropdown-custom  btn"
                        // onClick={handleBtnClick1}
                      >
                        <NavLink to={"/landmap"}>Play to Earn</NavLink>
                      </NavLink>

                      {openMenu1 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu1}>
                            <NavLink to="/" onClick={() => btn_icon(!showmenu)}>
                              Explore
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                {/* <div className="navbar-item">
                  <div ref={ref0}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick0}
                      onMouseLeave={closeMenu0}
                    >
                      Properties
                      <span className="lines"></span>
                      {openMenu0 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu0}>
                            <NavLink to="/party">Party</NavLink>
                            <NavLink to="/business-meeting">
                              Business Meetings
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div> */}

                <div className="navbar-item">
                  {/* <NavLink to="/activity"> */}
                  <NavLink to="/">
                    Home
                    <span className="lines"></span>
                  </NavLink>
                </div>

                <div className="navbar-item">
                  <div ref={ref1}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick1}
                      onMouseLeave={closeMenu1}
                    >
                      Properties
                      <span className="lines"></span>
                      <span>
                        {" "}
                        <img
                          style={{ height: "30px" }}
                          src={building}
                        ></img>{" "}
                      </span>
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
                  <div ref={ref2}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick2}
                      onMouseLeave={closeMenu2}
                    >
                      Collections
                      <span className="lines"></span>
                      <span>
                        {" "}
                        <img
                          style={{ height: "30px" }}
                          src={collection}
                        ></img>{" "}
                      </span>
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
                </div>
                <div className="navbar-item">
                  {/* <NavLink to="/activity"> */}
                  <NavLink to="/">
                    Treasures
                    <span className="lines"></span>
                    <span>
                      {" "}
                      <img style={{ height: "30px" }} src={treasure}></img>{" "}
                    </span>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  {/* <NavLink to="/activity"> */}
                  <NavLink to="/">
                    Profile
                    <span className="lines"></span>
                    <span>
                      {" "}
                      <img style={{ height: "30px" }} src={profile}></img>{" "}
                    </span>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  {/* <NavLink to="/activity"> */}
                  <NavLink to="/">
                    Message
                    <span className="lines"></span>
                    <span>
                      {" "}
                      <img style={{ height: "30px" }} src={message}></img>{" "}
                    </span>
                  </NavLink>
                </div>

                {/* <div className="navbar-item">
                  <div ref={ref3}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick3}
                      onMouseLeave={closeMenu3}
                    >
                      Events
                      <span className="lines"></span>
                      {openMenu3 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu3}>
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
                 */}

                {/* <div className="navbar-item">
                  <div ref={ref4}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick4}
                      onMouseLeave={closeMenu4}
                    >
                      Events
                      <span className="lines"></span>
                      {openMenu4 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu4}>
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
                 */}

                <div className="navbar-item">
                  {/* <NavLink to="/activity"> */}
                  <NavLink to="/landmap">
                    Play to Earn
                    <span className="lines"></span>
                  </NavLink>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>
          {!wallet_info && (
            <div className="mainside">
              <div className="connect-wal">
                <NavLink to="/wallet">Connect Wallet</NavLink>
              </div>
            </div>
          )}
          <div className="mainside">
            <div className="connect-wal">
              {!state.user ? (
                <NavLink to="/signUp">Join GameRee</NavLink>
              ) : (
                <button
                  className={"btn-main mx-1"}
                  style={{
                    color: "black",
                    borderRadius: "10px",
                    margin: "0px",
                  }}
                  onClick={() => {
                    dispatch(LogoutUser());
                    // console.log("logout called");
                  }}
                >
                  Logout
                  {/* {state.user.email} */}{" "}
                </button>
              )}
            </div>

            <div className="logout">
              <NavLink to="/createOptions">Create</NavLink>
              <div
                id="de-click-menu-notification"
                className="de-menu-notification"
                onClick={() => btn_icon_not(!shownot)}
                ref={refpopnot}
              >
                <div className="d-count">8</div>
                <i className="fa fa-bell"></i>
                {shownot && (
                  <div className="popshow">
                    <div className="de-flex">
                      <h4>Notifications</h4>
                      <span className="viewaall">Show all</span>
                    </div>
                    <ul>
                      <li>
                        <div className="mainnot">
                          <img
                            className="lazy"
                            src="../../img/author/author-2.jpg"
                            alt=""
                          />
                          <div className="d-desc">
                            <span className="d-name">
                              <b>Mamie Barnett</b> started following you
                            </span>
                            <span className="d-time">1 hour ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img
                            className="lazy"
                            src="../../img/author/author-3.jpg"
                            alt=""
                          />
                          <div className="d-desc">
                            <span className="d-name">
                              <b>Nicholas Daniels</b> liked your item
                            </span>
                            <span className="d-time">2 hours ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img
                            className="lazy"
                            src="../../img/author/author-4.jpg"
                            alt=""
                          />
                          <div className="d-desc">
                            <span className="d-name">
                              <b>Lori Hart</b> started following you
                            </span>
                            <span className="d-time">18 hours ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img
                            className="lazy"
                            src="../../img/author/author-5.jpg"
                            alt=""
                          />
                          <div className="d-desc">
                            <span className="d-name">
                              <b>Jimmy Wright</b> liked your item
                            </span>
                            <span className="d-time">1 day ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img
                            className="lazy"
                            src="../../img/author/author-6.jpg"
                            alt=""
                          />
                          <div className="d-desc">
                            <span className="d-name">
                              <b>Karla Sharp</b> started following you
                            </span>
                            <span className="d-time">3 days ago</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div
                id="de-click-menu-profile"
                className="de-menu-profile"
                onClick={() => btn_icon_pop(!showpop)}
                ref={refpop}
              >
                <img
                  src="../../img/author_single/author_thumbnail.jpg"
                  alt=""
                />
                {showpop && (
                  <div className="popshow">
                    <div className="d-name">
                      <h4>Monica Lucas</h4>
                      <span
                        className="name"
                        onClick={() => window.open("", "_self")}
                      >
                        Set display name
                      </span>
                    </div>
                    <div className="d-balance">
                      <h4>Balance</h4>
                      12.858 ETH
                    </div>
                    <div className="d-wallet">
                      <h4>My Wallet</h4>
                      <span id="wallet" className="d-wallet-address">
                        DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME
                      </span>
                      <button id="btn_copy" title="Copy Text">
                        Copy
                      </button>
                    </div>
                    <div className="d-line"></div>
                    <ul className="de-submenu-profile">
                      <li>
                        <span>
                          <i className="fa fa-user"></i> My profile
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-pencil"></i> Edit profile
                        </span>
                      </li>
                      <li onClick={handleLogout}>
                        <span>
                          <i className="fa fa-sign-out"></i> Sign out
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default AdminHeader;
