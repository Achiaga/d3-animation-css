import React, { Component } from 'react';

import './navBar.css';

class NavBar extends Component {
	render() {
		return (
			<React.Fragment>
				<nav className='nav'>
					<div className='item'>First item</div>
					<div className='item'>Second item</div>
					<div className='item'>Third item</div>
					<div className='item'>Four item</div>
				</nav>
			</React.Fragment>
		);
	}
}

export default NavBar;
