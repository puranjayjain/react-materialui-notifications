/**
*  material design spec compliant notifications for react and material-ui users
*/
import React, {PropTypes, cloneElement, Component} from 'react'
import propTypes from 'material-ui/utils/propTypes'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {deepOrange500} from 'material-ui/styles/colors'

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
    * left avatar image to be displayed in personalised notification
    */
    avatar: PropTypes.element,
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
    * is personalised notification or not
    */
    personalised: PropTypes.bool,
    /**
    * Override the inline-styles of the root element.
    */
    style: PropTypes.object,
    /**
    * notification title
    */
    title: PropTypes.string,
    /**
    * timestamp you want to display
    */
    timestamp: PropTypes.string
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
      transition: 'none',
      margin: '12px auto'
    }

    return Object.assign(style, this.props.style)
  }

  /**
  * hide notification on click of the close button
  * TODO cancel the settimeout function of the autohide method if the open is changed before timeout ends
  */
  onCloseNotification = () => this.setState({open: false})

  render() {
    const listStyle = {
      position: 'relative'
    },

    listItemStyle = {
      transition: 'none',
      padding: '8px 8px 0 72px'
    },

    secondaryTextStyle = {
      marginTop: 8,
      marginBottom: 8
    },

    iconButtonStyle = {
      width: 36,
      height: 36,
      top: -3,
      right: 4,
      padding: 6,
      transition: 'none'
    },

    leftIconBodyStyle = {
      height: 32,
      width: 32,
      top: 4,
      padding: 6,
      margin: 0,
      left: 8,
      borderRadius: '50%',
      backgroundColor: deepOrange500,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    },

    leftIconStyle = {
      margin: 0
    },

    iconStyle = {
      height: 18,
      width: 18,
      transition: 'none'
    },

    timestampStyle = {
      position: 'absolute',
      right: this.props.desktop ? 42 : 8,
      top: 12
    },

    overflowStyle = {
      padding: '12px 0 12px 72px'
    }

    /**
    * modify icon prop
    */
    let leftIcon = cloneElement(this.props.icon, {color: '#fff',style: leftIconStyle}),
    leftIconBody = <div style={leftIconBodyStyle}>{leftIcon}</div>

    /**
    * secondary line text
    */
    let secondaryText, expandedText, expandedAction, desktopClose, timestampEl
    if (this.props.additionalText) {
      secondaryText = <div style={secondaryTextStyle}>{this.props.additionalText}</div>
    }
    /**
    * if overflow text is present then show these expanded items
    */
    if (this.props.overflowText) {
      expandedText =
      <span>
        <Divider inset={true}/>
        <div style={overflowStyle}>
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
        <div style={overflowStyle}>
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

    /**
    * show the timestamp if the string is filled
    */
    if (this.props.timestamp) {
      timestampEl = <div style={timestampStyle}>{this.props.timestamp}</div>
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
          <List style={listStyle}>
            <ListItem
              primaryText={this.props.title}
              secondaryText={secondaryText}
              secondaryTextLines={this.props.additionalLines}
              leftIcon={leftIconBody}
              insetChildren={true}
              rightIconButton={desktopClose}
              innerDivStyle={listItemStyle}
            />
            {timestampEl}
          </List>
          {expandedText}
        </Paper>
      </ReactCSSTransitionGroup>
    )
  }
}
