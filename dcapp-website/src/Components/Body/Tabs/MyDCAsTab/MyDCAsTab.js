import { getDCAsForUser } from '../../../../Scripts/firebaseReadCalls';
import { UserContext } from '../../../../Context/UserContext';
import { useContext } from 'react';

const MyDCAsTab = () => {

    const { user } = useContext(UserContext);

    console.log(user);

    const myDCAs = getDCAsForUser(user);
    

    return (
        <>
        {myDCAs.map((dca) => {
            <div>
                <h1>{dca.totalOccurrence}</h1>
                <h2>{dca.period}</h2>
            </div>
            
        })
        }
        </>
    )

}

export default MyDCAsTab;