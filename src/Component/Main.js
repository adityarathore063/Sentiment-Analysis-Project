import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "./Main.css";

function AmazonAlexaReviewsAnalysis() {
  const [predictionResult, setPredictionResult] = useState("");

  const predict = () => {
    const textInput = document.getElementById("textInput");

    if (textInput.value.trim() !== "") {
      // Predict on single sentence
      fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput.value.trim() }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPredictionResult("Predicted sentiment: " + data.prediction);
        });
    }
  };

  return (
    <Container className="main-container">
      <Box className="main-box-one">
        <Typography variant="h2" className="main-typo-one">
          Text Sentiment Prediction
        </Typography>
      </Box>
      <form id="predictionForm">
        <Box className="main-parent-box">
          <Box className="main-box-two">
            <Typography variant="h5">Text for Prediction</Typography>
          </Box>
          <Box className="main-box-three">
            <TextField
              id="textInput"
              label="Enter text"
              placeholder="Enter text"
              multiline
            />
          </Box>
          <Box className="main-box-four">
            <Button variant="contained" onClick={predict}>
              Predict
            </Button>
          </Box>

          <Box className="main-box-five">
            <Typography variant="h5">Prediction Result</Typography>
          </Box>

          <Box className="main-box-six">
            <Typography variant="h6" id="predictionResult">
              {predictionResult}
            </Typography>
          </Box>
        </Box>
      </form>
    </Container>
  );
}

export default AmazonAlexaReviewsAnalysis;
