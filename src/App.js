import React from 'react';
import Weatherinfo from './Weatherinfo';
import './App.css';
import Searchform from './Searhform';
import Favlist from './Favlist';
import _ from 'lodash'
//import SearchResult from './SearchResult';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			locationSearch: null,
			localWeatherData: {},
			localDataLoaded: false,
			userLocation: {
				lat: null,
				lon: null,
				locationName: null
			},
			favCitieslist: [],
			requestDataLoaded: false,
			requestedWeatherData: {
				currentWeather: {},
				hourlyForecast: {},
				fiveDay3hoursForecast: {}
			},
			searchedCitiesData: []
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value.charAt(0).toUpperCase() + value.slice(1) })
	}

	addToFav = () => {
		const id = this.state.requestedWeatherData.currentWeather.id
		const location = this.state.requestedWeatherData.currentWeather.name;
		const itemToPush = [{
			cityName: location,
			locationId: id,
			id: this.state.favCitieslist.length
		}];

		const favList = [...this.state.favCitieslist];
		const updList = _.unionBy(favList, itemToPush, 'locationId');
		this.setState({ favCitieslist: updList });
	}

	removeFromFavList = (id) => {
		console.log('id', id)

		const favList = [...this.state.favCitieslist];

		const updList = favList.filter(item => item.id !== id)
			.map((item, index) => {
				item.id = index
				return item
			});
		this.setState({ favCitieslist: updList });
	}

	handleClick = (datatype = 'current', location = this.state.locationSearch) => {
		//const location = this.state.locationSearch
		//datatype === 'current' by default || 'hourly' || '5d3h'
		//this.setState({ dataLoaded: false })

		const apikey = '2b0c757f5810cdb1eb3a945f283be600';
		const preUrl = 'http://api.openweathermap.org/data/2.5/';
		let url;
		//console.log('datatype', datatype)

		if (datatype === 'current') {

			url = `${preUrl}weather?q=${location}&appid=${apikey}`;
			fetch(url)
				.then(response => response.json()).then(response => {
					this.setState({
						requestedWeatherData: {
							currentWeather: response,
							hourlyForecast: this.state.requestedWeatherData.hourlyForecast,
							fiveDay3hoursForecast: this.state.requestedWeatherData.fiveDay3hoursForecast
						},
						requestDataLoaded: true
					})
				})
		} else if (datatype === 'hourly') {
			url = `${preUrl}forecast/hourly?q=${location}&appid=${apikey}`
			fetch(url)
				.then(response => response.json()).then(response => {
					this.setState({
						requestedWeatherData: {
							currentWeather: this.state.requestedWeatherData.currentWeather,
							hourlyForecast: response,
							fiveDay3hoursForecast: this.state.requestedWeatherData.fiveDay3hoursForecast
						},
						requestDataLoaded: true
					})
				})
		} else {
			url = `${preUrl}forecast?q=${location}&appid=${apikey}`
			fetch(url)
				.then(response => response.json()).then(response => {
					this.setState({
						requestedWeatherData: {
							currentWeather: this.state.requestedWeatherData.currentWeather,
							hourlyForecast: this.state.requestedWeatherData.hourlyForecast,
							fiveDay3hoursForecast: response
						},
						requestDataLoaded: true
					})
				})
		}



	}

	getUserLocalWeatherData = () => {
		const apikey = '2b0c757f5810cdb1eb3a945f283be600';
		const preUrl = 'http://api.openweathermap.org/data/2.5/'

		fetch(`https://json.geoiplookup.io/`)
			.then(res => res.json()).then(resp => {

				this.setState({
					userLocation: {
						lat: resp.latitude,
						lon: resp.longitude,
						locationName: resp.city
					}
				});

				const { lat, lon } = this.state.userLocation;
				const url = `${preUrl}weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

				fetch(url)
					.then(response => response.json()).then(response => {
						this.setState({
							localWeatherData: response,
							localDataLoaded: true
						})
					});
			})
	}

	componentWillMount() {
		this.getUserLocalWeatherData();

	};

	/*butClick = () => {
		this.setState({ searchedCitiesData: [] })

		fetch('https://raw.githubusercontent.com/srgmkv/citiescont/master/cities.list.json')
			.then(res => res.json())
			.then(data => {
				const filtered = data.filter(item => item.name === this.state.locationSearch)
				//console.log('filtered', filtered)
				this.setState({
					searchedCitiesData: filtered,
				})

			})

	}*/


	render() {
		const { localDataLoaded, localWeatherData, requestDataLoaded } = this.state;
		const { currentWeather } = this.state.requestedWeatherData;

		return (
			<>
				<div id="header">А теперь - о погоде:</div>
				<div id="main">
					<div className="container-fluid">
						<div className="row">
							<div className="col-sm-4 border LOCAL">
								{localDataLoaded && localWeatherData.cod === 200 ?
									<Weatherinfo weatherData={localWeatherData}
										handleClick={this.handleClick}
										addToFav={this.addToFav}

									/> : <div className="spinner-grow spinner-grow-sm"></div>}
							</div>
							<div className="col-sm-8 border">

								<Searchform
									handleChange={this.handleChange}
									handleClick={this.handleClick}
								/>

								<div className="row">
									<div className="col-sm-8 border REQUEST">
										{requestDataLoaded && currentWeather.cod === 200 &&
											<>
												<p>Searching result:</p>
												<Weatherinfo weatherData={currentWeather}
													handleClick={this.handleClick}
													addToFav={this.addToFav} />
											</>
										}
									</div>
									<div className="col-sm-4 border ">
										<Favlist
											citiesList={this.state.favCitieslist}
											removeFromFavList={this.removeFromFavList}
										/>
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
