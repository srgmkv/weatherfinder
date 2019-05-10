import React from 'react';
//import { OnMap } from './Onmap';
import Forecastblock from './Forecastblock';

export default class WeatherInfo extends React.Component {

	render() {
		const { name, main, wind, id, weather} = this.props.weatherData
		const itemById = this.props.favCitieslist.filter(item => item.locationId === id)
		const starIco = itemById.length ? 'star1.svg' : 'star0.svg';

    const favicon = <img src={starIco} alt=""
							onClick={itemById.length ? () => this.props.removeFromFavList(itemById[0].locationId) : this.props.addToFav}
							title={itemById.length ? "Remove from Favorites" : "Add to Favorites"} width="20px" />

		return (
			<>

				<div className="curr-temp weather px-2 py-1"> 
				<span classname="current-header">Weather in <span className="city">{name}</span>:</span> {favicon}
					<br />
					<span className="temp">Temp: {Math.round(main.temp - 273)} °C, </span>
					wind: {wind.speed} m/s,
					humidity: {main.humidity}%,
					pressure: {Math.round(main.pressure * 0.7501)}&nbsp;mmHg,&nbsp;
					{weather[0].description}
				</div>
				{/*<OnMap coord={coord} />*/}
				
				
						
					
				
				<Forecastblock
					requestForecast={this.props.requestForecast} />
			</>
		)
	}

}


