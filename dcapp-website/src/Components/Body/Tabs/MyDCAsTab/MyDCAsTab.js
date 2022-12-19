import { UserContext } from '../../../../Context/UserContext';
import { useContext, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, doc, where, orderBy } from "firebase/firestore";
import { Box, Paper, TableRow, TableBody, TableCell, Collapse, TableContainer, TableHead, Table } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DCABox from './DCABox';
import { firebaseConfig } from "../../../../Data/fireBaseConfig";


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
        const q = query(DCACreationCollectionRef, where("userAddress", "==", userAddress.toLowerCase()), where("chainId", "==", 80001), orderBy("DCACreationTimestamp", "desc"));
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