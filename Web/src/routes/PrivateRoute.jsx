import React, { Navigate } from 'react-router-dom';
import HomeComponent from '../components/home/HomeComponent.js';


const PrivateRoute = ({ children }) => {
  const isAuth = !!localStorage.getItem('authorization_token');
  return isAuth ? (
    <HomeComponent>{children}</HomeComponent>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute