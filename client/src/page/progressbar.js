import '../asett/progressbar.css' 

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Progressbar() {
  const [currentStep, setCurrentStep] = useState(1); // Start at step 1

  // Example: Function to update the current step
  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <>
    <div className="progress-bar">
      <div className="progress-steps">
        <div className={`progress-step ${currentStep >= 1 ? 'active' : '1'}`}>
          <Link to="/shipping" onClick={() => handleStepChange(1)}>
            <span>Shipping</span>
          </Link>
        </div>
        <div className={`progress-step ${currentStep >= 2 ? 'active' : '2'}`}>
          <Link to="/payment" onClick={() => handleStepChange(2)}>
            <span>Payment</span>
          </Link>
        </div>
        
      </div>
       </div>
    </>
  );
}


  
  export default Progressbar;
  
  