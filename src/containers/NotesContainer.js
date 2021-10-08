import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import EditNote from '../components/EditNote.js'
import * as actions from '../actions/appActions'
import '../styles/css/NotesContainer.css';

class NotesContainer extends Component {
	constructor(props) {
		super()
		this.handleChange = this.handleChange.bind(this)
		this.handleCloseNote = this.handleCloseNote.bind(this)
		this.handleNewNote = this.handleNewNote.bind(this)
	}

	setupSlip(list) {
    list.addEventListener('slip:beforereorder', function(e){
			e.preventDefault();
    }, false);
    list.addEventListener('slip:beforeswipe', function(e){
    }, false);
    list.addEventListener('slip:beforewait', function(e){
        if (e.target.classList.contains('instant')) e.preventDefault();
    }, false);
    list.addEventListener('slip:afterswipe', function(e){
        e.preventDefault();
    }, false);
    list.addEventListener('slip:reorder', function(e){
        e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
        return false;
    }, false);
    return new window.Slip(list);
}

	componentDidMount() {
		const list = window.document.getElementById('list-container');
		this.setupSlip(list)

		const height = window.document.getElementById("list-buttons-container").getBoundingClientRect().height
		window.document.getElementById("list-container").style.top = `-${height}px`
	}

	componentDidUpdate() {
		const height = window.document.getElementById("list-buttons-container").getBoundingClientRect().height
		window.document.getElementById("list-container").style.top = `-${height}px`
	}

	handleChange(e) {
		this.props.updateEditingNoteValue(e.target.value)
	}

	handleNoteSelected(note) {
		this.props.setOpenNote(note)
	}

	handNoteDelete(note) {
		this.props.deleteNote(note)
	}

	handleCloseNote() {
		//save note and set no active note
		this.props.closeNote()
	}

	generateNotesList(notes) {
		return notes.map((n, i) => {
			if (n.id !== this.props.activeNote) {
				return (
					<li
						key={n.id}
						className="past-workout li-item"
						style={{
							backgroundImage: 'url(images/noteBackground.jpg)',
							backgroundRepeat: "repeat-y",
							backgroundPositionY: `-${ i * 50}px`
						}}
					>
						<div className="date">
						{new moment(n.createdAt).format('MM/DD/YY')}
						</div>
						<div className="info">
							{n.day}
						</div>
						<div className="peek">
							{n.workouts ? n.workouts.map(w => `${w.displayName}`).join(', ') : ''}
						</div>
					</li>
				)
			}
		})
	}

	generateUnderButtons(notes) {
		return notes.map(n => {
			if (n.id !== this.props.activeNote) {
				return (
					<li
						key={n.id}
						className="li-item"
					>
						<div
							onClick={() => this.handNoteDelete(n)}
							className="slide slide-2"
						><p>DELETE</p></div>
					</li>
				)
			}
		})	
	}

	handleNewNote() {
		this.props.pushRouter('newNote')
	}

	handleActiveSelected(note) {
		this.props.pushRouter('activeWorkout')	
	}

	getActiveWorkout() {
		if (this.props.activeNote !== null) {
			const activeNote = this.props.notes.find(n => n.id === this.props.activeNote);
			return (
				<div className="active-workout-container">
					<h2>Active Workout</h2>
					<div
						className="active-workout-tile"
						onClick={() => this.handleActiveSelected(activeNote)}
					>
						<div className="date">
						{new moment(activeNote.createdAt).format('MM/DD/YY - h:MM A')}
						</div>
						<div className="info">
							{activeNote.day}
						</div>
						<div className="peek">
							{activeNote.workouts.map(w => `${w.displayName}`).join(', ')}
						</div>
					</div>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<div
					className="notes-container"
					style={{backgroundImage: 'url(images/noteBackground.jpg)',  backgroundRepeat: "repeat-y"}}
				>
					{this.getActiveWorkout()}
					<h2 className="past-workouts-title">Workout Summaries</h2>
					<ul id="list-buttons-container">
						{this.generateUnderButtons(this.props.notes)}
					</ul>
					<ul id="list-container">
						{this.generateNotesList(this.props.notes)}
					</ul>
				</div>
				{this.props.openNote !== null ?
					<EditNote /> :
					<div
						className={this.props.activeNote !== null ? "disabled add-button" : "add-button"}
						onClick={this.handleNewNote}
					>
					<div>+</div>
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = appState => ({
  ...appState
});

export default connect(mapStateToProps, actions)(NotesContainer);