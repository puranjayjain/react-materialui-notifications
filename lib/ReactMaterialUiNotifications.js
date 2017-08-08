'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propTypes3 = require('material-ui/utils/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _reactTransitionGroup = require('react-transition-group');

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _List = require('material-ui/List');

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  material design spec compliant notifications for react and material-ui users
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// icons


// this will store the notifications and their count to track them and also maxNotifications for use in internal functions
var notifications = [],
    count = 0,
    maxNotifications = void 0;

var ReactMaterialUiNotifications = function (_Component) {
    _inherits(ReactMaterialUiNotifications, _Component);

    function ReactMaterialUiNotifications() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ReactMaterialUiNotifications);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactMaterialUiNotifications.__proto__ || Object.getPrototypeOf(ReactMaterialUiNotifications)).call.apply(_ref, [this].concat(args))), _this), _this.getStyle = function () {
            var style = {
                position: 'fixed',
                zIndex: 1,
                minWidth: 325
            };

            return Object.assign(style, _this.props.rootStyle);
        }, _this.getProps = function (props) {
            var _this$props = _this.props,
                children = _this$props.children,
                rootStyle = _this$props.rootStyle,
                maxNotifications = _this$props.maxNotifications,
                pProps = _objectWithoutProperties(_this$props, ['children', 'rootStyle', 'maxNotifications']);

            return Object.assign(props, pProps);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * default props
     */


    _createClass(ReactMaterialUiNotifications, [{
        key: 'componentWillMount',


        /**
         * copy some values to global for use in internal functions
         */
        value: function componentWillMount() {
            notifications = [];
            maxNotifications = this.props.maxNotifications;
        }

        // add notification method


        /**
         * filter out and only keep the open notifications
         * @method
         * @param  {object} notification [a notification object]
         */


        /**
         * perform operations like capping on the operations before doing them
         */


        // merge local styles and overriding styles and return it


        /**
         * get the props we want to forward to the notification
         */

    }, {
        key: 'removeNotification',
        value: function removeNotification(index) {
            notifications.splice(index, 1);
            this.forceUpdate();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                {
                    style: this.getStyle()
                },
                notifications.map(function (props, index) {
                    return _react2.default.createElement(Notification, _extends({
                        removeNotification: function removeNotification() {
                            _this2.removeNotification(index);
                        },
                        open: true,
                        key: props.count
                    }, _this2.getProps(props)));
                })
            );
        }
    }]);

    return ReactMaterialUiNotifications;
}(_react.Component);

ReactMaterialUiNotifications.muiPropTypes = {
    /**
     * Desktop device or touch device
     */
    desktop: _propTypes2.default.bool,
    /**
     * maximum number of notifications to display
     */
    maxNotifications: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    /**
     * root component's style
     */
    rootStyle: _propTypes2.default.object };
ReactMaterialUiNotifications.defaultProps = {
    maxNotifications: Infinity,
    rootStyle: {
        bottom: 20,
        right: 25
    }
};
ReactMaterialUiNotifications.contextTypes = {
    muiTheme: _propTypes2.default.object.isRequired };

ReactMaterialUiNotifications.showNotification = function (notification) {
    var tempNotifications = notifications;
    // push a new notification to notifications
    notification.open = true;
    notification.count = count;
    tempNotifications.push(notification
    // filter and keep only the open ones
    );tempNotifications = tempNotifications.filter(ReactMaterialUiNotifications.filterOpen
    // shuffle notifications and set actual notifications to the temp ones to update render
    );notifications = ReactMaterialUiNotifications.shuffleNotifications(tempNotifications
    // update counter
    );count++;
};

ReactMaterialUiNotifications.filterOpen = function (notification) {
    return notification.open;
};

ReactMaterialUiNotifications.shuffleNotifications = function (tempNotifications) {
    if (tempNotifications.length > maxNotifications) {
        for (var i in tempNotifications) {
            if (_typeof(tempNotifications[i]) === 'object' && (!tempNotifications[i].hasOwnProperty('priority') || !tempNotifications[i].priority)) {
                tempNotifications.splice(i, 1);
                if (tempNotifications.length === maxNotifications) {
                    break;
                }
            }
        }
    }
    /**
     * sort the priority notifications to the top
     */
    tempNotifications.sort(function (a, b) {
        var priorityA = a.priority,
            priorityB = b.priority;
        if (!priorityA && priorityB) {
            return 1;
        } else if (priorityA && !priorityB) {
            return -1;
        }
        // other cases they are considered same
        return 0;
    });
    return tempNotifications;
};

exports.default = ReactMaterialUiNotifications;

var Notification = function (_Component2) {
    _inherits(Notification, _Component2);

    function Notification() {
        var _ref2;

        var _temp2, _this3, _ret2;

        _classCallCheck(this, Notification);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = Notification.__proto__ || Object.getPrototypeOf(Notification)).call.apply(_ref2, [this].concat(args))), _this3), _this3.getStyle = function () {
            var style = {
                display: 'block',
                textAlign: 'left',
                borderRadius: 3,
                margin: '12px auto'
            };

            return Object.assign(style, _this3.props.style);
        }, _this3.onCloseNotification = function () {
            _this3.props.removeNotification();
        }, _this3.getNotificationIcon = function () {
            /**
             * only show notification icon if it is passes
             */
            var iconEl = void 0;
            if (_this3.props.icon) {
                /**
                 * if personalised then render an avatar with the icon
                 */
                if (_this3.props.personalised) {
                    var leftIconBodyStyle = {
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
                        backgroundColor: _this3.props.iconBadgeColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex'
                    },
                        leftIcon = (0, _react.cloneElement)(_this3.props.icon, {
                        color: _this3.props.iconFillColor,
                        style: {
                            width: 12,
                            height: 12
                        }
                    });
                    iconEl = _react2.default.createElement(
                        'div',
                        { style: leftIconBodyStyle },
                        _react2.default.createElement(_Avatar2.default, {
                            src: _this3.props.avatar,
                            size: 44,
                            style: leftAvatarStyle
                        }),
                        _react2.default.createElement(
                            'div',
                            { style: leftIconStyle },
                            leftIcon
                        )
                    );
                } else {
                    var _leftIconBodyStyle = {
                        height: 32,
                        width: 32,
                        top: 4,
                        padding: 6,
                        margin: 0,
                        left: 8,
                        borderRadius: '50%',
                        backgroundColor: _this3.props.iconBadgeColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex'
                    },
                        _leftIcon = (0, _react.cloneElement)(_this3.props.icon, {
                        color: _this3.props.iconFillColor,
                        style: {
                            margin: 0
                        }
                    });
                    iconEl = _react2.default.createElement(
                        'div',
                        { style: _leftIconBodyStyle },
                        _leftIcon
                    );
                }
            }
            return iconEl;
        }, _temp2), _possibleConstructorReturn(_this3, _ret2);
    }
    /**
     * these props are named after https://material.google.com/patterns/notifications.html#notifications-content
     */


    /**
     * default props
     */


    _createClass(Notification, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this4 = this;

            /**
             * if autohide is set then use it
             */
            if (this.props.autoHide) {
                this.autoHideTimeout = setTimeout(function () {
                    _this4.props.removeNotification();
                }, this.props.autoHide);
            }
        }

        /**
         * cancel the settimeout function of the autohide method if the open is changed before timeout ends
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.autoHideTimeout);
        }

        /**
         * merge local styles and overriding styles and return it
         */


        /**
         * hide notification on click of the close button
         * cancel the settimeout function of the autohide method if the open is changed before timeout ends
         */


        /**
         * generate the correct icon body on the left to display in the notification
         */

    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var iconButtonStyle = {
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

                /**
                 * secondary line text
                 */
            };var secondaryText = void 0,
                expandedText = void 0,
                expandedAction = void 0,
                desktopClose = void 0,
                timestampEl = void 0;
            if (this.props.additionalText) {
                secondaryText = _react2.default.createElement(
                    'div',
                    { style: secondaryTextStyle },
                    this.props.additionalText
                );
            }
            /**
             * if overflow text is present then show these expanded items
             */
            if (this.props.overflowText) {
                expandedText = _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(_Divider2.default, { inset: true }),
                    _react2.default.createElement(
                        'div',
                        { style: overflowStyle },
                        this.props.overflowText
                    )
                );
            } else {
                expandedText = _react2.default.createElement('span', null);
            }

            /**
             * if overflow content is present then show these expanded items
             */
            if (this.props.overflowContent) {
                expandedAction = _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(_Divider2.default, { inset: true }),
                    _react2.default.createElement(
                        'div',
                        { style: overflowContentStyle },
                        this.props.overflowContent
                    )
                );
            } else {
                expandedAction = _react2.default.createElement('span', null);
            }

            /**
             * show icon button if on desktop
             */
            if (this.props.desktop) {
                desktopClose = _react2.default.createElement(
                    _IconButton2.default,
                    {
                        style: iconButtonStyle,
                        iconStyle: iconStyle,
                        onTouchTap: this.onCloseNotification
                    },
                    _react2.default.createElement(_close2.default, null)
                );
            }

            /**
             * show the timestamp if the string is filled
             */
            if (this.props.timestamp) {
                timestampEl = _react2.default.createElement(
                    'div',
                    { style: timestampStyle },
                    this.props.timestamp
                );
            }

            return _react2.default.createElement(
                _reactTransitionGroup.CSSTransitionGroup,
                {
                    transitionName: this.props.transitionName ? this.props.transitionName : "",
                    transitionAppear: this.props.transitionAppear ? this.props.transitionAppear : false,
                    transitionEnter: this.props.transitionEnter ? this.props.transitionEnter : false,
                    transitionLeave: this.props.transitionLeave ? this.props.transitionLeave : false,
                    transitionAppearTimeout: this.props.transitionAppearTimeout ? this.props.transitionAppearTimeout : 0,
                    transitionEnterTimeout: this.props.transitionEnterTimeout ? this.props.transitionEnterTimeout : 0,
                    transitionLeaveTimeout: this.props.transitionLeaveTimeout ? this.props.transitionLeaveTimeout : 0
                },
                _react2.default.createElement(
                    _Paper2.default,
                    {
                        style: this.getStyle(),
                        zDepth: this.props.zDepth,
                        transitionEnabled: false
                    },
                    _react2.default.createElement(
                        _List.List,
                        { style: listStyle },
                        _react2.default.createElement(_List.ListItem, {
                            primaryText: this.props.title,
                            secondaryText: secondaryText,
                            secondaryTextLines: this.props.additionalLines,
                            leftIcon: this.getNotificationIcon(),
                            insetChildren: true,
                            rightIconButton: desktopClose,
                            innerDivStyle: listItemStyle,
                            disabled: this.props.onClick ? false : true,
                            onTouchTap: function onTouchTap() {
                                if (_this5.props.onClick) {
                                    _this5.props.onClick();
                                    _this5.props.removeNotification();
                                }
                            }
                        }),
                        timestampEl
                    ),
                    expandedAction,
                    expandedText
                )
            );
        }
    }]);

    return Notification;
}(_react.Component);

Notification.muiPropTypes = {
    /**
     * additional text for display
     */
    additionalText: _propTypes2.default.string,
    /**
     * number of lines of text for additionalText
     */
    additionalLines: _propTypes2.default.number,
    /**
     * autohide timeout to determine whether to hide the notification automatically or nor
     */
    autoHide: _propTypes2.default.number,
    /**
     * pass left avatar image url to be displayed in a personalised notification
     */
    avatar: _propTypes2.default.string,
    /**
     * notification icon on the left
     */
    icon: _propTypes2.default.element,
    /*
     * icon surrounding badge color
     */
    iconBadgeColor: _propTypes2.default.string,
    /**
     * icon color
     */
    iconFillColor: _propTypes2.default.string,
    /**
     * When the notification is clicked, if not passed it won't be clicakble
     */
    onClick: _propTypes2.default.func,
    /**
     * open which tells whether to display the message
     */
    open: _propTypes2.default.bool,
    /**
     * additional overflow text
     */
    overflowText: _propTypes2.default.string,
    /**
     * additional overflow content, like buttons
     * TODO implement the on click dismiss action like done in card (material-ui) as actAsExpander
     */
    overflowContent: _propTypes2.default.element,
    /**
     * is personalised notification or not
     */
    personalised: _propTypes2.default.bool,
    /**
     * it is a priority notification
     */
    priority: _propTypes2.default.bool,
    /**
     * Injected from parent, needed to remove the notification
     */
    removeNotification: _propTypes2.default.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: _propTypes2.default.object,
    /**
     * notification title
     */
    title: _propTypes2.default.string,
    /**
     * timestamp you want to display
     */
    timestamp: _propTypes2.default.string,
    /**
     * This number represents the zDepth of the paper shadow covering the message.
     */
    zDepth: _propTypes4.default.zDepth };
Notification.defaultProps = {
    iconFillColor: '#fff',
    zDepth: 1
};
Notification.contextTypes = {
    muiTheme: _propTypes2.default.object.isRequired
};