import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%'
  },
  gridList: {
    width: '90vw',
    height: '80vh'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  gridListRoot: {
    height: '50px'
  },
  gridListTitle: {
    fontSize: '10px'
  },
  gridListSubTitle: {
    fontSize: '10px'
  },
  progress: {
    margin: '0 2px 0 2px',
    position: 'relative',
    textAlign: 'center',
    display: 'inline-block'
  },
  progressLabelRate: {
    position: 'absolute',
    top: '20%',
    left: '0',
    width: '100%'
  },
  progressLabelCount: {
    position: 'absolute',
    top: '50%',
    left: '0',
    width: '100%',
    fontSize: '12px'
  },
  progressArea: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const BinderStat = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div>
        {props.stat.username}
        ちゃんの
        {props.stat.version.name}
        収集状況
      </div>
      <Divider />

      {/* レアリティ */}
      <Typography variant="subheading" gutterBottom>
        属性
      </Typography>
      <div className={classes.progressArea}>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.type.qt} style={{ color: '#ffaade' }} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.type.qt}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.type.qt}/{props.stat.count.all.type.qt}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            キュート
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.type.co} style={{ color: '#85e6ff' }} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.type.co}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.type.co}/{props.stat.count.all.type.co}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            クール
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.type.se} style={{ color: '#efd7ff' }} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.type.se}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.type.se}/{props.stat.count.all.type.se}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            セクシー
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.type.po} style={{ color: '#fb8' }} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.type.po}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.type.po}/{props.stat.count.all.type.po}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            ポップ
          </Typography>
        </div>
      </div>
      <Divider />
      {/* レアリティ */}
      <Typography variant="subheading" gutterBottom>
        レアリティ
      </Typography>
      <div className={classes.progressArea}>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.rarity.bfr} style={{ color: 'gold' }} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.rarity.bfr}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.rarity.bfr}/{props.stat.count.all.rarity.bfr}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            BFR
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.rarity.fr} style={{ color: 'silver' }} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.rarity.fr}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.rarity.fr}/{props.stat.count.all.rarity.fr}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            FR
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.rarity.pr} style={{ color: 'gold' }} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.rarity.pr}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.rarity.pr}/{props.stat.count.all.rarity.pr}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            PR
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.rarity.r} style={{ color: 'silver' }} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.rarity.r}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.rarity.r}/{props.stat.count.all.rarity.r}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            R
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.rarity.n} style={{ color: '#cd7f32' }} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.rarity.n}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.rarity.n}/{props.stat.count.all.rarity.n}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            N
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.rarity.cr} style={{ color: '#6ca' }} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.rarity.cr}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.rarity.cr}/{props.stat.count.all.rarity.cr}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            CP
          </Typography>
        </div>
      </div>
      <Divider />
      {/* 部位 */}
      <Typography variant="subheading" gutterBottom>
        部位
      </Typography>
      <div className={classes.progressArea}>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.category.t} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.category.t}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.category.t}/{props.stat.count.all.category.t}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            トップス
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.category.b} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.category.b}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.category.b}/{props.stat.count.all.category.b}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            ボトムス
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.category.s} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.category.s}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.category.s}/{props.stat.count.all.category.s}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            シューズ
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.category.a} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.category.a}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.category.a}/{props.stat.count.all.category.a}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            アクセサリー
          </Typography>
        </div>
        <div>
          <div className={classes.progress}>
            <CircularProgress variant="static" size={55} number={4} value={props.stat.count.rate.category.w} />
            <span className={classes.progressLabelRate}>{props.stat.count.rate.category.w}%</span>
            <span className={classes.progressLabelCount}>
              {props.stat.count.collect.category.w}/{props.stat.count.all.category.w}
            </span>
          </div>
          <Typography variant="caption" gutterBottom>
            トップ＆ボトムス
          </Typography>
        </div>
      </div>
      <Divider />
      <div className={classes.progressArea}>
        <div>
          <Typography variant="subheading" gutterBottom>
            未所持リスト
          </Typography>
          <TextField multiline={true} value={props.stat.list.notPos.join('\n')} rows={5} />
        </div>
        <div>
          <Typography variant="subheading" gutterBottom>
            所持リスト
          </Typography>
          <TextField multiline={true} value={props.stat.list.possession.join('\n')} rows={5} />
        </div>
      </div>
    </div>
  );
};

BinderStat.propTypes = {
  classes: PropTypes.object.isRequired,
  stat: PropTypes.object.isRequired
};

export default withStyles(styles)(BinderStat);
