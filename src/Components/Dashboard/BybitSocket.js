import React, { useEffect } from 'react';

const BybitKlineSubscription = () => {
  useEffect(() => {
    const socketURL = 'wss://stream.bybit.com/spot/public/v3';
    const symbol = 'BTCUSDT';
    const interval = '1m'; // 1-minute intervals
    const ws = new WebSocket(socketURL);

    ws.onopen = () => {
      console.log('WebSocket Client Connected');
      const subscribeMessage = {
        req_id: 'kline00001', // Optional request ID
        op: 'subscribe',
        args: [`kline.${interval}.${symbol}`],
      };
      ws.send(JSON.stringify(subscribeMessage));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // console.log('Received message:', message);
      // Handle the received message here
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', height: '100vh', color : 'white' }}>
      WebSocket connection established
    </div>
  );
};

export default BybitKlineSubscription;
