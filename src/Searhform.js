import React from 'react';

function SearchForm(props) {
	return (
		<>
			<div className="input-group mb-3 pt-3 col-centered">
				<input type="text" className="form-control" 
				placeholder="Enter city name" 
				name="locationSearch"
				onChange={props.handleChange}/>
				<div className="input-group-append">
					<button className="btn  bg-warning text-white" type="button"
					onClick={() => props.handleClick()}
					>Button</button>
				</div>
			</div>
		</>
	)
}

export default SearchForm;