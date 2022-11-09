import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Box,
    Button,
    CircularProgress,
    DialogActions,
    Divider,
    FormControl,
    Grid,
    InputLabel, MenuItem, Select,
    TextField
} from '@mui/material';
import collectionnft from "../assets/images/collection-nft.png";
import qrcode from '../assets/images/qr-code.jpg';
import {useWeb3React} from "@web3-react/core";
import loader from "../assets/images/loader.gif";
import {ethers} from "ethers";
import {config_addr, market_addr, NFT_addr} from "../contract/addresses";
import MarketABI from '../contract/marketplace.json'
import ABI from "../contract/GameRee1155.json";
import {loadProvider} from "../helpers";
import CustomDialog from "./Dialog";
import {Clear, ErrorOutline, LocalOffer} from "@mui/icons-material";
import ConfigABI from '../contract/Config.json'
import StreetView from "./StreetView";

export default function MintCertificateModal({
                                                 toggleModal,
                                                 title = 'Property Certificate',
                                                 status,
                                                 data,
                                                 loading,
                                                 position
                                             }) {
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [openStreetView, setStreetView] = useState(false);

    const toggleStreetView = () => setStreetView(prevState => !prevState);

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

    // console.log(data, '*******************')

    const buildingName = data?.['building_name'] || '';
    const buildingNumber = data?.['Building number'] || ''
    const name = data?.['owner'] || '';
    const noOfUnits = data?.['total_units'] || ''
    const totalAreaInSqt = data?.['total_gross_area_sqt'] || '';
    const city = data?.['city'] || '';
    const currentNFT_Price = data?.['current_nft_price'] || '';
    const priceInEuro = data?.['initial_price'];
    const image = data?.['image'];
    const owner = data?.['owner'] || '';
    const postCode = data?.['postal_code'];
    const pricePerSquare = data?.['price_per_square'] || '';
    const roadName = data?.['street_name'];
    const streetName = data?.['street_name'];
    const id = data?.['id'] || 0;
    const _account = data?.['account'] || ''

    // const name = data?.name || '';
    // const description = data?.description || '';

    const [btnTxt, setBtnText] = useState('Not Listed');
    const [price, setPrice] = useState(0);
    const [gameReeFee, setGameReeFee] = useState(0);
    const [modalStatus, setModalStatus] = useState(false);

    const handleToggle = () => setModalStatus(prevState => !prevState);

    const saleHandler = async () => {
        try {
            const signer = await loadProvider()
            const NFTGameReeContract = new ethers.Contract(NFT_addr, ABI, signer);
            const tx = await NFTGameReeContract.setApprovalForAll(market_addr, true);
            const result = await tx.wait();

            console.log('APPROVAL FOR ALL', result);

            if(result.confirmations > 0) {
                const NFTMarketContract = new ethers.Contract(market_addr, MarketABI, signer);
                const r = await NFTMarketContract.createMarketItem(NFT_addr, data.id, ethers.utils.parseEther(price.toString()),0);
                console.log('CREATE MARKET ITEM', r);
            }
        }catch (error) {
            console.log(error)
        }

    };
    const onSaleHandler = () => {

    };
    const notListedHandler = () => {}

    const getGameReeFee = useCallback(
        async () => {

            const signer = await loadProvider()
            const ConfigContract = new ethers.Contract(config_addr, ConfigABI, signer);
            const fee = await ConfigContract.nft_fee();
            setGameReeFee(fee.toString());
        },
        [],
    );


    const getTotalEarning = useCallback(
        (gameReeFee) => {
            const percentage = ((gameReeFee / 100) * price);
            return (price-percentage)
        },
        [price],
    );


    useEffect(() => {
        (async () => {
            await getGameReeFee();
        })()

    }, []);



    useEffect(() => {
        (async () => {
            const signer = await loadProvider()
            const NFTMarketContract = new ethers.Contract(market_addr, MarketABI, signer);
            const NFTGameReeContract = new ethers.Contract(NFT_addr, ABI, signer);
            const existInMarketPlace = await NFTMarketContract.exists(data.id, NFT_addr)
            const ownerAddress = await NFTGameReeContract.ownerOf(data.id);
            const owner_ = await NFTMarketContract.ownerOf(NFT_addr , data.id);

            const isOwner = ownerAddress === _account 
            ? true
            : ownerAddress === market_addr ? owner_ === _account : false;

            console.log({ existInMarketPlace, isOwner, ownerAddress, _account , owner_})

            if (isOwner && existInMarketPlace) {
                setBtnText('On Sale')
            } else if (isOwner && !existInMarketPlace) {
                setBtnText('Sale')
            } else {
                setBtnText('Not Listed')
            }
        })()
    }, []);

    if (!data) return <></>;

    return (
        <div>
            <Dialog
                open={status}
                onClose={toggleModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth={'md'}
                className='certificate-modal'>
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    {loading && <Grid item container justifyContent='center'> <CircularProgress/> </Grid>}
                    <Grid container spacing={3}>
                        <Grid item xs={4} md={4} lg={4}>
                            <div className='position-relative'>
                                <img src={image} className="building-img"/>
                                <div className='nft-tag'>
                                    Minted
                                </div>
                            </div>
                            <div className='portion-address'>
                                <p> Portion Address : </p>
                                <span> {`${buildingName}, ${streetName}`} </span>
                            </div>
                            <div className='qr-code-section'>
                                <img src={qrcode}/>
                            </div>
                        </Grid>
                        <Grid item xs={8} md={8} lg={8}>
                            <ul className='building-detail'>
                                <li>
                                    <p> Owner Name : </p>
                                    <span> {name}</span>
                                    {/*<span> {truncateEthAddress(owner)}</span>*/}
                                </li>
                                <li>
                                    <p> Building Name : </p>
                                    <span> {buildingName} </span>
                                </li>
                                <li>
                                    <p> Building Number : </p>
                                    <span> {buildingNumber} </span>
                                </li>
                                <li>
                                    <p> Road Name : </p>
                                    <span> {roadName} </span>
                                </li>
                                <li>
                                    <p> City : </p>
                                    <span> {city} </span>
                                </li>
                                <li>
                                    <p> Street Name : </p>
                                    <span> {streetName} </span>
                                </li>
                                <li>
                                    <p> No of Units : </p>
                                    <span> {noOfUnits} </span>
                                </li>
                                <li>
                                    <p> No of Total gross area in sqt of building Units : </p>
                                    <span> {totalAreaInSqt} </span>
                                </li>
                                <li>
                                    <p> Price per square USDG : </p>
                                    <span> {pricePerSquare} </span>
                                </li>
                                <li>
                                    <p> Total Price in USDG : </p>
                                    <span> {priceInEuro} </span>
                                </li>
                                <li>
                                    <p> NFT Price : </p>
                                    <span> {currentNFT_Price} USDG </span>
                                </li>
                            </ul>
                        </Grid>
                        <Grid container justifyContent='center' alignItems='center'>
                            <Grid item><Button onClick={toggleStreetView} variant='outlined' sx={{ color: '#8364e2', borderColor: '#8364e2' }}>Street View</Button></Grid>
                            <Grid item>
                                <Grid item container alignItems='center' flexDirection='column'>
                                    {isLoading && <img src={loader} alt='loader' width={100}/>}
                                    <Grid item className='mainside'>
                                        {
                                            btnTxt === 'Sale'
                                                ? <a href='#' onClick={handleToggle}> {btnTxt} </a>
                                                : btnTxt === 'On Sale'
                                                    ? <a href='#' onClick={onSaleHandler}> {btnTxt} </a>
                                                    : btnTxt === 'Not Listed'
                                                        ? <a href='#' onClick={notListedHandler}> {btnTxt} </a> : null
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <CustomDialog status={modalStatus} toggleModal={handleToggle} title='Sales Price'>
                {/*<Grid item container my={3}>
                    <TextField placeholder='Sales Price' label='Sales Price'  value={price} onChange={(e) => setPrice(e.target.value) }  type='number' />
                </Grid>
                <DialogActions>
                    <Button onClick={handleToggle} variant='outlined' sx={{ color: '#8364E2', borderColor: '#8364E2' }}>Confirm</Button>
                    <Button onClick={handleToggle} color='error' variant='outlined'>Cancel</Button>
                </DialogActions>*/}

                <div
                    className="modal-main-heading"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '90%',
                        }}
                        variant="Top"
                    >
                        Sell Your Items{' '}
                    </Box>
                    <Box style={{ display: 'flex', width: '10%' }}>
                        <Clear />
                    </Box>
                </div>
                <Divider style={{ backgroundColor: 'gray' }} />
                <div
                    style={{
                        display: 'flex',
                    }}
                    className="modal-content"
                >
                    <Grid container>
                        <Grid item style={{ display: 'flex' }}>
                            <Grid item>
                                <LocalOffer  style={{ display: 'flex', justifyContent: 'start' }} />
                            </Grid>
                            Set Your Price
                        </Grid>
                    </Grid>
                    <Divider style={{ height: '1em', backgroundColor: '#fffff' }} />
                </div>
                <div>
                    <Grid
                        container
                        style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    >
                        <Grid item container my={3}>
                            <TextField placeholder='Price' label='Price'  value={price} onChange={(e) => setPrice(e.target.value) }  type='number'  fullWidth/>
                        </Grid>
                    </Grid>
                    <Divider style={{ height: '1em', backgroundColor: '#fffff' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container>
                        <Grid item>Fees</Grid>
                        <Grid item>
                            <ErrorOutline />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <br />
                        <div>
                            <Grid item style={{ display: 'flex', fontSize: 'smaller' }}>
                                Platform Fee{' '}
                                <Box
                                    component={'span'}
                                    width={'430px'}
                                    borderBottom={'1px dotted #808080'}
                                />{' '}
                                {gameReeFee} %
                            </Grid>

                        </div>
                        <Divider style={{ height: '1em', backgroundColor: '#fffff' }} />
                    </Grid>

                    <Divider style={{ height: '1em', backgroundColor: 'white' }} />
                    <Grid container justifyContent="space-between">
                        <Grid item>Total Earnings</Grid>
                        <Grid item>
                            <Grid item container flexDirection="column">
                                <Grid item>
                                    {' '}
                                    <h5>{getTotalEarning(gameReeFee)} USDG</h5>{' '}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <Grid item container justifyContent='center'>
                    <Button variant="outlined" color="secondary" onClick={saleHandler}> Complete Listing </Button>
                </Grid>

            </CustomDialog>
            <Dialog open={openStreetView} onClose={toggleStreetView} maxWidth>
                <StreetView lat={position.lat} lng={position.lng}/>
            </Dialog>
        </div>
    );
}