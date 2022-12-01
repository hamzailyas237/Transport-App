
import { Box, Grid } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VehicleCard from '../../components/card/Card';
import ResponsiveAppBar from '../../components/navbar/Navbar';

const Admin = () => {
    const navigate = useNavigate()

    const uid = localStorage.getItem('uid')
    console.log(uid);

    if (uid !== 'zMSWLwPkGrg1ddW65JDxUUD0sax1') {
        navigate(-1)
    }

    const { transportsToApprove } = useSelector(state => {
        return state.AddAndRemoveTransportFromAdminPanelReducer
    })

    return (
        <Box>
            <ResponsiveAppBar />
            <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Transports To Aprrove</h2>
            {/* {loading ? <Loader />
                : */}
            <Grid container sx={{ justifyContent: 'center', mt: 5 }} columnSpacing={3} rowSpacing={4}>
                {transportsToApprove && transportsToApprove.map((transport, id) => {
                    return <Grid item key={id} >
                        <VehicleCard transport={transport} adminTransport={true} />
                    </Grid>
                })}
            </Grid >
            {/* } */}
        </Box>
    )
}

export default Admin