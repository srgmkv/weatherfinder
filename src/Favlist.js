import React from 'react';

//рендерит Избранное
class Favlist extends React.Component {

  //метод для обновления температур в списке избранного
  updFavList = () => {
    const list = this.props.citiesList;
    const listId = list.map(item => item.locationId).toString() //извлекаем id городов и делаем строку
    const apikey = '2b0c757f5810cdb1eb3a945f283be600';
    const preUrl = 'https://api.openweathermap.org/data/2.5/';
    const url = `${preUrl}group?id=${listId}&appid=${apikey}`;

    fetch(url).then(resp => resp.json()).then(resp => { //запрашиваем данные для списка городов и обновляем избранное
      const updList = resp.list.map(item => {
        item = {
          cityName: item.name,
          locationId: item.id,
          currentTemp: `${Math.round(item.main.temp - 273)} °C`
        }
        return item
      })
      this.props.updateFavListByTemp(updList);
    })
  }

  //обновляем показания температуры в избранных городах при загружке и каждые 15 минут
  componentDidMount() {
    this.updFavList();
    setInterval(() => {
      this.updFavList();
    }, (15 * 60 * 1000));
  }

  render() {
    const list = this.props.citiesList;
    
    //создаем  JSX для отображения списка избранного
    const favList = list.map((item) => {
      return (
        <React.Fragment key={item.locationId} >
          <div> {/*вешаем обработчики на клик по городу и для удаления */}
            <span className="ml-0 remove" title="remove from list" 
            onClick={() => this.props.removeFromFavList(item.locationId)}>&times;</span>
            <span className=" favlist-item ml-0" 
            onClick={() => this.props.handleClick(item.cityName)} title="click to see weatherinfo">
              {item.cityName} {item.currentTemp}
            </span>
          </div>
        </React.Fragment>
      )
      
    })

    return (
      <>
        {/* рендерим список избранного */}
        {favList}

      </>

    )
  }
}

export default Favlist;