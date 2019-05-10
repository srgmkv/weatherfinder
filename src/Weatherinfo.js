import React from 'react';
import ForecastBlock from './Forecastblock'; //подключаем компонент для отображения прогноза

export default class WeatherInfo extends React.Component {

	render() {
		const { name, main, wind, id, weather } = this.props.weatherData

		//проверяем, есть ли город в избранном, фильтруя список избранного по id
		const itemById = this.props.favCitieslist.filter(item => item.locationId === id)
		const starIco = itemById.length ? 'star1.svg' : 'star0.svg'; //условие для выборки иконки

		//вещаем на иконку обработчик удалить/добавить и своейства, в зависимости от от того, есть ли город в списке
		const favicon = <img src={starIco} alt="" 
			onClick={itemById.length ? () => this.props.removeFromFavList(id) : this.props.addToFav}
			title={itemById.length ? "Remove from Favorites" : "Add to Favorites"} width="25px" />

		return (
			<>
				{/*создаем компонент, отображающий данные по поиску*/}
				<div className="curr-temp weather px-2 py-1">
					<span className="current-header">Weather in <span className="city">{name}</span>:</span> {favicon}
					<br />
					<span className="temp">Temp: {Math.round(main.temp - 273)} °C, </span>
					wind: {wind.speed} m/s,
					humidity: {main.humidity}%,
					pressure: {Math.round(main.pressure * 0.7501)}&nbsp;mmHg,&nbsp;
					{weather[0].description}
				</div>
				<ForecastBlock // отображаем компонент с прогнозом
					requestForecast={this.props.requestForecast} />
			</>
		)
	}

}


