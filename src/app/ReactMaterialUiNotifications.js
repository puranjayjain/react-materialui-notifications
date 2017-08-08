/**
 *  material design spec compliant notifications for react and material-ui users
 */
import React, {cloneElement, Component} from 'react'
import PropTypes from 'prop-types'
import muiPropTypes from 'material-ui/utils/propTypes'
import { CSSTransitionGroup } from 'react-transition-group' 

import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'

// icons
import Close from 'material-ui/svg-icons/navigation/close'

// this will store the notifications and their count to track them and also maxNotifications for use in internal functions
let notifications = [],
    count = 0,
    maxNotifications

export default class ReactMaterialUiNotifications extends Component {
    static muiPropTypes = {
        /**
         * Desktop device or touch device
         */
        desktop: PropTypes.bool,
        /**
         * maximum number of notifications to display
         */
        maxNotifications: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        /**
         * root component's style
         */
        rootStyle: PropTypes.object
    }

    /**
     * default props
     */
    static defaultProps = {
        maxNotifications: Infinity,
        rootStyle: {
            bottom: 20,
            right: 25
        }
    }

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired
    }

    /**
     * copy some values to global for use in internal functions
     */
    componentWillMount() {
        notifications = []
        maxNotifications = this.props.maxNotifications
    }

    // add notification method
    static showNotification = (notification) => {
        let tempNotifications = notifications
        // push a new notification to notifications
        notification.open = true
        notification.count = count
        tempNotifications.push(notification)
        // filter and keep only the open ones
        tempNotifications = tempNotifications.filter(ReactMaterialUiNotifications.filterOpen)
        // shuffle notifications and set actual notifications to the temp ones to update render
        notifications = ReactMaterialUiNotifications.shuffleNotifications(tempNotifications)
        // update counter
        count++
    }

    /**
     * filter out and only keep the open notifications
     * @method
     * @param  {object} notification [a notification object]
     */
    static filterOpen = (notification) => notification.open

    /**
     * perform operations like capping on the operations before doing them
     */
    static shuffleNotifications = (tempNotifications) => {
        if (tempNotifications.length > maxNotifications) {
            for (let i in tempNotifications) {
                if (typeof tempNotifications[i] === 'object' && (!tempNotifications[i].hasOwnProperty('priority') || !tempNotifications[i].priority)) {
                    tempNotifications.splice(i, 1)
                    if (tempNotifications.length === maxNotifications) {
                        break
                    }
                }
            }
        }
        /**
         * sort the priority notifications to the top
         */
        tempNotifications.sort(function (a, b) {
            const priorityA = a.priority,
            priorityB = b.priority
            if (!priorityA && priorityB) {
                return 1
            }
            else if (priorityA && !priorityB) {
                return -1
            }
            // other cases they are considered same
            return 0
        })
        return tempNotifications
    }

    // merge local styles and overriding styles and return it
    getStyle = () => {
        const style = {
            position: 'fixed',
            zIndex: 1,
            minWidth: 325
        }

        return Object.assign(style, this.props.rootStyle)
    }

    /**
     * get the props we want to forward to the notification
     */
    getProps = (props) => {
        let {children, rootStyle, maxNotifications, ...pProps} = this.props
        return Object.assign(props, pProps)
    }

    removeNotification(index) {
        notifications.splice(index, 1)
        this.forceUpdate()
    }

    render() {
        return (
            <div
              style={this.getStyle()}
            >
              {notifications.map((props, index) => {
                return <Notification
                  removeNotification={() => {this.removeNotification(index)}}
                  open={true}
                  key={props.count}
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
    static muiPropTypes = {
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
         * When the notification is clicked, if not passed it won't be clicakble
         */
        onClick: PropTypes.func,
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
         * TODO implement the on click dismiss action like done in card (material-ui) as actAsExpander
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
         * Injected from parent, needed to remove the notification
         */
        removeNotification: PropTypes.func,
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
        zDepth: muiPropTypes.zDepth
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
        /**
         * if autohide is set then use it
         */
        if (this.props.autoHide) {
            this.autoHideTimeout = setTimeout(() => {
                this.props.removeNotification()
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
            display: 'block',
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
        this.props.removeNotification()
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
            <CSSTransitionGroup
              transitionName={this.props.transitionName ? this.props.transitionName : ""}
              transitionAppear={this.props.transitionAppear ? this.props.transitionAppear : false}
              transitionEnter={this.props.transitionEnter ? this.props.transitionEnter : false}
              transitionLeave={this.props.transitionLeave ? this.props.transitionLeave : false}
              transitionAppearTimeout={this.props.transitionAppearTimeout ? this.props.transitionAppearTimeout : 0}
              transitionEnterTimeout={this.props.transitionEnterTimeout ? this.props.transitionEnterTimeout : 0}
              transitionLeaveTimeout={this.props.transitionLeaveTimeout ? this.props.transitionLeaveTimeout : 0}
            >
              <Paper
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
                    disabled={this.props.onClick ? false : true}
                    onTouchTap={() => {
                      if (this.props.onClick) {
                        this.props.onClick()
                        this.props.removeNotification()
                      }
                    }}
                  />
                  {timestampEl}
                </List>
                {expandedAction}
                {expandedText}
              </Paper>
            </CSSTransitionGroup>
        )
    }
}
