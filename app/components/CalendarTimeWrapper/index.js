/**
*
* CalendarTimeWrapper
*
*/

import React from 'react'; 
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';


import './style.css';
import './styleM.css';


export default class CalendarTimeWrapper extends React.PureComponent {
  render() {
    return (
      <div className="dateTimeWrapper">
        <DatePicker style={{padding: '80px 20px'}}  
        textFieldStyle={{fontSize: '1.5em'}} hintText="choose a date" className="dateTimeInput" />
        <div className="dateTimeInput">     <TimePicker  style={{padding: '20px'}}textFieldStyle={{fontSize: '1.5em'}} hintText= "choose a time"  />
        </div>
        
      </div>
    );
  }
}

CalendarTimeWrapper.contextTypes = {
  router: React.PropTypes.object
};