import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../actions/appActions'
import Stopwatch from '../components/Stopwatch.js'
import '../styles/css/AppContainer.css';

class AppContainer extends Component {
	render() {
		return (
			<div className="app-container">
				<div className="statusbar" />
				<div className={this.props.activeNote !== null ? "heading hidden" : "heading"}>PPL</div>
				<Stopwatch />
				<div className={this.props.activeNote !== null ? "main-body large-padded" : "main-body small-padded"}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

const mapStateToProps = appState => ({
  ...appState
});

export default connect(mapStateToProps, actions)(AppContainer);