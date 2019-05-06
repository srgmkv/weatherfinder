import React from 'react';

class Favlist extends React.Component {
  

  render() {
    const list = this.props.citiesList;
    //console.log('list', list);
    const favList = list.map((item, index) => {
      return (
      <React.Fragment key={item.locationId} >
      <li id={index}>{item.cityName}
      <span className="ml-3"onClick={() => this.props.removeFromFavList(index)}>&times;</span></li>
      
      </React.Fragment>
      )
    })

    return (
      <>
      <p className="bg-success pl-2 text-white">Favorites</p>
      <ul>
        {favList}
      </ul>
      </>
      
    )
  }
}

export default Favlist;