import React, { useContext, useState } from 'react';
import '../asett/form.css';
const CheckoutForm = ({
    address,
    setAddress,
    address2,
    setAddress2,
    zip,
    setZip,
    state,
    setState,
    city,
    setCtiy
}) => {


    return (
        <div >
            <form className='form-address'>
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
            </form>
        </div>
    );
};

export default CheckoutForm;

