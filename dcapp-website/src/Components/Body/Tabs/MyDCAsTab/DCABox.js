import { useContext, useState } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import { TableRow, TableCell, Button } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, where } from "firebase/firestore";
import { utils } from 'ethers';
import { getTokenFromAddress } from "../../../../Scripts/utils";
import { deleteUserDCA } from "../../../../Scripts/contractWriteCalls";
import { firebaseConfig } from "../../../../Data/fireBaseConfig";


const DCABox = (props) => {

    const { DCAdata } = props;

    const creationDate = new Date(DCAdata.DCACreationTimestamp * 1000).toLocaleString();
    const endDate = new Date((parseInt(DCAdata.DCACreationTimestamp) + parseInt(DCAdata.period) * parseInt(DCAdata.totalOccurrence) * 24 * 60 * 60) * 1000).toLocaleString();

    initializeApp(firebaseConfig);
    const db = getFirestore();

    const { user } = useContext(UserContext);
    const [DCACurrentOccurrence, setDCACurrentOccurrence] = useState(0);
    async function getDCACurrentOccurrence() {
        const OccurrenceToExecuteCollectionRef = collection(db, "OccurrencesToExecute");
        const q = query(OccurrenceToExecuteCollectionRef, where("DCACreationTimestamp", "==", DCAdata.DCACreationTimestamp), where("userAddress", "==", user.toLowerCase()), where("chainId", "==", 80001));
        await getDocs(q).then((querySnapshot) => {
            let currentOccurrence = 0;
            querySnapshot.forEach((doc) => {
                currentOccurrence = doc.data().currentOccurrence;
            });
            if (DCACurrentOccurrence !== currentOccurrence) {
                setDCACurrentOccurrence(currentOccurrence);
            }
        });
    }
    getDCACurrentOccurrence();

    const tokenIn = getTokenFromAddress(DCAdata.tokenIn);
    const tokenOut = getTokenFromAddress(DCAdata.tokenOut);

    const formatedAmountPerOccurrence = utils.formatUnits(DCAdata.amountPerOccurrence, tokenIn.decimals);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {creationDate} → {endDate}
                </TableCell>
                <TableCell align="right">{DCACurrentOccurrence} / {DCAdata.totalOccurrence}</TableCell>
                <TableCell align="right">{formatedAmountPerOccurrence}</TableCell>
                <TableCell align="right">{tokenIn.name} → {tokenOut.name}</TableCell>
                <TableCell align="right">
                    <Button variant="contained" onClick={() => { deleteUserDCA(DCAdata.DCACreationTimestamp) }}>Delete DCA</Button>
                </TableCell>
            </TableRow>

        </>
    )
}

export default DCABox;
