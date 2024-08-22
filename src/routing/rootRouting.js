import React from 'react';
import PrivateRouting from './privaterouting/privateRouting';
import Register from '../component/register/register';
import Login from '../component/login/login';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Super_dashboard from '../component/super-admin_dashboard/super_dashboard';
import Manager_dashboard from '../component/manager-dashboard/manager_dashboard';
import Admin_dashboard from '../component/admin-dashboard/admin_dashboard';
import User_dashboard from '../component/user-dashboard/user_dashboard';
import Pnf from '../pnf/pnf';
const RootRouting = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
        {/* Protected Routes */}
        <Route element={<PrivateRouting />}>
          <Route path="/super-dashboard" element={<Super_dashboard />} />
          <Route path="/manager-dashboard" element={<Manager_dashboard />} />
          <Route path="/admin-dashboard" element={<Admin_dashboard />} />
          <Route path="/user-dashboard" element={<User_dashboard />} />
        </Route>
        <Route path="*" element={<Pnf />} />
      </Routes>
    </Router>
  );
};

export default RootRouting;
