import React from 'react';
import blank from '../img/blank.png'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

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
      bio: ''
    }
      
    this.addTags = this.addTags.bind(this)
    this.removeTags = this.removeTags.bind(this)
    this.handleBioChange = this.handleBioChange.bind(this)
  }
  
  handleBioChange(event) {
   this.setState({bio: event.target.value});
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
  
  handleSubmit(data) {
    this.props.actions.updateUser(data);
  }
  
  render() {
    let selectedTags = [];
    Object.keys(this.state.selectedTags).map((key)=> { 
      if (this.state.selectedTags[key]){
        selectedTags.push(key)
      }
    })
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
        <div><button onClick={this.handleSubmit({tags: this.state.selectedTags, bio: this.state.bio })} className="btn btn-primary">Finish Profile</button></div>
      </div>
    );
  }
  }

export default Complete