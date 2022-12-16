import * as React from 'react';
import { Grid } from "@mui/material";
import TimelineIcon from '@mui/icons-material/Timeline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ConnectWalletButton from './ConnectWalletButton';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';

function Navbar(props){

    const handleChange = (event, newValue) => {
        props.setTab(newValue);
    };

    return(
        <>
            <Grid 
              container 
              alignItems="center"
              direction={{xs: "column", md: "row"}}
            >
                <Grid item md={9}>
                    <img src="/images/logo.png" className="logo" height="60px" />
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
                    <TabList onChange={handleChange} aria-label="nav bar" centered >
                        <Tab icon={<TimelineIcon />} label="New DCA" value="1" />
                        <Tab icon={<FormatListBulletedIcon />} label="My DCA(s)" value="2" />
                        <Tab icon={<PriceCheckIcon />} label="Pool" value="3" />
                    </TabList>
                </Grid>
            </Grid>
        </>
    )
}

export default Navbar;