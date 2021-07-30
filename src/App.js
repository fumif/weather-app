import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header'
import Main from './components/Main'
import {Helmet} from 'react-helmet'
import moment from 'moment'
import 'moment-timezone'
import variables from './scss/partials/variables.scss'

const API = {
	key: process.env.REACT_APP_API_KEY,
	base: 'https://api.openweathermap.org/data/2.5/'
}

const App = (props) => {
	const [state, setState] = useState({
			isHidden: true,
			bgColor: '',
			city: '',
			country: '',
			date: '',
			icon: '',
			description: '',
			celcius: '',
			temp_max: '',
			temp_min: '',
			windchill: '',
			windDirection: '',
			windDirectionIcon: '',
			wind: '',
			gust: '',
			humidity: '',
			pressure: '',
			sunrise: '',
			sunset: '',
	})

	const weatherIcon = {
		day: {
			thunderstorm: 'thunderstorm',
			drizzle: 'showers',
			rain: 'rain',
			snow: 'snow',
			atomosphere: 'fog',
			clear: 'day-sunny',
			cloudy: 'day-cloudy',
			clouds: 'cloud'
		},
		night: {
			clear: 'night-clear',
			cloudy: 'night-cloudy'
		}
	}
	
	const [pos, setPos] = useState({lat: '',lon: ''})
  const [isLoading, setIsLoading] = useState(true)
	const [dailyForecast, setDailyForecast] = useState([])
	const [list, setList] = useState([])
	const [value, setValue] = useState('')
	const [suggestions, setSuggestions] = useState([])
	const [alert, setAlert] = useState([])


  useEffect(() => {
		if ('geolocation' in navigator) {
			getPos()
			cityLoading(`./city.list.json`)
		}
	}, [])

	const fetchRequest = useCallback(
		() => {
			setIsLoading(true)
			setState(state => ({...state, isHidden: true}))
			getPos()
		},
		[],
	)

  const getPos =  () => {
		if (isLoading) {
			navigator.geolocation.getCurrentPosition( position => {
				const latitude = position.coords.latitude.toFixed(4)
				const longitude = position.coords.longitude.toFixed(4)
				setPos({...pos, lat: latitude, lon: longitude })
				getWeather(latitude, longitude)
				setIsLoading(false)
			})
		} 
 }

 const cityLoading = async (data) => {
	 try {
		const cities = await fetch(data)
		const cityList = await cities.json()
		setList(cityList)
	 } catch (error) {
		 console.log(error);
	 }
 }
 
const getWeather = async (latitude, longitude) => {
	try {
		const curr = await fetch(
			value
				? `${API.base}weather?q=${value}&appid=${API.key}`
				: `${API.base}weather?lat=${latitude}&lon=${longitude}&&appid=${API.key}`
		)

		const res1 = await curr.json()
		const { lat, lon } = res1.coord
		const oneCall = await fetch(
			`${API.base}onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API.key}`
		)
		const res2 = await oneCall.json()
		loadState(res1, res2)
		setIsLoading(false)
	} catch (error) {
		console.log(error)
	}
}

	const loadState = (res1, res2) => {
		setState(state => ({...state,
			// res1
			isHidden: !state.isHidden,
			bgColor: changeBg(res2.timezone, res2.current.weather[0].id),
			city: res1.name,
			country: res1.sys.country,
			date: moment.tz(res2.timezone).format('llll'),
			icon: getWeatherIcon(res2.current.weather[0].id, res2.timezone, true),
			description: res2.current.weather[0].description,
			celcius: toCelcius(res1.main.temp),
			temp_max: toCelcius(res1.main.temp_max),
			temp_min: toCelcius(res1.main.temp_min),
			feels_like: toCelcius(res1.main.feels_like),
			wind: Math.round(res1.wind.speed * 3.6),
			windDirection: getWindDirections(res1.wind.deg, false),
			windDirectionIcon: getWindDirections(res1.wind.deg, true),
			gust: Math.round(res1.wind.gust * 3.6),
			humidity: res1.main.humidity,
			pressure: res1.main.pressure,
			// res2
			dew_point: toCelcius(res2.current.dew_point),
			sunrise: moment.unix(res1.sys.sunrise).tz(res2.timezone).format('h:mm A'),
			sunset: moment.unix(res1.sys.sunset).tz(res2.timezone).format('h:mm A'),
		}))
		
		setDailyForecast(res2.daily)
		setAlert(res2.alerts)
	}

	const handleChange = (value) =>{
		let matches = []
		const regex = new RegExp(`^${value}`, 'gi')
		if (value.length > 2) {
			matches = list.filter((val) => {
			return  val.name.match(regex)
			})
		}
		setSuggestions(matches)
		setValue(value)
		setState(state =>({...state, city: value}))
	}

	const listSelected = (value) => {
		setSuggestions([])
		setValue(value)
		setState(state =>({...state, city: value}))
	}

	const handleSubmit = (e) => {
			setSuggestions([])
			e.preventDefault()
			if (state.city === value) {
				getWeather()
			}
	}

	const deleteAlert = (id) => {
		setAlert(alert.filter((val, i) => i !== id))
	}
	
	const handleToggle = () => {
		setState(prevState => ({...prevState , isHidden: !state.isHidden}))
		setSuggestions([])
			if (state.city === value) {
				setState(prevState => ({...prevState , isHidden: state.isHidden}))
				getWeather()
			}
	}

	const toCelcius = (temp) => {
		let celcius = Math.round(temp - 273.15)
		return celcius
	}

	const getWeatherIcon = (rangeId, tz, state) => {
		const hr = moment.tz(tz).hour()
		const daytime = hr > 5 && hr < 17
		const nighttime = !daytime
		const allday = hr <= 24

		if (allday && rangeId >= 200 && rangeId <= 232) {
			return weatherIcon.day.thunderstorm
		} else if (allday && rangeId >= 300 && rangeId <= 321) {
			return weatherIcon.day.drizzle
		} else if (allday && rangeId >= 500 && rangeId <= 531) {
			return weatherIcon.day.rain
		} else if (allday && rangeId >= 600 && rangeId <= 622) {
			return weatherIcon.day.snow
		} else if (allday && rangeId >= 701 && rangeId <= 781) {
			return weatherIcon.day.atomosphere
		} else if (state && daytime && rangeId === 800) {
			return weatherIcon.day.clear
		} else if (state && nighttime && rangeId === 800) {
			return weatherIcon.night.clear
		} else if (state && daytime && rangeId === 801) {
			return weatherIcon.day.cloudy
		} else if (state && nighttime && rangeId === 801) {
			return weatherIcon.night.cloudy
		}
		if (!state && allday && rangeId === 800) {
			return weatherIcon.day.clear
		} else if (!state && allday && rangeId === 801) {
			return weatherIcon.day.cloudy
		} else {
			return weatherIcon.day.clouds
		}
	}

	const changeBg = (tz, rangeId) => {
		const hr = moment.tz(tz).hour()
		switch (true) {
			case hr > 4 && hr < 11 && (rangeId === 800 || rangeId === 801):
				return variables.morningSun

			case hr > 4 && hr < 11 && rangeId !== 800:
				return variables.morningRain

			case hr > 10 && hr < 16 && (rangeId === 800 || rangeId === 801):
				return variables.noonSun

			case hr > 10 && hr < 16 && rangeId !== 800:
				return variables.noonRain

			case hr > 15 && hr < 18 && (rangeId === 800 || rangeId === 801):
				return variables.eveSun

			case hr > 15 && hr < 18 && rangeId !== 800:
				return variables.eveRain

			case ((hr >= 0 && hr < 6) || (hr > 17 && hr < 25)) &&
				(rangeId === 800 || rangeId === 801):
				return variables.night

			case ((hr >= 0 && hr < 5) || (hr > 17 && hr < 25)) && rangeId !== 800:
				return variables.nightRain

			default:
				return variables.morningSun
		}
	}

	const getWindDirections = (deg, lc) => {
		const directions = [
			'N','NE','ENE','E','NNE','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'
		]
		const lowerCase = directions.map((lc) => lc.toString().toLowerCase())
		const val = Math.round(deg / 22.5 + (0.5 % 16))

		if (!lc) {
			return directions[val]
		} else {
			return lowerCase[val]
		}
	}

		const loading = (
			<div
				className='d-flex justify-content-center align-items-center'
				style={{ height: '70vh' }}
			>
				<span
					className='spinner-border spinner-border-lg'
					role='status'
					aria-hidden='true'
				></span>
				<span className='ms-2'>
					Loading the weather forecast for your current location...
				</span>
			</div>
		)

			const loadWeather = () => {
				if(isLoading && state.isHidden) {
					return loading
				} else if (!isLoading && !state.isHidden)
				return <Main
				{...state}
				dailyForecast={dailyForecast}
				toCelcius={toCelcius}
				getWeatherIcon={getWeatherIcon}
			/>
			}


	return (
		<React.Fragment>
		<Helmet>
			<style>{`body { background-color: ${state.bgColor}; }`}</style>
		</Helmet>
		<Header
			{...state}
			handleSubmit={handleSubmit}
			handleChange={e => handleChange(e.target.value)}
			handleToggle={handleToggle}
			deleteAlert={deleteAlert}
			alert={alert}
			list={list}
			suggestions={suggestions}
			listSelected={listSelected}
			fetchRequest={fetchRequest}
		/>
		 {!state.hidden && loadWeather()}

	</React.Fragment>
	)
}

export default App 