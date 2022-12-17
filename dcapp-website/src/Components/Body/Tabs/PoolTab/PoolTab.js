import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { Paper, Stack, Typography, Box } from "@mui/material";
import { initializeApp } from "firebase/app";
import { collection, getDocs, query, where, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../../../Data/fireBaseConfig";
import { useTheme } from '@mui/material/styles';
import PoolElement from "./PoolElement";

export default function PoolTab(props) {
    const { user } = useContext(UserContext);
    const [DCAToExecutePool, setDCAToExecutePool] = useState(null);
    const theme = useTheme();

    initializeApp(firebaseConfig);
    const db = getFirestore();

    useEffect(() => {

        let DCAToExecutePoolSnapshot = [];
        const OccurrenceToExecuteCollectionRef = collection(db, "OccurrencesToExecute");
        const q = query(OccurrenceToExecuteCollectionRef);
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                DCAToExecutePoolSnapshot.push(doc.data());
            })
        });
        if ((DCAToExecutePool == null && DCAToExecutePoolSnapshot != null) || (DCAToExecutePoolSnapshot.length != DCAToExecutePool.length)) {
            setDCAToExecutePool(DCAToExecutePoolSnapshot);
        }
    });

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
                <Stack spacing={2} alignItems="center" justifyContent="center">
                    <Paper elevation={3} sx={{ width: "100%", height: "100%", backgroundColor: "#EADEFF" }}>
                        <Typography variant="h4" component="div">
                            Pool
                        </Typography>
                        {DCAToExecutePool != null ?
                            DCAToExecutePool.map((dca, index) => {
                                console.log("test");
                                return (
                                        <PoolElement key={index} DCAData={dca} />
                                );
                            })
                            : null
                        }
                    </Paper>
                </Stack>
            </Box>
        </>
    )
}