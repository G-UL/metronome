// React
import React,
	   {Component} from "react";

// Package
import {Howl} from "howler";
import {Card,
		Col,
		Container,
		Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus,
		faPause,
		faPlay,
		faPlus} from "@fortawesome/free-solid-svg-icons";


// App
import ACCENT from "./assets/Accent.flac";
import CLICK from "./assets/SubAccent.mp3";
import SUBACCENT from "./assets/Runner.flac";


const LOWER_BOUND = {"bpm": 19,
					 "note": 0,
					 "subdivision": 0};
const UPPER_BOUND = {"bpm": 251,
					 "note": 37,
					 "subdivision": 17};
var TOTAL_COUNT = 4;


class Metronome extends Component
{
	constructor()
	{
		super();
		this.state = {"bpm": 60,
					  "count": 0,
					  "isPlaying": false,
					  "note": 4,
					  "subdivision": 1};
		this.accent = new Howl({src: [ACCENT],
								preload: true});
		this.click = new Howl({src: [CLICK],
							   preload: true});
		this.subAccent = new Howl({src: [SUBACCENT],
							   preload: true});
		this.handleSpeed = this.handleSpeed.bind(this);
		this.playClick = this.playClick.bind(this);
	}


	calculateDivision()
	{
		return this.state.bpm * this.state.subdivision;
	}


	handleClick(event)
	{
		this.setState({count: 0});
		if (this.state.isPlaying)
		{
			clearInterval(this.timer);
		}
		else
		{
			TOTAL_COUNT = this.state.note * this.state.subdivision;
			var denominator = this.calculateDivision();
			this.timer = setInterval(this.playClick,
									 (60 / denominator * 1000));
		}

		this.setState({isPlaying: !this.state.isPlaying});
	}


	handleSpeed(event,
				key,
				flag)
	{
		if (this.state.isPlaying) return ;

		var currentValue = flag ?
						   this.state[key] + 1 :
						   this.state[key] - 1;
		if (LOWER_BOUND[key] === currentValue ||
			UPPER_BOUND[key] === currentValue)

			return ;

		currentValue = this.state[key];
		if (!flag)
			currentValue--;
		else
			currentValue++;

		this.setState({[key]: currentValue});
	}


	handleSlide(event,
				key)
	{
		if (this.state.isPlaying) return ;

		this.setState({[key]: parseInt(event.target.value)});
	}


	playClick()
	{
		if (this.state.count === TOTAL_COUNT) this.setState({count: 0});

		if (this.state.count === 0)
		{
			this.accent.play();
		}
		else if (this.state.count % this.state.subdivision === 0)
		{
			this.subAccent.play();
		}
		else
		{
			this.click.play();
		}

		this.setState({count: this.state.count + 1});
	}


	render()
	{
		return (
			<section style={{marginTop: "30px"}}>
				<Container>
					<Card className="metronome-panel">
						{/* BPM */}
						<Row>
							<Col md="12">
								<h2 className="metronome-number">
									{this.state.bpm}
								</h2>

								<h4 className="metronome-reference">
									bmp
								</h4>

								<div className="speed-button-wrapper">
									<span className="speed-button"
										  onClick={(event) => this.handleSpeed(event,
																			   "bpm",
																			   false)}>
										<FontAwesomeIcon icon={faMinus} />
									</span>
								</div>

								<input max="250"
									   min="20"
									   onChange={(event) => this.handleSlide(event,
																			 "bpm")}
									   step="1"
									   type="range"
									   value={this.state.bpm} />

								<div className="speed-button-wrapper">
									<span className="speed-button"
										  onClick={(event) => this.handleSpeed(event,
																			   "bpm",
																			   true)}>
										<FontAwesomeIcon icon={faPlus} />
									</span>
								</div>
							</Col>
						</Row>

						<Row>
							<Col md="12">
								<div className="click-button-wrapper">
									<span className="click-button"
										  onClick={(event) => this.handleClick(event)}>
										{
											this.state.isPlaying ?
											<FontAwesomeIcon icon={faPause} /> :
											<FontAwesomeIcon icon={faPlay} />
										}
									</span>
								</div>
							</Col>
						</Row>


						<Row style={{marginBottom: "30px"}}>
							{/* Note */}
							<Col md="6">
								<h2 className="metronome-number">
									{this.state.note}
								</h2>

								<h4 className="metronome-reference">
									note
								</h4>

								<div className="speed-button-wrapper">
									<span className="speed-button"
										  onClick={(event) => this.handleSpeed(event,
																			   "note",
																			   false)}>
										<FontAwesomeIcon icon={faMinus} />
									</span>
								</div>

								<input max="36"
									   min="1"
									   onChange={(event) => this.handleSlide(event,
																			 "note")}
									   step="1"
									   type="range"
									   value={this.state.note} />

								<div className="speed-button-wrapper">
									<span className="speed-button"
										  onClick={(event) => this.handleSpeed(event,
																			   "note",
																			   true)}>
										<FontAwesomeIcon icon={faPlus} />
									</span>
								</div>
							</Col>

							{/* Subdivision */}
							<Col md="6">
								<h2 className="metronome-number">
									{this.state.subdivision}
								</h2>

								<h4 className="metronome-reference">
									subdivision
								</h4>

								<div className="speed-button-wrapper">
									<span className="speed-button"
										  onClick={(event) => this.handleSpeed(event,
																			   "subdivision",
																			   false)}>
										<FontAwesomeIcon icon={faMinus} />
									</span>
								</div>

								<input max="16"
									   min="1"
									   onChange={(event) => this.handleSlide(event,
																			 "subdivision")}
									   step="1"
									   type="range"
									   value={this.state.subdivision} />

								<div className="speed-button-wrapper">
									<span className="speed-button"
										  onClick={(event) => this.handleSpeed(event,
																			   "subdivision",
																			   true)}>
										<FontAwesomeIcon icon={faPlus} />
									</span>
								</div>
							</Col>
						</Row>
					</Card>
				</Container>
			</section>
		);
	}
}


export default Metronome;
