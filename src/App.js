import React, { Component } from 'react';
import Track from './Track';
import './App.css';
import logo from './logo.png';

import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '',
			results: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(e) {
		this.setState({ term: e.target.value });
	}

	handleClick() {
		/*  api documentation:
    https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
    */

		let url = encodeURI(`https://itunes.apple.com/search?term=${this.state.term}&limit=25`);

		axios.get(url).then(response => {
			console.log(response.data);
			this.setState({ results: response.data.results });
		});
	}

	renderResults = () => {
		return this.state.results.map((track, index) => {
			return (
				<Track
					key={track.trackId}
					name={track.trackName}
					preview={track.previewUrl}
					art={track.artworkUrl60}
					artist={track.artistName}
					price={track.trackPrice}
					link={track.trackViewUrl}
				/>
			);
		});
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} alt="logo" className="logo" />
					<input
						type="text"
						id="search_bar"
						placeholder="seach for artist, track, or album"
						onChange={this.handleChange}
					/>
					<button id="search_btn" onClick={this.handleClick}>
						search
					</button>
				</header>
				<main>
					{this.state.results.length ? (
						<div className="result_container headings">
							<h2>Album</h2>
							<h2>Artist</h2>
							<h2>Track</h2>
							<h2>Preview</h2>
							<h2 className="price">Price</h2>
						</div>
					) : (
						<h1>Results will show up here</h1>
					)}
					{this.renderResults()}
				</main>
			</div>
		);
	}
}

export default App;
