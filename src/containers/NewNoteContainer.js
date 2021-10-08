import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import * as actions from '../actions/appActions'
import '../styles/css/NewNoteContainer.css';

class NotesContainer extends Component {
	constructor(props) {
		super()
		this.state = {
			selectedDay: "push",
			weight: "155"
		}
		this.handleWeightChange = this.handleWeightChange.bind(this)
		this.handleCreate = this.handleCreate.bind(this)
	}

	getClassName(name) {
		return name === this.state.selectedDay ? "selected" : ""
	}

	handleWeightChange(e) {
		const val = e.target.value
		if(val.length > 3) return;
		this.setState({
			weight: val
		})
	}

	handleCreate() {
		const id = this.props.notes[0] ? this.props.notes[0].id + 1 : 0;
		const note = {
			id,
			"day": this.state.selectedDay,
			"weight": this.state.weight,
			"workouts": [],
			"createdAt": Date.now()
		}
		this.props.addNewNote(note)
		this.props.pushRouter('')
	}

	render() {
		return (
			<div
				className="new-note-container"
				style={{backgroundImage: 'url(images/noteBackground.jpg)',  backgroundRepeat: "repeat-y"}}
			>
				<div className="day-controller">
					<h3
						className={this.getClassName("push")}
						onClick={() => this.setState({ selectedDay: "push"})}
					>Push</h3>
					<h3
						className={this.getClassName("pull")}
						onClick={() => this.setState({ selectedDay: "pull"})}
					>Pull</h3>
					<h3
						className={this.getClassName("legs")}
						onClick={() => this.setState({ selectedDay: "legs"})}
					>Legs</h3>
					<h3
						className={this.getClassName("other")}
						onClick={() => this.setState({ selectedDay: "other"})}
					>Other</h3>
				</div>
				<div className="weight-controller">
					<label htmlFor="weight"><h3>Weight</h3></label>
					<input 
						name="weight"
						type="number"
						pattern="[0-9]*"
						onChange={this.handleWeightChange}
						value={this.state.weight}
					/>
				</div>
				<div className="button-group">
					<div
						className="create-button"
						onClick={this.handleCreate}
					>Create</div>
					<div
						onClick={() => this.props.pushRouter('')}
					>Cancel</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = appState => ({
  ...appState
});

export default connect(mapStateToProps, actions)(NotesContainer);