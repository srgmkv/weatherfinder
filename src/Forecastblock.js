import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

//console.log('Forecast', this.props.requestForecast)

export default class ForeCastBlock extends React.Component {


  render() {
    //
    const list = this.props.requestForecast.list.filter((item, ind) => {
      if (ind % 5 === 0) return item
    });
    console.log('Forecast', list)
    const labels = list.map(item => {
      const data = new Date(item.dt_txt)
      const date = data.getDate();
      const month = data.getMonth();const mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const hours = data.getHours();
      return `${date}/${month+1} ${hours}h`
    })
    console.log('labels', labels)

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




    return (
      <div>
        <h2>Forecast</h2>
        <Line data={data} />
      </div>
    );
  }

}
