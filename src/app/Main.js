/**
* In this file, we create a React component
* which incorporates components providedby material-ui.
*/
import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {deepOrange500} from 'material-ui/styles/colors'
import CommunicationCall from 'material-ui/svg-icons/communication/call'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ReactMaterialUiNotifications from './ReactMaterialUiNotifications'

import moment from 'moment'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
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

  handleTouchTap = () => {
    let tempNotifications = this.state.Notifications
    tempNotifications.push(
      {
        title: 'Title',
        additionalText: `Some message to be displayed ${tempNotifications.length}, we could be beautiful`,
        open: true,
        icon: <CommunicationCall />,
        overflowText: <div>joe</div>,
        timestamp: moment().format('h:mm A')
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
            secondary={true}
            onTouchTap={this.handleTouchTap}
          />
          <ReactMaterialUiNotifications
            desktop={false}
            zDepth={2}
            children={this.state.Notifications}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Main
