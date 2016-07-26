// table data for all the options
const ComponentData = [
  {
    prop: 'desktop',
    types: 'bool',
    default: 'false',
    description: 'Desktop device or touch device, in Desktop mode you have close button on the right'
  },
  {
    prop: 'maxNotifications',
    types: 'number, string',
    default: 'Infinity',
    description: 'Maximum number of notifications to display'
  },
  {
    prop: 'rootStyle',
    types: 'object',
    default: '{bottom: 20, right: 25}',
    description: 'Container of all notifications, component\'s style'
  },
  {
    prop: 'All react css transition props',
    types: 'see react css addon\'s docs',
    default: '..\src\app\ReactMaterialUiNotifications.js#L448',
    description: 'https://facebook.github.io/react/docs/animation.html'
  }
]

const NotificationData = [
  {
    'prop': 'additionalText',
    'types': 'string',
    'default': '',
    'description': 'Additional text below the Title of the Notification'
  },
  {
    'prop': 'additionalLines',
    'types': 'number',
    'default': '1',
    'description': 'Number of lines to truncate or show ellipsis in the Additional text'
  },
  {
    'prop': 'autoHide',
    'types': 'number',
    'default': 0,
    'description': 'Timer in ms after which the notification is hidden automatically, 0 is no timer'
  },
  {
    'prop': 'avatar',
    'types': 'string',
    'default': '',
    'description': 'Left avatar image to be displayed in a personalised notification, pass the url of the image'
  },
  {
    'prop': 'icon',
    'types': 'element',
    'default': '',
    'description': 'Notification icon on the left'
  },
  {
    'prop': 'iconBadgeColor',
    'types': 'string',
    'default': '',
    'description': 'Background color of the notification icon'
  },
  {
    'prop': 'iconFillColor',
    'types': 'string',
    'default': '#fff',
    'description': 'Color of the notification icon'
  },
  {
    'prop': 'overflowText',
    'types': 'string',
    'default': '',
    'description': 'Text which is displayed below the additional text'
  },
  {
    'prop': 'overflowContent',
    'types': 'element',
    'default': '',
    'description': 'Buttons or other useful actions in a notification can be put here'
  },
  {
    'prop': 'personalised',
    'types': 'bool',
    'default': 'false',
    'description': 'If the notification is a personalised notification'
  },
  {
    'prop': 'priority',
    'types': 'bool',
    'default': 'false',
    'description': 'If a notification is high priority and will not be removed automatically and unless removed forcefully'
  },
  {
    'prop': 'style',
    'types': 'object',
    'default': '',
    'description': 'Styles of the notification'
  },
  {
    'prop': 'title',
    'types': 'string',
    'default': '',
    'description': 'Title of the Notification'
  },
  {
    'prop': 'timestamp',
    'types': 'string',
    'default': '',
    'description': 'To display the timestamp of the notification'
  },
  {
    'prop': 'zDepth',
    'types': 'zDepth',
    'default': 1,
    'description': 'This number represents the zDepth of the shadow'
  }
]

export {ComponentData, NotificationData}
