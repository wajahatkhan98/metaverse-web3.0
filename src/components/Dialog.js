import {Dialog, DialogContent, DialogTitle, Slide} from "@mui/material";

import React, {forwardRef} from 'react'


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = ({title, toggleModal, status, children}) => {

    return (
        <Dialog onClose={toggleModal} open={status} TransitionComponent={Transition}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog