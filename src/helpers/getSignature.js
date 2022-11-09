import loadProvider from "./loadProvider";

const getSignature = async (message = '') => {
    let signer = await loadProvider();
    // let message = "Add the proposal";
    return await signer.signMessage(message);
};

export default getSignature;