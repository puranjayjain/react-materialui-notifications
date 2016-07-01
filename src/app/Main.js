/**
* In this file, we create a React component
* which incorporates components providedby material-ui.
*/
import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {deepOrange500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import CommunicationCall from 'material-ui/svg-icons/communication/call'
import Message from 'material-ui/svg-icons/communication/message'

import ReactMaterialUiNotifications from './ReactMaterialUiNotifications'

import moment from 'moment'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  }
},
muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
})

class Main extends Component {
  state = {
    Notifications: []
  }

  showNotification = () => {
    let tempNotifications = this.state.Notifications
    tempNotifications.push(
      {
        title: 'Title',
        additionalText: `Some message to be displayed ${tempNotifications.length}, we could be beautiful`,
        open: true,
        icon: <Message />,
        iconBadgeColor: deepOrange500,
        overflowText: <div>joe</div>,
        timestamp: moment().format('h:mm A')
      }
    )
    this.setState({
      Notifications: tempNotifications
    })
  }

  showPriorityNotification = () => {
    let tempNotifications = this.state.Notifications
    tempNotifications.push(
      {
        title: 'Title',
        additionalText: `Some message to be displayed ${tempNotifications.length}, we could be beautiful`,
        open: true,
        icon: <CommunicationCall />,
        iconBadgeColor: deepOrange500,
        overflowText: <div>joe</div>,
        timestamp: moment().format('h:mm A'),
        priority: true,
        zDepth: 4
      }
    )
    this.setState({
      Notifications: tempNotifications
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <RaisedButton
            label="Show Notification"
            onTouchTap={this.showNotification}
          />
          <RaisedButton
            label="Show Priority Notification"
            secondary={true}
            onTouchTap={this.showPriorityNotification}
          />
          <ReactMaterialUiNotifications
            desktop={false}
            children={this.state.Notifications}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Main
