

import { Box, Typography } from '@mui/material'
import React from 'react'
import ResponsiveAppBar from '../../components/navbar/Navbar'

const PaymentMethod = () => {
    return (
        <Box>
            <ResponsiveAppBar />

            <Box sx={{ mt: 4 }}>
                <Typography variant='h4' sx={{ textAlign: 'center', mb: 1 }}>Select Payment Method</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap:'wrap', gap: 10, mt: 4 }}>
                    <Box sx={{ width: '180px', textAlign: 'center', p: '20px 0px 20px 0px' }}>
                        <img height={100} src="https://laz-img-cdn.alicdn.com/tfs/TB1LkpwLAY2gK0jSZFgXXc5OFXa-400-400.png"
                        />
                        <Typography>
                            Easy Paisa
                        </Typography>
                    </Box>
                    <Box sx={{ width: '180px', textAlign: 'center', p: '20px 0px 20px 0px' }}>
                        <img height={100} src="https://laz-img-cdn.alicdn.com/tfs/TB1E16ye5_1gK0jSZFqXXcpaXXa-160-160.png"
                        />
                        <Typography>
                            Easy Paisa
                        </Typography>
                    </Box>
                    <Box sx={{ width: '180px', textAlign: 'center', p: '20px 0px 20px 0px' }}>
                        <img height={100} src="https://laz-img-cdn.alicdn.com/tfs/TB1utb_r8jTBKNjSZFwXXcG4XXa-80-80.png"
                        />
                        <Typography>
                            Easy Paisa
                        </Typography>
                    </Box>


                    <Box sx={{ width: '180px', textAlign: 'center', p: '20px 0px 20px 0px' }}>
                        <Typography variant='body1' sx={{ textAlign: 'center', mb: 1 }}>Order Summary</Typography>
                        <Typography variant='body2'> Total Amount: {500} </Typography>
                    </Box>

                </Box>

            </Box>
        </Box>

    )
}

export default PaymentMethod