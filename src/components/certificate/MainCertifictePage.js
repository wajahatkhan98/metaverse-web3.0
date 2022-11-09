import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RectangleImg from '../../assets/mainCertificate/rectangle.png';
import Group from '../../assets/mainCertificate/Group 737.png'

// import './style.css';

function MainCertifictePage() {
  return (
    <>
      <div>
        <Grid container style={{ backgroundColor: '#131129' }}>
          <Grid container mt={4}>
            <Grid item md={2}></Grid>
            <Grid item xs={6} md={2}>
              <Button>
                <img src={RectangleImg} />
              </Button>
              <Typography style={{ color: '8364E2' }}>Resell</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button>
                <img src={RectangleImg} />
              </Button>
              <Typography>Asset Profile</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button>
                <img src={RectangleImg} />
              </Button>
              <Typography>Offer</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button>
                <img src={RectangleImg} />
              </Button>
              <Typography>Street View</Typography>
            </Grid>
            <Grid item md={2}></Grid>
            <div style={{ width: '100%' }}>
              <Grid
                container
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginLeft: '100px',
                }}
                mt={6}
              >
                <Grid item>
                  <img src={Group} />
                </Grid>
              </Grid>
              <div style={{ marginTop: '20px' }}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#8364E2',
                    fontFamily: 'Metropolis',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: '34px',
                    lineHeight: '34px',
                  }}
                  variant="h3"
                  gutterBottom
                >
                  806 SILKWOOD DR
                </Typography>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#8364E2',
                    fontFamily: 'Metropolis',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: '24px',
                    lineHeight: '34px',
                  }}
                  variant="h4"
                  gutterBottom
                >
                  NASHVILLE, TENN
                </Typography>
              </div>
            </div>
          </Grid>

          <Grid container justifyContent="space-around">
            <Grid item>
              <Grid item container direction="column">
                <Typography
                  style={{ color: '#8364E2' }}
                  variant="h5"
                  gutterBottom
                >
                  OWNER
                </Typography>
                <Box
                  component="div"
                  style={{
                    backgroundColor: '#1F193C',
                    color: '#fffff',
                    padding: '5px 15px',
                  }}
                >
                  <Typography variant="h5">TEST2269 (YOU)</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container direction="column">
                <Typography
                  style={{ color: '#8364E2' }}
                  variant="h5"
                  gutterBottom
                >
                  TOTAL PURCHASE PRICE
                </Typography>
                <Box
                  component="div"
                  style={{ backgroundColor: '#1F193C', color: '#fffff' }}
                >
                  <Typography variant="h5" textAlign="left" ml={2}>
                    1,323
                  </Typography>
                </Box>
              </Grid>{' '}
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container direction="column">
              <Typography style={{ color: '#8364E2' }} variant="h5">
                Sqft Size
              </Typography>
              <Box
                component="div"
                style={{
                  backgroundColor: '#1F193C',
                  color: '#fffff',
                }}
                sx={{
                  width: 200,
                }}
              >
                <h5 style={{ margin: '0' }}>
                  9 <span style={{ textAlign: 'right' }}>Property Size</span>
                </h5>
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default MainCertifictePage;
