import React, { useEffect, useState } from 'react';
import Auth from './provider'; // Import the Auth class

import LoadingPage from './loading_page'
import LoginPage from "./login_page"

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      Auth.getUserData().then(() => {
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <LoadingPage/>; // You can replace this with any loading animation or component
  }

  // If user is not authenticated, render nothing or a message
  if (!isAuthenticated) {
    return <LoginPage />; // You can replace this with any UI component or message indicating authentication is required
  }

  // If user is authenticated, render the children components
  return <>{children}</>;
};

export default RequireAuth;