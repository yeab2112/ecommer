import React, { useState } from 'react';
import '../asett/form.css';
import  axios from 'axios';
import {useNavigate } from 'react-router-dom';
const CheckoutForm = () => {
    const [address, setAddress] = useState()
    const [state, setState] = useState()
    const [address2, setAddress2] = useState()
    const [city, setCtiy] = useState()
    const [zip, setZip] = useState()
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://127.0.0.1:5000/api/checkout', address,address2,city,state,zip);
   
          // Check if a message is returned
          if (response.data.message) {
            alert(response.data.message);
          } else {
            alert('Order created successfully!'); // Or provide a default message
          }
        } catch (error) {
          console.error(error);
          alert('Error processing order');
        }
      };
      console.log(address, address2, state, city, zip)

    return (
        <div className='form-continer-address'>
            <form onSubmit={handleSubmit} className='form-address'>
                <h2>Shipping Deteils</h2>
                <div className='form-group'>
                    <label className='form-label'>
                        Address :
                        <input type="text" name="address"
                            placeholder='Address'
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className='form-control'
                        />
                    </label>
                    <label className='form-label'>
                        Address 2:
                        <input type="text"
                            placeholder='Apartment number ,suite,unit etc'
                            name="address2"
                            onChange={(e) => setAddress2(e.target.value)}
                            required
                            className='form-control'
                        />
                    </label>
                    <div className='address'>
                        <label className='form-label'>
                            City :
                            <input type="text"
                                name="city"
                                onChange={(e) => setCtiy(e.target.value)}
                                required
                                className='form-control'
                            />
                        </label>
                         <label className='form-label'>
                            State:
                            <select name="state"
                                onChange={(e) => setState(e.target.value)}
                                className='form-control-address'>
                                <option value="amhara">Amhara</option>
                                <option value="debub">Dubub</option>
                            </select>

                        </label> <label className='form-label-address'>
                            Zip :
                            <input type="text"
                                name="zip"
                                onChange={(e) => setZip(e.target.value)}
                                required
                                className='form-control-addresss'
                            />
                        </label>
                    </div>
                    
                </div>
                <button type="submit" className='form-button'>continue...</button>
            </form>
        </div>
    );
};

export default CheckoutForm;

