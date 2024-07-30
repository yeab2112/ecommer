import React, { useState } from 'react'
import '../asett/form.css'
import { Link } from "react-router-dom"
import axios from "axios"

function Register() {
    const [values, setvalue] = useState({
        email: "",
        name: "",
        password: ""
    })
    
    const chandleinput = (event) => {
        setvalue({ ...values, [event.target.id]: event.target.value })
    }
    function Submithandler(event){
        event.prventDefualt()
        axios.post('http://127.0.0.1:5000/register', values )
        .then(res => {
            console.log(res)
            
        }).catch(err => { // Change 'caches' to 'catch'
            console.log(err)
        })


    }
    return (
        <div className='form-continer'>
            <form className='form'   onSubmit={Submithandler}>
                <h2> create account</h2>

                <div className='form-grop'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input type='text' placeholder='enter name' autoComplete='off' className='form-control' id='name' onChange={chandleinput} />


                </div>
                <div className='form-grop'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input type='text' placeholder='enter email' autoComplete='0ff' className='form-control' id='email' onChange={chandleinput} />


                </div>
                <div className='form-grop'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input type='password' autoComplete='off' placeholder='*******' className='form-control' id='password' onChange={chandleinput} />


                </div>
                <button  type ="submit"className='form-button' > Register</button>
                <p> Already register?<Link to='/login' className='log'>login</Link></p>
            </form>
        </div>
    )
}

export default Register
