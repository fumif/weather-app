import React from 'react'
import moment from 'moment'

const WeatherItem = (props) => {
  return (
		<div className='d-flex flex-column justify-content-between'>
			<span className='weather-weekly-day text-uppercase'>
				{moment.unix(props.item.dt).format('ddd')}
			</span>
			<i className={`wi wi-${props.getWeatherIcon(props.item.weather[0].id)} p-3`}></i>
			<div className='d-flex justify-content-around weather-weekly-temp'>
				<span className='fw-bold weather-weekly-temp-high'>
					{props.toCelcius(props.item.temp.max)}&deg;
				</span>
				<span className='weather-weekly-temp-low'>
        {props.toCelcius(props.item.temp.min)}&deg;
				</span>
			</div>
		</div>
	)
}

export default WeatherItem
