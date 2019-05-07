import React from 'react';

class LocalWeatherBlock extends React.Component {
  render() {
		const { name, main, wind} = this.props.weatherData
		

		return (
			<>
				<p className="pt-2 pl-1">Now in {name}:
				
					<br />
					Temp: {Math.round(main.temp - 273)} C,
					wind: {wind.speed} m/s,
					humidity: {main.humidity}%,
					pressure: {Math.round(main.pressure * 0.7501)}&nbsp;mmHg
				</p>
				{/*<OnMap coord={coord} />*/}
			</>
		)
	}
}

export default LocalWeatherBlock;
