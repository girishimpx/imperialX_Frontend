import React, { useState, useEffect} from 'react'
import { TradeView } from './TradeView'
import moment from 'moment';
import Axios from '../../Axios';
import { Button } from '@mui/material';
import './TradeView.css'

var ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
const TradeViewMain = (props) => {
  const [initialData, setInitialData] = useState([]);
  const [activeClass, setActiveClass] = useState("1");

  // const datas = {
  //   op: "subscribe",
  //   args: [
  //     {
  //       channel: "index-tickers",
  //       instId: `${props.pair}`,
  //     },
  //   ],
  // };

  const Ticker = async () => {
    setInitialData([])
    try {

      var pairsss = props.pair?.split('-')
      if (pairsss?.length === 3) {
        const { data } = await Axios.post(`/users/tradingView`, {
          Pair: `${pairsss[0]}-${pairsss[1]}`
        })
        if (data?.success === true) {
          if (data?.result?.length > 0) {
            for (let i = data?.result?.length - 1; i >= 0; i--) {
              const element = data?.result[i];
              if (element.length > 0) {
                const timeFormat = moment.unix(element[0] / 1000).format("YYYY-MM-DD");
                setInitialData((initialData) => [...initialData, { time: timeFormat, value: Number(element[1]) }])
              }
            }
          }
        }
      } else {
        const { data } = await Axios.post(`/users/tradingView`, {
          Pair: props.pair
        })
        if (data?.success === true) {
          if (data?.result?.length > 0) {
            for (let i = data?.result?.length - 1; i >= 0; i--) {
              const element = data?.result[i];
              if (element.length > 0) {
                const timeFormat = moment.unix(element[0] / 1000).format("YYYY-MM-DD");
                setInitialData((initialData) => [...initialData, { time: timeFormat, value: Number(element[1]) }])
              }
            }
          }
        }
      }

      // const timeFormat = moment.unix(response?.data[0]?.ts / 1000).format("YYYY-MM-DD");
      // const idxPxVal = Math.ceil(response?.data[0].idxPx)
      // console.log(date, "date");
      // console.log("timeFormat", timeFormat)
      // setInitialData((initialData) => [...initialData, {time: timeFormat, value: idxPxVal }])
    } catch (error) {
      console.log("🚀 ~ file: TradeViewMain.js:29 ~ Ticker ~ error:", error)
    }
  };
  
  const day = async(e) => {
    
    setActiveClass(e.target.id);
    // console.log(e.target.value,"value");
    setInitialData([])
    try {

      var pairsss = props.pair?.split('-')
      if (pairsss?.length === 3) {
        const { data } = await Axios.post(`/users/tradingView`, {
          Pair: `${pairsss[0]}-${pairsss[1]}`,
          bar : e.target.value
        })
        if (data?.success === true) {
          if (data?.result?.length > 0) {
            for (let i = data?.result?.length - 1; i >= 0; i--) {
              const element = data?.result[i];
              if (element.length > 0) {
                const timeFormat = moment.unix(element[0] / 1000).format("YYYY-MM-DD");
                setInitialData((initialData) => [...initialData, { time: timeFormat, value: Number(element[1]) }])
              }
            }
          }
        }
      } else {
        const { data } = await Axios.post(`/users/tradingView`, {
          Pair: props.pair,
          bar : e.target.value
        })
        if (data?.success === true) {
          if (data?.result?.length > 0) {
            for (let i = data?.result?.length - 1; i >= 0; i--) {
              const element = data?.result[i];
              if (element.length > 0) {
                const timeFormat = moment.unix(element[0] / 1000).format("YYYY-MM-DD");
                setInitialData((initialData) => [...initialData, { time: timeFormat, value: Number(element[1]) }])
              }
            }
          }
        }
      }

      // const timeFormat = moment.unix(response?.data[0]?.ts / 1000).format("YYYY-MM-DD");
      // const idxPxVal = Math.ceil(response?.data[0].idxPx)
      // console.log(date, "date");
      // console.log("timeFormat", timeFormat)
      // setInitialData((initialData) => [...initialData, {time: timeFormat, value: idxPxVal }])
    } catch (error) {
      console.log("🚀 ~ file: TradeViewMain.js:29 ~ Ticker ~ error:", error)
    }
  }

  useEffect(() => {
    Ticker();
  }, [props.pair])

  // const initialData = [
  //   {time: '2018-12-23', value: 31.11 },
  //   {time: '2018-12-24', value: 27.02 },
  //   {time: '2018-12-25', value: 27.32 },
  //   {time: '2018-12-26', value: 25.17 },
  //   {time: '2018-12-27', value: 28.89 },
  //   {time: '2018-12-28', value: 25.46 },
  //   {time: '2018-12-29', value: 23.92 },
  //   {time: '2018-12-30', value: 22.68 },
  //   {time: '2018-12-31', value: 22.67 },
  // ];
 

  // Create a ref to hold the button element

  // Function to handle button click and log its value
  // const handleClick = () => {
    // Access the value of the button using the ref
  //   const buttonValue = buttonRef.current.value;
  //   console.log('Button Value:', buttonValue);
  // };


  return (
    <div>
      <div className='duration-buttons-row-outer'>
    <div className='duration-buttons-row'>
    <Button key={1} variant={activeClass === "1" ? "contained" : "text"} id={"1"} value="1D" onClick={(value) => day(value)}>1D</Button>
    <Button key={2} variant={activeClass === "2" ? "contained" : "text"} id={"2"} value="1W" onClick={(value) => day(value)}>1W</Button>
    <Button key={3} variant={activeClass === "3" ? "contained" : "text"} id={"3"} value="1M" onClick={(value) => day(value)}>1M</Button>
    <Button key={4} variant={activeClass === "4" ? "contained" : "text"} id={"4"} value="3M" onClick={(value) => day(value)}>1Y</Button>
    </div>
    </div>
      {
        initialData?.length > 0 && <TradeView {...props} data={initialData} />
      }

    </div>
  )
}

export default TradeViewMain
