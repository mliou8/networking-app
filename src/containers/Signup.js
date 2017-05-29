import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as Actions from '../actions';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = "Please enter a password.";
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation.";
  }
  if (values.password !== values.passwordConfirmation && values.passwordConfirmation !== null) {
    errors.password = 'Passwords do not match';
  }

  return errors;
}

class Signup extends React.Component {
  
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
      }
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
  
  handleFormSubmit = (values) => {
    this.props.signUpUser(values);
  };
  
  renderField = ({
    input,
    label,
    type,
    value,
    meta: {
      touched,
      error
    }
  }) => (
    <fieldset className={`form-group ${touched && error
      ? 'has-error'
      : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type} value={value} />
        {touched && error && <div className="help-block">
          {error}</div>}
      </div>
    </fieldset>
  );

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return <div className="alert alert-danger">
        {this.props.authenticationError}
      </div>;
    }
    return <div></div>;
  }


  render() {
    let selectedTags = [];
    Object.keys(this.state.selectedTags).map((key)=> { 
      if (this.state.selectedTags[key]){
        selectedTags.push(key)
      }
    })
    
    return (
      <div className="container">
        <div className="col-md-3 col-md-offset-3">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="name" type="text" component={this.renderField} label="Name"/>
            <Field name="email" type="text" component={this.renderField} label="Email"/>
            <Field name="password" type="password" component={this.renderField} label="Password"/>
            <Field name="passwordConfirmation" type="password" component={this.renderField} label="Password Confirmation"/>
            <div className="btn-group">
              { 
                  Object.keys(this.state.tagOptions).map((key, idx)=> {
                    if (this.state.tagOptions[key]){
                      return (
                        <button key={idx} type="button" onClick={() =>{this.addTags(key)}}>{key}</button>
                      )
                    }
                  })
              }
            </div>  
            <div>Placeholder</div>
              { 
                  Object.keys(this.state.selectedTags).map((key, idx)=> {
                    if (this.state.selectedTags[key]){
                      return (
                        <button key={idx} type="button" onClick={() =>{this.removeTags(key)}}>{key}</button>
                      )
                    }
                  })
              }
              <input value={selectedTags}></input>
            <div><button action="submit" className="btn btn-primary">Sign up</button></div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {authenticationError: state.auth.error}
}

export default connect(mapStateToProps, Actions)(reduxForm({form: 'signup', validate})(Signup));
