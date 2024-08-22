import React from 'react';
import PrivateRouting from './privaterouting/privateRouting';
import Register from '../component/register/register';
import Login from '../component/login/login';
import Pnf from '../pnf/pnf';
// import AdminDashboard from '../component/adminDashboard/adminDashboard'; // Example component
// import UserDashboard from '../component/userDashboard/userDashboard'; // Example component
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

const RootRouting = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PrivateRouting />}>
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} /> */}
          {/* Add other protected routes here */}
        </Route>
        <Route path="*" element={<Pnf />} />
      </Routes>
    </Router>
  );
};

export default RootRouting;
