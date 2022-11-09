import {React, useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Button, Grid} from '@mui/material';
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {gBPG_addr, NFT_addr} from "../contract/addresses";
import ABI from "../contract/GameRee1155.json";
import TokenABI from "../contract/USDG.json";

import {useWeb3React} from "@web3-react/core";
import apis from "../services";
import loader from '../assets/images/loader.gif'
import {toast} from "react-toastify";
import CustomDialog from "./Dialog";
import StreetView from "./StreetView";


export default function CertificateModal({
                                             btnText = 'MINT',
                                             toggleModal,
                                             title = 'Property Certificate',
                                             status,
                                             data,
                                             loading,
                                             position
                                         }) {
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0.000);

    const [openStreetView, setStreetView] = useState(false);

    const toggleStreetView = () => setStreetView(prevState => !prevState);


    // console.log('************* DATA ********', data);


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
            if (account) {
                const signer = await loadProvider()
                const TokenContract = new ethers.Contract(gBPG_addr, TokenABI, signer);
                const _balance = await TokenContract.balanceOf(account)
                setBalance(ethers.utils.formatEther(_balance));
            }

        })()
    }, [account])


    if (!data) return <></>;


    const token_Type = '57896044618658097711785492504343953927315557066662158946655541218820101242880'

    const buildingName = data?.['building_name'] || '';
    const name = data?.['owner'] || '';
    const noOfUnits = data?.['total_units'] || ''
    const totalAreaInSqt = data?.['total_gross_area_sqt'] || '';
    const city = data?.['city'] || '';
    const currentNFT_Price = data?.['current_nft_price'] || '';
    const priceInEuro = data?.['initial_price'];
    const image = data?.['image'];
    const pricePerSquare = data?.['price_per_square'] || '';
    const roadName = data?.['street_name'];
    const streetName = data?.['street_name'];
    const id = data?.['id'] || 0;


    const onClickHandler = async (e) => {
        e.preventDefault();
        await mint()
    }


    const mint =
        async () => {
            try {
                //PINATA LOGIC
                // console.log(data, '********************');
                const metaDataURI = await apis.pinataJSONToIPFS(data);

                setLoading(true)
                let signer = await loadProvider()
                let NFTCrowdsaleContract = new ethers.Contract(NFT_addr, ABI, signer);
                let TokenContract = new ethers.Contract(gBPG_addr, TokenABI, signer);
                let balance = await TokenContract.balanceOf(account);
                // console.log('BALANCE', balance);

                if (balance.toString() !== '0') {
                    toast.info('Minting Process Started')
                    let approve = await TokenContract.approve(NFT_addr, '100000000000000000000000000')
                    let tx1 = await approve.wait()
                    // console.log(tx1)

                    if (tx1.confirmations > 0) {
                        let mint = await NFTCrowdsaleContract.mintNonFungibleWithURI(token_Type, [account], [], metaDataURI);
                        await mint.wait()
                        const mintedID = await NFTCrowdsaleContract._lastTokenId()
                        await apis.saveMapNFT({id: data.id.toString(), nft_id: mintedID.toString()})
                    }

                    toast.success('Successfully Minted')

                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                } else {
                    setLoading(false)
                    toast.error('You Dont have USDG tokens')
                }

            } catch (e) {
                console.error("data", e)
                setLoading(false)
                toast.error('some error occurred can not mint')
                // setError('some error occurred can not mint')
            }
        }

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
                <DialogTitle id="alert-dialog-title" sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                }}>
                    <Grid item container justifyContent='space-between'>
                        <Grid item> {title}  </Grid>
                        <Grid item>
                            <Grid item container sx={{fontSize: '0.75em', textTransform: 'capitalize'}}>
                                <Grid item>USDG Balance: </Grid>
                                <Grid item>{balance}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    {loading &&
                        <Grid item container justifyContent='center'> <img src={loader} alt='loader' width={100}/>
                        </Grid>}
                    <Grid container spacing={3}>
                        <Grid item xs={4} md={4} lg={4}>
                            <img src={image} alt={image} className="building-img"/>
                        </Grid>
                        <Grid item xs={8} md={8} lg={8}>
                            <ul className='building-detail'>
                                <li>
                                    <p> Owner Name : </p>
                                    <span> {name}</span>
                                </li>
                                <li>
                                    <p> Building Name : </p>
                                    <span> {buildingName} </span>
                                </li>
                                {/*<li>
                                    <p> Building Number : </p>
                                    <span> {buildingNumber} </span>
                                </li>*/}
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
                                    {isLoading ? <img src={loader} alt='loader' width={100}/> :
                                        <Grid item className='mainside'> <a href='#'
                                                                            onClick={onClickHandler}> {btnText} </a></Grid>}
                                    {error &&
                                        <Grid item sx={{mt: 2}}><h6 style={{color: 'red'}}>{error}</h6></Grid>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog open={openStreetView} onClose={toggleStreetView} maxWidth>
                <StreetView lat={position.lat} lng={position.lng}/>
            </Dialog>
        </div>
    );
}