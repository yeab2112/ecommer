import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import '../asett/dashboard.css'; // Assuming the CSS file is in an 'assets' folder
import 'react-step-progress/dist/index.css'
import PlaceOrder from './order';  // Import your Place Order component
import StepProgressBar from "react-step-progress"
import  CheckoutForm from './shipping'
import Payment from './Payment';  // Import your Payment component

const Checkouts = () => {
 
 const onFormSubmit=()=>{
alert('form submited')
 }

  return (
   <div>
    <StepProgressBar
    startingStep={0}
    onSubmit={onFormSubmit}
    steps={
        [

          {label:'Shipping',
            subtitle:'10%',
            name:'step 1',
            content: <CheckoutForm/>
          } ,
           {label:'Payment',
            subtitle:'50%',
            name:'step 2',
            content: <Payment/>
          }  ,
           {label:'place Order',
            subtitle:'100%',
            name:'step 3',
            content:PlaceOrder(),
          }   
        ]
    }
    />
   </div>
  );
};

export default Checkouts;
