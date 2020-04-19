// React
import React,
	   {Component} from "react";


class Header extends Component
{
	render()
	{
		return (
			<nav className="navbar
							navbar-light
							bg-light">
				<div className="col-md-12"
					 style={{display: "inline-grid"}}>
					<a className="navbar-brand
								  g-header"
					   href="https://hello.g-ul.me">
						G's Metronome
					</a>
				</div>
			</nav>
		);
	}
}

export default Header;
