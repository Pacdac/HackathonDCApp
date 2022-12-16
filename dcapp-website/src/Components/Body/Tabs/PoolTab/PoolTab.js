import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { Paper, Stack, Typography } from "@mui/material";
import { initializeApp } from "firebase/app";
import { collection, getDocs, query, where, getFirestore } from "firebase/firestore";

export default function PoolTab(props) {
    const { user } = useContext(UserContext);
    console.log("pool test", user);
    const [DCAToExecutePool, setDCAToExecutePool] = useState(null);
    const firebaseConfig = {
        apiKey: "AIzaSyCcF0zTiJyFbag3O5Hn81qrODnxBBsKQ14",
        authDomain: "fir-test-4c4bf.firebaseapp.com",
        projectId: "fir-test-4c4bf",
        storageBucket: "fir-test-4c4bf.appspot.com",
        messagingSenderId: "695521795062",
        appId: "1:695521795062:web:fd948f638e5ac785ee85d7",
        measurementId: "G-3D06MLMCNK"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    useEffect(() => {
        async function getDCAToExecutePool() {
            let DCAToExecutePoolSnapshot = [];
            const OccurrenceToExecuteCollectionRef = collection(db, "OccurrencesToExecute");
            const q = query(OccurrenceToExecuteCollectionRef, where("nextOccurrenceTimestamp", "<=", Date.now() / 1000));
             await getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                DCAToExecutePoolSnapshot.push(doc.data());
            }) });
            if (!DCAToExecutePool || DCAToExecutePoolSnapshot.length != DCAToExecutePool.length) {
                setDCAToExecutePool(DCAToExecutePoolSnapshot);
            }
            console.log("Dca to execute pool:", DCAToExecutePool);
        }
        getDCAToExecutePool();
    });

    return (
        <>
            <Stack spacing={2} alignItems="center" justifyContent="center">
                <Paper elevation={3} sx={{ width: "100%", height: "100%", backgroundColor: "#EADEFF" }}>
                    <Typography variant="h4" component="div" gutterBottom>
                        Pool
                    </Typography>
                    {DCAToExecutePool ? 
                        DCAToExecutePool.map((dca) => {
                            return (
                                <Typography variant="h6" component="div" gutterBottom>
                                    {dca.dcaId}
                                </Typography>
                            )
                        })
                    : null
                        }
                </Paper>
            </Stack>
        </>
    )
}