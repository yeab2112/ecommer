import React, { useState, useEffect } from 'react';

function AdminContent() {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch('/api/admin', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAdminData(data);
        } else {
          // Handle error (e.g., redirect to login, display an error message)
          console.error('Error fetching admin data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  if (adminData) {
    // Display admin-specific content using adminData
    return (
      <div>
        <h2>Admin-Only Data</h2>
        <p>{adminData.message}</p>
        {/* Add more UI based on adminData */}
      </div>
    );
  } else {
    // Show a loading indicator or default message
    return <p>Loading admin data...</p>;
  }
}

export default AdminContent;
