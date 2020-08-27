import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';
/* import React, {Component, Fragment} from 'react'; */

import React, { useState, Fragment} from 'react';

const Login = (props) => {
let matric;
let password;
let matricError;
let passwordError;

  const [userCredentialsInitialState, setUserCredentialsInitialState] = useState({
    matric: '',
    password: ''
  })
  
  const [errorMessageInitialState, setErrorMessageInitialState] = useState({
    matricError: '',
    passwordError: ''
  })
  
  const [initialstateSummation, setInitialStateSummation] = useState({
    matric: '',
    password: '',
    matricError: '',
    passwordError: ''
  })
  
    /* state = initialState; // To figure out */
  /* 
   const handleChange = event => {
      this.setState({
        [event.target.name] : event.target.value
      });
    }; */
  
    const handleChange = event => {
      setUserCredentialsInitialState({...userCredentialsInitialState,
        [event.target.name] : event.target.value
      });
    };
  
    const validate = () => {
      let matricError = "";
      let passwordError = ""
    
      if(!matric){
        matricError = "Matric cannot be blank";
      }
    
      if(!password){
        passwordError = "Password cannot be blank";
      } 
    
     /*  if(matricError || passwordError){
        this.setState({matricError, passwordError});
        return false; 
      } */
  
      if(matricError || passwordError){
        setErrorMessageInitialState({matricError, passwordError});
        return false; 
      }
  
       return true;
    }
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const isValid = validate(); 
      if (isValid){
        
         const getOptions = {
          method: "GET",
          url:'/user/play/authenticated',
          responseType:"stream"
        }
  
         const renderQuizPage = () =>{
           axios(getOptions).then(()=>{
             console.log('Quiz Page Is sucessfully rendered');
            return this.props.history.push('/user/play/quiz');
           }).catch(()=>{
             console.log('Unable render Quiz Page');
           })
         }
      
           const payload = {
            matric: matric,
            password: password
          };
  
            axios({
              url: "/user/play/login",
              method: "POST",
              data: payload,
              withCredentials: true,
              xsrfHeaderName:'X-XSRF-TOKEN',
              xsrfCookieName:'XSRF-TOKEN'
            })
            .then(()=>{
             return renderQuizPage();
             }).catch((error)=>{
              return this.props.history.push('/user/play/login');
             })
      };
      /* this.setState(initialState); */
      setInitialStateSummation(initialstateSummation)
        };
    
         return(
           <Fragment>
           <Helmet><title>Nimelssa Quiz - Login page</title></Helmet>
           <form onSubmit={handleSubmit}>
           <div className="row">
           <div className="col s12 m4 offset-m4"> 
              <div className="card z-depth-4">
                 <div className="card-content black white-text">
                    <span className="card-title">Login</span>
                 </div>
                 <div className="card-content">
     
                    <div className="input-field">
                      <i className="material-icons prefix">account_circle</i>
                      <input 
                      className="validate"
                       placeholder="Enter Matric Number"
                      id="matric" 
                      type="number"
                      name="matric" 
                      value={matric}
                      onChange={handleChange}
                      />
                     <div style={{ color : "red" }}>
                        {matricError}
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
                      value={password}
                      onChange={handleChange}
                      />
                    <div style={{ color : "red" }}>
                      {passwordError}
                    </div>
                      <label htmlFor="password">Password</label>
                    </div>
     
                     <div >
                      <label>
                       &nbsp;<button style={{width:100}} className="button"><span>Login</span></button>
                      </label>
                    </div><br />
                    <h7>Dont have an account? <Link to="/user/play/register">Create Account</Link></h7>
                 </div>
              </div>
           </div>
         </div>
           </form>
       </Fragment>
         )
  } 
    export default Login;































/* const initialState = {
  matric: "",
  password: "",
  matricError: "",
  passwordError: ""
}

class Login extends Component{
  state = initialState;

  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    });
  };

  validate = () =>{
    let matricError = "";
    let passwordError = ""
  
    if(!this.state.matric){
      matricError = "Matric cannot be blank";
    }
  
    if(!this.state.password){
      passwordError = "Password cannot be blank";
    } 
  
    if(matricError || passwordError){
      this.setState({matricError, passwordError});
      return false; 
    }
     return true;
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    const isValid = this.validate(); 
    if (isValid){
      
       const getOptions = {
        method: "GET",
        url:'/user/play/authenticated',
        responseType:"stream"
      }

       const renderQuizPage = () =>{
         axios(getOptions).then(()=>{
           console.log('Quiz Page Is sucessfully rendered');
          return this.props.history.push('/user/play/quiz');
         }).catch(()=>{
           console.log('Unable render Quiz Page');
         })
       }
    
         const payload = {
          matric: this.state.matric,
          password: this.state.password
        };

          axios({
            url: "/user/play/login",
            method: "POST",
            data: payload,
            withCredentials: true,
            xsrfHeaderName:'X-XSRF-TOKEN',
            xsrfCookieName:'XSRF-TOKEN'
          })
          .then(()=>{
           return renderQuizPage();
           }).catch((error)=>{
            return this.props.history.push('/user/play/login');
           })
    };
    this.setState(initialState);
      };
  
    render(){
       return(
         <Fragment>
         <Helmet><title>Nimelssa Quiz - Login page</title></Helmet>
         <form onSubmit={this.handleSubmit}>
         <div className="row">
         <div className="col s12 m4 offset-m4"> 
            <div className="card z-depth-4">
               <div className="card-content black white-text">
                  <span className="card-title">Login</span>
               </div>
               <div className="card-content">
   
                  <div className="input-field">
                    <i className="material-icons prefix">account_circle</i>
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
   
                   <div >
                    <label>
                     &nbsp;<button style={{width:100}} className="button"><span>Login</span></button>
                    </label>
                  </div><br />
                  <h7>Dont have an account? <Link to="/user/play/register">Create Account</Link></h7>
               </div>
            </div>
         </div>
       </div>
         </form>
     </Fragment>
       )
    }
}
  export default Login;
 */