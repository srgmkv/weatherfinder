import React from 'react';
import Weatherinfo from './Weatherinfo';

function SearchResult(props) {
  console.log('SearchResult: ', props)
  const { cod } = props.data;
  

  return (
    <>
      <p>Searching result:</p>
      {cod === 200 && <Weatherinfo weatherData={props.data} />} 
    </>
  )
}

export default SearchResult;