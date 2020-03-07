import React from 'react';
import './App.css';
import Navbar from './navBar';

export default function App() {
	return (
		<div className='App'>
			<Navbar />
			<h1 className='hello'>Welcome to Root</h1>
			<div className='wrapper'>
				Start editing to see something
				<div className='slidingVertical'>
					<span>magical</span>
					<span>fantastical</span>
					<span>awesome</span>
					<span>special</span>
				</div>
				<span className='last'>happen!</span>
			</div>
			<div id='type'>The brown fox jumped the lazy dog.</div>
		</div>
	);
}
