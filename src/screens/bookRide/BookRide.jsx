

import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppButton from '../../components/button/Button'
import ResponsiveAppBar from '../../components/navbar/Navbar'

const BookRide = () => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const navigate = useNavigate()
    const proceedToPayment = () => {
        navigate('/payment')
    }

    return (
        <Box>
        <ResponsiveAppBar/>
        <Box sx={{ width: '50%', m: '0 auto', mt: 3 }}>
            <Typography variant='h3' sx={{textAlign:'center', mb:1}}>Book Ride</Typography>
            <form>
                <Box sx={{ mb: 2, input: { outline: 'none' } }} >
                    <TextField onChange={(e) => setFirstname(e.target.value)} type="text"
                        placeholder='Enter first name'
                        fullWidth label="First name" />
                </Box>
                <Box sx={{ mb: 2 }} >
                    <TextField onChange={(e) => setLastname(e.target.value)} type="text"
                        placeholder='Enter last name'
                        fullWidth label="Last name" />
                </Box>
                <Box sx={{ mb: 2 }} >
                    <TextField onChange={(e) => setEmail(e.target.value)} type="text"
                        placeholder='Enter email'
                        fullWidth label="Email" />
                </Box>

                <Box sx={{ mb: 2 }} >
                    <TextField onChange={(e) => setNumber(e.target.value)} type="number"
                        placeholder='Enter phone'
                        fullWidth label="Phone"
                    />
                </Box>
                <Box sx={{ mb: 2 }} >
                    <TextField onChange={(e) => setAddress(e.target.value)} type="text"
                        placeholder='Enter address'
                        fullWidth label="Address" />
                </Box>
                <AppButton name="Proceed To Payment" variant='contained' btnAction={proceedToPayment}/>
            </form>
            </Box>

        </Box>
    )
}

export default BookRide