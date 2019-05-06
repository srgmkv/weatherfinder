import React from 'react';
//import { OnMap } from './Onmap';

export default class WeatherInfo extends React.Component {

	render() {
		const { name, main, wind, id/*coord */ } = this.props.weatherData
		//console.log('id', id)
		//console.log('this.props.', this.props)

		return (
			<>
				<button type="button" className="btn btn-primary btn-sm mb-2"
					onClick={this.props.addToFav}>
					Add to fav</button>
				<p className="pt-2 pl-1">Погода в {name} такова:<br />
					ветер: {wind.speed}<br />
					температура: {Math.round(main.temp - 273)}<br />
					влажность: {main.humidity}<br />
					давление, мм.рт.ст.: {Math.round(main.pressure * 0.7501)}
				</p>
				<button type="button" className="btn btn-warning btn-sm mb-2"
					onClick={() => this.props.handleClick('hourly')}>Horly 4 day</button>
				<button type="button" className="btn btn-warning btn-sm ml-2 mb-2"
					onClick={() => this.props.handleClick('5d3h')}>5 Day</button>
				{/*<OnMap coord={coord} />*/}
			</>
		)
	}

}


