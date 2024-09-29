import { useContext } from 'react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from '../App'; 
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { setUser } = useContext(AuthContext); 
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to Exit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token'); // Clear the token
        setUser(null); // Update the user state in the context
        navigate("/");
      }
    });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  ); 
}

export default Logout;
