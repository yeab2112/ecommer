import React, { useState, useEffect } from 'react';
import { AuthContext } from '../App';
import 'bootstrap/dist/css/bootstrap.min.css'

// import '../asett/contactget.css' 

function Contactget() {

  const { user } = React.useContext(AuthContext);

  // State for storing contact information
  const [contacts, setContacts] = useState([]);
 const [currentPage,setCurrentPage]=useState()
  const recoredsPerPage=3;
  const lastIndex=currentPage*recoredsPerPage;
  const firstIndex=lastIndex-recoredsPerPage;
  const records=contacts.slice(firstIndex,lastIndex);
  const npage=Math.ceil(contacts.length/recoredsPerPage)
  const numbers=[...Array(npage+1).keys()].slice(1)
  // Fetch contact information from the API
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/contact') //  
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
          {records.map(contact => (
            <tr key={contact._id}> {/* Assuming you have an _id field */}
              <td>{contact.name}</td>
              <td>{contact.message}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
          <ul className='pagination'>

       <li className='page-item'>
<a href='#' className='page-link' onClick={prePage}>prev</a>
       </li>
       {
        numbers.map((n,i)=>(
          <li className={`${currentPage===n ?'active':""}`}
          key={i}>
          <a href='#' className='page-link'
           onClick={()=>changePage(n)}>{n}</a>
          </li>
        ))
      }
      <li className='page-item'>
<a href='#' className='page-link' onClick={nextPage}>Next</a>
       </li>
          </ul>
        </nav>
    </div>
  );
  function prePage(){
    if(currentPage!==1){
      setCurrentPage(currentPage-1)
    }
      }
       function changePage(id){
    setCurrentPage(id)
       }
      function nextPage(){
    if(currentPage!==npage){
      setCurrentPage(currentPage+1)
    }
      }
}

export default Contactget;
