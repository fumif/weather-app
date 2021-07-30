import React, {useState} from 'react'
import moment from 'moment'

const Header = (props) => {

	const [showAlert, setShowAlert] = useState({})
	const toggleAlert = (id) => {
		setShowAlert(prev => ({
			...prev,
			[id]: !prev[id]
		}))
}
	const form = (
		<React.Fragment>
			<form className='input-group' onSubmit={props.handleSubmit}>
				<input
					type='text'
					className='form-control'
					onChange={props.handleChange}
					placeholder={props.isLoading ? `...Loading` : `Search City`}
					value={props.city}
				/>
				<div className='input-group-append' id='button-addon4'>
					<button
						className='btn btn-light'
						type='button'
						onClick={props.fetchRequest}
					>
						<i className='fas fa-location-arrow' />
					</button>
					<button
						className='btn btn-light'
						type='button'
						onClick={props.handleToggle}
					>
						<i className='fas fa-search' />
					</button>
				</div>
			</form>
			<ul className='autoComplete'>
				{props.suggestions &&
					props.suggestions.map((val, i) => (
						<li
							key={i}
							onClick={() => props.listSelected(`${val.name}, ${val.country}`)}
						>
							{val.name}, {val.state && `${val.state}, `}
							{val.country}
						</li>
					))}
			</ul>
		</React.Fragment>
	)

	const result = (
		<span className='col text-center lead'>
			{props.city}, {props.country}
			<br />
			<span className='fst-italic'>{props.date}</span>
		</span>
	)
	
	const alerts = () =>
		props.alert.map((alert, index) => (
			<div
				className='alert alert-danger alert-dismissible mb-0 rounded-0'
				key={index}
				style={{ display: alert ? 'block' : 'none' }}
			>
				<button
					type='button'
					className='btn-close'
					aria-label='Close'
					onClick={() => props.deleteAlert(index)}
				></button>
				<strong className='text-uppercase m-auto'>
					{alert.event}{' '}
					{!alert.event.includes('Advisory') &&
						!alert.event.includes('Warning') &&
						`Alert`}
				</strong>{' '}
				<button
					className='btn btn-sm btn-outline-danger ms-2'
					style={{ cursor: 'pointer' }}
					onClick={() => toggleAlert(index)}
				>
					{showAlert[index] ? `Hide Details` : `Read More`}
				</button>
				<p
					style={{ display: showAlert[index] ? 'block' : 'none' }}
					className='mt-1'
				>
					{alert.description}
					<br />
					<small>
						{' '}
						- Issued at
						<strong>
							{moment.unix(alert.start).format('LT, ll')}
							{alert.sender_name && ` from ${alert.sender_name}`}
						</strong>
					</small>
				</p>
			</div>
		))
	
	return (
		<header>
			{props.alert && alerts()}
			<nav className='container-fluid navbar align-items-start'>
				{!props.isHidden ? result : !props.isLoading && form}
				{/* <div className='ms-auto d-flex'> */}
				{(!props.isHidden && result) && (<i
						style={{ cursor: 'pointer' }}
						className='fas fa-search fa-2x'
						onClick={props.handleToggle}
					></i>)}	
				{/* </div> */}
			</nav>
		</header>
	)
}

export default Header
