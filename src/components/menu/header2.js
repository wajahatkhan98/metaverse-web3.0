import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
//import { header } from 'react-bootstrap';
import { Link } from '@reach/router';
import useOnclickOutside from "react-cool-onclickoutside";
import auth from '../../core/auth';
import { navigate } from '@reach/router';


setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link 
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);



const Header = function({ className }) {

    const [openMenu, setOpenMenu] = React.useState(false);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const [openMenu2, setOpenMenu2] = React.useState(false);
    const [openMenu3, setOpenMenu3] = React.useState(false);
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
      navigate('/')
    }

    useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
        btn_icon(false);
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
          totop.classList.add("show");
          
        } else {
          header.classList.remove("sticky");
          totop.classList.remove("show");
        } if (window.pageYOffset > sticky) {
          closeMenu();
        }
      });
      return () => {
        window.removeEventListener("scroll", scrollCallBack);
      };
    }, []);
    return (
    <header className={`navbar white ${className}`} id="myHeader">
     <div className='container'>
       <div className='row w-100-nav'>
          <div className='logo px-0'>
              {/* <div className='navbar-title navbar-item'>
                <NavLink to="/">
                <img
                    src="/img/logo.png"
                    className="img-fluid d-block"
                    alt="#"
                  />
                  <img
                    src="/img/logo-2.png"
                    className="img-fluid d-3"
                    alt="#"
                  />
                  <img
                    src="/img/logo-3.png"
                    className="img-fluid d-4"
                    alt="#"
                  />
                  <img
                    src="/img/logo-light.png"
                    className="img-fluid d-none"
                    alt="#"
                  />
                </NavLink>
              </div> */}
          </div>

          <div className='search'>
            <input id="quick_search" className="xs-hide" name="quick_search" placeholder="search item here..." type="text" />
          </div>
                    
              <BreakpointProvider>
                <Breakpoint l down>
                  {showmenu && 
                  <div className='menu'>
                    <div className='navbar-item'>
                      <div ref={ref}>
                        <div className="dropdown-custom btn" 
                          onClick={handleBtnClick}
                          >
                          Home
                        </div>
                        
                      </div>
                    </div>
                    <div className='navbar-item'>
                      <div ref={ref1}>
                        <div className="dropdown-custom dropdown-toggle btn" 
                          onClick={handleBtnClick1}
                          >
                          Explore
                        </div>
                        {openMenu1 && (
                          <div className='item-dropdown'>
                            <div className="dropdown" onClick={closeMenu1}>
                              <NavLink to="/explore" onClick={() => btn_icon(!showmenu)}>Explore</NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='navbar-item'>
                      <div ref={ref2}>
                        <div className="dropdown-custom dropdown-toggle btn" 
                          onClick={handleBtnClick2}
                          >
                          Pages
                        </div>
                        {openMenu2 && (
                          <div className='item-dropdown'>
                            <div className="dropdown" onClick={closeMenu2}>
                              <NavLink to="/Author/1" onClick={() => btn_icon(!showmenu)}>Author</NavLink>
                             
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/activity" onClick={() => btn_icon(!showmenu)}>
                        Activity
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <div ref={ref3}>
                        <div className="dropdown-custom dropdown-toggle btn" 
                          onClick={handleBtnClick3}
                          >
                          Element
                        </div>
                        {openMenu3 && (
                          <div className='item-dropdown'>
                            <div className="dropdown" onClick={closeMenu3}>
                              <NavLink to="/elegantIcons" onClick={() => btn_icon(!showmenu)}>Elegant Icon</NavLink>
                             
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  }
                </Breakpoint>

               
              </BreakpointProvider>

              <div className='mainside'>
                <div className='connect-wal'>
                  <NavLink to="/wallet">Connect Wallet</NavLink>
                </div>
                <div className="logout">
                  <NavLink to="/createOptions">Create</NavLink>
                  <div id="de-click-menu-notification" className="de-menu-notification" onClick={() => btn_icon_not(!shownot)} ref={refpopnot}>
                      <div className="d-count">8</div>
                      <i className="fa fa-bell"></i>
                      {shownot && 
                        <div className="popshow">
                          <div className="de-flex">
                              <h4>Notifications</h4>
                              <span className="viewaall">Show all</span>
                          </div>
                          <ul>
                            <li>
                                <div className="mainnot">
                                    <img className="lazy" src="../../img/author/author-2.jpg" alt=""/>
                                    <div className="d-desc">
                                        <span className="d-name"><b>Mamie Barnett</b> started following you</span>
                                        <span className="d-time">1 hour ago</span>
                                    </div>
                                </div>  
                            </li>
                            <li>
                                <div className="mainnot">
                                    <img className="lazy" src="../../img/author/author-3.jpg" alt=""/>
                                    <div className="d-desc">
                                        <span className="d-name"><b>Nicholas Daniels</b> liked your item</span>
                                        <span className="d-time">2 hours ago</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="mainnot">
                                    <img className="lazy" src="../../img/author/author-4.jpg" alt=""/>
                                    <div className="d-desc">
                                        <span className="d-name"><b>Lori Hart</b> started following you</span>
                                        <span className="d-time">18 hours ago</span>
                                    </div>
                                </div>    
                            </li>
                            <li>
                                <div className="mainnot">
                                    <img className="lazy" src="../../img/author/author-5.jpg" alt=""/>
                                    <div className="d-desc">
                                        <span className="d-name"><b>Jimmy Wright</b> liked your item</span>
                                        <span className="d-time">1 day ago</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="mainnot">
                                    <img className="lazy" src="../../img/author/author-6.jpg" alt=""/>
                                    <div className="d-desc">
                                        <span className="d-name"><b>Karla Sharp</b> started following you</span>
                                        <span className="d-time">3 days ago</span>
                                    </div>
                                </div>    
                            </li>
                        </ul>
                        </div>
                        }
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
}
export default Header;