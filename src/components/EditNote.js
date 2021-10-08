import React, { Component } from 'react'
import { connect } from 'react-redux'


import * as actions from '../actions/appActions'
import '../styles/css/NotesContainer.css';

class EditNote extends Component {
	constructor(props) {
		super()
		this.handleChange = this.handleChange.bind(this)
		this.handlePress = this.handlePress.bind(this)
		this.handleCloseNote = this.handleCloseNote.bind(this)
		this.textAreaFocus = false
		console.log(this.scrollInterval)
	}

	componentDidMount(nextProps) {
    this.scrollInterval = setInterval(function(){
    if (window.document.body.scrollTop <= 100 && this.textAreaFocus === false) {
        window.document.body.scrollTop = 0
    }
    },10);

		const textArea = window.document.getElementsByTagName("textarea")[0]
		textArea.addEventListener("focus", () => {
			this.textAreaFocus = true
		})

		textArea.addEventListener("focusout", () => {
			this.textAreaFocus = false
		})
	}

	componentWillUnmount() {
		clearInterval(this.scrollInterval)
	}

	handleChange(e) {
		this.props.updateEditingNoteValue(e.target.value)
	}

	handlePress(e) {
		const textArea = window.document.getElementsByTagName("textarea")[0]
		if (e.key.toLowerCase() === "enter" && textArea.selectionEnd === textArea.value.length) {
			const newHeight = textArea.scrollHeight + 15
			textArea.scrollTop = newHeight
		}
	}

	handleCloseNote() {
		this.props.closeNote()
	}




	render() {
		return (
			<div className="home-container">
				<div
					className={this.props.activeNote !== null ? "back-button back-button-large-padded" : "back-button back-button-small-padded"}
					onClick={this.handleCloseNote}
				>Back</div>
				<textarea
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck="false"
					value={this.props.editingNoteValue}
					onKeyPress={this.handlePress}
					onChange={this.handleChange}
					style={{backgroundImage: 'url(images/noteBackground.jpg)',  backgroundAttachment: "local"}}
				></textarea>
			</div> 
		)
	}
}

const mapStateToProps = appState => ({
  ...appState
});

export default connect(mapStateToProps, actions)(EditNote);