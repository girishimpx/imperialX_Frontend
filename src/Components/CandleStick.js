import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const CandleStick = () => {
  const [candlestickData, setCandlestickData] = useState([]);
  const [handleData, setHandleData] = useState("");
  const [candlestickNewData, setCandlestickNewData] = useState([]);

  

  const startDate = new Date('2022-01-01T00:00:00Z').getTime();
  const endDate = new Date('2022-01-10T00:00:00Z').getTime();
  
  const intialpoint = 'api.bybit.com'
  const endpoint = '/v5/market/kline'
  const originalApi = `${intialpoint}/${endpoint}`
  const newApi = `https://api.bybit.com/v5/market/kline?symbol=BTCUSDT&interval=1&from=${startDate}&to=${endDate}`
  console.log(newApi, 'originalApi')

  
  // Fetch initial candlestick data from Bybit API
  useEffect(() => {
    fetchCandlestickData();
  }, []);

  const fetchCandlestickData = async () => {
    try {
      // Make API request to fetch initial candlestick data
      const response = await fetch('https://api.bybit.com/v5/market/kline?symbol=BTCUSDT&interval=1&from=1640995200000&to=1641772800000');
      const data = await response.json();
      const candleData = data?.result?.list

      for(var i = 0; i< candleData.length; i++){
        // setCandlestickNewData(i)
        // console.log(candleData[i][0], 'newApi0')
        // console.log(candleData[i][1], 'newApi1')
        // console.log(candleData[i][2], 'newApi2')
        // console.log(candleData[i][3], 'newApi3')
        // console.log(candleData[i][4], 'newApi4')
        // setCandlestickNewData(candleData[i])
        // console.log(candlestickNewData, 'candlestickNewData')

        const newCandlestick = {
          x: new Date(candleData[i][0] * 1000),
          y: [candleData[i][1], candleData[i][2], candleData[i][3], candleData[i][4]]
        };
        setCandlestickData(prevData => [...prevData, newCandlestick]);

      }
      //setCandlestickNewData(data?.result?.list);
      // console.log(candleData, 'newApi')
    } catch (error) {
      console.error('Error fetching candlestick data:', error);
    }
  };

  
  useEffect(() => {
    const client = new W3CWebSocket('wss://stream.bybit.com/v5/public/spot');

    client.onopen = () => {
      
      console.log('WebSocket Client Connected');
      client.send(JSON.stringify({ op: 'subscribe', args: ['kline.'+ 5 +'.BTCUSDT'] }));
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);  
      console.log(data,'socket data');

      setHandleData(data[0])

      if (data?.topic?.includes('kline')) {
        console.log('Received candlestick data:', data);
        processCandlestickData(data);
      }
    };

    client.onclose = () => {
      console.log('WebSocket Connection Closed');
      // Handle WebSocket closed
    };

    client.onerror = (error) => {
      console.error('WebSocket Error:', error);

      // Handle WebSocket errors
    };

    // Cleanup function
    return () => {
      // console.log('Cleaning up WebSocket connection');
      client.close();
    };

  }, []);
  const processCandlestickData = (data) => {
    const newCandlestick = {
      x: new Date(data?.data[0]?.start * 1000),
      y: [data?.data[0]?.open, data?.data[0]?.high, data?.data[0]?.low, data?.data[0]?.close]
    };
    setCandlestickData(prevData => [...prevData, newCandlestick]);
    
  };



  
  
  const options = {
    chart: {
      type: 'candlestick',
      height: 250,
      zoom: {
        enabled: true,
        type: 'xy', // Enable zoom in both x and y directions
        autoScaleYaxis: true, // Auto scale y-axis when zooming
      },
      toolbar:{
        show: false
      }
    },
    series: [{
      data: candlestickData
    }],
    xaxis: {
      type: new Date(),
    },
  };

  return (
    <div>
      <ApexCharts options={options} series={options.series} type="candlestick" height={650} />
    </div>
  );
};

export default CandleStick;