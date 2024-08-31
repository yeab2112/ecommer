import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
// import '../asett/contactget.css' 

function Contactget() {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  // State for storing contact information
  const [contacts, setContacts] = useState([]);

  // Fetch contact information from the API
  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/contact') //  
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  return (
    <div>
      <h1>Contact List</h1>
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Message</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact._id}> {/* Assuming you have an _id field */}
              <td>{contact.name}</td>
              <td>{contact.message}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}

export default Contactget;
