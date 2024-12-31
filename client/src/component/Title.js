import React from 'react';

function Title({ title1, title2 }) {
  return (
    <div className="text-center my-4">
      <p className="text-2xl font-bold text-gray-800">
        {title1} <span className="text-blue-600 text-center">{title2}</span>
      </p>
    </div>
  );
}

export default Title;
