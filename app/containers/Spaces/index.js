/*
 *
 * Spaces
 *
 */

import React from 'react';
import PropTypes from 'prop-types'; 
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  TiSocialAtCircular,
  TiSocialFacebookCircular,
  TiSocialInstagramCircular,
  TiSocialTwitterCircular
} from 'react-icons/lib/ti';

import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';
import Header from 'components/Header';
import Footer from 'components/Footer';

import './style.css';
import './styleM.css';

export default class Spaces extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      workspaces:[]
    }
  }

  componentWillMount() {
    this.getSpaces();
  }

  getSpaces = () => {
    fetch(`http://localhost:8000/api/workspaces`, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        workspaces:json
      })
    }.bind(this))
  }


  render() {
    return (
      <div className="container">
        <Helmet title="Spaces" meta={[ { name: 'description', content: 'Description of Spaces' }]}/>
        <Header />
        <div className="spacesBodyWrapper">
          <div className="spacesHeader">
            <span className="spacesTitle">CO-WORK SPACES</span>
          </div>

          <div className="spacesList">
            {this.state.workspaces.map((space, i) => (
              <Link to={'space/' + space.id} className="spaceListing" key={i}>
                <Card style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                  <CardMedia style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', flexGrow:'1'}}>
                    <img src={space.logo} alt="" width="100%"/>
                  </CardMedia>
                  <div>
                    <CardHeader className="spaceNameHeader" title={space.name} />
                    <CardContent className="spaceAddress"> {space.address} {space.city}, {space.state} {space.zipcode}</CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        <div className="aboutButtons">
          <div className="aboutButtonText">Ready to Discover the Mesh Network?</div>
          <div className="aboutButtonsContainer">
            <button label="Sign Up" style={{ marginLeft:'15px', width:'200px'}}/>
            <button label="Contact Us" style={{ marginLeft:'15px', width:'200px'}}/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Spaces.contextTypes = {
  router: PropTypes.object
};
