import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © Text Sentiment Prediction '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
      <Box sx={{
        display:"flex",
        flexDirection:"column",
        marginTop: 50,
        textAlign:"center"
      }}>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: "lightgrey"
          }}
        >
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </Box>
      </Box>
  );
}