import Navbar from './Navbar';

import React from 'react';
import { Grid, Slider, TextField, Button } from '@mui/material';

function Body(){
    return(
        <>
            <Navbar />

            <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            style={{ minHeight: "100vh" }}
            spacing={5}
            >
                <Grid item>
                    <h1>New DCA</h1>
                </Grid>
                <Grid item>
                    Period (days)<Slider
                        defaultValue={31}
                        min={1}
                        max={120}
                        valueLabelDisplay="on"
                    />
                </Grid>
                <Grid item>
                    <TextField
                    id="outlined-number"
                    label="Number of occurences"
                    type="number"
                    defaultValue={12}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                    id="outlined-number"
                    label="Amount per occurence"
                    type="number"
                    defaultValue={0}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained">Connect Wallet</Button>
                </Grid>
            </Grid>
            
        </>
    )
}

export default Body;