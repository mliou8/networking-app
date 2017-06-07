import React from 'react';

class Profile extends React.Component {
  constructor() {
    super()
    
    this.state = {
      selectedTags: {
        'SupportWomeninTech': false, 
        'Friendly': false, 
        'FullstackAlumni': false, 
        'GivingBack': false, 
        'Networking': false,
        'LookingForWork': false
      },
      tagOptions: {
        'SupportWomeninTech': true, 
        'Friendly': true, 
        'FullstackAlumni': true, 
        'GivingBack': true, 
        'Networking': true,
        'LookingForWork': true
      },
      profileComplete: false
    }
      
    this.addTags = this.addTags.bind(this)
    this.removeTags = this.removeTags.bind(this)
  }
  
  addTags(tag) {
    let tagOptions = this.state.tagOptions
    let selectedTags = this.state.selectedTags
    tagOptions[tag] = false
    selectedTags[tag] = true
    this.setState({tagOptions: tagOptions, selectedTags: selectedTags})
  }
  
  removeTags(tag) {
    let tagOptions = this.state.tagOptions
    let selectedTags = this.state.selectedTags
    tagOptions[tag] = true
    selectedTags[tag] = false
    this.setState({tagOptions: tagOptions, selectedTags: selectedTags})
  }
  
  render() {
    const {displayName, email} = this.props.userInfo
    let selectedTags = [];
    Object.keys(this.state.selectedTags).map((key)=> { 
      if (this.state.selectedTags[key]){
        selectedTags.push(key)
      }
    })
    return (
      <div>
        <div className="profile-container">
          <img src="/img/blank.png"></img>
        </div>
        <div className="btn-group">
          {Object.keys(this.state.tagOptions).map((key, idx) => {
            if (this.state.tagOptions[key]) {
              return (
                <button key={idx} type="button" onClick={() => {
                  this.addTags(key)
                }}>{key}</button>
              )
            }
          })
          }
        </div>
        <div>Placeholder</div>
        
        {Object.keys(this.state.selectedTags).map((key, idx) => {
          if (this.state.selectedTags[key]) {
            return (
              <button key={idx} type="button" onClick={() => {
                this.removeTags(key)
              }}>{key}</button>
            )
          }
        })
        }
        <input value={selectedTags}></input>
        <div>This is your Name
          {displayName}
        </div>
        <div>This is your email
          {email}
        </div>
      </div>
    );
  }
  }

export default Profile