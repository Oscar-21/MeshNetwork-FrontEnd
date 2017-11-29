/*
 *
 * AddEvent
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 
import UserSelect from 'components/UserSelect'; 
import DateTimeSelect from 'components/DateTimeSelect'; 
import RichTextEd from 'components/RichTextEd'; 
import TagSearch from 'components/TagSearch'; 
import TagSelect from 'components/TagSelect'; 
import RaisedButton from 'material-ui/RaisedButton'; 
import Snackbar from 'material-ui/Snackbar'; 

import './style.css';
import './styleM.css';

export default class AddEvent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div className="container">
        <Helmet title="AddEvent" meta={[ { name: 'description', content: 'Description of AddEvent' }]}/>
        <Header />

        <main>
          <div className="addEventBanner">
          </div>
     
          <div className="addEventBody">
          
            <div className="addEventContent">
              <div className="addEventTitle"> 
                <h2> Submit An Event </h2> 
              </div>   

              <div className="addEventInstructions">
                <p> a bunch of submission instructions & stuff</p>

                <ul className="addEventDesList"> 
                  <li className="listItemReset">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                  <li className="listItemReset">Maecenas mollis, turpis ut malesuada sodales, ex purus suscipit augue, quis viverra felis leo quis diam.</li>
                  <li className="listItemReset">Ut congue ex dolor, ut semper odio viverra nec.</li>
                  <li className="listItemReset">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate ultrices tortor a egestas. Morbi cursus placerat nibh, sed finibus quam molestie tincidunt. </li>
                </ul> 
               
              </div>              
            </div>            

            <div className="addEventForm"> 
              <p className="addEventFormItem"> 
                <label htmlFor="">Event name</label>
                <input type="text" name="" id="event name" style={{border: '1px solid black', width: '65%' }}/>
              </p>

              <p className="addEventFormItem"  style={{flexDirection: 'column'}}> 
                <label htmlFor="" style={{textAlign: 'justify', width: '60%'}}> Add any relevant outside URL </label>
                <p style={{marginBottom: '1em'}}><small>(such as Github repo or official challenge page)</small></p> 
                <input type="text" name="" id="event outside url" style={{border: '1px solid black', width: '70%' }}/>
              </p>
              
              <div className="addEventUserSelect"> 
                <label className="addEventFormLabel"> Select Organizers</label>
                
                <div className="addEventUserContainer">
                  <UserSelect /> 
                </div>
              </div> 

              <div className="addEventDateTime"> 
                <label className="addEventFormLabel">Choose a date & time </label>
                <DateTimeSelect style={{display: 'flex', flexDirection: 'column', alignItems: 'space-around'}}/> 
              </div>              

              <div className="addEventDesContainer">
                <label className="addEventFormLabel"> Event Description</label>
                <RichTextEd />
              </div>
             

              <div className="addEventTagContainer">                 
                <label className="addEventFormLabel"> Pick the topics that best describe your event </label>

                <div className="addEventTagWrapper">
                  <TagSearch />
                  <TagSelect /> 
                </div>
              </div> 
              
              <div className="addEventSubmit">
              <RaisedButton label="Submit" className="addEventSubmitButton" onClick={this.handleTouchTap} /> 
              <Snackbar
                open={this.state.open}
                message="Thanks, your event has been submitted for approval"
               autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
              />
              </div>
             
            </div> 
          </div>          
        </main>  

        <Footer />

      </div>
    );
  }
}