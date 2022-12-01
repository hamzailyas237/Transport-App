
import React, { useEffect } from 'react'
import ResponsiveAppBar from '../../components/navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import VehicleCard from '../../components/card/Card'
import { Grid } from '@mui/material'
import Loader from '../../components/loader/Loader'
import { GetApprovedTransportsAction, GetLoginUsersDataAction } from '../../store/actions/TransportActions'


const Home = () => {
  const dispatch = useDispatch()
  // const { transports } = useSelector(state => {
  //   return state.AddAndRemoveTransportFromAdminPanelReducer
  // })

  // console.log(transports);

  useEffect(() => {
    dispatch(GetLoginUsersDataAction())
  }, [])



  useEffect(() => {
    dispatch(GetApprovedTransportsAction())
  }, [])


  const { approvedTransports } = useSelector(state => {
    return state.GetApprovedTransportReducer
  })
  console.log(approvedTransports);
  

  return (
    <div>
      <ResponsiveAppBar />
      {/* {loading ? <Loader />
        : */}
      <Grid container sx={{ justifyContent: 'center', mt: 5 }} columnSpacing={3} rowSpacing={4}>
        {approvedTransports && approvedTransports.map((transport, id) => {
          return <Grid item key={id} >
            <VehicleCard transport={transport} />
          </Grid>
        })}
      </Grid >
      {/* } */}
    </div>
  )
}

export default Home
