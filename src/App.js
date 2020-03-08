import React from 'react';
import Navbar from './navBar';
import Demo from './Demo';
import { useSpring, animated } from 'react-spring';
import './App.css';

export default function App() {
	const props = useSpring({
		opacity: 1,
		from: { opacity: 0 },
	});
	return (
		<div className='App'>
			<Navbar />
			<h1 className='hello'>Welcome to Root</h1>
			<div className='wrapper'>
				Start editing to see some
				<div className='slidingVertical'>
					<span>fantastic</span>
					<span>beautiful</span>
					<span>magic</span>
					<span>awesome</span>
				</div>
				<span className='last'>happen!</span>
			</div>
			<div id='type'>The brown fox jumped the lazy dog.</div>
			<animated.h1 style={props}>hello</animated.h1>
			<Demo />
		</div>
	);
}
