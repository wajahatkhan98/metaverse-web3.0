import {React, useRef, useState, useEffect, } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import {Link as RouterLink, navigate} from "@reach/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Fade from "react-reveal/Fade";
import ReCAPTCHA from "react-google-recaptcha";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Shake from "react-reveal/Shake";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useDispatch} from "react-redux";
import {LoginUser, SaveTime} from "../../../store/reducers/UserActions";
import GoogleClientId from "../../../GoogleClientId";

import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import apis from "../../../services";
import loader from "../../../assets/images/loader.gif";
import {MenuItem} from "@mui/material";
import {getSignature} from "../../../helpers";
import {toast} from "react-toastify";

const theme = createTheme();

export default function SignUp({categories}) {
    const dispatch = useDispatch();


    const categoryRef = useRef(null);

    const [showCard, setCard] = useState({show: false, message: "", type: ""});

    const [message, setMessage] = useState({});
    const [showSpinner, setShowSpinner] = useState(false);
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        category: ""
    });

    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);

    const [userNameError, setUserNameError] = useState(false);
    const [categoryError, setCategoryError] = useState(false)
    const [values, setValues] = useState({
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
    });

    // const [isSuccess, setIsSuccess] = useState(false);

    const [captcha, setCaptha] = useState();
    const [termCondition, setTermCondition] = useState(false);


    useEffect(() => {
        if (typeof window.ethereum === 'undefined') {
            toast.error('MetaMask is Compulsory for Sign up');

        }
    }, []);

    const handleVerify = (value) => {
        setCaptha(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let signature = '';
        setCard({
            show: true,
            message: "Registration in Progress",
            type: "info",
        });

        setShowSpinner(true);
        const data = new FormData(event.currentTarget);

        if (data.get("userName").trim().length === 0) {
            setMessage({
                passwordMessage: "Enter User Name ",
            });

            setCard({
                show: true,
                message: "Please Enter User Name",
                type: "warning",
            });
            setShowSpinner(false);
            return;
        }
        if (data.get("email").trim().length === 0) {
            setMessage({
                passwordMessage: "Enter Email",
            });
            setCard({show: true, message: "Please Enter Email", type: "warning"});
            setShowSpinner(false);
            return;
        }

        if (values.password.trim().length < 8) {
            setMessage({
                passwordMessage: "Enter Strong Password",
            });
            setCard({
                show: true,
                message: "Please Enter Strong Password",
                type: "warning",
            });

            // setIsOpen(true);
            setShowSpinner(false);
            return;
        }

        if (data.get('category').trim().length === 0) {
            setCategoryError(true)
            setShowSpinner(false);
            setCard({
                show: true,
                message: "Please Select Category",
                type: "warning",
            });
            return;
        }

        try {
            signature = await getSignature('Please add signature to register your account');
        } catch (e) {
            toast.error('MetaMask Message Signature: User denied message signature.')
            return;
        }

        const body = {
            userName: data.get("userName").trim(),
            email: data.get("email").trim(),
            password: values.password,
            category: data.get('category'),
            signature
        };

        try {
            const response = await apis.register(body);
            const {success, message} = response.data;
            if (success) {
                setMessage(message)
            }

            setCard({show: true, message, type: 'success'})
        } catch (error) {
            console.error("Error:", error);
            setShowSpinner(false);
            let errMessage = "Internal Server Request.";
            if (error.response.status === 500) {
                errMessage = error.response.data.errMessage;
            } else if (error.response.status === 400) {
                errMessage = error.response.data.message;
            }
            setCard({show: true, message: errMessage, type: "danger"});
            setMessage({ServerMessage: error.response.data.message});
        }
    };
    /**
     *  For Google Auth
     * */
    const responseGoogleSuccess = async (response) => {
        setShowSpinner(true);

        try {
            let signature = ''
            try {
                signature = await getSignature('Please add signature to register your account');
            } catch (e) {
                toast.error('MetaMask Message Signature: User denied message signature.')
                return;
            }

            const _response = await apis.googleLogin({idToken: response.tokenId, signature});
            const {success} = _response?.data;

            console.log({response, _response})

            if (success) {
                dispatch(
                    LoginUser(
                        _response.data.user.email,
                        _response.data.user.userName,
                        _response.data.user.signature,
                        _response.data.user.resetPasswordToken
                    )
                )

                dispatch(SaveTime(new Date().toTimeString().split(" ")[0]));


                setTimeout(() => {
                    navigate(`/landmap`);
                }, 2000);
            }

            setMessage(_response.data.message);

            setCard({
                show: true,
                message: _response.data.message,
                type: "success",
            });
        } catch (error) {
            let errMessage = "Google Authentication is failed.";
            if (error?.response?.status === 401) {
                errMessage = error.response.error;
            }
            setCard({show: true, message: errMessage, type: "danger"});
            setShowSpinner(false);
            setMessage({...message, ServerMessage: errMessage});
            console.error("Error:", error);
        }
    };

    const handleChangeUsername = (prop) => (event) => {
        let value = event.target.value;
        if (value.length < 5) {
            setUserNameError(true);
        } else {
            setUserNameError(false);
            setValues({...values, [prop]: value});
        }
    };

    const handleChangeCategory = (event) => {
        setData(prevState => ({...prevState, ['category']: event.target.value}))
        setCategoryError(false);
    }

    const handleChangeEmail = (prop) => (event) => {
        var email = event.target.value;
        var reg = /.+\@.+\..+/;
        let Emailmatches = email.match(reg);

        if (Emailmatches === null) {
            setEmailError(true);
        } else {
            if (email.length < 10 && Emailmatches.length === 0) {
                setEmailError(true);
            } else {
                setEmailError(false);
                setValues({...values, [prop]: event.target.value});
            }
        }
    };

    const handleChangePassword = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
        var password = event.target.value;
        var reg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
        let matches = password.match(reg);
        if (matches === null) {
            setPassError(true);
        } else {
            if (password.length < 8 && matches.length === 0) {
                setPassError(true);
            } else {
                setPassError(false);
                setData({...data, password: event.target.value});
            }
        }
    };

    const responseGoogleError = (response) => {
        setCard({show: true, message: "Sign In Failed", type: "danger"});
        showSpinner(false);
    };

    const handleTermCondition = (event) => {
        setTermCondition(event.target.checked);
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>

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
                        {/*<Avatar sx={{m: 1, bgcolor: "secondary.main"}}></Avatar>*/}
                        <Typography component="h1" variant="h5">
                            {(showSpinner) && (<img src={loader} alt='loader' width={100}/>)}
                        </Typography>

                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{mt: 3}}
                        >
                            <Grid container spacing={1} sx={{mb: 1}}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="userName"
                                        label="User Name"
                                        name="userName"
                                        autoComplete="userName"
                                        onChange={handleChangeUsername("username")}
                                    />
                                    <Fade bottom when={userNameError}>
                                        <div
                                            className="invalid-feedback"
                                            style={{display: "block", fontSize: "10px"}}
                                        >
                                            Please provide valid username
                                        </div>
                                    </Fade>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChangeEmail("email")}
                                    />
                                    <Fade bottom when={emailError}>
                                        <div
                                            className="invalid-feedback"
                                            style={{display: "block", fontSize: "10px"}}
                                        >
                                            Please provide valid email
                                        </div>
                                    </Fade>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl xs={12} variant="outlined" required fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Password
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={values.showPassword ? "text" : "password"}
                                            value={values.password}
                                            onChange={handleChangePassword("password")}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? (
                                                            <VisibilityOff/>
                                                        ) : (
                                                            <Visibility/>
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                    <Fade bottom when={passError}>
                                        <div
                                            className="invalid-feedback"
                                            style={{display: "block", fontSize: "10px"}}
                                        >
                                            Please provide password with min length of 8 and 1 number
                                            , upper,lowercase, special char
                                        </div>
                                    </Fade>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="category"
                                        label="Category"
                                        name='category'
                                        select
                                        value={data.category}
                                        onChange={handleChangeCategory}
                                        fullWidth
                                    >
                                        {categories.map((category, idx) => (
                                            <MenuItem key={idx} value={category}> {category} </MenuItem>
                                        ))}
                                    </TextField>
                                    <Fade bottom when={categoryError}>
                                        <div
                                            className="invalid-feedback"
                                            style={{display: "block", fontSize: "10px"}}
                                        >
                                            Please select category
                                        </div>
                                    </Fade>
                                </Grid>
                            </Grid>

                            <Grid container spacing={1}>
                                <Grid item xs={1}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={termCondition}
                                                name="rememberMe"
                                                onChange={handleTermCondition}
                                            />
                                        }
                                        sx={{mb: 1, marginTop: "-10px"}}
                                    />
                                </Grid>
                                <Grid item xs={11}>
                                    <label htmlFor="agree">
                                        {"  "}I agree to{" "}
                                        <RouterLink to={"/terms"}>
                                            <Link variant="body2">
                                                <b>Terms of use </b>
                                            </Link>
                                        </RouterLink>
                                        and{" "}
                                        <RouterLink to={"/policy"}>
                                            <Link variant="body2">
                                                <b>Privacy policy</b>
                                            </Link>
                                        </RouterLink>
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <ReCAPTCHA
                                    sitekey={`6LfdRLQgAAAAAOyw9BBnSsQ0qofcp4QkMpG9jalf`}
                                    onChange={handleVerify}
                                />
                            </Grid>

                            {captcha == null ? (
                                <>
                                    <Button
                                        type="submit"
                                        size="large"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2, height: "50px"}}
                                        disabled
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container sx={{mb: 1}}>
                                        <Grid item xs={12}>
                                            <GoogleLogin
                                                disabled
                                                // use your client id here
                                                clientId={GoogleClientId}
                                                buttonText="Login with google"
                                                render={(renderProps) => (
                                                    <GoogleButton
                                                        disabled
                                                        onClick={renderProps.onClick}
                                                        style={{width: "100%"}}
                                                    >
                                                        Sign in with Google
                                                    </GoogleButton>
                                                )}
                                                onSuccess={responseGoogleSuccess}
                                                onFailure={responseGoogleError}
                                                cookiePolicy={"single_host_origin"}
                                                style={{width: "50px"}}
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Button
                                        type="submit"
                                        size="large"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2, height: "50px", background: "#4285f4"}}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container sx={{mb: 1}}>
                                        <Grid item xs={12}>
                                            <GoogleLogin
                                                // use your client id here
                                                clientId={GoogleClientId}
                                                buttonText="Login with google"
                                                render={(renderProps) => (
                                                    <GoogleButton
                                                        onClick={() => {
                                                            renderProps.onClick();
                                                            setShowSpinner(true);
                                                        }}
                                                        onMouseUp={() => {
                                                            setCard({
                                                                show: true,
                                                                message: "Google Login in Progress",
                                                                type: "info",
                                                            });

                                                            setShowSpinner(true);
                                                        }}
                                                        style={{width: "100%"}}
                                                    >
                                                        Sign in with Google
                                                    </GoogleButton>
                                                )}
                                                onSuccess={responseGoogleSuccess}
                                                onFailure={responseGoogleError}
                                                cookiePolicy={"single_host_origin"}
                                                style={{width: "50px"}}
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            )}

                            {/* <LinearProgress />  */}
                            <Grid container justifyContent="flex-end" sx={{mb: 2}}>
                                <Grid item>
                                    <RouterLink to={"/signIn"}>
                                        <Link variant="body2">
                                            Already have an account? Sign In
                                        </Link>
                                    </RouterLink>
                                </Grid>
                            </Grid>

                            {showCard.show === true && (
                                <Shake>
                                    <div
                                        className={`alert alert-${showCard.type}`}
                                        style={{fontSize: "18px"}}
                                    >
                                        {showCard.message}
                                    </div>
                                </Shake>
                            )}
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

SignUp.defaultProps = {
    categories: ['Retail Investor', 'Brokers', 'Institutional Investor']
}