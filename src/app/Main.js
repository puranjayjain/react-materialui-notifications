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

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
}

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
})

class Main extends Component {
  state = {
    open: false
  }

  handleTouchTap = () => {
    this.setState({
      open: true
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <RaisedButton
            label="Toggle Notification"
            secondary={true}
            onTouchTap={this.handleTouchTap}
          />
          <ReactMaterialUiNotifications
            desktop={true}
            zDepth={2}
            children={{
              title: 'Title',
              additionalText: 'Some message to be displayed',
              open: this.state.open,
                icon: <CommunicationCall color={deepOrange500}/>,
              overflowText: <div>joe</div>
            }}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Main
