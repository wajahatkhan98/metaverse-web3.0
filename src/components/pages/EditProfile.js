import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Shake from "react-reveal/Shake";
import avatar from "../../assets/header/Avatar_3.png";

import { navigate, useNavigate } from "@reach/router";

import Fade from "react-reveal/Fade";

import Link from "@mui/material/Link";
import { Link as RouterLink } from "@reach/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Header from "../menu/header";
import ApiLink from "./ApiLink";
import imagesUrl from "../components/imagesUrl";
import { saveUserData } from "../../store/reducers/UserActions";

const theme = createTheme();
const EditProfile = () => {
  const state = useSelector((state) => state.user);
  const [spinnerTwo, setSpinnerTwo] = useState(false);
  const [data, setData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    avatar: "",
  });
  const [userData, setUserData] = useState();
  const [showSpinner, setShowSpinner] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state.user) {
      navigate(`/signIn`);
    }
    async function fetchProfile() {
      fetch(`${ApiLink}/myAccount/${state.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setShowSpinner(false);
          setData({
            ...data,
            id: data.profileData._id,
            firstName: data.profileData.firstName,
            lastName: data.profileData.lastName,
            avatar: data.profileData.avatar,
          });
          setUserData(data.profileData);
        });
    }
    fetchProfile();
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 3,
              padding: 2,
            }}
          >
            <Typography component="h1" variant="h5">
              {showSpinner == true ? (
                <CircularProgress
                  color="secondary"
                  style={{ height: "200px", width: "200px" }}
                />
              ) : (
                <>
                  {state.user != null && (
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={10}>
                        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                          <img
                            src={
                              data.avatar == ""
                                ? "https://res.cloudinary.com/dot-pic/image/upload/v1659617513/Avatar_3_zaxygb.png"
                                : data.avatar
                            }
                            style={{
                              width: "200px",
                              borderRadius: "30px",
                            }}
                            alt="avatar"
                          ></img>

                          <div
                            className="text-center"
                            style={{ marginLeft: "20px" }}
                          >
                            <div className="col-md-12  m-1 mt-2 col-xs-12">
                              {imagesUrl.map(
                                (img) =>
                                  img != data.avatar && (
                                    <img
                                      onClick={() => {
                                        setData({ ...data, avatar: img });
                                      }}
                                      src={`${img}`}
                                      style={{
                                        width: "50px",
                                        borderRadius: "30px",
                                      }}
                                      alt="avatar"
                                    ></img>
                                  )
                              )}
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <Grid item xs={12}>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="firstName"
                              label="First Name"
                              name="firstName"
                              autoComplete="userName"
                              defaultValue={userData.firstName}
                              onChange={(e) => {
                                setData({ ...data, firstName: e.target.value });
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="lastName"
                              label="Last Name"
                              name="lastName"
                              autoComplete="lastName"
                              defaultValue={userData.lastName}
                              onChange={(e) => {
                                setData({ ...data, lastName: e.target.value });
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="userName"
                              label="User Name"
                              name="userName"
                              autoComplete="userName"
                              defaultValue={state.user.userName}
                              disabled
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              defaultValue={state.user.email}
                              disabled
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <>
                        <div className="text-center">
                          <Button
                            onClick={() => {
                              setSpinnerTwo(true);

                              const body = {
                                id: data.id,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                avatar: data.avatar,
                              };
                              fetch(`${ApiLink}/changeMyInfo`, {
                                method: "POST", // or 'PUT'
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(body),
                              })
                                .then((response) => response.json())
                                .then((data) => {
                                  setSpinnerTwo(false);
                                  if (data.success === true) {
                                    dispatch(saveUserData(body.avatar));
                                    setTimeout(() => {
                                      navigate(`/myProfile`);
                                    }, 3000);
                                  }
                                });
                            }}
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{
                              mt: 3,
                              mb: 2,

                              fontSize: "16px",
                              width: "200px",
                              height: "40px",
                              background: "#4285f4",
                            }}
                          >
                            Save
                          </Button>
                        </div>
                        <div className="text-center">
                          {spinnerTwo && <CircularProgress color="secondary" />}
                        </div>
                      </>
                    </Box>
                  )}
                </>
              )}
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default EditProfile;
