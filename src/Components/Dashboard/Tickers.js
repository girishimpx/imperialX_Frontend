import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
// import WebSocket from 'websocket';
import Axios from '../../Axios';
import Constant from '../../Constansts';
// import sjcl from 'sjcl';
// var WebSocket = require('ws');
// var crypto = require('crypto');


function Tickers() {

 

  // const [decryptedData, setDecryptedData] = useState({ apikey: '', secretkey: '' });
  // const [encryptedData, setEncryptedData] = useState({ one: '', two: '' });

  // useEffect(async () => {
  //   try {
      
  //   } catch (error) {
  //     console.log(error?.message);
  //   }
  //   const { data } = await Axios.get(`${Constant.BackendUrl}/bybit/getuserdata`, {
  //     headers: {
  //       Authorization: localStorage.getItem("Mellifluous"),
  //     },
  //   })
     
  //       if (data?.success) {
  //         setEncryptedData(data.result);
  //       } else {
  //         console.error('Error fetching data:', data.message);
  //       }
      
  // }, []);

  // const decryptData = (encryptedData, password) => {
  //   try {
  //     const decryptedApikey = sjcl.decrypt(password, encryptedData.one);
  //     const decryptedSecretkey = sjcl.decrypt(password, encryptedData.two);
  //     setDecryptedData({ apikey: decryptedApikey, secretkey: decryptedSecretkey });
  //   } catch (error) {
  //     console.error('Decryption failed:', error);
  //     setDecryptedData({ apikey: 'Decryption failed', secretkey: 'Decryption failed' });
  //   }
  // };

  // const handleDecrypt = () => {
  //   const password = 'Imperial@123'; 
  //   decryptData(encryptedData, password);
  // };

  var endpoint = "wss://stream.bybit.com/v5/private";
  const apiKey = "jHlgwulzoxB7rbtDog";
  const apiSecret = "x4o1P0Qw50i0pCkczObCJkHtZQ7gUsA51GaS";

  const client = new WebSocket(endpoint);

  client.on('open', function () {
    console.log('"open" event!');
    console.log('WebSocket Client Connected');

    // Generate expires timestamp
    const expires = new Date().getTime() + 10000; // 10 seconds from now

    // Generate signature
    const signature = CryptoJS.createHmac("sha256", apiSecret).update("GET/realtime" + expires).digest("hex");

    // Authentication payload
    const payload = {
        op: "auth",
        args: [apiKey, expires.toFixed(0), signature],
    };

    // Send authentication message
    client.send(JSON.stringify(payload));

    // Heartbeat mechanism to keep the connection alive
    const heartbeat = setInterval(() => {
        if (client.readyState === WebSocket.OPEN) {
            client.ping();
        }
    }, 30000); // Ping every 30 seconds

    // Initial ping to start the connection
    client.ping();

    // Send subscription message
    client.send(JSON.stringify({ op: "subscribe", args: ['order'] }));

    client.on('close', () => {
        console.log('WebSocket Connection Closed');
        clearInterval(heartbeat);
    });

    client.on('error', (error) => {
        console.error('WebSocket Error:', error);
        clearInterval(heartbeat);
    });
});

client.on('message', function (data) {
    console.log('"message" event!', JSON.parse(data));
});

client.on('ping', function () {
    console.log("ping received");
});

client.on('pong', function () {
    console.log("pong received");
});

  return (
    <div>
      {/* <button onClick={handleDecrypt}>Decrypt Data</button>
      <p>Decrypted API Key: {decryptedData.apikey}</p>
      <p>Decrypted Secret Key: {decryptedData.secretkey}</p> */}
      <p>HELLO</p>
    </div>
  );
}

export default Tickers;
