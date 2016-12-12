import React, {PropTypes, Component} from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

import PureRenderer from 'components/controls/pure_renderer/pure_renderer.jsx';

export default class MainMapLayout extends Component {
  static propTypes = {
    renderMap: PropTypes.func,
    renderTable: PropTypes.func,
    layout: PropTypes.string
  };

  static defaultProps = {
    layout: 'left'
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      isTableExpanded: true
    };
  }

  componentWillMount() {
    if (window.innerWidth < 770) {
      this.setState({
        isMobile: true,
        isTableExpanded: false
      });
    }
  }

  handleExpandIconClick = () => {
    this.setState({ isTableExpanded: !this.state.isTableExpanded });
  }

  render() {
    const { isTableExpanded, isMobile } = this.state;
    const expandIcon = <img 
          src={`http://www.iconarchive.com/download/i87619/icons8/ios7/Arrows-${isTableExpanded ? 'Right' : 'Left'}.ico`}
          width={40}
          style={{position: 'absolute', right: isTableExpanded ? '70%' : '38%', top: '50%', zIndex: 1000}}
          className="tableExpandIcon"
          onClick={this.handleExpandIconClick}
        />;
    if (this.props.layout === 'left') {
      return (
        <div style={{height: '100%', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: '62%', height: '100%'}}>
            <PureRenderer render={this.props.renderMap} />
          </div>
          <div className="supporterTable" style={{position: 'absolute', right: isTableExpanded ? 0 : '-32%', top: 0, width: isMobile ? '70%' : '38%', height: '100%'}}>
            <PureRenderer render={this.props.renderTable} />
          </div>
          {isMobile && expandIcon}
        </div>
      );
    }

    return (
      <div style={{height: '100%', position: 'relative', overflow: 'hidden'}}>
        <div className="supporterTable" style={{position: 'absolute', left: isTableExpanded ? 0 : '-32%', top: 0, width: isMobile ? '70%' : '38%', height: '100%'}}>
          <PureRenderer render={this.props.renderTable} />
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, width: '62%', height: '100%'}}>
          <PureRenderer render={this.props.renderMap} />
        </div>
        {isMobile && expandIcon}
      </div>
    );
  }
}
