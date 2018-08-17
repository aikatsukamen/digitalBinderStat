import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import './App.css';
import { requestList, binderIdSubmit } from '../actions';
import AppBar from './AppBar';
import BinderStat from './BinderStat';

const styles = theme => ({
  status: {
    textAlign: 'left',
    padding: '5px',
    fontSize: '8px'
  }
});

class App extends React.Component {
  renderBinderStat() {
    if (this.props.stat) return <BinderStat stat={this.props.stat} />;
    return;
  }

  render() {
    return (
      <div className="App">
        <AppBar buttonClick={this.props.binderIdSubmit} textinit={this.props.binderId} />
        <div className={this.props.classes.status}>
          status:
          {this.props.status}
        </div>
        {this.renderBinderStat()}
      </div>
    );
  }
}

// state
function mapStateToProps(state) {
  let versionId = state.reducer.selectedVersionId;
  let stat = state.reducer.list[versionId];
  // if (state.reducer.list.length !== 0) {
  //   stat = state.reducer.list.find(o => o.version.id === versionId);
  // }

  let binderId = state.reducer.binderId;
  console.log('今のstate↓');
  console.log(state);
  console.log(state.reducer.binderId);
  console.log(binderId);
  return {
    stat,
    binderId,
    status: state.reducer.status
  };
}

// action
const mapDispatchToProps = {
  requestList,
  binderIdSubmit
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  stat: PropTypes.object,
  requestList: PropTypes.func.isRequired,
  binderIdSubmit: PropTypes.func.isRequired,
  binderId: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
