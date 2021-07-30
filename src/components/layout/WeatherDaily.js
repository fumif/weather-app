import React from 'react'
import WeatherItem from './WeatherItem'

const WeatherDaily = (props) => {
	const weatherList = props.dailyForecast
		.slice(1, 6)
		.map((item, index) => <WeatherItem 
		key={index} 
		item={item}
		toCelcius={props.toCelcius}
		getWeatherIcon={props.getWeatherIcon}
		/>)
	return <React.Fragment>{weatherList}</React.Fragment>
}

export default WeatherDaily