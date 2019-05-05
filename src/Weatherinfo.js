import React from 'react';
//import { OnMap } from './Onmap';

export default class WeatherInfo extends React.Component {

	render() {
		const { name, main, wind, /*coord */} = this.props.weatherData
		//console.log('this.props.', this.props)

		return (
			<>
				<p>Погода в {name} такова:<br />
					ветер: {wind.speed}<br />
					температура: {Math.round(main.temp - 273)}<br />
					влажность: {main.humidity}<br />
					давление, мм.рт.ст.: {Math.round(main.pressure * 0.7501)}
				</p>
				{/*<OnMap coord={coord} />*/}
			</>
		)
	}

}


