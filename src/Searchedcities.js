import React from 'react';

function SearchedCities(props) {
  console.log('src: ', props.data)
  const citiesList = props.data.map(item => {
      console.log(item.name)
      return <li key={item.id}>
      {item.name}, {item.country}
      <div id="favbut">add to fav</div>
      </li>
  })

  //const citiesList = <li>{props}</li>
  return (
    <>
    <p>Searching result:</p>
    <ul>
      {citiesList}
    </ul>
    </>
  )
}

export default SearchedCities;