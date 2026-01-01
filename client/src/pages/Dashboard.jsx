import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(res.data);
            } catch (err) {
                console.error(err);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (!user) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="container mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl mb-4">Welcome, {user.name}!</h2>
                <p className="mb-4">Email: {user.email}</p>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
