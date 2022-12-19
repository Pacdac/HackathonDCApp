import { UserContext } from '../../../../Context/UserContext';
import { useContext, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, doc, where, orderBy } from "firebase/firestore";
import { Box, Paper, TableRow, TableBody, TableCell, Collapse, TableContainer, TableHead, Table } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DCABox from './DCABox';

const firebaseConfig = {
    apiKey: "AIzaSyCcF0zTiJyFbag3O5Hn81qrODnxBBsKQ14",
    authDomain: "fir-test-4c4bf.firebaseapp.com",
    projectId: "fir-test-4c4bf",
    storageBucket: "fir-test-4c4bf.appspot.com",
    messagingSenderId: "695521795062",
    appId: "1:695521795062:web:fd948f638e5ac785ee85d7",
    measurementId: "G-3D06MLMCNK"
};

initializeApp(firebaseConfig);
const db = getFirestore();

const MyDCAsTab = () => {

    const theme = useTheme();

    const { user } = useContext(UserContext);

    const [myDCAsList, setMyDCAsList] = useState([]);

    async function getDCAsForUser(userAddress) {
        let myDCAs = [];
        const moralisCollectionRef = collection(db, "moralis");
        const eventsDocRef = doc(moralisCollectionRef, "events");
        const DCACreationCollectionRef = collection(eventsDocRef, "DcappTestnetCreation");
        const q = query(DCACreationCollectionRef, where("userAddress", "==", userAddress.toLowerCase()), orderBy("DCACreationTimestamp", "desc"));
        await getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                myDCAs.push(doc);
            })
        });
        if (myDCAs.length !== myDCAsList.length) {
            setMyDCAsList(myDCAs);
        }
    }

    getDCAsForUser(user);

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
                                <TableCell>Estimated Dates</TableCell>
                                <TableCell align="right">Occurrences</TableCell>
                                <TableCell align="right">Amount per Occurrence</TableCell>
                                <TableCell align="right">Tokens</TableCell>
                                <TableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myDCAsList.map((dca, index) => {
                                return (
                                    <DCABox key={index} DCAdata={dca.data()} />
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )

}

export default MyDCAsTab;