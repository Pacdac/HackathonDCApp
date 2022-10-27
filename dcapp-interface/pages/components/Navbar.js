import React from 'react';
import { Grid, Tabs, Tab, Button } from "@mui/material";
import TimelineIcon from '@mui/icons-material/Timeline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ConnectWalletButton from './ConnectWalletButton';

function Navbar(){
    return(
        <>
            <Grid 
              container 
              alignItems="center"
              direction={{xs: "column", md: "row"}}
            >
                <Grid item md={9}>
                    <img src="/images/logo.png" className="logo" />
                </Grid>

                <Grid item md={1} >
                    <ConnectWalletButton />
                </Grid>
            </Grid>
            <Grid 
              container 
              alignItems="center"
            >
                <Grid item xs={12}>
                    <Tabs aria-label="nav bar" centered>
                        <Tab icon={<TimelineIcon />} label="New DCA" />
                        <Tab icon={<FormatListBulletedIcon />} label="My DCA(s)" />
                        <Tab icon={<PriceCheckIcon />} label="Pool" />
                    </Tabs>
                </Grid>
            </Grid>
        </>
    )
}

export default Navbar;