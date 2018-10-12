import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import './App.css';
import * as actions from '../actions';
import AppBar from './AppBar';
import BinderStat from './BinderStat';
import Snackbar from './SnackBar';

const styles = theme => ({
  status: {
    textAlign: 'left',
    padding: '5px',
    fontSize: '8px'
  },
  versionSelect: {
    width: '100%'
  },
  footer: {
    marginTop: '10px',
    fontSize: '8px'
  },
  select: {
    root: {
      width: '70%'
    }
  }
});

const App = props => {
  const renderBinderStat = () => {
    if (props.stat) return <BinderStat stat={props.stat} />;
    return;
  };

  /**
   * 弾選択の描画
   */
  const renderVersionSelect = () => {
    const selectItems = [];
    for (const version of props.versionIds) {
      selectItems.push(<MenuItem value={version.id}>{version.name}</MenuItem>);
    }
    return selectItems;
  };

  /**
   * 弾選択イベント
   * @param {object} event
   */
  const handleSelectChange = event => {
    props.selectVersion(event.target.value);
  };

  return (
    <div className="App">
      <AppBar buttonClick={props.binderIdSubmit} textinit={props.binderId} />
      <div className={props.classes.versionSelect}>
        <TextField label="弾選択" select fullWidth={true} value={props.selectedVersionId} onChange={handleSelectChange}>
          {renderVersionSelect()}
        </TextField>
      </div>
      <div className={props.classes.status}>
        status:
        {props.status}
      </div>
      {renderBinderStat()}
      <div className={props.classes.footer}>
        <span style={{ fontWeight: 'bold' }}>Safariの方へ</span>
        <br />
        設定➝Safariで「サイト超えのトラッキングを防ぐ」をOFFにすればエラーが起きないらしいです。
        <br />
        デバッグしたいのでMacください。
      </div>
      <Snackbar open={props.notify.isOpen} message={props.notify.message} variant={props.notify.variant} onClose={props.closeNotify} />
    </div>
  );
};

// state
function mapStateToProps(state) {
  let versionId = state.reducer.selectedVersionId;
  let stat = state.reducer.list[versionId];
  let binderId = state.reducer.binderId;

  return {
    stat,
    binderId,
    status: state.reducer.status,
    versionIds: state.reducer.versionIds,
    selectedVersionId: state.reducer.selectedVersionId,
    notify: state.reducer.notify
  };
}

// action
const mapDispatchToProps = {
  requestList: actions.requestList,
  binderIdSubmit: actions.binderIdSubmit,
  selectVersion: actions.selectVersion,
  closeNotify: actions.closeNotify
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  stat: PropTypes.object,
  requestList: PropTypes.func.isRequired,
  binderIdSubmit: PropTypes.func.isRequired,
  binderId: PropTypes.string,
  versionIds: PropTypes.string.isRequired,
  selectedVersionId: PropTypes.string.isRequired,
  selectVersion: PropTypes.func.isRequired,
  notify: PropTypes.object.isRequired,
  closeNotify: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
