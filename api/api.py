from flask import Flask, request, jsonify, send_file, render_template
from flask_cors import CORS
import re
#from io import BytesIO

import nltk

from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
#import matplotlib.pyplot as plt
import pandas as pd
import pickle

STOPWORDS = set(stopwords.words("english"))

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def test():
    return "Test request received successfully. Service is running."


@app.route("/predict", methods=["POST"])
def predict():
    # Select the predictor to be loaded from Models folder
    predictor = pickle.load(open(r"/home/aditya/Desktop/react-flask-app/api/Models/model_xgb.pkl", "rb"))
    scaler = pickle.load(open(r"/home/aditya/Desktop/react-flask-app/api/Models/scaler.pkl", "rb"))
    cv = pickle.load(open(r"/home/aditya/Desktop/react-flask-app/api/Models/countVectorizer.pkl", "rb"))
    try:
        # Check if the request contains a text input
        if "text" in request.json:
            # Single string prediction
            text_input = request.json["text"]
            predicted_sentiment = single_prediction(predictor,scaler, cv, text_input)

            return jsonify({"prediction": predicted_sentiment})

    except Exception as e:
        return jsonify({"error": str(e)})


def single_prediction(predictor,scaler,cv, text_input):
    corpus = []
    stemmer = PorterStemmer()
    review = re.sub("[^a-zA-Z]", " ", text_input)
    review = review.lower().split()
    review = [stemmer.stem(word) for word in review if not word in STOPWORDS]
    review = " ".join(review)
    corpus.append(review)
    X_prediction = cv.transform(corpus).toarray()
    X_prediction_scl = scaler.transform(X_prediction)
    y_predictions = predictor.predict_proba(X_prediction_scl)
    y_predictions = y_predictions.argmax(axis=1)[0]

    return "Positive" if y_predictions == 1 else "Negative"
