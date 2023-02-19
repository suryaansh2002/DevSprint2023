import React, {useState} from 'react'
import './Login.css'
export default function Login() {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [error, setError] = useState('')
     const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault();
        setError(false)
        if(!email){
            setError(true)
            setErrorMsg('Please enter email')            
        }
        else if (email.indexOf('@')==-1){
            setError(true)
            setErrorMsg('Email address should contain @')
        }
        else if(password.length<8){
            setError(true)
            setErrorMsg('Password should be atleast 8 characters')
        }
        else if(password == password.toLowerCase()){
            setError(true)
            setErrorMsg('Password should contain atleast 1 upper case character')
        }
        else if(password == password.toUpperCase()){
            setError(true)
            setErrorMsg('Password should contain atleast 1 lower case character')
        }
        else if(!error){
            localStorage.setItem('newsprism',email.split('@')[0])
            window.location.href='/home'
        }
    }
    return (
        <div className='login-container'>

            <form className='login-form'>
                <div class="form-group login-c">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} class="form-control" id="exampleInputEmail1" required aria-describedby="emailHelp" placeholder="Enter email" />
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} class="form-control" id="exampleInputPassword1" required placeholder="Password" />
                </div>
                {/* <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
                <button  class="btn login-sub" onClick={(e)=>{handleSubmit(e)}}>Submit</button>
                {error &&
                <div className='login-err'>{errorMsg}</div>
                }
            </form>
            <div className='bottom-box'>
                <div className="quote">
                News Is The First Draft Of History...
                </div>
            </div>
        </div>
    )
}
