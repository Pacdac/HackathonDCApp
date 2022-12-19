import React from 'react';
import { Box, Paper, Grid, Slider, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TokenSelector from './TokenSelector';
import { addNewDCAToUser } from '../../../../Scripts/contractWriteCalls';

function NewDCATab(){

    const theme = useTheme();

    const [period, setPeriod] = React.useState(31);
    const [totalOccurences, setTotalOccurences] = React.useState(12);
    const [amountPerOccurrence, setAmountPerOccurrence] = React.useState(0);
    const [tokenIn, setTokenIn] = React.useState(0);
    const [tokenInDecimals, setTokenInDecimals] = React.useState(18);
    const [tokenOut, setTokenOut] = React.useState(0);
    const [fee5Decimals, setFee5Decimals] = React.useState(1);

    const handlePeriodChange = (event, newValue) => {
        setPeriod(newValue);
    };

    const handleTotalOccurencesChange = (event, newValue) => {
        setTotalOccurences(event.target.value);
    };

    const handleAmountPerOccurrenceChange = (event, newValue) => {
        setAmountPerOccurrence(event.target.value);
    };

    const handleFeeChange = (event, newValue) => {
        setFee5Decimals(newValue);
    };

    const newDCA = async () => {
        await addNewDCAToUser(period, totalOccurences, amountPerOccurrence, tokenIn, tokenInDecimals, tokenOut, fee5Decimals);
    }

    return (
        <>
            <Box
            sx={{
                marginLeft: "25%", marginRight: "25%",
                [theme.breakpoints.between('xs', 'sm')]: {
                marginLeft: "2%", marginRight: "2%"
                }
            }}
            >
                <Paper
                    elevation={3}
                    style={{ margin: "auto", padding: "20px" }}
                >

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
                                onChange={handlePeriodChange}
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
                                onChange={handleTotalOccurencesChange}
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
                                onChange={handleAmountPerOccurrenceChange}
                            />
                        </Grid>
                        <Grid item>
                            Token In
                            <TokenSelector
                                setToken={setTokenIn}
                                setDecimals={setTokenInDecimals}
                            />
                        </Grid>
                        <Grid item>
                            Token Out
                            <TokenSelector
                                setToken={setTokenOut}
                            />
                        </Grid>
                        <Grid item>
                            Fee (%)<Slider
                                defaultValue={1}
                                step={0.01}
                                min={0.01}
                                max={5}
                                valueLabelDisplay="on"
                                onChange={handleFeeChange}
                            />
                        </Grid>
                        <Grid item>
                            <Button onClick={newDCA} variant="contained">
                                Add New DCA
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}

export default NewDCATab;