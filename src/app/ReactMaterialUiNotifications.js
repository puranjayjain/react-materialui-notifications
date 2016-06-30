/**
*  material design spec compliant notifications for react and material-ui users
*/
import React, {PropTypes, Component} from 'react'
import propTypes from 'material-ui/utils/propTypes'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'

// icons
import Close from 'material-ui/svg-icons/navigation/close'

export default class ReactMaterialUiNotifications extends Component {
  static propTypes = {
    /**
    * children with state of the component and other information
    */
    children: React.PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    /**
    * Desktop device or touch device
    */
    desktop: PropTypes.bool,
    /**
    * root component's style
    */
    rootStyle: PropTypes.object,

    /**
    * all exposed props of react css transition properties
    */
    transitionName: PropTypes.string,
    transitionEnter: PropTypes.bool,
    transitionLeave: PropTypes.bool,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,
    /**
    * do you want to show timestamp
    */
    timestamp: PropTypes.bool,
    /**
    * This number represents the zDepth of the paper shadow covering the message.
    */
    zDepth: propTypes.zDepth
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  // merge local styles and overriding styles and return it
  getStyle = () => {
    const style = {
      position: 'fixed',
      bottom: 20,
      right: 25,
      minWidth: 250
    }

    return Object.assign(style, this.props.rootStyle)
  }

  render() {
    /**
    * convert object to array
    */
    let innerData = this.props.children.constructor === Array ? this.props.children : [this.props.children]

    return (
      <div
        style={this.getStyle()}
      >
        {innerData.map((props, index) => {
          return <Notification
            key={index}
            index={index}
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
    * number of lines of text for additionalText
    */
    additionalLines: PropTypes.number,
    /**
    * autohide timeout to determine whether to hide the notification automatically or nor
    */
    autoHide: PropTypes.number,
    /**
    * Desktop device or touch device
    */
    desktop: PropTypes.bool,
    /**
    * key for the underlying transition
    */
    index: PropTypes.number,
    /**
    * notification icon on the left
    */
    icon: PropTypes.element,
    /**
    * open which tells whether to display the message
    */
    open: PropTypes.bool,
    /**
    * additional overflow text
    */
    overflowText: PropTypes.node,
    /**
    * additional overflow content, like buttons
    */
    overflowContent: PropTypes.element,
    /**
    * Override the inline-styles of the root element.
    */
    style: PropTypes.object,
    /**
    * notification title
    */
    title: PropTypes.string
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.setState({
      open: this.props.open
    })
  }

  /**
  * TODO cancel the settimeout function of the autohide method if the open is changed before timeout ends
  */
  componentWillUnmount() {
  }

  /**
   * merge local styles and overriding styles and return it
   */
  getStyle = () => {
    const style = {
      display: this.state.open ? 'block' : 'none',
      textAlign: 'left',
      borderRadius: 3,
      transition: 'none'
    }

    return Object.assign(style, this.props.style)
  }

  /**
   * hide notification on click of the close button
   * TODO cancel the settimeout function of the autohide method if the open is changed before timeout ends
   */
  onCloseNotification = () => this.setState({open: false})

  render() {
    const innerDivStyle = {
      padding: '12px 0 12px 72px',
      margin: '12px auto'
    },

    /**
    * noTransition is a fix for delayed transition in the item
    */
    noTransition = {
      transition: 'none'
    },

    iconButtonStyle = {
      width: 36,
      height: 36,
      top: -3,
      right: 4,
      padding: 6,
      transition: 'none'
    },

    iconStyle = {
      height: 18,
      width: 18,
      transition: 'none'
    }

    /**
    * if overflow text is present then show these expanded items
    */
    let expandedText, expandedAction, desktopClose
    if (this.props.overflowText) {
      expandedText =
      <span>
        <Divider inset={true}/>
        <div style={innerDivStyle}>
          {this.props.overflowText}
        </div>
      </span>
    }
    else {
      expandedText = <span></span>
    }

    /**
    * if overflow content is present then show these expanded items
    */
    if (this.props.overflowContent) {
      expandedAction =
      <span>
        <Divider inset={true}/>
        <div style={innerDivStyle}>
          {this.props.overflowContent}
        </div>
      </span>
    }
    else {
      expandedAction = <span></span>
    }

    /**
    * show icon button if on desktop
    */
    if (this.props.desktop) {
      desktopClose =
      <IconButton
        style={iconButtonStyle}
        iconStyle={iconStyle}
        onTouchTap={this.onCloseNotification}
      >
        <Close />
      </IconButton>
    }

    return (
      <ReactCSSTransitionGroup
        transitionName={this.props.transitionName ? this.props.transitionName : ""}
        transitionEnter={this.props.transitionEnter ? this.props.transitionEnter : false}
        transitionLeave={this.props.transitionLeave ? this.props.transitionLeave : false}
        transitionEnterTimeout={this.props.transitionEnterTimeout ? this.props.transitionEnterTimeout : 0}
        transitionLeaveTimeout={this.props.transitionLeaveTimeout ? this.props.transitionLeaveTimeout : 0}
      >
        <Paper
          key={this.props.index}
          style={this.getStyle()}
          zDepth={this.props.zDepth}
        >
          <List>
            <ListItem
              primaryText={this.props.title}
              secondaryText={this.props.additionalText}
              secondaryTextLines={this.props.additionalLines}
              leftIcon={this.props.icon}
              insetChildren={true}
              rightIconButton={desktopClose}
              style={noTransition}
            />
          </List>
          {expandedText}
        </Paper>
      </ReactCSSTransitionGroup>
    )
  }
}
