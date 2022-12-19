import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { Box, Paper, Grid, Slider, TextField, Button, Typography, TableRow, TableBody, TableCell, Collapse, TableContainer, TableHead, Table } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { executeDCAToUser, estimateGasForExecuteDCAToUser, gasPrice } from "../../../../Scripts/contractWriteCalls";
import { getTokenFromAddress, getTokenPriceInEUR } from "../../../../Scripts/utils";
import { BigNumber, utils } from "ethers";

function imageFromToken(token) {
    return (
        <img
            src={token.image}
            alt={token.name}
            style={{ width: "20px", height: "20px" }}
        />
    );
}

function reward(fee5Decimals, totalAmount, numberOfOccurrences) {
    const totalAmountBigNumber = BigNumber.from(totalAmount);
    const numberOfOccurrencesBigNumber = BigNumber.from(numberOfOccurrences);
    const fee5DecimalsBigNumber = BigNumber.from(fee5Decimals);
    const reward = totalAmountBigNumber.mul(fee5DecimalsBigNumber).div(numberOfOccurrencesBigNumber).div(100000);
    return utils.formatEther(reward);
}

export default function PoolElement(props) {
    const [gasEstimate, setGasEstimate] = useState({inGas: "?", inEUR: "?"});
    const [rewardInEUR, setRewardInEUR] = useState("?");
    const { row, mainCurrencyPrice } = props;
    const [open, setOpen] = React.useState(false);
    const token = getTokenFromAddress(row.tokenIn);
    const rewardAmount = reward(row.fee5Decimals, row.tokenInAmount, row.totalOccurrence);

    useEffect(() => {
        async function getGasEstimate() {
            const newGasEstimate = await estimateGasForExecuteDCAToUser(row.userAddress, row.DCACreationTimestamp);
            const gasPriceInGwei = await gasPrice();
            const transactionCost = parseFloat(utils.formatEther(newGasEstimate.mul(gasPriceInGwei)));
            const transactionCostInEUR = (transactionCost * mainCurrencyPrice).toFixed(3);

            if (gasEstimate.inGas !== transactionCost || gasEstimate.inEUR !== transactionCostInEUR ) {
                setGasEstimate({inGas: transactionCost, inEUR: transactionCostInEUR});
            }
        }
        getGasEstimate();
    });

    useEffect(() => {
        async function getTokenPrice() {
            const newTokenInPrice = parseFloat(await getTokenPriceInEUR(token.symbol));
            const newRewardInEUR = (newTokenInPrice * rewardAmount).toFixed(3);
            if (rewardInEUR !== newRewardInEUR) {
                setRewardInEUR(newRewardInEUR);
            }
        }
        getTokenPrice();
    });

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.DCACreationTimestamp}
                </TableCell>
                <TableCell align="right">
                    {rewardAmount}
                    ({rewardInEUR}EUR)
                    {imageFromToken(token)}
                </TableCell>
                <TableCell align="right">{gasEstimate.inGas} ({gasEstimate.inEUR}EUR)</TableCell>
                <TableCell align="right">
                    <Button variant="contained" onClick={() => { executeDCAToUser(row.userAddress, row.DCACreationTimestamp) }}>Execute</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Total Occurrences</TableCell>
                                        <TableCell>Next Occurrence</TableCell>
                                        <TableCell align="right">Total Amount</TableCell>
                                        <TableCell align="right">Fee</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {row.totalOccurrence}
                                        </TableCell>
                                        <TableCell>{parseInt(row.currentOccurrence) + 1}</TableCell>
                                        <TableCell align="right">{row.tokenInAmount}</TableCell>
                                        <TableCell align="right">
                                            {row.fee5Decimals / 1000}%
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}