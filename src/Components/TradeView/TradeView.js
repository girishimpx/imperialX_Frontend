import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const TradeView = props => {
	
	const {
		data,
		colors: {
			backgroundColor = 'transparent',
			lineColor = '#67ad5b',
			textColor = 'white',
			areaTopColor = '#67ad5b',
			areaBottomColor = '#050904',

		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth, });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				grid: {
					vertLines: {
						color: '#17393c',
						visible: false,
					},
					horzLines: {
						color: '#17393c',
						visible: false,
					},
				},
				width: chartContainerRef.current.clientWidth,
				height: 400,
			});


			chart.timeScale().fitContent();

			const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

			const container = document.getElementById('container');
const toolTipWidth = 80;
const toolTipHeight = 80;
const toolTipMargin = 15;
// Create and style the tooltip html element
const toolTip = document.createElement('div');
toolTip.style = `width: 110px; height: 96px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
toolTip.style.background = 'white';
toolTip.style.color = 'black';
toolTip.style.borderColor = '#67ad5b';
container.appendChild(toolTip);

// update tooltip
chart.subscribeCrosshairMove(param => {
	if (
		param.point === undefined ||
		!param.time ||
		param.point.x < 0 ||
		param.point.x > container.clientWidth ||
		param.point.y < 0 ||
		param.point.y > container.clientHeight
	) {
		toolTip.style.display = 'none';
	} else {
		// time will be in the same format that we supplied to setData.
		// thus it will be YYYY-MM-DD
		const dateStr = param.time;
		toolTip.style.display = 'block';
		const data = param.seriesData.get(newSeries);
		const price = data.value !== undefined ? data.value : data.close;
		toolTip.innerHTML = `<div style="color: ${'#67ad5b'}; font-weight: bold">ImperialX</div><div style="font-size: 24px; margin: 4px 0px; color: ${'black'}">
			${Math.round(100 * price) / 100}
			</div><div style="color: ${'black'}">
			${dateStr}
			</div>`;

		const coordinate = newSeries.priceToCoordinate(price);
		let shiftedCoordinate = param.point.x - 50;
		if (coordinate === null) {
			return;
		}
		shiftedCoordinate = Math.max(
			0,
			Math.min(container.clientWidth - toolTipWidth, shiftedCoordinate)
		);
		const coordinateY =
			coordinate - toolTipHeight - toolTipMargin > 0
				? coordinate - toolTipHeight - toolTipMargin
				: Math.max(
					0,
					Math.min(
						container.clientHeight - toolTipHeight - toolTipMargin,
						coordinate + toolTipMargin
					)
				);
		toolTip.style.left = shiftedCoordinate + 'px';
		toolTip.style.top = coordinateY + 'px';
	}
});


			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
		
	);



	return (
		<div
		    id="container"
			ref={chartContainerRef}
		/>
	);
};