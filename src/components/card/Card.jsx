
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import AppButton from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    GetApprovedTransportsAction,
    TransportApprovedAction,
    TransportRejectedAction
} from '../../store/actions/TransportActions';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase/Firebase';


export default function VehicleCard({ transport, adminTransport }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const bookRide = () => {
        navigate('/bookride')
    }

    const transportApproved = async () => {
        dispatch(TransportApprovedAction(transport))
        const docRef = await addDoc(collection(db, "Approved Transports"), transport);
        // console.log("Document written with ID: ", docRef.id);
        dispatch(GetApprovedTransportsAction())
    }


    const transportRejected = () => {
        dispatch(TransportRejectedAction(transport))
    }

    return (
        <Card sx={{ width: 300, textAlign: 'center', m: 1, height: 'calc(100% - 15px)' }}>
            <Box>
                <CardMedia sx={{ width: '100%', m: '0 auto', objectFit: 'contain' }}
                    component="img"
                    height="200px"
                    image={transport.image}
                />
                <CardContent sx={{ mt: 1 }}>
                    <Typography gutterBottom variant="p" component="div">
                        {transport.name}
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                        {transport.model}
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                        {transport.vehicle}
                    </Typography>
                    <Typography variant="i" component="i" color="text.primary">
                        Rs {transport.rent}
                    </Typography>
                </CardContent>
            </Box>
            {adminTransport ?
                <CardActions>
                    <AppButton name="Approve" variant="contained" btnAction={transportApproved} />
                    <AppButton name="Reject" variant="contained" btnAction={transportRejected} />
                </CardActions>
                :
                <CardActions>
                    <AppButton name="Book Ride" variant="contained" btnAction={bookRide} />
                </CardActions>
            }
        </Card>
    );
}
