import React from 'react'
import WeatherMain from './layout/WeatherMain'
import WeatherInfo from './layout/WeatherInfo'
import WeatherDaily from './layout/WeatherDaily';

const Main = (props) => {
	return (
		<main>
			<div className='container-fluid' >
			<div className='row d-flex justify-content-center'>
				<WeatherMain {...props} />
				<div className='col-lg-6'>
					<WeatherInfo {...props} />
					<hr />
					<div className='d-flex text-center justify-content-around weather-weekly'>
						<WeatherDaily
							key={props.id}
							dailyForecast={props.dailyForecast}
							toCelcius={props.toCelcius}
							getWeatherIcon={props.getWeatherIcon}
						/>
					</div>
				</div>
			</div>
			</div>
		</main>
	)
}

export default Main


