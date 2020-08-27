import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

const initialState = {
  username: "",
  matric: "",
  password: "",
  role: "",
  usernameError: "",
  matricError: "",
  passwordError: "",
  roleError: ""
}

class Register extends Component{
state = initialState;

handleChange = event => {
let targetValue = event.target.value;
  this.setState({
     [event.target.name] : targetValue
  });
};

//Client side validation
validate = () =>{
  let usernameError = "";
  let matricError = "";
  let passwordError = "";
  let roleError = ""; 

  if(!this.state.username){
    usernameError = "User Name cannot be blank";
  }

  if(!this.state.matric){
    matricError = "Matric cannot be blank";
  }

  if(!this.state.password){
    passwordError = "Password cannot be blank";
  } 

  if(!this.state.role){
    roleError = "Role cannot be blank (admin/user)";
  }

  if(usernameError || matricError || passwordError || roleError){
    this.setState({usernameError, matricError, passwordError, roleError});
    return false; 
  }

  return true;
};

//Submit button handler
handleSubmit = (event) =>{
event.preventDefault();
const isValid = this.validate(); 
if (isValid){

    const payload = {
      username: this.state.username,
      matric: this.state.matric,
      password: this.state.password,
      role: this.state.role,
    };

    axios({
      url: "/user/play/register",
      method: "POST",
      data: payload,
      withCredentials: true
    })
    .then(()=>{
      console.log('Congratulations You are Successfully Signed Up');
      this.props.history.push('/user/play/login');
    })
    .catch(()=>{
      console.log('Sorry!! User Already Exist');
    })
    //Clear form
    this.setState(initialState);
}
  };

  render(){
    return(
<Fragment>
    <Helmet><title>Nimelssa quiz - Registeration page</title></Helmet>
      <form onSubmit={this.handleSubmit}>
      <div className="row">
      <div className="col s12 m4 offset-m4"> 
         <div className="card z-depth-4">
            <div className="card-content black white-text">
               <span className="card-title">Craete Account</span>
            </div>
            <div className="card-content">

               <div className="input-field">
                 <i className="material-icons prefix">account_box</i>
                 <input
                 className="validate"
                 placeholder="Enter Full Name"
                  id="uid"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  />
                 <div style={{ color : "red" }}>
                   {this.state.usernameError}
                  </div>
                 <label htmlFor="uid">User Name</label>
               </div>

               <div className="input-field">
                 <i className="material-icons prefix">edit</i>
                 <input 
                 className="validate"
                 placeholder="Enter Matric Number"
                 id="matric" 
                 type="number"
                 name="matric"
                 value={this.state.matric}
                onChange={this.handleChange}
                  />
                  <div style={{ color : "red" }}>
                   {this.state.matricError}
                  </div>
                 <label htmlFor="matric">Matric Number</label>
               </div>
              
               <div className="input-field">
                 <i className="material-icons prefix">lock</i>
                 <input 
                 className="validate"
                  placeholder="Enter Password"
                 id="password" 
                 type="password"
                 name="password"
                 value={this.state.password}
                 onChange={this.handleChange}
                />
                <div style={{ color : "red" }}>
                   {this.state.passwordError}
                  </div>
                 <label htmlFor="password">Password</label>
               </div>

               <div className="input-field">
                 <i className="material-icons prefix">account_circle</i>
                 <input 
                 className="validate"
                  placeholder="Enter Role(admin/user)"
                 id="role" 
                 type="text"
                 name="role"
                 value={this.state.role}
                 onChange={this.handleChange}
                 />
                 <div style={{ color : "red" }}>
                   {this.state.roleError}
                  </div>
                 <label htmlFor="role">Role</label>
               </div>
               
               <div >
                 <label>
                  &nbsp;<button style={{width:100}} className="button" type="submit"><span>Register</span></button>
                 </label>
               </div><br />
               <h7>Already Registered ? <Link to="/user/play/login">Proceed to Login</Link></h7>
            </div>
         </div>
      </div>
    </div>
      </form>
</Fragment>
    )
  }
}
export default Register;

 