import React, { useState } from 'react'
import '../asset/form.css'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
function Register() {
    const [values, setvalue] = useState({
        email: "",
        name: "",
        password: ""
    })
    const navigate=useNavigate()
    const [error, setError] = useState(false)

    const chandleinput = (event) => {
        setvalue({ ...values, [event.target.id]: event.target.value })
    }
    function Submithandler(e) {
        e.preventDefault()
        axios.post('http://127.0.0.1:5000/api/register', values)
            .then(res => {
                 if(res.data.success){
                console.log(res)
                toast.success("Account created successfully", {
                    position: "top-right",
                    autoClose: 5000
                })
                navigate('/login')
                 }
            }).catch(err => { // Change 'caches' to 'catch'
                setError(true)
                
                    console.log(err)
                })
            


    }
    return (
        <div className='form-continer'>
            <form className='formm' onSubmit={Submithandler}>
                <h2> create account</h2>

                <div className='form-grop'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input type='text' placeholder='enter name' autoComplete='off' className='form-control' id='name' onChange={chandleinput} />


                </div>
                <div className='form-grop'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input type='text' placeholder='enter email' autoComplete='0ff' 
                    className='form-control' id='email' onChange={chandleinput} />


                </div>
                <div className='form-grop'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input type='password' autoComplete='off' placeholder='*******' className='form-control' id='password' onChange={chandleinput} />
                    
                </div>
                <div className='a'> 
                {error && <p>{error}</p>}

                  </div>
                <button type="submit" className='form-button' > Register</button>
                <p> Already register?<Link to='/login' className='log'>login</Link></p>
            </form>
        </div>
    )
}

export default Register
