import Layout from '../components/Layout'
import { useState } from "react";
import axios from 'axios'
import { showSuccessMessage, showErrorMessage } from '../helpers/alert';

const Register = () => {

    const[state,setState] = useState({
        name:'',
        email:'',
        password:'',
        error: '',
        success:'',
        buttonText:'Register'
    })

    //destructuring values so we don't have to ref by using state.name etc.
    const {name, email, password, error, success, buttonText} = state;


//spread operator updating state so when a error or success message occurs
// the first time the user types into the input feild it clears the alert window
   const handleChange = (name) => (e) => {
        setState({...state, [name]: e.target.value, error:'', success:'', buttonText:'Register' })

   }

   // common js w/o async await - will incorporate later
   const handleSubmit = (e) =>{
        e.preventDefault()
        // while we are submitting the request this text will show (Full case List Work)
        setState({...state, buttonText: 'Registering'})
        //call backend
        // console.table({name, email, password});
        axios.post(`http://localhost:8000/api/register`, {
            name,
            email,
            password
        })
        //handleSubmit post req returns a promise so w/then kw can await the response result before clg
        .then(response => {

         setState({
            ...state,
            name: '',
            email:'',
            password:'',
            buttonText: 'Submitted',
            success: response.data.message
            })
        })

        // spread operator keep all props the same and only change selected props
        .catch(error => {
            setState({...state, buttonText:'Register', error: error.response.data.error})
        })
   };

    const registerForm = () => 
    <form onSubmit={handleSubmit}> 
        <div className="form-group mb-4 ">
            <input value={name} onChange={handleChange('name')} type='text' className='form-control rounded-0' placeholder='Type your Name'/>
        </div>
            
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
    
  return (
    <Layout>
        

        <div>
            <h1 className="mb-4 pb-1 border-warning border-bottom border-top w-25 text-center rounded-2">Register</h1>
            from working branch
            {registerForm()}
            {/* {JSON.stringify(state)}  This will show our state values in real time as they are updated */}
        </div>
        yellow chicken dog
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
    </Layout>
  );
};

export default Register;




