import React, {PropTypes, Component} from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';
import cx from 'classnames';
import axios from 'axios';

const styleHidden = {
  visibility: 'hidden'
};

const styleEmpty = {
};

export default class Header extends Component {
  static propTypes = {
    className: PropTypes.string, // TODO bad style remove
    example: PropTypes.any.isRequired
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      total: 0
    };
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://5bq2v7mgi5.execute-api.us-east-1.amazonaws.com/prod/mySimpleBE?TableName=ME-TW'
    })
    .then(json => this.setState({ total: json.data.Count }));
  }

  render() {
    const {example} = this.props;

    return (
      <header className={cx(this.props.className, 'header')}>
        <div className="header-grid">
          <div className="header-grid__center">
            全球 <b style={{color: '#e33e3e'}}>{this.state.total}</b>人 與您一同支持同志婚姻合法化
          </div>
          <div className="header-grid__right">
            <a href="https://marriageforall.org">來打卡 </a>
          </div>
        </div>
        <hr />
      </header>
    );
  }
}
