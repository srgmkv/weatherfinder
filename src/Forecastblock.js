import React from 'react';
import { Line, Bar } from 'react-chartjs-2'; //импорт бибилиотеки для отрисовки графиков

export default class ForeCastBlock extends React.Component {
	constructor() {
		super()
		this.state = {
			isChartShown: false  //здесь будет своё состояние: отображен ли график
		}
	}

	//обрабатываем нажатие на кнопку *скрыть/показать график*
	handlerClick = () => {
		this.setState({ isChartShown: !this.state.isChartShown })
	}

	render() {
		//здесь будем работать с данными о прогнозе - рисовать по ним таблицу и график
		const filtered = this.props.requestForecast.list.filter(item => {
			const data = new Date(item.dt_txt);
			const hour = data.getHours();
			return (hour === 6 || hour === 15 || hour === 21) ? item : null; //отфильтруем данные по трем часовым точкам
		})

		//данные для отрисовки графика(ов)
		const labels = filtered.map(item => {
			const data = new Date(item.dt_txt)
			const date = data.getDate();
			const month = data.getMonth();
			const mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			const hours = data.getHours();
			return `${date}/${month + 1} ${hours}h`
		})

		const data = {
			labels: labels,
			datasets: [
				{
					label: 'Temp',
					fill: false,
					lineTension: 0.1,
					borderColor: 'rgba(223, 117, 41 ,1)',
					pointRadius: 4,
					pointHitRadius: 5,
					pointStyle: 'rectRounded',
					data: filtered.map(item => Math.round(item.main.temp - 273)),

				}
			]
		};

		/*вспомогательная функцию для отрисовки строк таблицы. Зная, что прогноз дается максимум на 5 дней, включая текущий,
		будем передавать туда номер дня. Функция будет возвращать JSX, 
		*/
		const filteredFunc = day => {
			const curDay = day + new Date().getDate()
			const mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			const curMonth = mlist[new Date().getMonth()];
			//сортируем входящий массив по нужному дню
			const arr = filtered.filter(item => {
				const data = new Date(item.dt_txt);
				const date = data.getDate();
				return date === curDay ? item : null;
			})
			const tdDateJsx = <td className="date">{curDay} {curMonth}</td>
			//формируем JSX для отрисовки строкитаблицы с данными
			const arrToJsx = arr.map(item => {
				return <td key={item.dt}>
					<span id="temp">{Math.round(item.main.temp - 273)} °C, </span>
					wind: {Math.round(item.wind.speed)}<br />
					{item.weather[0].description}
				</td>
			})

			if (!arr.length) return; //если данных не хватило на 5 день, то не рисуем строку
			//далее проверяем данные дня (для начального и конечного), если они не на полный день, рисуем строку со сдвигом ячеек
			if (!arr[0].dt_txt.includes('06:00')) {

				if (!arr[0].dt_txt.includes('15:00')) {
					return <>{tdDateJsx}<td></td><td></td>{arrToJsx}</>
				}
				return <>{tdDateJsx}<td></td>{arrToJsx}</>
			}
			return <>{tdDateJsx}{arrToJsx}</>
		}

		//хедер таблицы
		const theader = <thead><tr><th></th><th>06:00</th><th>15:00</th><th>21:00</th></tr></thead>
		// надпись на кнопке скрыть/показать
		const showHidebut = this.state.isChartShown ? 'Hide chart' : 'Show temp chart below'
		return (
			<div>
				{this.props.requestForecast.cod === '200' && //если прогноз получен, рисуем таблицу
					<div className="tablediv ">

						<table>
							<caption >Forecast:</caption>
							{theader}
							<tbody>{/* рендерим строки таблицы */}
								<tr>{filteredFunc(0)}</tr>
								<tr>{filteredFunc(1)}</tr>
								<tr>{filteredFunc(2)}</tr>
								<tr>{filteredFunc(3)}</tr>
								<tr>{filteredFunc(4)}</tr>
							</tbody>
						</table>
						<button className="showchart my-2" onClick={this.handlerClick}>{showHidebut}</button>
					</div>
				} 
				{this.state.isChartShown && //показываем/скрываем график
					<div className="chart">
						<Line data={data} />
					</div>}
			</div>
		);
	}




}
