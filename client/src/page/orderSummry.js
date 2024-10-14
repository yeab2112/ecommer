import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';  // Trash icon from react-icons

function AdminOrderSummary() {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/orderSummry')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Order Data:', data);
        setOrderDetails(data);
      })
      .catch(error => console.error('Error fetching Orders:', error));
  }, []);

  // Function to handle delete action
  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      // Remove order from state
      setOrderDetails(orderDetails.filter(order => order._id !== orderId));

      // Optionally, send delete request to server
      fetch(`http://127.0.0.1:5000/api/orders/${orderId}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (res.ok) {
            console.log(`Order ${orderId} deleted successfully.`);
          } else {
            console.error('Failed to delete order.');
          }
        })
        .catch(error => console.error('Error deleting order:', error));
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Admin Order Summary</h2>

      <div className="row">
        {orderDetails.length > 0 ? (
          orderDetails.map((order) => (
            <div key={order._id} className="col-md-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="row">
                    {/* Products Column */}
                    <div className="col-md-3">
                      <h5 className="card-title">Products</h5>
                      {order.products && order.products.length > 0 ? (
                        order.products.map((product) => (
                          <div key={product._id} className="mb-3 border p-2 rounded">
                            <img src={product.image} alt={product.name} className="img-fluid mb-2 rounded" />
                            <h6>{product.name}</h6>
                            <p className="text-success">${product.price}</p>
                          </div>
                        ))
                      ) : (
                        <p>No products found.</p>
                      )}
                    </div>

                    {/* Users Column */}
                    <div className="col-md-3">
                      <h5 className="card-title">User Details</h5>
                      {order.userId && order.userId.length > 0 ? (
                        order.userId.map((user) => (
                          <div key={user._id} className="mb-2">
                            <h6>{user.name}</h6>
                            <p>{user.email}</p>
                          </div>
                        ))
                      ) : (
                        <p>No user information found.</p>
                      )}
                    </div>

                    {/* Order Details Column */}
                    <div className="col-md-3">
                      <h5 className="card-title">Order Details</h5>
                      <p><strong>Total Price:</strong> ${order.totalPrice || 'N/A'}</p>
                      <p><strong>Total Items:</strong> {order.totalItem || 'N/A'}</p>
                    </div>

                    {/* Shipping Address Column */}
                    <div className="col-md-3">
                      <h5 className="card-title">Shipping Address</h5>
                      <p><strong>Address 1:</strong> {order.address || 'N/A'}</p>
                      <p><strong>Address 2:</strong> {order.address2 || 'N/A'}</p>
                      <p><strong>City:</strong> {order.city || 'N/A'}</p>
                      <p><strong>State:</strong> {order.state || 'N/A'}</p>
                      <p><strong>Zip:</strong> {order.zip || 'N/A'}</p>
                    </div>

                    {/* Delete Button */}
                    <div className="col-md-12 mt-3 text-center">
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(order._id)}
                      >
                        <FaTrash className="me-2" /> Delete Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminOrderSummary;
