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

const tagOptions = [
  'SupportWomeninTech', 'Friendly', 'FullstackAlumni', 'GivingBack', 'Networking', 'LookingForWork'
]

class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedTags: []
    }
    this.updateTags = this.updateTags.bind(this)
  }
  
  updateTags(newTag) {
    let newArr = this.state.selectedTags
    newArr.push(newTag)
    this.setState({selectedTags: newArr})
    let idx = tagOptions.indexOf(newTag)
    tagOptions = tagOptions.splice(idx, idx + 1)
  }
  
  handleFormSubmit = (values) => {
    this.props.signUpUser(values);
  };
  
  renderField = ({
    input,
    label,
    type,
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
        <input {...input} placeholder={label} className="form-control" type={type}/>
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
    return (
      <div className="container">
        <div className="col-md-3 col-md-offset-3">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="name" type="text" component={this.renderField} label="Name"/>
            <Field name="email" type="text" component={this.renderField} label="Email"/>
            <Field name="password" type="password" component={this.renderField} label="Password"/>
            <Field name="passwordConfirmation" type="password" component={this.renderField} label="Password Confirmation"/>
            { tagOptions.map((tag, idx) => {
              return (
                <button key={idx} type="button" onClick={() =>{this.updateTags(tag)}}>{tag}</button>
              )
            })}  
            {this.state.selectedTags}
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
