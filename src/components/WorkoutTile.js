import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toTitleCase } from '../utils'
import * as actions from '../actions/appActions'
import '../styles/css/WorkoutTile.css';

class WorkoutTile extends Component {
	constructor(props) {
		super()
		this.state = {
			selectedDay: "Push",
			weight: "",
			reps: ""
		}
		this.handleWeightChange = this.handleWeightChange.bind(this)
		this.handleRepsChange = this.handleRepsChange.bind(this)
		this.handleAddSet = this.handleAddSet.bind(this)
		this.handleNoteInput = this.handleNoteInput.bind(this)
		this.toggleWorkoutActions = this.toggleWorkoutActions.bind(this)
		this.handleDeleteWorkout = this.handleDeleteWorkout.bind(this)
		this.handleToggleLock = this.handleToggleLock.bind(this)
	}

	generateSets(sets) {
		return sets.map((s, index) => (
			<p key={index}>{s.weight} x {s.reps}</p>
		))
	}

	handleAddSet() {
		const setInfo = {
			weight: this.state.weight,
			reps: this.state.reps
		}

		this.setState({
			weight: "",
			reps: ""
		})
		this.props.addSet(setInfo, this.props.index)
	}

	handleWeightChange(e) {
		const val = e.target.value
		if(val.length > 3) return;
		this.setState({
			weight: val
		})
	}

	handleRepsChange(e) {
		const val = e.target.value
		if(val.length > 2) return;
		this.setState({
			reps: val
		})
	}

	toggleWorkoutActions() {
		const tile = window.document.querySelector(`.tile-${this.props.index}`);
		tile.classList.contains('hidden') ? tile.classList.remove('hidden') : tile.classList.add('hidden') 
	}

	handleNoteInput(e) {
		this.props.updateWorkout({note: e.target.value}, this.props.index)
	}

	handleDeleteWorkout() {
		this.toggleWorkoutActions();
		this.props.deleteWorkout(this.props.index);
	}

	handleToggleLock() {
		this.toggleWorkoutActions();
		this.props.updateWorkout({locked: !this.props.workout.locked}, this.props.index)
	}

	render() {
		return (
			<div className={`
				tile-container
				hidden
				tile-${this.props.index}`
			}>
				<div className={"workout-menu"}>
					<div
						className={this.props.workout.locked ? 'disabled' : ''}
						onClick={this.handleDeleteWorkout}
					>
						Delete
					</div>
					<div
						onClick={this.handleToggleLock}
					>
						{this.props.workout.locked ? 'Unlock' : 'Lock'}
					</div>
				</div>
			 	<div className="tile">
			 		<div
			 			className="info-container"
			 			onClick={this.toggleWorkoutActions}
			 		>
			 			<p>i</p>
			 		</div>
			 		<div className="header">
				 		<h1>{toTitleCase(this.props.workout.displayName)}</h1>
				 		<h2>{toTitleCase(this.props.workout.type)}</h2>
				 	</div>
				 	<div className="horizontal-break" />
				 	<div className="tile-body">
				 		<div className="sets">
				 			<h3>Sets</h3>
				 			<div>
				 				{this.generateSets(this.props.workout.sets)}
				 			</div>
				 		</div>
				 		<div className="notes">
				 			<h3>Notes</h3>
				 			<textarea
				 				onChange={this.handleNoteInput}
				 				value={this.props.workout.note}
				 				style={{backgroundImage: 'url(images/noteBackground.jpg)',  backgroundAttachment: "local", backgroundRepeat: "repeat-y"}}
				 			></textarea>
				 		</div>
				 	</div>
			 	</div>
			 	{this.props.workout.locked ? '' :
				 	<div className="tile-footer">
				 		<input
				 			name="weight"
				 			type="number"
				 			pattern="[0-9]*"
				 			onChange={this.handleWeightChange}
				 			value={this.state.weight}
				 			placeholder="weight"
				 		/>
				 		<input
				 			name="reps"
				 			type="number"
				 			pattern="[0-9]*"
				 			onChange={this.handleRepsChange}
				 			value={this.state.reps}
				 			placeholder="reps"
				 		/>
				 		<div
				 			onClick={this.handleAddSet}
				 		>Add Set</div>
				 	</div>
				 }
			</div> 
		)
	}
}

const mapStateToProps = appState => ({
  ...appState
});

export default connect(mapStateToProps, actions)(WorkoutTile);