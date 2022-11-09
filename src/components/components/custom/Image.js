const Image = (props) => {
    return <img {...props}   onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = process.env.PUBLIC_URL + 'default.png'
    }}/>
}


export default Image;