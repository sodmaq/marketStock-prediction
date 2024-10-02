import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from matplotlib.dates import DateFormatter
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import sys
import codecs
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Input
import math
from sklearn.metrics import mean_squared_error
import json

# Set encoding for stdout to avoid Unicode errors
sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())

# Get command-line arguments
combined_args = sys.argv[1]
start, end, stock_symbol = combined_args.split(',')
print(start, end, stock_symbol)

def predict_stock_prices(start, end, stock_symbol, ttldays=30):
    # Download stock data
    df = yf.download(stock_symbol + ".NS", start, end)

    # Check for NaN values
    if df.isnull().values.any():
        print("Data contains NaNs. Please check the stock data.")
        return

    # Reset index to access 'Close' prices
    df1 = df.reset_index()['Close']
    
    # Scale the data
    scaler = MinMaxScaler(feature_range=(0, 1))
    df1 = scaler.fit_transform(np.array(df1).reshape(-1, 1))

    # Split the data into training and testing sets
    training_size = int(len(df1) * 0.75)
    test_size = len(df1) - training_size
    train_data, test_data = df1[0:training_size, :], df1[training_size:len(df1), :1]

    # Create the dataset for LSTM
    def create_dataset(dataset, time_step=1):
        dataX, dataY = [], []
        for i in range(len(dataset) - time_step - 1):
            a = dataset[i:(i + time_step), 0]
            dataX.append(a)
            dataY.append(dataset[i + time_step, 0])
        return np.array(dataX), np.array(dataY)

    time_step = test_size - 5  # Adjust time step for training
    X_train, y_train = create_dataset(train_data, time_step)
    X_test, y_test = create_dataset(test_data, time_step)

    # Reshape input to be [samples, time steps, features]
    X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
    X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)

    # Build the LSTM model
    model = Sequential()
    model.add(Input(shape=(time_step, 1)))  # Using Input layer for clarity
    model.add(LSTM(50, return_sequences=True))
    model.add(LSTM(50, return_sequences=True))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(loss="mean_squared_error", optimizer="adam")

    # Fit the model
    model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=100, batch_size=32, verbose=1)

    # Make predictions
    train_predict = model.predict(X_train)
    test_predict = model.predict(X_test)

    # Inverse transform predictions
    train_predict = scaler.inverse_transform(train_predict)
    test_predict = scaler.inverse_transform(test_predict)

    # Prepare the plot for predictions
    look_back = time_step
    trainPredictPlot = np.empty_like(df1)
    trainPredictPlot[:, :] = np.nan
    trainPredictPlot[look_back:len(train_predict) + look_back, :] = train_predict
    testPredictPlot = np.empty_like(df1)
    testPredictPlot[:, :] = np.nan
    testPredictPlot[len(train_predict) + (look_back * 2) + 1:len(df1) - 1, :] = test_predict

    # Forecast future predictions
    x_input = test_data[-time_step:].reshape(1, time_step, 1)
    predictions = []
    for i in range(ttldays):
        yhat = model.predict(x_input, verbose=0)
        predictions.append(yhat[0, 0])
        x_input = np.append(x_input, yhat.reshape(1, 1, 1), axis=1)
        x_input = x_input[:, 1:, :]

    predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
    return predictions.tolist()

# Run prediction and print results
predictions = predict_stock_prices(start, end, stock_symbol)
print(json.dumps(predictions))
