import React, {useState} from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
export default function Login() {
    function makeid(length1,length2) {
        let result = '';
        const characters1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const characters2 = '0123456789'
        const characters1Length = characters1.length;
        const characters2Length = characters2.length;

        let counter = 0;
        while (counter < length1) {
          result += characters1.charAt(Math.floor(Math.random() * characters1Length));
          counter += 1;
        }
        counter=0
        while (counter < length2) {
            result += characters2.charAt(Math.floor(Math.random() * characters2Length));
            counter += 1;
          }
  
        return result;
    }
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [error, setError] = useState('')
     const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault();
        var checkError=false;
        setError(false)
        if(!email){
            setError(true)
            checkError=true
            setErrorMsg('Please enter email')            
        }
        else if (email.indexOf('@')==-1){
            setError(true)
            checkError=true
            setErrorMsg('Email address should contain @')
        }
        else if(password.length<8){
            setError(true)
            checkError=true
            setErrorMsg('Password should be atleast 8 characters')
        }
        else if(password == password.toLowerCase()){
            setError(true)
            checkError=true
            setErrorMsg('Password should contain atleast 1 upper case character')
        }
        else if(password == password.toUpperCase()){
            setError(true)
            checkError=true
            setErrorMsg('Password should contain atleast 1 lower case character')
        }
        else if(!checkError){
            localStorage.setItem('newsprism',email.split('@')[0])
            localStorage.setItem('npusername',makeid(2,3))
            localStorage.setItem('bookmarked',JSON.stringify([]))

            window.location.href='/home'
        }
    }
    return (
        <div className='login-container'>

            <form className='login-form'>
                <div class="form-group login-c">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} class="form-control" id="exampleInputEmail1" required aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} class="form-control" id="exampleInputPassword1" required placeholder="Password" />
                </div>
             
                <button  class="btn login-sub" onClick={(e)=>{handleSubmit(e)}}>Submit</button>
                {error &&
                <div className='login-err'>{errorMsg}</div>
                }
            </form>
            <div className='bottom-box'>
                <div className="quote">
                <img className="logo-b" src={logo}/>
                
                News Is The First Draft Of History...
                </div>
            </div>
        </div>
    )
}
