// Example using a component to manage order status updates
function OrderDetails(props) {
    const { order, updateOrderStatus } = props;
    const [newStatus, setNewStatus] = useState(order.status);
    const [notes, setNotes] = useState('');
  
    const handleStatusChange = (event) => {
      setNewStatus(event.target.value);
    };
  
    const handleNotesChange = (event) => {
      setNotes(event.target.value);
    };
  
    const handleSubmit = async () => {
      const response = await fetch(`http://127.0.0.1:5000/api/order', ${order._id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, notes }),
      });
  
      if (response.ok) {
        const updatedOrder = await response.json();
        updateOrderStatus(updatedOrder); // Update the order in your state
      } else {
        // Handle error
      }
    };
  
    return (
      <div>
        {/* ... (Display order details) */}
        <select value={newStatus} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
        <textarea value={notes} onChange={handleNotesChange} placeholder="Notes (optional)"></textarea>
        <button onClick={handleSubmit}>Update Status</button>
      </div>
    );
  }
  