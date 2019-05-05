import React from 'react';
import Weatherinfo from './Weatherinfo';
import './App.css';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			locationSearch: null,
			data: {},
			dataLoaded: false,
			userLocation: {
				lat: null,
				lon: null
			}
		};
	}

	handleCahnge = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value })
	}

	toFetchWeatherData = (url) => {
		fetch(url)
			.then(response => response.json())
			.then(response => {
				//console.log('response', response)
				this.setState({
					data: response,
					dataLoaded: true
				})
				console.log(this.state.data.wind.speed)
			})
	}

	handleClick = () => {
		this.setState({ dataLoaded: false })

		const apikey = '2b0c757f5810cdb1eb3a945f283be600';
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.locationSearch}&appid=${apikey}`;
		console.log(url);
		this.toFetchWeatherData(url);


	}

	getUserLocalWeather = () => {
		fetch(`https://json.geoiplookup.io/`)
			.then(res => res.json())
			.then(resp => {
				//console.log('resp', resp)
				this.setState({
					userLocation: {
						lat: resp.latitude,
						lon: resp.longitude
					}
				})

				const { lat, lon } = this.state.userLocation;
				console.log('this.state.userLocation', this.state.userLocation)
				const apikey = '2b0c757f5810cdb1eb3a945f283be600';
				const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
				this.toFetchWeatherData(url);
				//console.log('url', url)

			})
	}
	componentWillMount() {
		this.getUserLocalWeather();
		//this.handleClick();

	};

	butClick = () => {
		fetch('https://raw.githubusercontent.com/srgmkv/citiescont/master/cities.list.json')
			.then(res => res.json())
			.then(data => {
				//console.log(data);
				const filtered = data.filter(item => item.name === this.state.locationSearch)
				console.log('filtered', filtered)
				this.setState({ citiesdata: filtered })

			})

	}


	render() {
		const { dataLoaded, data } = this.state
		return (
			<>
				<div id="header">А теперь - о погоде:</div>
				<div id="main">
					<input type="text" name="locationSearch" onChange={this.handleCahnge} />
					<button onClick={this.handleClick}>Search</button>
					<button onClick={this.butClick}>city</button>
					<br />

					{dataLoaded && data.cod === 200 ? <Weatherinfo weatherData={data} /> : <div className="spinner-border text-danger"></div>}
					
				</div>
			</>
		)
	}
}

export default App;
