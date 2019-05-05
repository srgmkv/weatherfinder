import React from 'react';
import Weatherinfo from './Weatherinfo';
import './App.css';
import Searchform from './Searhform';
import Favlist from './Favlist';
import SearchedCities from './Searchedcities';

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
			},
			favcitieslist: [],
			isSearched: false,
			searchedCitiesData: []
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value.charAt(0).toUpperCase() + value.slice(1) })
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
				//console.log(this.state.data.wind.speed)
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
		this.setState({searchedCitiesData: []})
		
		fetch('https://raw.githubusercontent.com/srgmkv/citiescont/master/cities.list.json')
			.then(res => res.json())
			.then(data => {
				//console.log(data);
				const filtered = data.filter(item => item.name === this.state.locationSearch)
				//console.log('filtered', filtered)
				this.setState({ 
					searchedCitiesData: filtered,
				 })

			})

	}


	render() {
		const { dataLoaded, data } = this.state
		return (
			<>
				<div id="header">А теперь - о погоде:</div>
				<div id="main">
					<div className="container-fluid">
						<div className="row">
							<div className="col-sm-4 border">
								{dataLoaded && data.cod === 200 ? <Weatherinfo weatherData={data} /> : <p>{data.message}</p>}
							</div>
							<div className="col-sm-8 border">
							
								<Searchform 
								handleChange={this.handleChange}
								butClick={this.butClick}
								/>
								
								<div className="row">
									<div className="col-sm-8 border">
										<SearchedCities data={this.state.searchedCitiesData} />
									</div>
									<div className="col-sm-4 border ">
										<Favlist />
										</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default App;
