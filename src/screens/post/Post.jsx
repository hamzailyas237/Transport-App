
import React, { useEffect } from 'react'
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
import { db, storage } from "../../firebase/Firebase";
import { doc, setDoc, onSnapshot, collection, addDoc } from "firebase/firestore";
import Autocomplete from '@mui/material/Autocomplete';
import AppButton from "../../components/button/Button";
import { Typography } from '@mui/material';
import { AddTransportToAdminPanelAction } from '../../store/actions/TransportActions';
import { useDispatch, useSelector } from 'react-redux';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



const vehicles = [
    { code: 'AD3', label: 'Bike', phone: '4' },
    { code: 'AD', label: 'Car', phone: '1' },
    { code: 'AD1', label: 'Bus', phone: '2' },
    { code: 'AD2', label: 'Wagon', phone: '3' },
];


const Post = () => {

    const dispatch = useDispatch()
    const userUid = localStorage.getItem('uid')

    const [name, setName] = useState('')
    const [model, setModel] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [rent, setRent] = useState('')
    const [selectedImage, setSelectedImage] = useState('')



    const uploadImageToStorage = () => {
        const storageRef = ref(storage, `Images/Vehilce Images/${userUid}/${selectedImage.name}`);
        uploadBytes(storageRef, selectedImage).then(async (snapshot) => {
            console.log('Uploaded a blob or file!');
            var image = ''
            return await getDownloadURL(ref(storage, `Images/Vehilce Images/${userUid}/${selectedImage.name}`))
                .then(async (url) => {
                    image = url
                    const docRef = await addDoc(collection(db, "Vehilces Images URL"), {
                        uid: userUid,
                        url,
                    });

                    const obj = {
                        image,
                        name,
                        model,
                        vehicle,
                        rent,
                        id: Math.floor(Math.random() * Date.now())
                    }
                    dispatch(AddTransportToAdminPanelAction(obj))
                    await addDoc(collection(db, "Transports To Approve"), obj);

                    // dispatch(GetTransportsToApproveAction())

                })
        });
    }

    const postTransport = async () => {
        uploadImageToStorage()
    }


    return (

        <Box sx={{ width: '50%', m: '0 auto', mt: 3 }}>
            <form>
                <Typography variant='h3' sx={{ textAlign: 'center', mb: 2 }}>Add a Transport</Typography>
                <Box sx={{ mb: 2, input: { outline: 'none' } }} >
                    <TextField onChange={(e) => setName(e.target.value)} type="text"
                        placeholder='Enter vehicle name'
                        fullWidth label="Name" />
                </Box>
                <Box sx={{ mb: 2 }} >
                    <TextField onChange={(e) => setModel(e.target.value)} type="text"
                        placeholder='Enter vehicle model'
                        fullWidth label="Model" />
                </Box>
                {/* For Vehicle Select */}
                <Box sx={{ mb: 2 }} >
                    < Autocomplete
                        onChange={(e, v) => setVehicle(v.label)}
                        id="country-select-demo"
                        options={vehicles}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Vehicle type"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                </Box>

                <Box sx={{ mb: 2 }} >
                    <TextField onChange={(e) => setRent(e.target.value)} type="number"
                        placeholder='Enter vehicle Rent'
                        fullWidth label="Rent" />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <input type="file" accept="image/png, image/jpeg"
                        onChange={(e) => setSelectedImage(e.target.files[0])} />
                </Box>

                <div className='btn-container'>
                    <AppButton name="Add" variant="contained" btnAction={postTransport} />
                </div>
            </form>
        </Box>
    )
}

export default Post
