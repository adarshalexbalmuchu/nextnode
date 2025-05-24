import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Dynamic greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    // Live clock
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-2">{greeting}{user?.email ? `, ${user.email.split('@')[0]}` : ''}!</h2>
      <div className="mb-4 text-gray-500">{date.toLocaleString()}</div>
      <div className="mb-6">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {user?.email}
        </span>
      </div>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Log out
      </button>
      <div className="mt-8 text-sm text-gray-400">
        More features coming soon!
      </div>
    </div>
  );
};

export default UserDashboard;
