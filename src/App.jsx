import { useState } from 'react'
import Carlist from './components/Carlist'
import { AppBar, Toolbar, Typography } from '@mui/material'

function App() {

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            CarShop
          </Typography>
        </Toolbar>
        <Carlist />
      </AppBar>
    </>
  )
}

export default App
