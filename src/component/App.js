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
  },
  footer: {
    marginTop: '10px',
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
        <div className={this.props.classes.footer}>
          <span style={{ fontWeight: 'bold' }}>Safariの方へ</span>
          <br />
          設定➝Safariで「サイト超えのトラッキングを防ぐ」をOFFにすればエラーが起きないらしいです。
          <br />
          デバッグしたいのでMacください。
        </div>
      </div>
    );
  }
}

// state
function mapStateToProps(state) {
  let versionId = state.reducer.selectedVersionId;
  let stat = state.reducer.list[versionId];
  let binderId = state.reducer.binderId;

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
