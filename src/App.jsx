import React, {Component} from 'react';
import {Button, Form} from 'reactstrap';
import {connect} from 'react-redux';
import * as types from './actions';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  textChange(ev) {
    this.setState({
      text: ev.target.value
    })
  }

  addReminder() {
    if (!this.state.text) {

    } else {
      this.props.addReminder(this.state.text);
      this.setState({
        text: ''
      })
    }
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  clearReminders(){
    this.props.clearReminders();
  }

  renderReminders() {
    const {reminders} = this.props;
    return (
      <ul className="list-group col-sm-8 mt-2">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div><em>{reminder.time}</em></div>
                </div>
                <div
                  className="list-item delete-button"
                  onClick={this.deleteReminder.bind(this, reminder.id)}>
                  &#x2715;
                </div>
              </li>
            );
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="title">Reminder Pro</div>
        <Form>
          <div className="form-inline" style={{margin: '10px auto 0'}}>
            <div className="form-group mr-2">
              <input type="text" className="form-control" onChange={this.textChange.bind(this)}
                     placeholder="I have to..." value={this.state.text}/>
            </div>
            <Button color="success" onClick={this.addReminder.bind(this)}>Add Reminder</Button>
          </div>
        </Form>
        {this.renderReminders()}
        <Button color="danger" onClick={this.clearReminders.bind(this)}>Clear Reminders</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reminders: state.reminders
  };
};

App.propTypes = {
  reminders: PropTypes.array.isRequired,
  addReminder: PropTypes.func.isRequired,
  deleteReminder: PropTypes.func.isRequired,
  clearReminders: PropTypes.func.isRequired
};

export default connect(mapStateToProps, types)(App);
