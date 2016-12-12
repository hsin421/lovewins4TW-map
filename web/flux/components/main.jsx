import React, {PropTypes, Component} from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';
import * as routeNames from 'actions/user_routes.js';
import {examples} from 'consts/example_defs.js';
import {Connector} from 'redux/react';

import MainMapPage from './examples/x_main/main_map_page.jsx';

import Page from './page.jsx';

export default class Main extends Component {
  static propTypes = {
    routeName: PropTypes.string.isRequired,
    routePath: PropTypes.string.isRequired,
    routeFullPath: PropTypes.string.isRequired,
    routeParams: PropTypes.any.isRequired
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  _selectExample(exampleName, props) {
    switch (exampleName) {

      case examples.main:
        return (
          <MainMapPage />
        );

      default:
        return (
          <div>
            <h3>404 example not found</h3>
            <div>{this._renderPathProps(props)}</div>
          </div>
        );
    }
  }

  _renderMain(props) {
    switch (props.routePath) {
      case routeNames.K_DEFAULT_ROUTE:
        return (
          <div>K_DEFAULT_ROUTE</div>
        );

      case routeNames.K_MAP_ROUTE:
        return this._selectExample(props.routeParams.example, props);

      default:
        return (
          <div>
            <h3>404 page not found</h3>
            <div>{this._renderPathProps(props)}</div>
          </div>
        );
    }
  }

  _renderPathProps(props) {
    return (
      <div>{/*routeName: {props.routeName}, routePath: {props.routePath}, routeFullPath: {props.routeFullPath}, routeParams: {props.routeParams.toString()} */}</div>
    );
  }

  render() {
    const main = this._renderMain(this.props);

    return (
      <Connector select={state => ({ example: state.example })}>
        {({example}) =>
          <Page example={example}>
            {main}
          </Page>}
      </Connector>
    );
  }
}
