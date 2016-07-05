/**
*  material design spec compliant notifications for react and material-ui users
*/
import React, {PropTypes, cloneElement, Component} from 'react'
import propTypes from 'material-ui/utils/propTypes'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'

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
    * maximum number of notifications to display
    */
    maxNotifications: PropTypes.number,
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
    transitionLeaveTimeout: PropTypes.number
  }

  /**
  * default props
  */
  static defaultProps = {
    maxNotifications: 3,
    rootStyle: {
      bottom: 20,
      right: 25
    }
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  // merge local styles and overriding styles and return it
  getStyle = () => {
    const style = {
      position: 'fixed',
      minWidth: 325
    }

    return Object.assign(style, this.props.rootStyle)
  }

  /**
  * perform operations like capping on the operations before doing them
  */
  getInnerData = () => {
    let innerData = this.props.children.constructor === Array ? this.props.children : [this.props.children]
    /**
    * remove the excess notifications,
    * TODO safely remove them with animation, by passing open as false and doing newprops forcefully change the old one with willreceivenewprops function
    */
    if (innerData.length > this.props.maxNotifications) {
      for (let i in innerData) {
        if (typeof innerData[i] === 'object' && (!innerData[i].hasOwnProperty('priority') || !innerData[i].priority)) {
          innerData.splice(i, 1)
          if (innerData.length === this.props.maxNotifications) {
            break
          }
        }
      }
    }
    /**
    * sort the priority notifications to the top
    */
    innerData.sort(function(a, b) {
      var priorityA = a.priority
      var priorityB = b.priority
      if (!priorityA && priorityB) {
        return 1
      }
      if (priorityA && !priorityB) {
        return -1
      }
      // other cases they are considered same
      return 0;
    })
    return innerData
  }

  /**
  * get the props we want to forward to the notification
  */
  getProps = (props) => {
    let {children, rootStyle, maxNotifications, ...pProps} = this.props
    return Object.assign(props, pProps)
  }

  render() {
    /**
    * convert object to array
    */
    let innerData = this.getInnerData()

    return (
      <div
        style={this.getStyle()}
      >
        {innerData.map((props, index) => {
          return <Notification
            open={true}
            index={index}
            key={index}
            {...this.getProps(props)}
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
    * pass left avatar image url to be displayed in a personalised notification
    */
    avatar: PropTypes.string,
    /**
    * key for the underlying transition
    */
    index: PropTypes.number,
    /**
    * notification icon on the left
    */
    icon: PropTypes.element,
    /*
    * icon surrounding badge color
    */
    iconBadgeColor: PropTypes.string,
    /**
    * icon color
    */
    iconFillColor: PropTypes.string,
    /**
    * open which tells whether to display the message
    */
    open: PropTypes.bool,
    /**
    * additional overflow text
    */
    overflowText: PropTypes.string,
    /**
    * additional overflow content, like buttons
    */
    overflowContent: PropTypes.element,
    /**
    * is personalised notification or not
    */
    personalised: PropTypes.bool,
    /**
    * it is a priority notification
    */
    priority: PropTypes.bool,
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
    timestamp: PropTypes.string,
    /**
    * This number represents the zDepth of the paper shadow covering the message.
    */
    zDepth: propTypes.zDepth
  }

  /**
  * default props
  */
  static defaultProps = {
    iconFillColor: '#fff',
    zDepth: 1
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.setState({
      open: this.props.open
    })
    /**
    * if autohide is set then use it
    */
    if (this.props.autoHide) {
      this.autoHideTimeout = setTimeout(() => {
        this.setState({open: false})
      }, this.props.autoHide)
    }
  }

  /**
  * cancel the settimeout function of the autohide method if the open is changed before timeout ends
  */
  componentWillUnmount() {
    clearTimeout(this.autoHideTimeout)
  }

  /**
  * merge local styles and overriding styles and return it
  */
  getStyle = () => {
    const style = {
      display: this.state.open ? 'block' : 'none',
      textAlign: 'left',
      borderRadius: 3,
      margin: '12px auto'
    }

    return Object.assign(style, this.props.style)
  }

  /**
  * hide notification on click of the close button
  * cancel the settimeout function of the autohide method if the open is changed before timeout ends
  */
  onCloseNotification = () => {
    clearTimeout(this.autoHideTimeout)
    this.setState({open: false})
  }

  /**
  * generate the correct icon body on the left to display in the notification
  */
  getNotificationIcon = () => {
    /**
    * only show notification icon if it is passes
    */
    let iconEl
    if (this.props.icon) {
      /**
      * if personalised then render an avatar with the icon
      */
      if (this.props.personalised) {
        let leftIconBodyStyle = {
          top: 4,
          margin: 0,
          left: 8,
          width: 'auto',
          height: 'auto'
        },
        leftAvatarStyle = {
          textAlign: 'center'
        },
        leftIconStyle = {
          position: 'absolute',
          padding: 4,
          right: -6,
          bottom: -4,
          borderRadius: '50%',
          backgroundColor: this.props.iconBadgeColor,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        },
        leftIcon = cloneElement(this.props.icon, {
          color: this.props.iconFillColor,
          style: {
            width: 12,
            height: 12
          }
        })
        iconEl =
        <div style={leftIconBodyStyle}>
          <Avatar
            src={this.props.avatar}
            size={44}
            style={leftAvatarStyle}
          />
          <div style={leftIconStyle}>
            {leftIcon}
          </div>
        </div>
      }
      else {
        let leftIconBodyStyle = {
          height: 32,
          width: 32,
          top: 4,
          padding: 6,
          margin: 0,
          left: 8,
          borderRadius: '50%',
          backgroundColor: this.props.iconBadgeColor,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        },
        leftIcon = cloneElement(this.props.icon, {
          color: this.props.iconFillColor,
          style: {
            margin: 0
          }
        })
        iconEl =
        <div style={leftIconBodyStyle}>
          {leftIcon}
        </div>
      }
    }
    return iconEl
  }

  render() {
    const iconButtonStyle = {
      width: 36,
      height: 36,
      top: -3,
      right: 4,
      padding: 6
    },

    iconStyle = {
      height: 18,
      width: 18
    },

    listItemStyle = {
      padding: this.props.icon ? '8px 8px 0 72px' : '8px 8px 0 12px'
    },

    listStyle = {
      position: 'relative'
    },

    overflowStyle = {
      padding: '12px 0 12px 72px'
    },

    overflowContentStyle = {
      paddingLeft: 72
    },

    secondaryTextStyle = {
      marginTop: 8,
      marginBottom: 8
    },

    timestampStyle = {
      position: 'absolute',
      right: this.props.desktop ? 42 : 8,
      fontSize: 12,
      top: 14
    }

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
        <div style={overflowContentStyle}>
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
          transitionEnabled={false}
        >
          <List style={listStyle}>
            <ListItem
              primaryText={this.props.title}
              secondaryText={secondaryText}
              secondaryTextLines={this.props.additionalLines}
              leftIcon={this.getNotificationIcon()}
              insetChildren={true}
              rightIconButton={desktopClose}
              innerDivStyle={listItemStyle}
            />
            {timestampEl}
          </List>
          {expandedAction}
          {expandedText}
        </Paper>
      </ReactCSSTransitionGroup>
    )
  }
}
