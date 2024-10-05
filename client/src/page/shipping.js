import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Shipping = ({
    address,
    setAddress,
    address2,
    setAddress2,
    zip,
    setZip,
    state,
    setState,
    city,
    setCity
}) => {
    return (
        <div className='m-4'>
            <form className='justify-content-center align-items-center w-30'>
                <h2>Shipping Details</h2>
                <div className='form-group'>
                    <label className='form-label'>
                        Address:
                        <input 
                            type="text" 
                            name="address"
                            placeholder='Address'
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className='form-control'
                        />
                    </label>
                    <label className='form-label'>
                        Address 2:
                        <input 
                            type="text"
                            placeholder='Apartment number, suite, unit etc'
                            name="address2"
                            onChange={(e) => setAddress2(e.target.value)}
                            required
                            className='form-control'
                        />
                    </label>
                    <div className='d-flex justify-content-between'>
                        <div className='w-50 me-2'>
                            <label className='form-label'>
                                City:
                                <input 
                                    type="text"
                                    name="city"
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    className='form-control'
                                />
                            </label>
                        </div>
                        <div className='w-25 me-2'>
                            <label className='form-label'>
                                State:
                                <select 
                                    name="state"
                                    onChange={(e) => setState(e.target.value)}
                                    className='form-control'
                                >
                                    <option value="amhara">Amhara</option>
                                    <option value="debub">Dubub</option>
                                </select>
                            </label>
                        </div>
                        <div className='w-25'>
                            <label className='form-label'>
                                Zip:
                                <input 
                                    type="text"
                                    name="zip"
                                    onChange={(e) => setZip(e.target.value)}
                                    required
                                    className='form-control'
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Shipping;
