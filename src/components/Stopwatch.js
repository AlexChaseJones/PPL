import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment';

import * as actions from '../actions/appActions'

import '../styles/css/Stopwatch.css';

class Stopwatch extends Component {
	constructor(props) {
		super();
		this.state = {
			started: props.timerRunning,
			paused: false
		}
		this.start = this.start.bind(this)
		this.pause = this.pause.bind(this)
		this.unPause = this.unPause.bind(this)
		this.reset = this.reset.bind(this)
		this.formatTime = this.formatTime.bind(this)
		this.startWorkout = this.startWorkout.bind(this)
		this.handleFinishWorkout = this.handleFinishWorkout.bind(this)
		this.startPosition = null // x,y,time where first touch began
		this.latestPosition = null // x,y,time where the finger is currently
		this.previousPosition = null // x,y,time where the finger was ~100ms ago (for velocity calculation)
		this.xVal = 0;
		this.totalMovement = {}
	}

	componentWillMount() {
		this.initialize(this.props)
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.activeNote !== nextProps.activeNote && nextProps.activeNote !== null) {
			setTimeout(() => {
				this.scrollTo("2")
			}, 500)
		}
	}

	componentDidMount() {
		const stopwatchContainer = window.document.getElementsByClassName("stopwatch-container")[0]
		const stopwatch = window.document.getElementById("stopwatch")

		stopwatchContainer.addEventListener("touchstart", e => {
      e.stopPropagation();
      if (e.touches.length > 1) return;
      const pos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: e.timeStamp,
      }
      this.startPosition = this.previousPosition = this.latestPosition = pos;
    })

		stopwatchContainer.addEventListener("touchmove", e => {
			e.stopPropagation();
			this.updatePosition(e, {
			    x: e.touches[0].clientX,
			    y: e.touches[0].clientY,
			    time: e.timeStamp,
			});

			const xVal = this.pageTwo ? this.totalMovement.x - window.innerWidth : this.totalMovement.x;
			stopwatch.style.transform = `translate(${xVal}px, 0)`
		})

		stopwatchContainer.addEventListener("touchend", e => {
			if (this.totalMovement.x < -150) {
				this.scrollTo("2")
			} else if (this.totalMovement.x > 150) {
				this.scrollTo("1")
			} else {
				this.scrollTo("0")
			}
		})
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId)
		clearInterval(this.state.intervalId2)
	}

	scrollTo(page) {
		let xVal;
		switch(page) {
			case "2": 
				xVal = -window.innerWidth;
				this.pageTwo = true;
				break;
			case "1":
				xVal = 0;
				this.pageTwo = false
				break;
			case "0":
				xVal = this.xVal
				break;
			default:
				break;
		}

		this.xVal = xVal;
		const translateProp = `translate(${xVal}px, 0)`
		const stopwatch = window.document.getElementById('stopwatch')

		stopwatch.style.transform = translateProp;
	}

	updatePosition(e, pos) {
		this.latestPosition = pos;

		this.totalMovement = {
      x: this.latestPosition.x - this.startPosition.x,
      y: this.latestPosition.y - this.startPosition.y,
      time: this.latestPosition.time - this.startPosition.time,
    }

		// sample latestPosition 100ms for velocity
		if (this.latestPosition.time - this.previousPosition.time > 100) {
		    this.previousPosition = this.latestPosition;
		}
	}

	initialize(props) {
		let newTimeStarted = Date.now() - (Date.now() - props.timeStarted)
		// props.timerReinstantiate(newTimeStarted)

		if (props.timerRunning) {
			this.startTimer(props.timeStarted)
		} else {
			newTimeStarted = Date.now() + props.timeLeft - 120000
			this.formatTime(newTimeStarted, props)
		}

		if (props.activeNoteStarted) {
			this.updateTotalTime()
		}
	}

	updateTotalTime() {
		const interval = setInterval(() => {
			const time = moment.duration(moment(Date.now()) - moment(this.props.activeNoteTimeStarted))
			this.setTimeInState(time, "totalTime")
		})

		this.setState({ intervalId2: interval })
	}

	start() {
		this.props.timerBegin()
		this.startTimer(Date.now())
	}

	startTimer(timeStarted) {
		const interval = setInterval(() => {
			this.formatTime(timeStarted, this.props)
		})
		clearInterval(this.state.intervalId)
		this.setState({
			paused: false,
			intervalId: interval
		})
	}

	unPause() {
		this.props.timerStart()
		const newTimeStarted = Date.now() + this.props.timeLeft - 120000
		this.props.timerReinstantiate(newTimeStarted)
		this.startTimer(newTimeStarted)
	}

	formatTime(timeStarted, props) {
		const tempTime = moment.duration((moment(timeStarted) - moment(Date.now())) + 120000)
		if (tempTime.milliseconds() < 0) {
			clearInterval(this.state.intervalId);
			this.setState({
				timeLeft: '00:00:000',
				paused: true
			})
			props.timerFinished()
			return;
		}
		if (this.state.paused) {
			clearInterval(this.state.intervalId)
			return;
		}
		this.setTimeInState(tempTime, "timeLeft")
	}

	pause() {
		clearInterval(this.state.intervalId)
		this.setState({
			paused: true
		})
		const timeLeft = moment.duration((moment(this.props.timeStarted) - moment(Date.now())) + 120000)
		this.props.timerPause(timeLeft.asMilliseconds())
	}

	reset() {
		clearInterval(this.state.intervalId)
		this.setState({
			timeLeft: "02:00:000",
			paused: true
		})
		this.props.timerReset()
	}

	atleastLength(t, a) {
	return String(t).length < a ? `${"0".repeat(a - String(t).length)}${t}` : t;
	}

	setTimeInState(time, key) {
		const minutes = this.atleastLength(time.minutes(), 2);
		const seconds = this.atleastLength(time.seconds(), 2);
		const milli = this.atleastLength(time.milliseconds(), 3);
		const obj = {};
		obj[key] = `${minutes}:${seconds}:${milli}`

		this.setState(obj)
	}

	getLeftButton(state) {
		switch(state) {
			case 3:
				return (
					<div
						className="beginBtn btn"
						onClick={this.start}
					>Start</div>
				)
			case 2:
				return (
					<div
						className="beginBtn btn"
						onClick={this.pause}
					>Pause</div>
				)
			case 1:
				return (
					<div
						className="beginBtn btn"
						onClick={this.unPause}
					>Unpause</div>
				)
			default:
				return (
					<div
						className="beginBtn btn"
						onClick={() => {
							this.reset()
							this.start()
						}}
					>
					Start</div>
				)
		} 
	}

	getTimeLeft() {
		return (
			<div className="timeLeft">{this.state.timeLeft}</div>
		)
	}

	handleFinishWorkout() {
		clearInterval(this.state.intervalId2)
		this.scrollTo("1")
		setTimeout(() => {this.props.removeActiveNote()}, 250)
		
	}

	startWorkout() {
		this.props.startActiveNote()
		this.updateTotalTime()
	}

	getPageTwo() {
		if (this.props.activeNoteStarted) {
			return (
				<div className="page-two-started">
					<div className="totalTime">{this.state.totalTime}</div>
					<div
						className="btn"
						onClick={this.handleFinishWorkout}
					>Finish Workout</div>
				</div>
			)
		} else {
			return (
				<div className="page-two">
					<div
						className="btn"
						onClick={this.startWorkout}
					>Begin Workout</div>
				</div>
			)
		}
	}

	render() {
		return (
			<div className={this.props.activeNote !== null ? "stopwatch-container" : "stopwatch-container stopwatch-hidden"}>
				<div id="stopwatch" className="stopwatch">
					<div className="page-one">
						{this.getLeftButton(this.props.timerState)}
						<div className="timeLeftContainer">
							{this.getTimeLeft()}
						</div>
						<div
							className="resetBtn btn"
							onClick={this.reset}
						>Reset</div>
					</div>
					{this.getPageTwo()}
				</div>
			</div>
		)
	}
}

const mapStateToProps = appState => ({
  ...appState
});

export default connect(mapStateToProps, actions)(Stopwatch);