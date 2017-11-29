/*
 *
 * MemberDash
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Paper from 'material-ui/Paper'; 

import './style.css';
import './styleM.css';

export default class MemberDash extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="MemberDash" meta={[ { name: 'description', content: 'Description of MemberDash' }]}/>
        <Header />
        <main> 
          <div className="dashBanner">
          </div>
          <div className="dashNavBar">
            <ul className="dashNav">             
              <li><a href="/addevent">new event</a></li>
              <li><a href="/memberSearch">member search</a></li>
              <li><a href="">business search </a></li>
              <li><a href="/booking">booking</a></li>
            </ul>
          </div>

          <div className="dashBody">        
            <div className="dashUserInfo">
              <div className="dashUpcomingEvents">
                <h3 style={{textAlign: 'center'}}> Upcoming </h3>
                <div className="dashEventBlock">
                  <p className="dashEvent">Wed. Dec 6th, 8a - One Million Cups</p>
                </div>
                <div className="dashEventBlock">
                  <p className="dashEvent">Wed. Dec 15th - Beer & Bytes </p>
                </div>
                <div className="dashEventBlock">
                  <p className="dashEvent">Fri. Dec 15th - PyAugusta</p>
                </div>
              </div>

              <div className="dashYourSpace">
                <img src='https://theclubhou.se/wp-content/uploads/2017/04/theclubhouselogo-1.png' height="100px" width="100px" className="dashSpaceLogo"/>
                <div className="dashSpaceQuickLinks">
                  <ul>
                    <li className="dashSpaceLink"><a href="https://theclubhou.se/join/" >manage membership</a></li>
                    <li className="dashSpaceLink"><a href="mailto:heythere@theclubhou.se" >heythere@theclubhou.se</a></li>
                    <li className="dashSpaceLink"><a href="http://theclubhou.se" >http://theclubhou.se</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="dashUserNetworkInfo">
              
              <Paper><div className="dashSpaceNews">
              <p className="dashAnnouncement"> the Clubhou.se will be closed Nov 22 - 25 - Have a safe Thanksgiving!</p>
              </div></Paper>
              
            </div>

          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

MemberDash.contextTypes = {
  router: React.PropTypes.object
};