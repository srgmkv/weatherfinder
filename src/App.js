import React from 'react';
import Weatherinfo from './Weatherinfo';
import './App.css';
import Searchform from './Searhform';
import Favlist from './Favlist';
import LocalWeatherBlock from './Locweatherblock';
import _ from 'lodash'
//import SearchResult from './SearchResult';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			requestedLocation: 'Moscow',
			localCurrentWeather: {},
			localForecast: {},
			localDataLoaded: false,
			localUserData: {
				lat: null,
				lon: null,
				locationName: null
			},

			favCitieslist: [],

			requestDataLoaded: false,
			requestCurrentWeather: {},
			requestForecast: {},

			searchedCitiesData: []
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value.charAt(0).toUpperCase() + value.slice(1) })
	}

	addToFav = () => {
		const id = this.state.requestCurrentWeather.id
		const location = this.state.requestCurrentWeather.name;
		const itemToPush = [{
			cityName: location,
			locationId: id,
			//id: this.state.favCitieslist.length
		}];

		const favList = [...this.state.favCitieslist];
		const updList = _.unionBy(favList, itemToPush, 'locationId');
		this.setState({ favCitieslist: updList });
	}

	removeFromFavList = (id) => {
		const favList = [...this.state.favCitieslist];
		const updList = favList.filter(item => item.locationId !== id)
		/* .map((item, index) => {
			item.id = index
			return item
		}); */
		this.setState({ favCitieslist: updList });
	}

	fetchToState = (url, key, dataTypeLoaded, func) => {
		this.setState({ [dataTypeLoaded]: false });
		fetch(url)
			.then(response => response.json()).then(response => {
				this.setState({
					[key]: response,
					[dataTypeLoaded]: true
				});
				//func()
			})
	};

	handleClick = (location = this.state.requestedLocation) => {
		const apikey = '2b0c757f5810cdb1eb3a945f283be600';
		const preUrl = 'http://api.openweathermap.org/data/2.5/';
		const url1 = `${preUrl}weather?q=${location}&appid=${apikey}`;
		this.fetchToState(url1, 'requestCurrentWeather', 'requestDataLoaded');

		const url2 = `${preUrl}forecast?q=${location}&appid=${apikey}`;
		this.fetchToState(url2, 'requestForecast', 'requestDataLoaded');

	}

	getUserLocalWeatherData = () => {
		const apikey = '2b0c757f5810cdb1eb3a945f283be600';
		const preUrl = 'http://api.openweathermap.org/data/2.5/'

		fetch(`https://json.geoiplookup.io/`)
			.then(res => res.json()).then(resp => {
				this.setState({
					localUserData: {
						lat: resp.latitude,
						lon: resp.longitude,
						locationName: resp.city
					}
				});

				const { lat, lon } = this.state.localUserData;
				const url1 = `${preUrl}weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
				this.fetchToState(url1, 'localCurrentWeather', 'localDataLoaded');
				const url2 = `${preUrl}forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;
				this.fetchToState(url2, 'localForecast', 'localDataLoaded');
			})
	}

	componentWillMount() {
		this.getUserLocalWeatherData();
		this.handleClick();

	};

	/*butClick = () => {
		this.setState({ searchedCitiesData: [] })
	
		fetch('https://raw.githubusercontent.com/srgmkv/citiescont/master/cities.list.json')
			.then(res => res.json())
			.then(data => {
				const filtered = data.filter(item => item.name === this.state.requestedLocation)
				//console.log('filtered', filtered)
				this.setState({
					searchedCitiesData: filtered,
				})
	
			})
	
	}*/


	render() {
		const { localDataLoaded, localCurrentWeather,
			requestDataLoaded, requestCurrentWeather } = this.state;

		return (
			<>
				<div className="header pl-4 pt-2">All you want to know about weather</div>
				<div id="main">
					<div className="container">
						<div className="row">
							<div className="col-sm-3 border LOCAL">
								{localDataLoaded && localCurrentWeather.cod === 200 ?
									<LocalWeatherBlock
										weatherData={localCurrentWeather}
										addToFav={this.addToFav}

									/> : <div className="spinner-grow spinner-grow-sm"></div>}
							</div>
							<div className="col-sm-9">



								<div className="row">
									<div className="col-sm-8 REQUEST">

										<Searchform
											handleChange={this.handleChange}
											handleClick={this.handleClick}
										/>
										<span>Searching result:</span>
										{requestDataLoaded && requestCurrentWeather.cod === 200 &&

											<Weatherinfo
												weatherData={requestCurrentWeather}
												addToFav={this.addToFav}
												removeFromFavList={this.removeFromFavList}
												favCitieslist={this.state.favCitieslist} />
										}
									</div>
									<div className="col-sm-4 border ">
										{this.state.favCitieslist.length > 0 && <Favlist
											citiesList={this.state.favCitieslist}
											removeFromFavList={this.removeFromFavList}
											handleClick={this.handleClick}
										/>}
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
