import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { Paper, Stack, Typography, Box, TableRow, TableBody, TableCell, Collapse, TableContainer, TableHead, Table } from "@mui/material";
import { initializeApp } from "firebase/app";
import { collection, getDocs, query, where, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../../../Data/fireBaseConfig";
import { useTheme } from '@mui/material/styles';
import PoolElement from "./PoolElement";
import { getTokenPriceInEUR } from "../../../../Scripts/utils";

initializeApp(firebaseConfig);
const db = getFirestore();

export default function PoolTab(props) {
    const { user } = useContext(UserContext);
    const [mainCurrencyPrice, setMainCurrencyPrice] = useState(0);
    const mainCurrencySymbol = "BNB";
    const [DCAToExecutePool, setDCAToExecutePool] = useState([]);
    const theme = useTheme();

    async function getDCAToExecutePool() {
        let DCAToExecutePoolSnapshot = [];
        const OccurrenceToExecuteCollectionRef = collection(db, "OccurrencesToExecute");
        const q = query(OccurrenceToExecuteCollectionRef, where("nextOccurrenceTimestamp", "<=", Date.now()));
        await getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                DCAToExecutePoolSnapshot.push(doc);
            })
        });
        if (DCAToExecutePoolSnapshot.length !== DCAToExecutePool.length) {
            setDCAToExecutePool(DCAToExecutePoolSnapshot);
        }
    }
    getDCAToExecutePool();

    useEffect(() => {
        async function getMainCurrencyPrice() {
            const mainCurrencyPriceNew =  parseFloat(await getTokenPriceInEUR(mainCurrencySymbol));
            console.log("Call to getMainCurrencyPrice");
            if (mainCurrencyPriceNew !== mainCurrencyPrice) {
                setMainCurrencyPrice(mainCurrencyPriceNew);
            }
        }
        getMainCurrencyPrice();
    })
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
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Reward</TableCell>
                                <TableCell align="right">Cost</TableCell>
                                <TableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {DCAToExecutePool ?
                                DCAToExecutePool.map((dca, index) => {
                                    return (
                                        <PoolElement key={index} row={dca.data()} mainCurrencyPrice={mainCurrencyPrice} />
                                    );
                                })
                                : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}