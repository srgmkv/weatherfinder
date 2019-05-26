import React from 'react';
import './App.css';
import Weatherinfo from './Weatherinfo'; // компонент рендерит погоду и прогноз в искомом городе
import LocalWeatherBlock from './Locweatherblock'; //рендерит текущую погоду в локации юзера
import Searchform from './Searhform'; // рендерит форму для ввода поискового запроса
import Favlist from './Favlist'; // рендерит список избранных городов
import unionBy from 'lodash.unionby'; // возьмем ф-ю для добавления значения в массив, если оно уникально

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			localCurrentWeather: {}, //здесь сохраним данные о погоде в локации юзера
			localUserData: { // данные о его локации
				lat: null,
				lon: null,
				locationName: null
			},
			favCitieslist: [], //список мест в избранное
			requestedLocation: "", // здесь храним location, по которой делаем поиск
			requestCurrentWeather: {}, //погода по запрашиваемому месту
			requestForecast: {}, // прогноз по запрашиваемому месту
		};
	}
	//делаем поисковое поле ввода контролируемым, данные из него добавляем в requestedLocation
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value.charAt(0).toUpperCase() + value.slice(1) })
	}

	//добавляем город из результата поиска в избранное
	addToFav = () => {
		const { id, name, main } = this.state.requestCurrentWeather;
		const locationToPush = [{ //создаем объект для добавления в список
			cityName: name,
			locationId: id,
			currentTemp: `${Math.round(main.temp - 273)} °C`
		}];
		//запишем и будем хранить данные избранного в localStorage
		const favList = [...this.state.favCitieslist];
		const updList = unionBy(favList, locationToPush, 'locationId'); //используем ф-ю из lodash, добавляем локацию в избранное, если его там нет
		this.setState({ favCitieslist: updList });
		localStorage.setItem('favlist', JSON.stringify(updList));
	}

	//удаляем город из избранного
	removeFromFavList = (id) => {
		const favList = [...this.state.favCitieslist];
		const updList = favList.filter(item => item.locationId !== id)
		this.setState({ favCitieslist: updList });
		localStorage.setItem('favlist', JSON.stringify(updList));
	}

	//обработчик для обновления значения температур в стейте /Избранное/
	updateFavListByTemp = (list) => {
		this.setState({ favCitieslist: list });
		localStorage.setItem('favlist', JSON.stringify(list));
	}    //********/


	//вспомогательный метод для запроса данных с API и обнвления нужного стейта
	fetchToState = (url, key, dataTypeLoaded) => {
		fetch(url)
			.then(response => response.json()).then(response => {
				this.setState({
					[key]: response
				});
			})
	};

	//обрабатываем поисковой запрос
	handleClick = (location = this.state.requestedLocation) => {
		const apikey = '2b0c757f5810cdb1eb3a945f283be600';
		const preUrl = 'https://api.openweathermap.org/data/2.5/';
		const url1 = `${preUrl}weather?q=${location}&appid=${apikey}`;
		this.fetchToState(url1, 'requestCurrentWeather', 'requestDataLoaded'); //запрашиваем данные о текущей погоде и обновляем стейт

		const url2 = `${preUrl}forecast?q=${location}&appid=${apikey}`;
		this.fetchToState(url2, 'requestForecast', 'requestDataLoaded'); //запрашиваем данные о прогнозе

	};

	//данный метод запрашивет погоду по локации пользователя
	getUserLocalWeatherData = () => {
		const apikey = '2b0c757f5810cdb1eb3a945f283be600';
		const preUrl = 'https://api.openweathermap.org/data/2.5/'

		fetch(`https://json.geoiplookup.io/`) // обращаемся к API, который определяет ip юзера и его локацию
			.then(res => res.json()).then(resp => {
				this.setState({
					localUserData: {
						lat: resp.latitude,
						lon: resp.longitude,
						locationName: resp.city
					}
				});

				const { lat, lon } = this.state.localUserData; //по этим данным запрашивается погоду для локации юзера
				const url1 = `${preUrl}weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
				this.fetchToState(url1, 'localCurrentWeather', 'localDataLoaded');
			})
	};

	componentWillMount() {
		this.getUserLocalWeatherData(); //при загрузке показываем погоду в локации юзера
		const favlist = JSON.parse(localStorage.getItem('favlist')); //берем данные из localStorage
		if (favlist) this.setState({ favCitieslist: favlist }); //если там не пусто, обновляем стейт для избранного
	};

	render() {
		const { localCurrentWeather,
			requestCurrentWeather, requestForecast } = this.state;

		return (
			<>
				<div className="header pl-4 pt-2 m-0">WEATHER FINDER</div>
				<div className="main">
					<div className="container">
						<div className="row">
							<div className="col-sm-9 px-1">
								<div className="local weather px-2 py-1">
									{localCurrentWeather.cod === 200 ? //если данные о погоде получены, показываем блок с локальной погодой
										<LocalWeatherBlock
											weatherData={localCurrentWeather} //передаем туда данные о погоде
											handleClick={this.handleClick} //и обработчик для показа прогноза

										/> : <div className="spinner-grow spinner-grow-sm"></div>}
								</div>
								<Searchform // компонент выводящий и обрабатывающий действия с полем поиска
									handleChange={this.handleChange} //передаем ввод в стейт
									handleClick={this.handleClick} // передаем обрабочик нажатия на кнопку *поиск*
								/>
								{requestForecast.cod === '200' && //если данные о текущей погоде искомого места
									requestCurrentWeather.cod === 200 && // и данные о прогнозе получены

									<Weatherinfo // то отображаем компонент, выводящий погоду и прогноз
										weatherData={requestCurrentWeather} // передаем полученные данные о прогоде
										requestForecast={this.state.requestForecast} //прогноз
										addToFav={this.addToFav} //обработчик добавления в избранное
										removeFromFavList={this.removeFromFavList} // удаления из избранного
										favCitieslist={this.state.favCitieslist} // стейт с избранным

									/>

								}
							</div>
							<div className="col-sm-3 p-0 pb-2 favlist ">
								{this.state.favCitieslist.length > 0 &&  // отображаем избранное, если список не пуст
									<Favlist //передаем в компонент данные и методы для работы со списком избранного
										citiesList={this.state.favCitieslist}
										removeFromFavList={this.removeFromFavList}
										handleClick={this.handleClick}
										updateFavListByTemp={this.updateFavListByTemp}
									/>}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default App;
