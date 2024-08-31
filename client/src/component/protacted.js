import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedComponent = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5001/api/verify', {
                    headers: {
                        Authorization: `Bearer ${token},`
                    },
                });
                setUserData(response.data.user);
                setError(null);
            } catch (err) {
                setError(err.response ? err.response.data.error : 'Failed to fetch user data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Protected Data</h2>
            {error && <p>{error}</p>}
            {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
        </div>
    );
};

export default ProtectedComponent;
