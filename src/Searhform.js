import React from 'react';
//компонент для отображения поля поиска и обработки нажатия на кнопку
function SearchForm(props) {
	return (
		<>
			<div className="input-group mb-3 pt-3 col-centered">
				<input type="text" className="form-control" 
				placeholder="Enter city name" 
				name="requestedLocation"
				onChange={props.handleChange}/>
				<div className="input-group-append">
					<button className="search-but mr-3 btn  bg-warning text-white" type="button"
					onClick={() => props.handleClick()}
					>Search</button>
				</div>
			</div>
		</>
	)
}

export default SearchForm;