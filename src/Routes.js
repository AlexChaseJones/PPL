import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux'
import * as actions from './actions/appActions'

// import HomeContainer from './containers/HomeContainer';
import NotesContainer from './containers/NotesContainer';
import NewNoteContainer from './containers/NewNoteContainer';
import WorkoutContainer from './containers/WorkoutContainer';

class Routes extends Component {
	componentWillMount() {
		// Push to browser history the stored redux value
		this.props.history.push(this.props.router.location.pathname)
	}
  render() {
    return (
      <div>
      	<Switch>
          <Route path="/activeWorkout" component={WorkoutContainer} />
      		<Route path="/newNote" component={NewNoteContainer} />
	        <Route indexRoute path="/" component={NotesContainer} />
	       </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
	...state
})

export default connect(mapStateToProps, actions)(Routes);