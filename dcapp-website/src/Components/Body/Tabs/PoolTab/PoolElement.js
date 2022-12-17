import React, { useState, useContext } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { Box, Paper, Grid, Slider, TextField, Button, Typography } from '@mui/material';

export default function PoolElement(props) {
    console.log(props.DCAData.DCACreationTimestamp);
    return (
        <>
            <Typography variant="h6" component="div">
                {props.DCAData.DCACreationTimestamp}
            </Typography>
        </>
    )
}