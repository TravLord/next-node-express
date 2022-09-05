import Layout from '../components/Layout'
import { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from '../helpers/alert';
import { API } from '../config';
import Router from 'next/router';

const Login = () => {

    const[state,setState] = useState({
        email:'reactaws4@gmail.com',
        password:'dogcat',
        error: '',
        success:'',
        buttonText:'Login'
    })

    //destructuring values so we don't have to ref by using state.name etc...
    const { email, password, error, success, buttonText} = state;


//spread operator updating state so when a error or success message occurs
// the first time the user types into the any input feild it clears the alert window
   const handleChange = (index) => (e) => {
        setState({...state, [index]: e.target.value, error:'', success:'', buttonText:'Login' })
   }

   const handleSubmit = async e => {
    e.preventDefault();
    setState({...state, buttonText:'Logging in...'});
    try {
        const response = await axios.post(`${API}/login` , {
        email,
        password

        })
     console.log(response);  ///data contains user token 

   } catch (error) {
    console.log(error);
    setState({...state, buttonText:'Login', error: 'error try again'});
   }
};

   // conventional promise syntax for post request async await version above
//    const handleSubmit = (e) => {
//         e.preventDefault()
//         // while we are submitting the request this text will show (Full case List Work)
//         setState({...state, buttonText: 'Registering'})
//         //call backend
//         // console.table({name, email, password});
//         axios.post(`http://localhost:8000/api/register`, {
//             name,
//             email,
//             password
//         })
//         //handleSubmit post req returns a promise so w/then kw can await the response result before clg
//         .then(response => {

//          setState({
//             ...state,
//             name: '',
//             email:'',
//             password:'',
//             buttonText: 'Submitted',
//             success: response.data.message
//             })
//         })
        // spread operator keep all props the same and only change selected props
//         .catch(error => {
//             setState({...state, buttonText:'Register', error: error.response.data.error})
//         })
//    };

    const loginForm = () => 
    <form onSubmit={handleSubmit}>      
        <div className="form-group mb-4 border">
            <input value={email} onChange={handleChange('email')} type='email' className='form-control rounded-0' placeholder='Type your Email'/>
        </div>

        <div className="form-group mb-4">
            <input value={password} onChange={handleChange('password')} type='password' className='form-control rounded-0' placeholder='Type your Password'/>
        </div>
      
        <div className="form-group mb-4">
            <button  className='btn btn-outline-warning w-100'>{buttonText}</button>
        </div>
        
    </form>
    
  return ( <Layout>       
                <div> 
                    <h1 className="mb-4 pb-1 border-warning border-bottom border-top w-25 text-center rounded-2">Login</h1>
                    {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                    {loginForm()}
                    {/* {JSON.stringify(state)}  This will show our state values in real time as they are updated */}
                </div>    
            </Layout>
        );
};

export default Login;





