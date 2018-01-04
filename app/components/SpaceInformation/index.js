/**
*
* SpaceInformation
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper'; 
import { TextField } from 'material-ui';
import Button from 'material-ui/Button';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import './style.css';
import './styleM.css';


const inputStyle = {
  border: '1px solid black', 
  marginLeft: '1em',
  maxWidth: '70%',
}


const content = 'yes hello some content'; 

export default class SpaceInformation extends React.PureComponent {
  state = {
    spaceProfile: {},
    logo: '',  
    logoPreview: '', 
   // editorState: EditorState.createWithContent(content), 
  }

  
   
  /* componentWillMount() {
    this.getSpaceInfo();
  }

 getSpaceInfo= () => {
    fetch('http://localhost:8000/api/workspace/'+ this.props.id, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        spaceProfile:json
      }, function() {
        console.log(this.state.spaceProfile);
      })
    }.bind(this))
} */

    handleLogo = (event) => {
      event.preventDefault(); 
      let reader = new FileReader(); 
      let file = event.target.files[0]; 
      reader.onloadend = () => 
      {
        this.setState({ 
          logo: file, 
          logoPreview: reader.result, 
        })
      }
      reader.readAsDataURL(file);
      console.log(this.state.logoPreview);  
    }
  
  renderLogoPreview = () => {
    if(this.state.logo !== '') 
    { return (
      <img src={this.state.logoPreview} height='250px' width= '250px'/>
    )}
  }
    

  render() {

    /* onChange = (editorState) => {
      this.setState({editorState}); 
    } */


    return (
      <div className="spaceInfoDash">
      <Paper>
          <div className="spaceIDashHeader">
            <h2></h2>
          </div>
          <div className="spaceIDashMain">
              <form className="spaceIDashForm"> 

                <div className="spaceIDashInfoMain">
                  <div className="spaceIDashContactInfo">
                    <p className="spaceFormItem">
                      <TextField
                        label={'Space Name'}
                        margin='normal'
                        //placeholder={this.state.spaceProfile.name}
                        //defaultValue={this.state.spaceProfile.name}
                        style={{width: '100%'}}
                      />
                    </p>

                    <div className="spaceIDashContactDet">
                      <p className="spaceFormItem">
                        <TextField
                          label={'Email'}
                          margin='normal'
                          //placeholder={this.state.spaceProfile.email}
                          //defaultValue={this.state.spaceProfile.email}                         
                        />
                      </p>
                      <p className="spaceFormItem">
                        <TextField
                          label={'Website'}
                          margin='normal'
                          //placeholder={this.state.spaceProfile.website}
                          //defaultValue={this.state.spaceProfile.website}
                          
                        />
                      </p>
                      <p className="spaceFormItem">
                        <TextField
                          label={'Phone'}
                          margin='normal'
                          //placeholder={this.state.spaceProfile.phone_number}
                          //defaultValue={this.state.spaceProfile.phone_number}
                          
                        />
                      </p>
                    </div>

                 
                  <div className="spaceIDashLocation">                    
                    <TextField
                      label={'Address'}
                      margin='normal'
                      //placeholder={this.state.spaceProfile.address}
                      //defaultValue={this.state.spaceProfile.address}                    
                    />

                    <div className="spaceIDashAdd">
                      <TextField
                        label={'City'}
                        margin='normal'
                        //placeholder={this.state.spaceProfile.city}
                        //defaultValue={this.state.spaceProfile.city}
                        style={{maxWidth: '120px'}}
                        
                      />
                    
                      <TextField 
                       label={'State'}
                       margin='normal'
                       //placeholder={this.state.spaceProfile.state}
                      //defaultValue={this.state.spaceProfile.state}
                       style={{maxWidth: '50px'}}
                      /> 
                      
                      <TextField
                        label={'Zipcode'}
                        margin='normal'
                        //placeholder=  {this.state.spaceProfile.zipcode}
                        //defaultValue={this.state.spaceProfile.zipcode}
                        style={{maxWidth: '100px'}}
                      />
                    </div>
                  </div>

                  <div className="spaceIDashPaymentInfo" style={{padding: '15px 0'}}>
                  <h3 > Payment System </h3>
                  <TextField 
                      label={'Stripe API Key'}
                      margin='normal'     
                      //placeholder={this.state.spaceProfile.}
                      //defaultValue={this.state.spaceProfile.}
                    />
                    <TextField 
                      label={'Outside Payment URL'}
                      margin='normal'     
                      //placeholder={this.state.spaceProfile.}
                      //defaultValue={this.state.spaceProfile.}
                    />
                  </div>

           
                </div>   


                  <div className="spaceIDashLogo">    

                    <h3 style={{margin: '15px 0'}}> Logo </h3>
                    <div className="spaceIDashLogoPreview">
                        {this.renderLogoPreview()}
                    </div>   
                      
                      <div> 
                        <label style={{display: 'flex', flexDirection:'column'}}>
                          <Button raised component="span" >
                            Upload
                            <input     
                            onChange={this.handleLogo} 
                            type="file"
                            style={{display:'none'}}
                            accept="image/png, image/jpg, image/jpeg"
                        />
                          </Button>    
                        </label>                   
                      </div>                   
                 </div>                 
                </div>  
                
                <div className="spaceIDashSocialForm"> 
                  <h3 style={{margin: '15px 0'}}>Social Media Handles</h3>
                  <div className="spaceIDashSocialMedia">
                  <TextField 
                      label={'Facebook'}
                      margin='normal'
                      //placeholder={this.state.spaceProfile.}
                      //defaultValue={this.state.spaceProfile.}
                    />
                    <TextField 
                      label={'Twitter'}
                      margin='normal'
                      //placeholder={this.state.spaceProfile.}
                      //defaultValue={this.state.spaceProfile.}
                    
                    />
                    <TextField 
                      label={'Instagram'}
                      margin='normal'
                      //placeholder={this.state.spaceProfile.}
                      //defaultValue={this.state.spaceProfile.}
                    />
                  
                    <TextField 
                      label={'Pinterest'}
                      margin='normal'
                      //placeholder={this.state.spaceProfile.}
                      //defaultValue={this.state.spaceProfile.}
                    />
                    <TextField 
                      label={'Youtube'}
                      margin='normal'
                      //placeholder={this.state.spaceProfile.}
                      //defaultValue={this.state.spaceProfile.}
                    />
                    <TextField 
                      label={'Tumblr'}
                      margin='normal'
                      //placeholder={this.state.spaceProfile.}
                      //defaultValue={this.state.spaceProfile.}
                    />
                  </div>
                 

                  </div>                
              </form>


              <div className="spaceIDashDescription">    
                <h3 style={{margin: '15px 0'}}>Description</h3>

               {/* <Editor 
                    editorState={this.state.editorState}
                    // toolbarClassName="home-toolbar"
                    // wrapperClassName="home-wrapper"
                    // editorClassName="rdw-editor-main"
                    onEditorStateChange={this.onChange}
                    toolbar={{
                      inline: { inDropdown: true },
                      fontSize: { className: 'toolbarHidden' },
                      fontFamily: { className: 'toolbarHidden' },
                      list: { className: 'toolbarHidden' },
                      textAlign: { inDropdown: true, options: [ 'left', 'center', 'right' ] },
                      link: { inDropdown: true },
                      remove: { className: 'toolbarHidden' },
                      emoji: { className: 'toolbarHidden' },
                      history: { className: 'toolbarHidden' },
                    }}
                  /> */}
              </div>
          </div>

          </Paper> 

      </div>
    );
  }
}

SpaceInformation.contextTypes = {
  router: PropTypes.object
};
