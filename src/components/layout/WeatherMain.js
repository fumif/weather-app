import React from 'react'

const WeatherMain = (props) => {
	return (
		<div className='col-lg-4 mt-1'>
			<div className='d-flex justify-content-around'>
				<div className='weather-temp-current'>
					<span className='fw-light'> {props.celcius} &deg;</span>
				</div>
				<div className='mt-1'>
					<div className='weather-temp-highlow d-flex flex-column'>
						<span className='weather-temp-high lead'>
							High:
							<span className='fw-bold'> {props.temp_max} &deg;</span>
						</span>
						<span className='weather-temp-low lead'>
							Low:
							<span className='fw-bold'> {props.temp_min} &deg;</span>
						</span>
					</div>
					<div className='weather-temp-windchill'>
						Feels Like: {props.feels_like} &deg;
					</div>
				</div>
			</div>
			<div className='d-flex justify-content-center'>
				<span className='weather-condition d-flex align-items-center'>
					<i className={`wi wi-${props.icon} my-3 display-2`}></i>
					<span className='ms-3'>{props.description}</span>
				</span>
			</div>
		</div>
	)
}

export default WeatherMain
