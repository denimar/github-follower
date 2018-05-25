import React from 'react';
import './Clock.scss';
import Moment from 'moment';
import MdAccessTime from 'react-icons/lib/md/access-time';

class Clock extends React.Component {

  constructor() {
    super();
    this.state = {
      dateTime: this.getDateTime()
    }
  }

  componentDidMount() {
    this.setDateTimeInterval();
  }

  setDateTimeInterval() {
    setInterval(() => {
      this.setState({
        dateTime: this.getDateTime()
      })
    }, 100);
  }

  //TODO: pegar a data e hora do servidor
  getDateTime() {
    let date = new Date();
    const formatedDate = Moment(date).format('HH:mm');
    return formatedDate;
  }

  render() {
    return (
      <div className="clock-container">
        <div className="clock">
          <MdAccessTime size="22" />
          <span className="clock-container-time">{ this.state.dateTime }</span>
        </div>
      </div>
    )
  }

}

export default Clock;
