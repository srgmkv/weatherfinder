import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

//console.log('Forecast', this.props.requestForecast)

export default class ForeCastBlock extends React.Component {
  constructor() {
    super()
    this.state = {
			isChartShown: false
		}
  }

handlerClick = () => {
	this.setState({isChartShown: !this.state.isChartShown})
}

	render() {

		const filtered = this.props.requestForecast.list.filter(item => {
			const data = new Date(item.dt_txt);
			const hour = data.getHours();
			return (hour === 6 || hour === 14 || hour === 22) ? item : null;
		})
		console.log('filtered', filtered)

		const list = filtered;
		//console.log('Forecast', list)
		const labels = list.map(item => {
			const data = new Date(item.dt_txt)
			const date = data.getDate();
			const month = data.getMonth(); const mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
					data: list.map(item => Math.round(item.main.temp - 273)),

				}
			]
		};
		//console.log('labels', labels)


		const filteredFunc = day => {
			const curDay = day + new Date().getDate()
			const mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			const curMonth = mlist[new Date().getMonth()];
			const arr = filtered.filter(item => {
				const data = new Date(item.dt_txt);
				const date = data.getDate();
				return date === curDay ? item : null;
			})
			const tdDateJsx = <td className="date">{curDay} {curMonth}</td>
			const arrToJsx = arr.map(item => {
				return <td key={item.dt}>
				<span id="temp">{Math.round(item.main.temp - 273)} °C, </span> 
					wind: {Math.round(item.wind.speed)}<br />
					{item.weather[0].description}
				</td>
			})

			console.log('arr',arr )
			if (!arr.length) return;
			if (!arr[0].dt_txt.includes('06:00')) {

				if (!arr[0].dt_txt.includes('14:00')) {
					return <>{tdDateJsx}<td></td><td></td>{arrToJsx}</>
				}
				return <>{tdDateJsx}<td></td>{arrToJsx}</>
			}
			return <>{tdDateJsx}{arrToJsx}</>
		}

		const theader = <thead><tr><th></th><th>06:00</th><th>14:00</th><th>22:00</th></tr></thead>
const showHidebut = this.state.isChartShown ? 'Hide chart' : 'Show chart below'
		return (
			<div>
				{this.props.requestForecast.cod === '200' && 
				
				<div className="tablediv ">

				<table>
					<caption >Forecast:</caption>
				{theader}

					<tbody>
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
				{ this.state.isChartShown &&
				<div className="chart">
				<Line data={data} />
				</div>}
			</div>
		);
	}




}
