import React from 'react';
import Navbar from './Navbar/Navbar';
import NewDCATab from './Body/Tabs/NewDCATab/NewDCATab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

function App() {

    const [value, setValue] = React.useState('1');

    return (
        <>
            <TabContext value={value}>

                <Navbar 
                    setTab={setValue}
                />

                <TabPanel value="1">
                    <NewDCATab />
                </TabPanel>

                <TabPanel value="2">
                </TabPanel>

                <TabPanel value="3">
                </TabPanel>

            </TabContext>
        </>
    )
}

export default App;