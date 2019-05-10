import React from 'react';

class Favlist extends React.Component {

  updFavList = () => {
    const list = this.props.citiesList;
    const listId = list.map(item => item.locationId).toString()
    console.log(listId.toString())
    const apikey = '2b0c757f5810cdb1eb3a945f283be600';
    const preUrl = 'http://api.openweathermap.org/data/2.5/';
    const url = `${preUrl}group?id=${listId}&appid=${apikey}`;

    fetch(url).then(resp => resp.json()).then(resp => {
      const updList = resp.list.map(item => {
        item = {
          cityName: item.name,
          locationId: item.id,
          currentTemp: `${Math.round(item.main.temp - 273)} °C`
        }
        console.log('item', item, new Date())
        return item
      })
      this.props.updateFavListByTemp(updList);
    })
  }

//обновляем показания температуры в избранных городах каждые 15 минут
  componentDidMount() {
    this.updFavList();
    setInterval(() => {
      this.updFavList();
    }, 900000);
  }

  render() {
    const list = this.props.citiesList;
    const favList = list.map((item) => {
      return (
        <React.Fragment key={item.locationId} >
          <div className=" favlist-item ml-0 pl-0" >
            <span className="ml-0 remove" title="remove from list" onClick={() => this.props.removeFromFavList(item.locationId)}>&times;</span>
            <span onClick={() => this.props.handleClick(item.cityName)}>
              {item.cityName} {item.currentTemp}
            </span>
          </div>
        </React.Fragment>
      )
    })

    return (
      <>
        <div className="bg-success text-white text-center rounded-sm mb-1">Favorites </div>
        {/*<span onClick={this.updFavList}>Update </span>*/}
        {favList}

      </>

    )
  }
}

export default Favlist;