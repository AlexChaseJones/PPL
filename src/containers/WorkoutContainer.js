import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewWorkoutModal from '../components/NewWorkoutModal.js'
import WorkoutTile from '../components/WorkoutTile.js'
import * as actions from '../actions/appActions'
import '../styles/css/WorkoutContainer.css';

class WorkoutContainer extends Component {
	constructor(props) {
		super()
		this.handleNewWorkout = this.handleNewWorkout.bind(this)
		//this.state.currentWorkout will be passed in from above. represents current workout.
		const currentWorkout = props.notes.find(n => n.id === props.activeNote);
		this.state = {
			newWorkoutModalActive: false,
			currentWorkout
		}
		this.handleCloseNote = this.handleCloseNote.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleChangeView = this.handleChangeView.bind(this);
	}

	generateWorkouts() {
		return this.state.currentWorkout.workouts.map((w, index) => (
			<WorkoutTile
				key={index}
				index={index}
				workout={w}
			/>
		)).reverse()
	}

	handleNewWorkout() {
		this.setState({
			newWorkoutModalActive: true
		})
	}

	handleCloseNote() {
		this.props.pushRouter('')
	}

	handleCloseModal() {
		window.document.scrolltop = 0
		this.setState({ newWorkoutModalActive: false })
	}

	handleChangeView() {
		const view = this.state.currentWorkout.view === "compact" ? "regular" : "compact";
		this.props.updateView(view, this.props.activeNote)
	}

	render() {
		return (
			<div
				className="workout-container"
				style={{backgroundImage: 'url(images/noteBackground.jpg)',  backgroundAttachment: "local", backgroundRepeat: "repeat-y"}}
			>
			{this.state.newWorkoutModalActive ? 
				<NewWorkoutModal
					day={this.state.currentWorkout.day}
					closeModal={this.handleCloseModal}
				/>
			:
				<div>
					<div
						className="back-button"
						onClick={this.handleCloseNote}
					>
					Back
					</div>
					<div className={this.props.activeNoteStarted ? 'right-side-buttons' : 'right-side-buttons disabled'}>
						<div
							onClick={this.handleNewWorkout}
						>Add Workout</div>
						<div
							className={this.state.currentWorkout.view === "compact" ? "compact" : ''}
							onClick={this.handleChangeView}
						>||</div>
					</div>
					<div className={`workouts ${this.state.currentWorkout.view === 'compact' ? 'compact' : ''}`}>
						{this.generateWorkouts()}
					</div>
				</div>
			}
			</div> 
		)
	}
}

const mapStateToProps = appState => ({
  ...appState
});

export default connect(mapStateToProps, actions)(WorkoutContainer);