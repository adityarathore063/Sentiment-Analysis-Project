import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import'./Header.css'

function Header() {
  return (
    <div className='header-container'>
      <Container>
        <Box className="header-box-one">
            <Typography variant='h3' className='header-typo-one'>
            Understand the emotions behind the words.😊
            </Typography>
        </Box>

        <Box className="header-box-two">
            <Typography variant='h5' className='header-typo-two'>
            Text sentiment prediction is a powerful tool that can help you to understand the emotions and opinions expressed in your text data. This information can be used to improve your business in a number of ways
            </Typography>
        </Box>
      </Container>
    </div>
  )
}

export default Header
