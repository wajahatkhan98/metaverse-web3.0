import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const ResellDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ResellDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

ResellDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <ResellDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <ResellDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </ResellDialogTitle>
        <DialogContent dividers>
          <Typography style={{color: "#8364E2" }}variant="h5" gutterBottom> 
            Price
          </Typography >
        <Box component="div" style={{backgroundColor: "#1F193C",color: "#fffff"}}>
            0,000
            </Box>      
          <Typography style={{color: "#8364E2" }}variant="h5" gutterBottom> 
            Discount
          </Typography >
        <Box component="div" style={{backgroundColor: "#1F193C",color: "#fffff"}}>
            0,000
            </Box>      
          <Typography style={{color: "#8364E2" }}variant="h5" gutterBottom> 
            Percentage
          </Typography >
        <Box component="div" style={{backgroundColor: "#1F193C",color: "#fffff"}}>
            0,000
            </Box>      
          <Button style={{backgroundColor:"8364E2"}} autoFocus onClick={handleClose}>
            Apply
          </Button>
          <Button style={{backgroundColor:"8364E2"}} autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </ResellDialog>
    </div>
  );
}
