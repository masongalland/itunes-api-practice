import React from 'react';

export default function Component(props) {
	const { art, name, preview, price, link, artist } = props;
	return (
		<div className="result_container">
			<img src={art} alt="album art" />
			<h2>{artist}</h2>
			<h2>{name}</h2>
			<audio controls>
				<source src={preview} />
			</audio>
			<a href={link} target="_blank" className="price">
				<h2>${price}</h2>
			</a>
		</div>
	);
}
