import React from 'react';
import blank from '../img/blank.png'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { isEmpty } from 'lodash'

class Complete extends React.Component {
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
      avatar: '',
      isUploading: false,
      progress: 0,
      avatarURL: blank,
      profileComplete: false,
      bio: '',
      linkedinUrl: '',
    }

    this.addTags = this.addTags.bind(this)
    this.removeTags = this.removeTags.bind(this)
    this.handleBioChange = this.handleBioChange.bind(this)
    this.handleLinkedinChange = this.handleLinkedinChange.bind(this)
    this.renderError = this.renderError.bind(this)
  }

  handleBioChange(event) {
   this.setState({bio: event.target.value});
  }

  handleLinkedinChange(event) {
   this.setState({linkedinUrl: event.target.value});
  }

 renderError() {
   let errors = {}
   let tagCount = 0
   for (const key in this.state.selectedTags) {
     if (this.state.selectedTags[key] == true) {
       tagCount++;
     }
   }
   if (!this.state.linkedinUrl.includes('www.linkedin.com/in/')) {
     errors.linkedIn = 'This URL isn\'t valid!'
   }
   if (this.state.bio.length < 1 ) {
     errors.bio = 'Please enter a bio!'
   }
   if (!this.state.avatarURL.includes('firebase')) {
     errors.avatarUrl = 'Please add a photo!'
   }
   if (tagCount > 3) {
     errors.tags = 'Maximum of 3 tags';
   }
   return errors
 }

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});

  handleProgress = (progress) => this.setState({progress});

  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }

  handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref(`images/${this.props.userInfo.id}/`).child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
  };

  addTags(tag) {
    let tagCount = 0;
    for (const key in this.state.selectedTags) {
      if (this.state.selectedTags[key] == true) {
        tagCount++;
      }
    }
    if (tagCount == 3) {
      return;
    } else {
      let tagOptions = this.state.tagOptions
      let selectedTags = this.state.selectedTags
      tagOptions[tag] = false
      selectedTags[tag] = true
      this.setState({tagOptions: tagOptions, selectedTags: selectedTags})
    }
  }

  removeTags(tag) {
    let tagOptions = this.state.tagOptions
    let selectedTags = this.state.selectedTags
    tagOptions[tag] = true
    selectedTags[tag] = false
    this.setState({tagOptions: tagOptions, selectedTags: selectedTags})
  }

  handleSubmit(data) {
    const errors = this.renderError()
    console.log("errors is ", errors)
    if (isEmpty(errors)) {
      this.props.actions.completeUser(data);
    } else {
      console.log("Not Complete")
    }
  }

  render() {
    let selectedTags = [];
    Object.keys(this.state.selectedTags).map((key)=> {
      if (this.state.selectedTags[key]){
        selectedTags.push(key)
      }
    })
    let errors = this.renderError()
    return (
      <div>
        <form>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL &&
            <div className="profile-container">
              <img src={this.state.avatarURL} alt="profile-pic" />
            </div>
          }
        <label>Avatar:</label>
        <FileUploader
          accept="image/*"
          name="avatar"
          randomizeFilename
          storageRef={firebase.storage().ref(`images/${this.props.userInfo.id}`)}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
      {errors.avatarUrl}
      </form>
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
          {errors.tags}
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
        <input type="text" value={this.state.bio} onChange={this.handleBioChange} />
        {errors.bio}
        <input type="text" value={this.state.linkedinUrl} onChange={this.handleLinkedinChange} />
        {errors.linkedIn}
        <div><button onClick={() => {this.handleSubmit({tags: this.state.selectedTags, bio: this.state.bio, linkedinUrl: this.state.linkedinUrl}) }} className="btn btn-primary">Finish Profile</button></div>
      </div>
    );
  }
  }

export default Complete
