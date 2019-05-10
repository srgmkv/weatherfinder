import React from 'react';

/*компонент для отображения текущей погоды в локации пользователя.
Это похоже на компонент WeatherInfo, но он немного кастомизирован */
class LocalWeatherBlock extends React.Component {
	render() {
		const { name, main, wind, weather } = this.props.weatherData


		return (
			<>
				<div><span className="current-header"
					onClick={() => this.props.handleClick(name)} // показываем прогноз по клику на локацию
					title="Click to show forecast"
				>Your local weather in <span className="city">{name}</span></span>
					<br />
					Temp: {Math.round(main.temp - 273)} °C,
					wind: {wind.speed} m/s,
					humidity: {main.humidity}%,&nbsp;
					 {weather[0].description}
				</div>
			</>
		)
	}
}

export default LocalWeatherBlock;
