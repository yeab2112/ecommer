import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../asett/contact.css' 
const Contact = () => {
const [name, setName] = useState('');
const [phone, setphone] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();

try {
const response = await fetch('http://127.0.0.1:5001/api/contact', {
  method: 'POST',
   headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ phone, name, email, message }),
});

if (response.ok) {
  toast.success("Contact submited successfully", {
    position: "top-right",
    autoClose: 5000
})
// setSent(true);
setName('');
setEmail('');
setMessage('');
setphone('')
console.log( phone, name, email, message )
} else {
  console.error('Error sending message',response.status);
}
} catch (error) {console.error('Error:', error);}};
return (
<div className="contact">
<form onSubmit={handleSubmit} className="form">
<h2>Contact Me</h2>
<div className='form-group'>
<label htmlFor="name" className='form-label'>Name:</label>
 <input autoComplete='off' className='form-control'
type="text"
 id="name"
value={name} onChange={(e) => setName(e.target.value)}required/>

<label htmlFor="email" className='form-label'> Email:</label>
 <input autoComplete='off' className='form-control'
type="email"
id="email"
value={email}
onChange={(e) => setEmail(e.target.value)}required/>
<label htmlFor="name" className='form-label'>Phone:</label>
 <input autoComplete='off' className='form-control'
type="text"
 id="phone"
value={phone} onChange={(e) => setphone(e.target.value)}required/>
 <label htmlFor="message"  className='form-label'>Message:</label>
 </div>
<textarea autoComplete='off' className='form-control'
id="message"
value={message}
 onChange={(e) => setMessage(e.target.value)}required/>
<button type="submit" className='form-button'>
Send Message
</button>
 </form>
 {/* {sent && <p className="successMessage">Message sent successfully!</p>} */}

 </div>
);

};



export default Contact;
