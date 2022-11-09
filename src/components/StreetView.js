import ReactStreetview from 'react-streetview';



const StreetView = ({lat, lng}) => {
    console.log({lat,lng})
    return (
        <div style={{ height: '100vh', width: '90vw' }}>
            <ReactStreetview
                apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                streetViewPanoramaOptions={{
                    position: { lat, lng },
                    pov: { heading: 100, pitch: 0 },
                    zoom: 1,
                    addressLocation: false
                }}
            />
        </div>
    );
};

export default StreetView;
