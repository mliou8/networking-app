import React from 'react';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';

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
  
  renderItemOrEditField( item ) {
    if ( this.state.editing === item._id ) {
      // Handle rendering our edit fields here.
    } else {
      return <li
        onClick={this.toggleEditing.bind( null, item._id )}
        key={item._id}
        className="list-group-item">
        { `${ item.title } by ${ item.artist } (${ item.releaseYear })` }
      </li>;
    }
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

  
  
  render() {
    const {displayName, email, imageUrl, bio, tags} = this.props.userInfo.data
    return (
      <div>
        <form>
          <div className="profile-container">
            <img src={imageUrl} alt="profile-pic" />
          </div>
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
        <form>
        <div>This is your Name {displayName} </div> <button>Edit</button>
        <div>This is your email {email} </div> <button>Edit</button>
        <div>This is your bio {bio} </div> <button>Edit</button>
        <div>Your tags milady </div> <button>Edit</button>
          {
            Object.keys(tags).map((key, idx) => {
            if (tags[key]) {
              return (
                <div>{key}</div>
              )
            }
          })
         }
         <button type="button" onClick={() => {this.props.actions.updateUser({tags: this.state.selectedTags, bio: this.state.bio, imageUrl: this.state.avatarURL})}}>Save Changes</button>
       </form>
      </div>
    </div>
    );
  }
}
export default Profile