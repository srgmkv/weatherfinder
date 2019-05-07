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

   componentDidMount() {
     this.updFavList();
    setInterval(() => {
      this.updFavList();
    }, 20000000);
  } 

  render() {
    const list = this.props.citiesList;
    const favList = list.map((item) => {
      return (
        <React.Fragment key={item.locationId} >
          <div className="item-favlist ml-2" >
            <span onClick={() => this.props.handleClick(item.cityName)}>
              {item.cityName} {item.currentTemp}
            </span>
            <span className="ml-3" onClick={() => this.props.removeFromFavList(item.locationId)}>&times;</span>
          </div>
        </React.Fragment>
      )
    })

    return (
      <>
        <p className="bg-success pt-0 text-white text-center rounded-sm">Favorites </p>
        <span onClick={this.updFavList}>Update </span>
        {favList}

      </>

    )
  }
}

export default Favlist;