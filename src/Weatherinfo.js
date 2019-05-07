import React from 'react';
//import { OnMap } from './Onmap';

export default class WeatherInfo extends React.Component {

	render() {
		const { name, main, wind, id/*coord */ } = this.props.weatherData
		const itemById = this.props.favCitieslist.filter(item => item.locationId === id)
		const starIco = itemById.length ? 'star1.svg' : 'star0.svg';



		return (
			<>
				<div id="wrap">
					<div className="curr-temp pt-2 pl-1"> Now in {name}:
					<br />
						<span className="temp">Temp: {Math.round(main.temp - 273)} °C, </span>
					wind: {wind.speed} m/s,
					humidity: {main.humidity}%,
					pressure: {Math.round(main.pressure * 0.7501)}&nbsp;mmHg
				</div>
					{/*<OnMap coord={coord} />*/}
					<div className="favico">
						<img src={starIco} alt=""
							onClick={itemById.length ? () => this.props.removeFromFavList(itemById[0].locationId) : this.props.addToFav}
							title="Add to favorite list" width="20px" /></div>
				</div>
			</>
		)
	}

}


