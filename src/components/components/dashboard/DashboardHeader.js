import * as React from "react";
import {useState} from "react";
import {styled} from "@mui/material/styles";
import useOnclickOutside from "react-cool-onclickoutside";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import UserIcon from "../../../assets/images/user.png";
import NotificationIcon from "../../../assets/images/notification.png";
import {Avatar, Divider, Grid, Menu, MenuItem, Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {navigate} from "@reach/router";
import {useNavigate} from "react-router-dom";
import auth from "../../../core/auth";
import {DeleteTime, LogoutUser, removeWallet} from "../../../store/reducers/UserActions";

const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    background: "#FFF",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        // marginLeft: drawerWidth,
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const NavLink = (props) => (
    <Link
        {...props}
        getProps={({isCurrent}) => {
            // the object returned here is passed to the
            // anchor element's props
            return {
                className: isCurrent ? "active" : "non-active",
            };
        }}
    />
);



function DashboardHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [TotalUsers, setTotalUsers] = useState("loading ...");
    const [openMenu2, setOpenMenu2] = useState(false);


    const {wallet_info, loginTime, user, avatar} = useSelector((store) => store.user);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
        auth.clearAppStorage();
        dispatch(LogoutUser());
        dispatch(removeWallet());
        dispatch(DeleteTime());
        navigate("/signIn");
    };


    const USER_MENU = [
        {label: 'Map', onClick: () => navigate('/landmap')},
        {label: 'Logout', onClick: () => handleLogout()},
    ];

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return <>
        <AppBar position="absolute" className="custom-header">
            <Toolbar
                // className="main-nav"
                sx={{
                    pr: "24px", // keep right padding when drawer closed
                 }}
            >

                {/*<div className="nav-dropdown d-flex mx-3">
                    <div className="navbar-item px-3">
                        <div ref={ref2} className="dashboard-nav">
                            <div>
                                <i class="fa-solid fa-bars open-sidebar" onClick={() => openSidebar()}></i>
                            </div>
                            <div
                                className="dropdown-custom dropdown-toggle btn"
                                onClick={handleBtnClick2}
                            >
                                <Typography color={"#545352"}>Products</Typography>
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
                    <div className="navbar-item px-3">
                        <div ref={ref2} className="dashboard-nav">
                            <div
                                className="dropdown-custom dropdown-toggle btn"
                                onClick={handleBtnClick2}
                            >
                                <Typography color={"#545352"}>Market</Typography>
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
                    <div className="navbar-item px-3">
                        <div ref={ref2} className="dashboard-nav p-relative">
                            <div
                                className="dropdown-custom dropdown-toggle btn"
                                onClick={handleBtnClick2}
                            >
                                <Typography color={"#545352"}>Company</Typography>
                            </div>

                        </div>
                    </div>
                </div>*/}
                {/*<div className="login-box d-flex align-items-center justify-content-end">
                    <Popover
                        id={id}
                        open={popOpen}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        <Typography sx={{p: 2}}>
                            The content of the Popover.
                        </Typography>
                    </Popover>
                    <IconButton
                        color="inherit"
                        aria-describedby={id}
                        variant="contained"
                    >
                        <img src={UserIcon} alt="userIcon"/>
                    </IconButton>

                </div>*/}

                <Grid container justifyContent='end'>
                    <Grid item>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#8364e2' }}>
                                    {user?.userName?.at(0)?.toUpperCase() || 'G'}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    onClick={() => navigate("/myProfile")}
                >
                    <div className="d-flex">
                        <img
                            src={
                                avatar == ""
                                    ? "https://res.cloudinary.com/dot-pic/image/upload/v1659617513/Avatar_3_zaxygb.png"
                                    : avatar
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
                                      {user.userName}
                                    </span>
                    </div>
                </MenuItem>
                <MenuItem disabled>
                    Login at :{loginTime}
                </MenuItem>
                {
                    USER_MENU.map( (menu,idx) =>{
                        return (<>
                            <MenuItem onClick={menu.onClick}> { menu.label } </MenuItem>
                            <Divider/>
                        </>)
                    })
                }
            </Menu>
        </AppBar>
    </>
}

export default DashboardHeader