import axios from 'axios';
import ApiLink from "../components/pages/ApiLink";

const createBackendServer = (baseURL) => {
    const api = axios.create({
        baseURL,
        headers: {Accept: 'application/json'},
        timeout: 60 * 1000
    });

    const pinata = axios.create({
        baseURL: 'https://api.pinata.cloud/pinning',
        headers: {
            pinata_api_key: '758d35c278b096f866b6',
            pinata_secret_api_key: '910871abec42a6586081299fc3e87732ebe867fe76eb00e57c68c35b901b4659',
            Accept: 'application/json'
        }
    })

    /*const headers = {
      'Content-Type': 'multipart/form-data',
    }*/

    /*==========    GET REQUESTS    ==========*/
    const getMapNFTData = (id) => api.get(`/mapNFT/${id}`);
    const getUsername = (signature) => api.get(`/getUserName/${signature}`).then(res => res.data)
    const getAllMintedIds = () => api.get('/getAllMintedIds')
    const getGoogleData = async (lat, lng) => axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    /*==========    POST REQUESTS    ==========*/
    const googleAuth = (body) => api.post('/api/auth/google', body);
    const googleLogin = (body) => api.post('/googlelogin', body)
    const login = (body) => api.post('/login', body);
    const register = (body) => api.post('/register', body);
    const saveMapNFT = (body) => api.post('/mapNFT', body);
    /*==========    DELETE REQUESTS    ==========*/
    /*==========    PUT REQUESTS    ==========*/

    /*==========    PINATA REQUESTS    ==========*/
    const pinataJSONToIPFS = (body) => pinata.post('/pinJSONToIPFS', body)
        .then(async (response) => {
            return `https://trapdart.mypinata.cloud/ipfs/${response?.data?.IpfsHash}`
        })
        .catch(error => {
            console.log(error);
            return ({success: false, message: error.message})
        })

    return {
        login,
        register,
        googleAuth,
        saveMapNFT,
        googleLogin,
        getUsername,
        getMapNFTData,
        getGoogleData,
        getAllMintedIds,
        pinataJSONToIPFS,
    }

};

const apis = createBackendServer(ApiLink);

export default apis;
