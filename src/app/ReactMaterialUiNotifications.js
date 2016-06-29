/**
*  material design spec compliant notifications for react and material-ui users
*/
import React, {PropTypes, Component} from 'react'
import propTypes from 'material-ui/utils/propTypes'
import {ReactCSSTransitionGroup, ReactCSSTransitionGroupChild} from 'react-addons-css-transition-group'

import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'

// icons
import Info from 'material-ui/svg-icons/action/info'

export default class ReactMaterialUiNotifications extends Component {
  static propTypes = {
    /**
    * Data with state of the component and other information
    */
    data: PropTypes.array,
    /**
    * Desktop device or touch device
    */
    desktop: PropTypes.bool
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  render() {
    const style = {
      position: 'fixed',
      bottom: '25px',
      right: '20px',
    }

    return (
      <div>
      {this.props.data.map(function(props, index) {
        return <Notification
        key={index}
        desktop={this.props.desktop}
        {...props}
        />
      })}
      </div>
    )
  }
}

class Notification extends Component {
  /**
  * these props are named after https://material.google.com/patterns/notifications.html#notifications-content
  */
  static propTypes = {
    /**
    * additional text for display
    */
    additionalText: PropTypes.string,
    /**
    * Desktop device or touch device
    */
    desktop: PropTypes.bool,
    /**
    * notification icon on the left
    */
    notificationIcon: PropTypes.element,
    /**
    * Override the inline-styles of the root element.
    */
    style: PropTypes.object,
    /**
    * all exposed props of react css transition properties
    */
    transitionName: ReactCSSTransitionGroupChild.propTypes.name,
    transitionAppear: PropTypes.bool,
    transitionEnter: PropTypes.bool,
    transitionLeave: PropTypes.bool,
    transitionAppearTimeout: PropTypes.number,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,
    /**
    * do you want to show timestamp
    */
    timestamp: PropTypes.bool,
    /**
    * notification title
    */
    title: PropTypes.string,
    /**
    * key for the underlying transition
    */
    key: PropTypes.number,
    /**
    * additional overflow content
    */
    overflowContent: PropTypes.element,
    /**
    * value which tells whether to display the message
    */
    value: PropTypes.bool,
    /**
    * This number represents the zDepth of the paper shadow covering the message.
    */
    zDepth: propTypes.zDepth
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  //keep tooltip state
  state = {
    // checkbox state of the main dialog checkbox
    value: this.props.value,
  }

  // merge local styles and overriding styles and return it
  getStyle = () => {
    const style = {
      visibility: this.state.value ? 'visible' : 'collapse'
    }

    return Object.assign(style, this.props.style)
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName={() => this.props.transitionName ? this.props.transitionName : ''}
        transitionAppear={() => this.props.transitionAppear ? this.props.transitionAppear : ''}
        transitionEnter={() => this.props.transitionEnter ? this.props.transitionEnter : ''}
        transitionLeave={() => this.props.transitionLeave ? this.props.transitionLeave : ''}
        transitionAppearTimeout={() => this.props.transitionAppearTimeout ? this.props.transitionAppearTimeout : ''}
        transitionEnterTimeout={() => this.props.transitionEnterTimeout ? this.props.transitionEnterTimeout : ''}
        transitionLeaveTimeout={() => this.props.transitionLeaveTimeout ? this.props.transitionLeaveTimeout:''}
      >
        <Paper key={this.props.key} style={this.getStyle} zDepth={this.props.zDepth}>
          you baby
        </Paper>
      </ReactCSSTransitionGroup>
    )
  }
}
