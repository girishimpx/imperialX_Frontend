// // TradingViewWidget.jsx

import React, { useEffect, useRef, useState } from 'react';
import './Chart.css'
import { useParams } from 'react-router-dom';

let tvScriptLoadingPromise;

export default function Chart(props) {
  const onLoadScriptRef = useRef();
  let { id } = useParams(); 
  console.log(id,'id')
  useEffect(
    () => {
      let  data1 = id?.split("-")
      console.log(data1,'data')
      let data = data1.join('')
      let dpair =  "Binance:" + data

      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

  function createWidget() {
    if (document.getElementById('tradingview_5911e') && 'TradingView' in window) {
     
      new window.TradingView.widget({
        width: "100%",
        height: 500,
        symbol: dpair,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        withdateranges: true,
        hide_side_toolbar: false,
        hide_legend: true,
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_5911e",

      });
    }
  }
     
    },
    [props.data]
  );
  

  return (
    <div className='tradingview-widget-container trade-view-chart-individual-pair'>
      <div id='tradingview_5911e' />
    </div>
  );
}
