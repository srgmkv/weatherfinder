import React from 'react';

class LocalWeatherBlock extends React.Component {
	render() {
		const { name, main, wind, weather } = this.props.weatherData


		return (
			<>
				<div className="">Your local weather in {name} :

					<br />
					Temp: {Math.round(main.temp - 273)} C,
					wind: {wind.speed} m/s,
					humidity: {main.humidity}%,&nbsp;
					 {weather[0].description}
				</div>
				{/*<OnMap coord={coord} />*/}
			</>
		)
	}
}

export default LocalWeatherBlock;
