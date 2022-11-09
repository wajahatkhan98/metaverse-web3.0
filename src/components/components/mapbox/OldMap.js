import React, {useCallback, useEffect, useRef, useState} from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ethers} from "ethers";
import {gBPG_addr, NFT_addr} from "../../../contract/addresses";
import ABI from '../../../contract/GameRee1155.json'
import Web3Modal from "web3modal";
import CertificateModal from "../../CertificateModal";
import MintCertificateModal from "../../MintCertificateModal";
import apis from "../../../services";
import {getPerSqPrice, getTotalAreaRandomArea, getTotalPrice} from "../../../helpers/measurements";

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = `pk.eyJ1IjoiaGFzZWViYWJiYXNpMDAiLCJhIjoiY2wyejVqcWVsMDkzcjNjbDdocWI4dzA0cSJ9.mB8mVHePsaB0wmqbIE9f1Q`;

const VIEWS = [
    {view: "Street View", pitch: 90},
    {view: "Drone View", pitch: 60},
    {view: "Top View", pitch: 0},
]

export default function Mapbox() {
    const [buildingData, SetBuilding] = useState();
    const [loading, setLoading] = useState(false);
    const [viewCounter, setCounter] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [ProfileIsOpen, setProfileIsOpen] = useState(false);
    const [owner, setOwner] = useState('');
    const [position, setPosition] = useState({ lat: 0, lng: 0 });

    const navigate = useNavigate();

    // const map = useRef(null);
    const mapContainer = useRef(null);
    // const [pitch, setPitch] = useState(30);

    const [lng, setLng] = useState(-0.141099);
    const [lat, setLat] = useState(51.515419);
    const [zoom, setZoom] = useState(15);
    const state = useSelector((state) => state.user);

    const [metadata, setMetadata] = useState([]);
    const [isMinted, setMinting] = useState(false);

    const getAllMintedIds = useCallback(
        async () => {
            const {data} = await apis.getAllMintedIds();
            return data
        },
        [],
    );


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




    const getMetadata = async (id) => {
        try {
            // console.log('***************', id);
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(NFT_addr, ABI, signer);
            const caccount = await signer.getAddress()



            let uri = await NFTCrowdsaleContract.uri(id)
            // console.log(uri)
            let owner
            try {
                owner = await NFTCrowdsaleContract.ownerOf(id)

            } catch (error) {
                owner = '0x0000000000000000000000000000000000000000'
            }
            let response = await fetch(uri, {method: 'GET'})
            const data = await response.json();
            // data.owner = owner
            data.id = id
            data.account = caccount

            return data;
        } catch (e) {
            console.error("data", e)
        }
    };

    const toggleModal = () => setIsOpen(prevState => !prevState);


    useEffect(() => {
        if (!state.user) {
            // navigate(`/signIn`);
        }

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            // style: "mapbox://styles/haseebabbasi00/cl5a6otee00f414ll9zhf5v46", old one
            // style: "mapbox://styles/haseebabbasi00/cl6klrzbq002w14mrcza610nt",  new but no  sky
            style: "mapbox://styles/haseebabbasi00/cl6nxm56n002p15qof1ujufem",
            width: "100wh",
            attributionControl: false,
            pitch: VIEWS[viewCounter].pitch,
            center: [-0.141099, 51.515419],
            zoom: VIEWS[viewCounter].view === "Street View" ? 18 : 16,
            bearing: 80,
            layers: [
                {
                    id: "background",
                    type: "background",
                    layout: {},
                    paint: {
                        "background-color": ["white"],
                    },
                },
                {},
            ],
        });

        /**
         *  View Change Component
         * */
        class PitchToggle {
            constructor({bearing = -20, pitch = 70, minpitchzoom = null}) {
                this._bearing = bearing;
                this._pitch = pitch;
                this._minpitchzoom = minpitchzoom;
            }

            onAdd(map) {
                this._map = map;
                let _this = this;

                this._btn = document.createElement("button");
                this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
                this._btn.type = "button";
                this._btn["aria-label"] = "Toggle Pitch";
                this._btn.onclick = function () {
                    if (map.getPitch() === 0) {
                        // let options = { pitch: _this._pitch, bearing: _this._bearing };
                        // if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom)
                        // {
                        //   options.zoom = _this._minpitchzoom;
                        // }
                        map.easeTo({pitch: 60, bearing: 80});

                        _this._btn.className =
                            "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d";
                    } else {
                        map.easeTo({pitch: 0, bearing: 80});
                        _this._btn.className =
                            "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
                    }
                };

                this._container = document.createElement("div");
                this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
                this._container.appendChild(this._btn);

                return this._container;
            }

            onRemove() {
                this._container.parentNode.removeChild(this._container);
                this._map = undefined;
            }
        }

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
        });
        map.addControl(geocoder, "top-right");

        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, "bottom-right");
        map.addControl(new PitchToggle({minpitchzoom: 11}), "bottom-right");
        map.on('load', async () => {
            const layer = map.getStyle().layers.at(-1);
            const layerID = layer.id;
            const ids = await getAllMintedIds();

            console.log(layer, '&&&&&&&&&&&&&&&&&')

            const paint = [
                'match',
                ['id'],
                ids,
                'gray',
                'purple'
            ]

            map.setPaintProperty(layerID, 'fill-extrusion-color',paint);
        })
        map.on("click", async (e) => {
            setProfileIsOpen(false);
            var features = map.queryRenderedFeatures(e.point);
            const _id = features[0]?.id;

            console.log(_id);

            const buildingLayerId =features[1]?.layer?.id

            if (buildingLayerId === 'C100') {

                const {lat, lng} = e.lngLat;
                setPosition({lat, lng})

                setLoading(true);
                setMinting(false);

                const response = await apis.getMapNFTData(_id);
                const mintedId = response?.data?.mintedId || '';

                if (mintedId) {
                    const data = await getMetadata(mintedId);
                    console.log(data, '$$$$$$$$$$$$')
                    SetBuilding(data);
                    setMinting(true);
                    setIsOpen(true);
                    setLoading(false);
                    return
                }

                const username = await apis.getUsername(state?.user?.signature);
                const area = getTotalAreaRandomArea();
                const total = getTotalPrice(area);
                const pricePerSquare = getPerSqPrice();

                apis.getGoogleData(lat, lng)
                    .then(res => res.data)
                    .then((json) => {
                        console.log('*********** SELECTED_CITY ******', json);
                        const row = json.results[0]
                        const [building_name, street_name, city] = row.formatted_address.split(',')



                        const placeData = {
                            id: _id,
                            name: 'GameRee',
                            building_name,
                            street_name,
                            city,
                            owner: username,
                            // postal_code,
                            "total_units": "Not Available",
                            "total_gross_area_sqt": area,
                            "price_per_square": pricePerSquare,
                            "initial_price": total,
                            "current_nft_price": 0.5,
                            description: "GameRee NFT minted from GameRee website",
                            image: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmd8ZW58MHx8MHx8&w=1000&q=80'
                        };

                        SetBuilding(placeData);
                        setIsOpen(true);
                        setLoading(false);


                    })
                    .catch((e) => {
                        setLoading(false);
                    });
            }
        });
        map.on("move", (e) => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        return () => {
            map.remove();
        };
    }, [metadata]);

    return (
        <>

            <div>
                {buildingData && <div className="sidebar_2"> {`${buildingData?.building_name}, ${buildingData?.street_name}`} </div>}
                <div className="sidebar"> Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} {/*| Pitch {pitch}*/} </div>
                <div
                    style={{height: "100vh", marginTop: "100px"}}
                    ref={mapContainer}
                    className="map-container"
                />
            </div>
            {
                !isMinted
                    ? (<CertificateModal toggleModal={toggleModal} status={modalIsOpen} data={buildingData}
                                         loading={loading} position={position}/>)
                    : (<MintCertificateModal toggleModal={toggleModal} status={modalIsOpen} data={buildingData}
                                             loading={loading} position={position}/>)
            }
        </>
    );
}