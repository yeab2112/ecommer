import React, { useState, useEffect } from 'react';
import '../asset/contactget.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Contactget() {

  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recoredsPerPage = 3;
  const lastIndex = currentPage * recoredsPerPage;
  const firstIndex = lastIndex - recoredsPerPage;
  const records = contacts.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contacts.length / recoredsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/contact')
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  return (
    <div className="container mt-2 vh-100">
      <h1 className="text-center mb-4">Contact List</h1>

      {/* Contact Table */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Message</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {records.map(contact => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.message}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* Pagination */}
<nav>
  <ul className="pagination justify-content-center">
    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
      <button className="page-link" onClick={prePage}>
        Prev
      </button>
    </li>
    {numbers.map((n, i) => (
      <li
        className={`page-item ${currentPage === n ? 'active' : ''}`}
        key={i}
      >
        <button className="page-link" onClick={() => changePage(n)}>
          {n}
        </button>
      </li>
    ))}
    <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
      <button className="page-link" onClick={nextPage}>
        Next
      </button>
    </li>
  </ul>
</nav>

    </div>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default Contactget;
