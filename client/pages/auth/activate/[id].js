import { useState, useEffect } from "react";
import { withRouter } from "next/router"
import axios from "axios";
import { showSuccessMessage,showErrorMessage } from "../../../helpers/alert";
import { API } from "../../../config";
import jwt from 'jsonwebtoken';
import Layout from "../../../components/Layout";


const ActivateAccount = ({router}) => {

    const [state,setState] = useState({
        name: '',
        token:'',
        buttonText: 'Activate Account',
        success:'',
        error:''
    
    });
    
    const {name, token, buttonText, success, error} = state;
    
    // get the id from the query which is the token then if present decode token and add it to
    useEffect(() => {
        let token = router.query.id
        if(token) {
            const {name} = jwt.decode(token) // grabbing name and adding decoded token  
            setState({...state, name, token})
        }
          
    },[router]);  // dependecy array means when this value changes this func will run (as well when component mounts and unmounts)

    const clickSubmit = async e => {
        e.preventDefault()
        // console.log('activate account')
        setState({...state, buttonText: 'Activated'})

        try {
            const response = await axios.post(`${API}/register/activate`, {token});
            console.log('account activate res', response)
            setState({...state, name:'',token:'', buttonText: 'Activated', success: response.data.message });

        } catch (error) {
            setState({...state, buttonText: 'Activate Account', error: error});
        }
    };


    //{JSON.stringify(state)} add to html to see if our useEffect is working and to identify what data is with the property to ref
    return (
    <Layout>
        <div className="col-md-6 offset-md-3">
            <h1>Good day {name}, you son of a bitch are ready to activate your account?</h1>
            <br/>
            {success && showSuccessMessage}
            {error && showErrorMessage}
            <button onClick={clickSubmit} className="btn btn-outline-warning btn-block">{buttonText}</button>
        </div>
        </Layout>
        )
};


//token generated from account activation is id property (same name as pages file)
export default withRouter(ActivateAccount);