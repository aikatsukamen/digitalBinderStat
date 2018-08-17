import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    flexGrow: 1
  },
  appbar: {
    color: 'fff'
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button: {
    float: 'right'
  }
};

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /** 入力値 */
      text: props.textinit,
      /** 有効な値かどうか */
      isValid: true
    };
    this.onChange = this.onChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }
  /** テキストボックスの入力 */
  onChange(e) {
    let isValid = false;
    const text = e.target.value;
    // バリデーション
    if (text.match(/http:\/\/mypage.aikatsu.com\/mypages\/digital_binders\/[a-zA-Z0-9_]{16}\//) !== null) {
      isValid = true;
    }
    console.log(text);
    console.log(isValid);

    this.setState({ text, isValid });
  }

  /** 保存ボタン押下 */
  buttonClick() {
    this.props.buttonClick(this.state.text);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <TextField id="digitalBinderId" label="デジタルバインダーのURL" fullWidth={true} onChange={this.onChange} error={!this.state.isValid} defaultValue={this.props.textinit} />
            {/* 保存ボタンは、テキスト入力時、かつ適切なフォーマットになってる時のみ押下できる */}
            <Button color="inherit" className={this.props.classes.button} onClick={this.buttonClick} disabled={!this.state.isValid || this.state.text === ''}>
              保存
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonClick: PropTypes.func.isRequired,
  textinit: PropTypes.string
};

export default withStyles(styles)(ButtonAppBar);
