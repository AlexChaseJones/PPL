import React, { Component } from 'react'
import { connect } from 'react-redux'

import workouts from '../workouts'
import * as actions from '../actions/appActions'
import '../styles/css/NewWorkoutModal.css';

class NewWorkoutModal extends Component {
	constructor(props) {
		super()
	}

	addWorkout(workout, type) {
		const newWorkout = {
			key: workout.key,
			displayName: workout.displayName,
			note: "",
			sets: [],
			type

		}
		this.props.addNewWorkout(newWorkout)
		this.props.closeModal()
	}

	toggleTypes(className) {
		const el = window.document.getElementById(className)
		if (el.classList.contains('hidden')) {
			const allTypes = window.document.querySelectorAll('.types')
			const toRemove = [];
			let timer = 0;
			for (var i = 0; i < allTypes.length; i++) {
				if (!allTypes[i].classList.contains('hidden')) {
					toRemove.push(allTypes[i])
				}
			}
			if (toRemove.length > 0) {
				timer = 300
				for (var i = 0; i < toRemove.length; i++) {
					toRemove[i].classList.add('hidden')
				}
			}
			setTimeout(() => {
				el.classList.remove('hidden')
			}, timer)
		} else {
			el.classList.add('hidden')
		}
	}

	generateWorkoutsList(workoutsArr) {
		return workoutsArr.map((w, index) => (
			<li 
				className="preferred-workout"
				key={index}
			>
				<div
					className="title"
					style={{
						backgroundImage: 'url(images/noteBackground.jpg)',
						backgroundRepeat: "repeat-y",
						backgroundPositionY: `-${ index * 50}px`
					}}
					onClick={() => this.toggleTypes(`pref-index-${w.displayName}`)}
				>
					{w.displayName}
				</div>
				<div
					id={`pref-index-${w.displayName}`}
					className="types hidden"
				>
					{w.supportedTypes.map((type, index) => (
						<div
							key={index}
							onClick={() => this.addWorkout(w, type)}
						>{type}</div>
					))}
				</div>
			</li>
		))
	}

	generateOtherWorkoutsList(workouts) {

		const markup = [];
		const others = Object.keys(workouts).filter(w => w !== this.props.day)
		for (var i = 0; i < others.length; i++) {
			markup.push(this.generateWorkoutsList(workouts[others[i]]))
		}
		return markup;
	}

	render() {
		return (
			<div className="container">
				<div
					className="back-button"
					onClick={() => this.props.closeModal()}
				>Close
				</div>
				<h1>{this.props.day.toUpperCase()} DAY WORKOUTS</h1>
				<ul>
					{this.generateWorkoutsList(workouts[this.props.day])}
				</ul>
				<h2>All other workouts</h2>
				<ul>
					{this.generateOtherWorkoutsList(workouts)}
				</ul>
			</div> 
		)
	}
}

const mapStateToProps = appState => ({
  ...appState
});

export default connect(mapStateToProps, actions)(NewWorkoutModal);