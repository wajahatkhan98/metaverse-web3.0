import * as React from "react";
import {useEffect, useState, useTransition} from "react";
import {navigate} from "@reach/router";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CertificateModal from "../../CertificateModal";


import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";

import {gBPG_addr} from '../../../contract/addresses'
import TokenABI from '../../../contract/USDG.json'

import Web3Modal from 'web3modal'
import {useSelector} from "react-redux";
import {Button, DialogActions, InputAdornment, Skeleton, TextField, Typography} from "@mui/material";
import CustomDialog from "../../Dialog";


const mdTheme = createTheme({
    background: {
        default: "#fff",
    },
});

function DashboardContent(props) {

    const [balance, setBalance] = useState(0.0000);
    const [tokenBalance, setTokenBalance] = useState(0.0000);
    const [loader, setLoader] = useState(false);

    const [amountValue, setAmountValue] = useState(0);
    const [depositValue, setDepositValue] = useState(0);

    const [modalStatus, setModalStatus] = useState(false);

    const handleToggle = () => setModalStatus(prevState => !prevState);

    const [isPending, startTransition] = useTransition();


    const {
        connector,
        library,
        account,
        chainId,
        activate,
        deactivate,
        active,
        errorWeb3Modal
    } = useWeb3React();

    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
        } catch (e) {
            console.log("loadProvider: ", e)

        }
    }

    useEffect(() => {
        (async () => {

            console.log(account, library);
            if (library && account) {
                try {
                    setLoader(true);
                    const _balance = await library.getBalance(account);
                    setBalance(ethers.utils.formatEther(_balance));
                    await getDetail()
                    setLoader(false)
                } catch (error) {
                    console.log("Error ", error.message);
                    setBalance("0");
                    setLoader(false)
                }
                return () => {
                    setBalance(0);
                };
            }
        })();
    }, [library, account, chainId]);

    const getDetail = async () => {
        try {

            let signer = await loadProvider()
            let TokenContract = new ethers.Contract(gBPG_addr, TokenABI, signer);
            let _balance = await TokenContract.balanceOf(account)
            setTokenBalance(ethers.utils.formatEther(_balance))
        } catch (error) {

        }
    }

    const onChangeHandler = (e) => {
        setDepositValue(e.target.value);


        startTransition(async () => {
            const signer = await loadProvider()
            const TokenContract = new ethers.Contract(gBPG_addr, TokenABI, signer);
            const amount = ethers.utils.parseEther(e.target.value);
            const getPrice = await TokenContract.getPrice(amount);
            setAmountValue(ethers.utils.formatUnits(getPrice.toString(), '8'))
        })
    }

    const deposit = async () => {
        try {
            let signer = await loadProvider()
            let TokenContract = new ethers.Contract(gBPG_addr, TokenABI, signer);
            let amount = ethers.utils.parseEther(depositValue);
            console.log(amount.toString())
            let getPrice = await TokenContract.getPrice(amount);
            console.log(getPrice.toString())
            let _deposit = await TokenContract.mint(account, {value: getPrice})
            let tx = _deposit.wait()
            handleToggle()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ThemeProvider theme={mdTheme} className="dashboard" backgroundColor>
            <Box sx={{display: "flex", backgroundColor: "#FFF"}} className="dashboard">
                <CssBaseline/>
                {
                    props.sidebar
                }
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[0]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    {/* <Toolbar /> */}

                    {
                        props.header
                    }
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container sx={{mt: 4, mb: 4}} justifyContent='space-between' direction='row'>
                            <Grid item xs={12}>
                                <div className="content d-flex heading-flex-column">
                                    <div className="heading">
                                        <h3>Account Balances</h3>
                                    </div>
                                    <div className="buttons mainside">
                                        <a className="#" onClick={handleToggle}>Deposit</a>
                                        <a className="withdraw-btn">WithDraw</a>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item container alignItems='center'>
                                <Grid item my={2} minWidth={180}>
                                    <h6 className='m-0' style={{color: '#FFF', fontSize: '20px'}}>BNB Balance: </h6>
                                </Grid>
                                <Grid item sx={{width: '10%'}}>
                                    {
                                        loader
                                            ? <Skeleton variant="text" style={{
                                                height: '2.5em',
                                                backgroundColor: '#8364E2'
                                            }}/>
                                            :
                                            <h5 className="mt=1 text-white m-0 " style={{fontWeight: 'normal'}}> {parseFloat(balance).toFixed(8)} </h5>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item container alignItems='center'>
                                <Grid item minWidth={180}>
                                    <h6 style={{color: '#FFF', fontSize: '18px'}}>USDG Balance: </h6>
                                </Grid>
                                <Grid item sx={{width: '50%'}}>
                                    {
                                        loader
                                            ? <Skeleton variant="text" sx={{fontSize: '1rem'}} style={{
                                                height: '3em',
                                                width: '20%',
                                                backgroundColor: '#8364E2'
                                            }}/>
                                            : <h5 className="mt=1 text-white" style={{fontWeight: 'normal'}}> {tokenBalance} </h5>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            {/* small boxes */}
                            {/*<Grid item xs={12} sm={4} md={4} lg={3}>
                                <div className="box-layer-1">
                                    <div className="box-layer-2">
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                padding: "35px",
                                            }}
                                            className="dashboard-box first-box"
                                        >
                                            <img src={BitcoinImg} alt="bitcoin"/>

                                            <h6 className="text-center color-primary">BTC</h6>
                                            <span className="color-primary">Bitcoin</span>
                                            <h6 className="color-primary">$ 5,150,208,345</h6>
                                        </Paper>
                                    </div>
                                </div>
                            </Grid>*/}
                            {/*<Grid item xs={12} sm={4} md={4} lg={3}>
                                <div className="box-layer-1">
                                    <div className="box-layer-2">
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                padding: "35px",
                                            }}
                                            className="dashboard-box "
                                        >
                                            <img src={EthImg} alt="EthImg.png"/>

                                            <h6 className="text-center color-primary">BTC</h6>
                                            <span className="color-primary">Bitcoin</span>
                                            <h6 className="color-primary">$ 5,150,208,345</h6>
                                        </Paper>
                                    </div>
                                </div>
                            </Grid>*/}
                            {/*
                            <Grid item xs={12} sm={4} md={4} lg={3}>
                                <div className="box-layer-1">
                                    <div className="box-layer-2">
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                padding: "35px",
                                            }}
                                            className="dashboard-box "
                                        >
                                            <img src={Busd} alt="Busd.png"/>

                                            <h6 className="text-center color-primary">BTC</h6>
                                            <span className="color-primary">Bitcoin</span>
                                            <h6 className="color-primary">$ 5,150,208,345</h6>
                                        </Paper>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={3}>
                                <div className="box-layer-1">
                                    <div className="box-layer-2">
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                padding: "35px",
                                            }}
                                            className="dashboard-box "
                                        >
                                            <img src={Usdt} alt="Usdt.png"/>

                                            <h6 className="text-center color-primary">BTC</h6>
                                            <span className="color-primary">Bitcoin</span>
                                            <h6 className="color-primary">$ 5,150,208,345</h6>
                                        </Paper>
                                    </div>
                                </div>
                            </Grid>*/}

                            {/* Chart */}
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <CertificateModal/>
            <CustomDialog status={modalStatus} toggleModal={handleToggle} title='Deposit BNB to USDG'>
                <Grid item container my={2}>
                    <TextField placeholder='Deposit Amount' value={depositValue}
                               label='Deposit Amount'
                               onChange={onChangeHandler}
                               variant='outlined'
                                type='number'
                               helperText={` BNB = ${isPending ? 'calculating' : amountValue} `}
                               InputProps={{
                                   endAdornment: <InputAdornment position="end">USDG</InputAdornment>
                               }}
                    />
                </Grid>
                <DialogActions>
                    <Button onClick={deposit} variant='outlined' sx={{ color: '#8364E2', borderColor: '#8364E2' }}>Confirm</Button>
                    <Button onClick={handleToggle} color='error' variant='outlined'>Cancel</Button>
                </DialogActions>
            </CustomDialog>
        </ThemeProvider>
    );
}

export default function Dashboard(props) {

    const state = useSelector((state) => state.user);
    useEffect(() => {
        if (!state.user) {
            navigate(`/signIn`);
        }
    }, [])
    return <DashboardContent header={props.header} sidebar={props.sidebar}/>;
}
