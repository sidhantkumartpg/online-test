import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {

    const [registerDetails, setregisterDetails] = useState({});

    const [detailsValidate, setDetailsValidate] = useState({});

    const history = useHistory();

    function handleChange(e) {
        setregisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        setDetailsValidate({});

        const detailsCount = Object.keys(registerDetails).length;

        if (detailsCount === 0 || detailsCount < 4){
            toast.warn('Please fill in all the fields', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                toastId: 'filldetails'
            });
            return
        }
        
        for(let key in registerDetails){
            if (!registerDetails[key].trim()){
                setDetailsValidate({...detailsValidate, [key]: true});
                return
            }
        }

        if (Object.keys(detailsValidate).length !== 0)
            return
        
        localStorage.setItem('ONLINE_EXAM_SESSION', { empCode: registerDetails['emp-code'], name: registerDetails['name']});

        history.push({pathname: '/exam-info'});
    }

    return (
        <>
            <div className="section">
                <form className="register-form">
                    <h2>Register</h2>
                    <div className="form-group">
                        <label htmlFor="emp-code" className="register-label">Employee Code</label>
                            <input
                                className = "register-input"
                                value = {registerDetails['emp-code']}
                                type = 'text'
                                name = 'emp-code'
                                id = 'input-emp-code'
                                onChange = {handleChange}
                                required={true}
                            />
                            {detailsValidate['emp-code'] && <small>Invalid Employee code</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="register-label" isHidden>Name</label>
                            <input
                                className = "register-input"
                                value = {registerDetails['name']}
                                type = 'text'
                                name = 'name'
                                id = 'input-name'
                                onChange = {handleChange}
                                required={true}
                            />
                            {detailsValidate['name'] && <small>Invalid name</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="register-label">Password</label>
                            <input
                                className = "register-input"
                                value = {registerDetails['password']}
                                type = 'password'
                                name = 'password'
                                id = 'input-password'
                                onChange = {handleChange}
                                required={true}
                            />
                            {detailsValidate['password'] && <small>Invalid password</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password" className="register-label">Confirm password</label>
                            <input
                                className = "register-input"
                                value = {registerDetails['confirm-password']}
                                type = 'password'
                                name = 'confirm-password'
                                id = 'input-confirm-password'
                                onChange = {handleChange}
                                required={true}
                            />
                            {detailsValidate['confirm-password'] && <small>Passwords do not match</small>}
                    </div>
                    <button type='button' className='register-submit-btn' onClick={handleSubmit}>Register</button>
                </form>
            </div>
        <ToastContainer/>
        </>
     );
}
 
export default Register;