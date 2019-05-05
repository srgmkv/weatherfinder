import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export const OnMap = (props) => {
	//console.log('props', props)

	const { lat, lon } = props.coord;


	return (
		<div className="Map">
			<YMaps>
				<Map defaultState={{ center: [lat, lon], zoom: 10, type: 'yandex#hybrid' }}>
					<Placemark geometry={[lat, lon]} />
				</Map>
			</YMaps>
		</div>
	)
};