import React from 'react'

const WeatherInfo = (props) => {
	return (
		<div className='d-flex justify-content-between flex-wrap weather-details'>
			<div className='col-6 my-2'>
				<i className={`wi wi-wind wi-towards-${props.windDirectionIcon}`}></i>
				<span>Wind: {props.windDirection} {props.wind} km/h</span>
			</div>
			{props.gust ? (
				<div className='col-6 my-2'>
					<i className='fas fa-wind'></i>
					<span>Gust: {props.gust} km/h</span>
				</div>
			) : (
				false
			)}
			{props.dew_point ? (
				<div className='col-6 my-2'>
					<i className='wi wi-thermometer'></i>
					<span>Dew Point: {props.dew_point} &deg; </span>
				</div>
			) : (
				false
			)}
			<div className='col-6 my-2'>
				<i className='wi wi-humidity'></i>
				<span>Humidity: {props.humidity}%</span>
			</div>
			{props.pp && (
				<div className='col-6 my-2'>
					<i className='wi wi-raindrop'></i>
					<span>Precipitation: {props.pp}%</span>
				</div>
			)}
			<div className='col-6 my-2'>
				<i className='wi wi-barometer'></i>
				<span>Pressure: {props.pressure} hPa</span>
			</div>
			<div className='col-6 my-2'>
				<i className='wi wi-sunrise'></i>
				<span>Sunrise: {props.sunrise}</span>
			</div>
			<div className='col-6 my-2'>
				<i className='wi wi-sunset'></i>
				<span>Sunset: {props.sunset}</span>
			</div>
		</div>
	)
}

export default WeatherInfo
