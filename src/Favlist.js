import React from 'react';

class Favlist extends React.Component {
  

  render() {
    const list = this.props.citiesList;
    //console.log('list', list);
    const favList = list.map((item) => {
      return (
      <React.Fragment key={item.locationId} >
        <div className="item-favlist ml-2" >
      <span onClick={() => this.props.handleClick(item.cityName)}>{item.cityName}</span>
      <span className="ml-3"onClick={() => this.props.removeFromFavList(item.locationId)}>&times;</span>
      </div>
      </React.Fragment>
      )
    })

    return (
      <>
      <p className="bg-success pt-0 text-white text-center rounded-sm">Favorites</p>
      
        {favList}
      
      </>
      
    )
  }
}

export default Favlist;