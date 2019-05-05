import React from 'react';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			locationSearch: 'omsk',
				data: {},
			
			dataLoaded: false
		};
	}

	handleCahnge = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value })
	}

	handleClick = () => {
		this.setState({dataLoaded: false})
		const apikey = '2b0c757f5810cdb1eb3a945f283be600';
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.locationSearch}&appid=${apikey}`;
		console.log(url);
		fetch(url)
			.then(response => response.json())
			.then(response => {
				//console.log(response)
				this.setState({
					
				
					data: response,
					dataLoaded: true
					})
				//console.log(this.state.data.wind.speed)
			})
	}

	componentDidMount() {
		
		const apikey = '2b0c757f5810cdb1eb3a945f283be600';
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.locationSearch}&appid=${apikey}`;
		console.log(url);
		fetch(url)
			.then(response => response.json())
			.then(response => {
				//console.log(response)
				this.setState({
					
				
					data: response,
					dataLoaded: true
					})

				
				//console.log(this.state.data.wind.speed)
			})

	}
	render() {
		return (
			<>
				<input type="text" name="locationSearch" onChange={this.handleCahnge} />
				<button onClick={this.handleClick}>Search</button>
				<p>Погода в {this.state.data.name} нонче такая:<br />
					ветер:{this.state.dataLoaded ? this.state.data.wind.speed : 'Loading'}<br />
					ветер:{!this.state.dataLoaded ? 'Loading': this.state.data.wind.speed}<br />
					температура:{}<br />
					влажность: {}<br />
				</p>
			</>
		)
	}
}

export default App;
